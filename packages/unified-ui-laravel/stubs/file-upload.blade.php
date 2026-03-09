@props([
    'accept'    => '*',
    'multiple'  => false,
    'maxSize'   => null,
    'disabled'  => false,
    'name'      => 'file',
    'label'     => 'Drag & drop files here, or click to browse',
    'hint'      => null,
])

<div
    x-data="{
        dragging: false,
        files: [],
        disabled: {{ $disabled ? 'true' : 'false' }},
        multiple: {{ $multiple ? 'true' : 'false' }},
        maxSize: {{ $maxSize ? $maxSize * 1024 * 1024 : 'null' }},

        handleFiles(fileList) {
            if (this.disabled) return;
            const arr = Array.from(fileList);
            const valid = arr.filter(f => !this.maxSize || f.size <= this.maxSize);
            if (!this.multiple) this.files = valid.slice(0, 1);
            else this.files = [...this.files, ...valid];
            this.$dispatch('file-upload-change', { files: this.files });
        },
        remove(i) {
            this.files.splice(i, 1);
            this.$dispatch('file-upload-change', { files: this.files });
        },
        formatSize(bytes) {
            if (bytes < 1024) return bytes + ' B';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
            return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
        },
    }"
    x-on:dragover.prevent="dragging = true"
    x-on:dragleave.prevent="dragging = false"
    x-on:drop.prevent="dragging = false; handleFiles($event.dataTransfer.files)"
    {{ $attributes->except(['class']) }}
    data-ui-file-upload
>
    {{-- Drop zone --}}
    <label
        x-on:click="$refs.input.click()"
        :class="dragging ? 'border-[oklch(var(--ui-primary))] bg-[oklch(var(--ui-primary)/0.05)]' : 'border-[oklch(var(--ui-border))] hover:border-[oklch(var(--ui-ring))] hover:bg-[oklch(var(--ui-accent)/0.4)]'"
        class="flex flex-col items-center justify-center gap-3 rounded-[var(--ui-radius-lg)] border-2 border-dashed p-8 text-center transition-colors duration-[var(--ui-duration-fast)] cursor-pointer {{ $disabled ? 'opacity-50 pointer-events-none' : '' }}"
    >
        <svg class="h-8 w-8 text-[oklch(var(--ui-muted-foreground))]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
        <div>
            <p class="text-sm font-medium text-[oklch(var(--ui-foreground))]">{{ $label }}</p>
            @if($hint)
                <p class="mt-1 text-xs text-[oklch(var(--ui-muted-foreground))]">{{ $hint }}</p>
            @endif
            @if($maxSize)
                <p class="mt-1 text-xs text-[oklch(var(--ui-muted-foreground))]">Max size: {{ $maxSize }}MB</p>
            @endif
        </div>
        <input
            x-ref="input"
            type="file"
            name="{{ $name }}{{ $multiple ? '[]' : '' }}"
            accept="{{ $accept }}"
            @if($multiple) multiple @endif
            @if($disabled) disabled @endif
            x-on:change="handleFiles($event.target.files)"
            class="sr-only"
        />
    </label>

    {{-- File list --}}
    <template x-if="files.length > 0">
        <ul class="mt-3 space-y-2">
            <template x-for="(file, i) in files" :key="i">
                <li class="flex items-center gap-3 rounded-[var(--ui-radius-md)] border border-[oklch(var(--ui-border))] px-3 py-2 text-sm">
                    <svg class="h-4 w-4 shrink-0 text-[oklch(var(--ui-muted-foreground))]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
                    <span class="flex-1 truncate text-[oklch(var(--ui-foreground))]" x-text="file.name"></span>
                    <span class="shrink-0 text-xs text-[oklch(var(--ui-muted-foreground))]" x-text="formatSize(file.size)"></span>
                    <button type="button" x-on:click="remove(i)" class="shrink-0 text-[oklch(var(--ui-muted-foreground))] hover:text-[oklch(var(--ui-destructive))] transition-colors duration-[var(--ui-duration-fast)] focus-visible:outline-none" aria-label="Remove file">
                        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </li>
            </template>
        </ul>
    </template>
</div>

@props([
    'value'   => '#3b82f6',
    'name'    => null,
    'disabled'=> false,
    'presets' => [],
    'size'    => 'md',
])

@php
    $sizeMap = ['sm' => 'h-7 w-7', 'md' => 'h-8 w-8', 'lg' => 'h-10 w-10'];
    $btnSize = $sizeMap[$size] ?? $sizeMap['md'];
@endphp

<div
    x-data="{
        value: '{{ $value }}',
        open: false,
        disabled: {{ $disabled ? 'true' : 'false' }},
        presets: @json($presets),

        pick(color) {
            this.value = color;
            this.$dispatch('color-picker-change', { color });
        },
    }"
    x-on:click.outside="open = false"
    class="relative inline-flex items-center gap-2"
    {{ $attributes->except(['class']) }}
    data-ui-color-picker
>
    {{-- Trigger swatch --}}
    <button
        type="button"
        x-on:click="if (!disabled) open = !open"
        :disabled="disabled"
        :style="'background-color:' + value"
        class="{{ $btnSize }} rounded-[var(--ui-radius-md)] border-2 border-[oklch(var(--ui-border))] shadow-sm hover:border-[oklch(var(--ui-ring))] transition-colors duration-[var(--ui-duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--ui-ring))] focus-visible:ring-offset-2 {{ $disabled ? 'pointer-events-none opacity-50' : 'cursor-pointer' }}"
        :aria-label="'Selected color: ' + value"
        aria-haspopup="true"
        :aria-expanded="open.toString()"
    ></button>

    {{-- Value display / hex input --}}
    <input
        type="text"
        x-model="value"
        x-on:change="pick($event.target.value)"
        class="h-8 w-28 rounded-[var(--ui-radius-md)] border border-[oklch(var(--ui-input))] bg-[oklch(var(--ui-background))] px-2 text-xs font-mono text-[oklch(var(--ui-foreground))] focus:outline-none focus:ring-2 focus:ring-[oklch(var(--ui-ring)/0.2)] focus:border-[oklch(var(--ui-ring))]"
        placeholder="#000000"
        @if($disabled) disabled @endif
    />

    {{-- Dropdown --}}
    <div
        x-show="open"
        x-cloak
        x-transition:enter="transition ease-[var(--ui-ease-out)] duration-[var(--ui-duration-fast)] origin-top-left"
        x-transition:enter-start="opacity-0 scale-95"
        x-transition:enter-end="opacity-100 scale-100"
        x-transition:leave="transition ease-[var(--ui-ease-in)] duration-[var(--ui-duration-fast)] origin-top-left"
        x-transition:leave-start="opacity-100 scale-100"
        x-transition:leave-end="opacity-0 scale-95"
        class="absolute top-full left-0 z-[var(--ui-z-dropdown,50)] mt-1 rounded-[var(--ui-radius-lg)] border border-[oklch(var(--ui-border))] bg-[oklch(var(--ui-popover))] p-3 shadow-[var(--ui-shadow-md)]"
    >
        {{-- Native color input --}}
        <input
            type="color"
            :value="value"
            x-on:input="pick($event.target.value)"
            class="block h-32 w-48 cursor-pointer rounded-[var(--ui-radius-sm)] border-0 p-0"
        />

        {{-- Presets --}}
        @if($presets)
            <div class="mt-3 grid grid-cols-8 gap-1">
                @foreach($presets as $preset)
                    <button
                        type="button"
                        x-on:click="pick('{{ $preset }}')"
                        style="background-color: {{ $preset }}"
                        :class="value === '{{ $preset }}' ? 'ring-2 ring-offset-1 ring-[oklch(var(--ui-ring))]' : ''"
                        class="h-5 w-5 rounded-sm border border-black/10 cursor-pointer hover:scale-110 transition-transform duration-[var(--ui-duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--ui-ring))]"
                        :aria-label="'{{ $preset }}'"
                    ></button>
                @endforeach
            </div>
        @endif
    </div>

    @if($name)
        <input type="hidden" name="{{ $name }}" :value="value" />
    @endif
</div>

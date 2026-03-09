@props([
    'length'    => 6,
    'type'      => 'numeric',
    'variant'   => 'default',
    'size'      => 'md',
    'mask'      => false,
    'error'     => false,
    'success'   => false,
    'disabled'  => false,
    'autoFocus' => false,
    'gap'       => 'gap-2',
    'ariaLabel' => 'PIN Input',
    'name'      => null,
])

@php
    $cellSize = match ($size) {
        'sm' => 'w-8 h-10 text-base',
        'lg' => 'w-12 h-14 text-xl',
        default => 'w-10 h-12 text-lg',
    };
    $variantFocus = match ($variant) {
        'primary' => 'focus:border-[oklch(var(--ui-primary))] focus:ring-2 focus:ring-[oklch(var(--ui-primary)/0.2)]',
        default   => 'focus:border-[oklch(var(--ui-ring))] focus:ring-2 focus:ring-[oklch(var(--ui-ring)/0.2)]',
    };
    $variantBorder = match ($variant) {
        'primary' => 'border-[oklch(var(--ui-primary)/0.4)]',
        default   => 'border-[oklch(var(--ui-input))]',
    };
    $stateCls = $error ? 'border-[oklch(var(--ui-destructive))] focus:border-[oklch(var(--ui-destructive))] focus:ring-[oklch(var(--ui-destructive)/0.2)]'
        : ($success ? 'border-[oklch(var(--ui-success))] focus:border-[oklch(var(--ui-success))] focus:ring-[oklch(var(--ui-success)/0.2)]' : '');

    $cellBaseClasses = implode(' ', [
        'inline-flex items-center justify-center shrink-0',
        'rounded-[var(--ui-radius-md)] border bg-[oklch(var(--ui-background))]',
        'text-center font-semibold tabular-nums leading-none',
        'transition-[border-color,box-shadow,background-color] duration-[var(--ui-duration-fast)]',
        'outline-none appearance-none caret-transparent select-none cursor-text',
        $disabled ? 'pointer-events-none opacity-50' : '',
        $cellSize,
        $stateCls ?: ($variantBorder . ' ' . $variantFocus),
    ]);

    $pattern = match ($type) {
        'alphanumeric' => '[a-zA-Z0-9]*',
        'alphabetic'   => '[a-zA-Z]*',
        default        => '[0-9]*',
    };
    $inputMode = $type === 'numeric' ? 'numeric' : 'text';
@endphp

<div
    x-data="{
        cells:    Array({{ $length }}).fill(''),
        length:   {{ $length }},
        type:     '{{ $type }}',
        mask:     {{ $mask ? 'true' : 'false' }},
        disabled: {{ $disabled ? 'true' : 'false' }},

        allowed(ch) {
            const map = { numeric: /^[0-9]$/, alphanumeric: /^[a-zA-Z0-9]$/, alphabetic: /^[a-zA-Z]$/ };
            return (map[this.type] ?? map.numeric).test(ch);
        },
        normalize(ch) { return this.type === 'numeric' ? ch : ch.toUpperCase(); },

        focus(i) { this.$refs['cell' + i]?.focus(); },

        onKeyDown(e, i) {
            if (e.key === 'Backspace') {
                e.preventDefault();
                if (this.cells[i]) { this.cells[i] = ''; }
                else if (i > 0)    { this.cells[i - 1] = ''; this.focus(i - 1); }
                else { this.cells = Array(this.length).fill(''); }
                this.emit(); return;
            }
            if (e.key === 'Delete')     { e.preventDefault(); this.cells[i] = ''; this.emit(); return; }
            if (e.key === 'ArrowLeft'  && i > 0)              { e.preventDefault(); this.focus(i - 1); return; }
            if (e.key === 'ArrowRight' && i < this.length - 1){ e.preventDefault(); this.focus(i + 1); return; }
            if (e.key === 'Home') { e.preventDefault(); this.focus(0); return; }
            if (e.key === 'End')  { e.preventDefault(); this.focus(this.length - 1); return; }
            if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                const ch = this.normalize(e.key);
                if (!this.allowed(ch)) return;
                this.cells[i] = ch;
                this.emit();
                if (i < this.length - 1) this.focus(i + 1);
            }
        },

        onPaste(e, startI) {
            e.preventDefault();
            const raw = e.clipboardData.getData('text');
            const chars = raw.split('').filter(c => this.allowed(this.normalize(c))).map(c => this.normalize(c));
            if (!chars.length) return;
            const next = [...this.cells];
            let last = startI;
            for (let j = 0; j < chars.length && startI + j < this.length; j++) {
                next[startI + j] = chars[j]; last = startI + j;
            }
            this.cells = next;
            this.emit();
            this.focus(Math.min(last + 1, this.length - 1));
        },

        emit() {
            this.$dispatch('pin-input-change', { value: [...this.cells] });
            if (this.cells.every(c => c.length === 1)) {
                this.$dispatch('pin-input-complete', { pin: this.cells.join('') });
            }
        },

        displayVal(i) { return this.mask && this.cells[i] ? '•' : this.cells[i]; },
    }"
    @if($autoFocus) x-init="focus(0)" @endif
    role="group"
    aria-label="{{ $ariaLabel }}"
    class="inline-flex {{ $gap }}"
    data-ui-pin-input
    @if($error) data-ui-error @endif
    @if($success) data-ui-success @endif
>
    @for ($i = 0; $i < $length; $i++)
        <input
            x-ref="cell{{ $i }}"
            type="{{ $mask ? 'password' : 'text' }}"
            inputmode="{{ $inputMode }}"
            pattern="{{ $pattern }}"
            maxlength="1"
            :value="displayVal({{ $i }})"
            readonly
            @if($disabled) disabled @endif
            autocomplete="{{ $i === 0 ? 'one-time-code' : 'off' }}"
            autocorrect="off"
            autocapitalize="none"
            spellcheck="false"
            x-on:keydown="onKeyDown($event, {{ $i }})"
            x-on:paste="onPaste($event, {{ $i }})"
            x-on:change=""
            class="{{ $cellBaseClasses }}"
            :class="cells[{{ $i }}] ? 'bg-[oklch(var(--ui-accent)/0.3)]' : ''"
            aria-label="Digit {{ $i + 1 }} of {{ $length }}"
            @if($error) aria-invalid="true" @endif
            @if($name) name="{{ $name }}[{{ $i }}]" @endif
            data-ui-pin-cell="{{ $i }}"
        />
    @endfor

    {{-- Hidden aggregate input for form submission --}}
    @if($name)
        <input
            type="hidden"
            name="{{ $name }}"
            :value="cells.join('')"
        />
    @endif
</div>

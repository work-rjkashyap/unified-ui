@props([
    'value' => '',
    'as' => 'button',
    'href' => null,
    'shortcut' => null,
    'disabled' => false,
])

@php
    $isDisabled = (bool) $disabled;

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'relative',
        'flex',
        'items-center',
        'w-full',
        'gap-2',
        'px-3',
        'py-2',
        'text-sm',
        'leading-tight',
        'cursor-pointer',
        'select-none',
        'outline-none',
        'transition-colors',
        'duration-[var(--ui-duration-fast)]',
        'ease-[var(--ui-ease-default)]',
        'text-[oklch(var(--ui-popover-foreground))]',
        'hover:bg-[oklch(var(--ui-accent))]',
        'hover:text-[oklch(var(--ui-accent-foreground))]',
        'data-[active=true]:bg-[oklch(var(--ui-accent))]',
        'data-[active=true]:text-[oklch(var(--ui-accent-foreground))]',
        'disabled:pointer-events-none',
        'disabled:opacity-50',
        'aria-disabled:pointer-events-none',
        'aria-disabled:opacity-50',
    ]);

    // ── Determine tag ────────────────────────────────────────────────
    $tag = $href ? 'a' : $as;
@endphp

<{{ $tag }}
    @if($tag === 'a' && $href) href="{{ $isDisabled ? null : $href }}" @endif
    @if($tag === 'button') type="button" @endif
    @if($isDisabled)
        @if($tag === 'button') disabled @endif
        aria-disabled="true"
        data-disabled
    @endif
    {{ $attributes->class([$baseClasses]) }}
    role="option"
    data-ui-command-item
    data-value="{{ $value }}"
    data-active="false"
>
    {{-- Item content --}}
    <span class="flex items-center gap-2 flex-1 min-w-0 truncate">
        {{ $slot }}
    </span>

    {{-- Shortcut hint --}}
    @if($shortcut)
        <span
            class="ml-auto pl-4 text-xs tracking-widest text-[oklch(var(--ui-muted-foreground))] shrink-0"
            aria-hidden="true"
        >
            {{ $shortcut }}
        </span>
    @endif
</{{ $tag }}>

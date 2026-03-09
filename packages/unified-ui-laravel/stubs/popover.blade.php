@props([
    'position' => 'bottom',
    'align' => 'center',
    'width' => 'md',
    'title' => null,
    'closable' => false,
    'triggerOn' => 'click',
    'offset' => 8,
    'closeOnOutside' => true,
    'closeOnEscape' => true,
])

@php
    // ── Width classes ─────────────────────────────────────────────────
    $widthClasses = match ($width) {
        'sm' => 'w-56',
        'md' => 'w-72',
        'lg' => 'w-96',
        'xl' => 'w-[28rem]',
        'full' => 'w-full',
        'auto' => 'w-auto',
        default => 'w-72',
    };

    // ── Position / alignment classes ─────────────────────────────────
    $positionClasses = match ($position) {
        'top' => match ($align) {
            'start' => 'bottom-full left-0 mb-' . ($offset / 4),
            'end' => 'bottom-full right-0 mb-' . ($offset / 4),
            default => 'bottom-full left-1/2 -translate-x-1/2 mb-' . ($offset / 4),
        },
        'left' => match ($align) {
            'start' => 'right-full top-0 mr-' . ($offset / 4),
            'end' => 'right-full bottom-0 mr-' . ($offset / 4),
            default => 'right-full top-1/2 -translate-y-1/2 mr-' . ($offset / 4),
        },
        'right' => match ($align) {
            'start' => 'left-full top-0 ml-' . ($offset / 4),
            'end' => 'left-full bottom-0 ml-' . ($offset / 4),
            default => 'left-full top-1/2 -translate-y-1/2 ml-' . ($offset / 4),
        },
        default => match ($align) {
            'start' => 'top-full left-0 mt-' . ($offset / 4),
            'end' => 'top-full right-0 mt-' . ($offset / 4),
            default => 'top-full left-1/2 -translate-x-1/2 mt-' . ($offset / 4),
        },
    };

    // ── Panel base classes ───────────────────────────────────────────
    $panelClasses = implode(' ', [
        'absolute',
        'z-[var(--ui-z-popover)]',
        $widthClasses,
        $positionClasses,
        'rounded-[var(--ui-radius-lg)]',
        'border',
        'border-[oklch(var(--ui-border))]',
        'bg-[oklch(var(--ui-popover))]',
        'text-[oklch(var(--ui-popover-foreground))]',
        'shadow-[var(--ui-shadow-md)]',
        'outline-none',
    ]);

    // ── Transition origin ────────────────────────────────────────────
    $originClass = match ($position) {
        'top' => 'origin-bottom',
        'left' => 'origin-right',
        'right' => 'origin-left',
        default => 'origin-top',
    };
@endphp

<div
    x-data="{
        open: false,
        toggle() { this.open = !this.open },
        show() { this.open = true },
        hide() { this.open = false },
    }"
    @if($closeOnOutside)
        x-on:click.outside="hide()"
    @endif
    @if($closeOnEscape)
        x-on:keydown.escape.window="hide()"
    @endif
    {{ $attributes->class(['relative inline-flex']) }}
    data-ui-popover
>
    {{-- Trigger --}}
    <div
        @if($triggerOn === 'hover')
            x-on:mouseenter="show()"
            x-on:mouseleave="hide()"
            x-on:focus="show()"
            x-on:blur="hide()"
        @else
            x-on:click="toggle()"
        @endif
        aria-haspopup="dialog"
        x-bind:aria-expanded="open.toString()"
    >
        {{ $trigger }}
    </div>

    {{-- Popover panel --}}
    <div
        x-show="open"
        x-cloak
        x-transition:enter="transition ease-[var(--ui-ease-out)] duration-[var(--ui-duration-normal)] {{ $originClass }}"
        x-transition:enter-start="opacity-0 scale-95"
        x-transition:enter-end="opacity-100 scale-100"
        x-transition:leave="transition ease-[var(--ui-ease-in)] duration-[var(--ui-duration-fast)] {{ $originClass }}"
        x-transition:leave-start="opacity-100 scale-100"
        x-transition:leave-end="opacity-0 scale-95"
        class="{{ $panelClasses }}"
        role="dialog"
        aria-modal="false"
        @if($triggerOn === 'hover')
            x-on:mouseenter="show()"
            x-on:mouseleave="hide()"
        @endif
    >
        {{-- Header (title + close button) --}}
        @if($title || $closable)
            <div class="flex items-center justify-between gap-2 px-4 pt-3 {{ $title ? 'pb-1' : 'pb-0' }}">
                @if($title)
                    <p class="text-sm font-semibold leading-none text-[oklch(var(--ui-popover-foreground))]">
                        {{ $title }}
                    </p>
                @else
                    <span></span>
                @endif

                @if($closable)
                    <button
                        type="button"
                        x-on:click="hide()"
                        class="
                            inline-flex items-center justify-center
                            h-5 w-5
                            shrink-0
                            rounded-[var(--ui-radius-sm)]
                            text-[oklch(var(--ui-muted-foreground))]
                            hover:text-[oklch(var(--ui-foreground))]
                            hover:bg-[oklch(var(--ui-accent))]
                            transition-colors
                            duration-[var(--ui-duration-fast)]
                            ease-[var(--ui-ease-default)]
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-[oklch(var(--ui-ring))]
                        "
                        aria-label="Close"
                    >
                        <svg
                            class="h-3.5 w-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                @endif
            </div>
        @endif

        {{-- Content --}}
        <div class="px-4 py-3 text-sm text-[oklch(var(--ui-popover-foreground))]">
            {{ $slot }}
        </div>
    </div>
</div>

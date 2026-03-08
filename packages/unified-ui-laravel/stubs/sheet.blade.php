{{--
    Unified UI — Sheet Component
    https://unified-ui.space

    A slide-over panel that emerges from the edge of the screen,
    built with Alpine.js for interactive behavior and Unified UI
    design tokens for consistent styling.

    Usage:
        {{-- Basic sheet (right side) --}}
        <x-ui-sheet>
            <x-slot:trigger>
                <x-ui-button>Open Sheet</x-ui-button>
            </x-slot:trigger>
            <p>Sheet content goes here.</p>
        </x-ui-sheet>

        {{-- Left side --}}
        <x-ui-sheet side="left">
            <x-slot:trigger>
                <x-ui-button variant="outline">Open Left</x-ui-button>
            </x-slot:trigger>
            Navigation content…
        </x-ui-sheet>

        {{-- Top / bottom --}}
        <x-ui-sheet side="top">
            <x-slot:trigger>Open Top</x-slot:trigger>
            Top panel content.
        </x-ui-sheet>

        <x-ui-sheet side="bottom">
            <x-slot:trigger>Open Bottom</x-slot:trigger>
            Bottom panel content.
        </x-ui-sheet>

        {{-- With title and description --}}
        <x-ui-sheet title="Edit Profile" description="Make changes to your profile here.">
            <x-slot:trigger>
                <x-ui-button>Edit Profile</x-ui-button>
            </x-slot:trigger>
            <div class="space-y-4">
                <x-ui-input label="Name" name="name" />
                <x-ui-input label="Email" name="email" />
            </div>
            <x-slot:footer>
                <x-ui-button variant="primary">Save changes</x-ui-button>
            </x-slot:footer>
        </x-ui-sheet>

        {{-- Custom width/height --}}
        <x-ui-sheet side="right" size="lg">
            <x-slot:trigger>Wide Sheet</x-slot:trigger>
            Wide content.
        </x-ui-sheet>

        {{-- Non-dismissible (no close on overlay click) --}}
        <x-ui-sheet :dismissible="false">
            <x-slot:trigger>Persistent</x-slot:trigger>
            Must use the close button.
        </x-ui-sheet>

        {{-- Programmatic open via Alpine --}}
        <div x-data="{ sheetOpen: false }">
            <x-ui-button x-on:click="sheetOpen = true">Open</x-ui-button>
            <x-ui-sheet x-model="sheetOpen">
                Controlled externally.
            </x-ui-sheet>
        </div>

    Props:
        side        — right|left|top|bottom (default: right)
        size        — sm|md|lg|xl|full (default: md)
        title       — optional header title text
        description — optional description text below the title
        dismissible — boolean, close on overlay click and Escape key (default: true)
        showClose   — boolean, show the X close button (default: true)
        overlay     — boolean, show the backdrop overlay (default: true)
--}}

@props([
    'side' => 'right',
    'size' => 'md',
    'title' => null,
    'description' => null,
    'dismissible' => true,
    'showClose' => true,
    'overlay' => true,
])

@php
    $isHorizontal = in_array($side, ['left', 'right']);
    $isVertical = in_array($side, ['top', 'bottom']);

    // ── Size classes (width for left/right, height for top/bottom) ────
    $sizeClasses = match (true) {
        $isHorizontal && $size === 'sm' => 'w-72',
        $isHorizontal && $size === 'md' => 'w-80 sm:w-96',
        $isHorizontal && $size === 'lg' => 'w-[28rem] sm:w-[32rem]',
        $isHorizontal && $size === 'xl' => 'w-[36rem] sm:w-[42rem]',
        $isHorizontal && $size === 'full' => 'w-screen',
        $isVertical && $size === 'sm' => 'h-48',
        $isVertical && $size === 'md' => 'h-64 sm:h-80',
        $isVertical && $size === 'lg' => 'h-96',
        $isVertical && $size === 'xl' => 'h-[32rem]',
        $isVertical && $size === 'full' => 'h-screen',
        default => $isHorizontal ? 'w-80 sm:w-96' : 'h-64 sm:h-80',
    };

    // ── Position classes ─────────────────────────────────────────────
    $positionClasses = match ($side) {
        'left' => 'inset-y-0 left-0',
        'right' => 'inset-y-0 right-0',
        'top' => 'inset-x-0 top-0',
        'bottom' => 'inset-x-0 bottom-0',
        default => 'inset-y-0 right-0',
    };

    // ── Full-extent classes (full height for horizontal, full width for vertical) ──
    $extentClasses = match (true) {
        $isHorizontal => 'h-full',
        $isVertical => 'w-full',
        default => 'h-full',
    };

    // ── Slide transform for enter/leave animation ────────────────────
    $translateStart = match ($side) {
        'left' => '-translate-x-full',
        'right' => 'translate-x-full',
        'top' => '-translate-y-full',
        'bottom' => 'translate-y-full',
        default => 'translate-x-full',
    };

    $translateEnd = match (true) {
        $isHorizontal => 'translate-x-0',
        $isVertical => 'translate-y-0',
        default => 'translate-x-0',
    };

    // ── Border classes ───────────────────────────────────────────────
    $borderClasses = match ($side) {
        'left' => 'border-r border-[oklch(var(--ui-border))]',
        'right' => 'border-l border-[oklch(var(--ui-border))]',
        'top' => 'border-b border-[oklch(var(--ui-border))]',
        'bottom' => 'border-t border-[oklch(var(--ui-border))]',
        default => 'border-l border-[oklch(var(--ui-border))]',
    };

    // ── Panel classes ────────────────────────────────────────────────
    $panelClasses = implode(' ', [
        'fixed',
        $positionClasses,
        $extentClasses,
        $sizeClasses,
        $borderClasses,
        'bg-[oklch(var(--ui-background))]',
        'shadow-xl',
        'flex flex-col',
        'z-[var(--ui-z-modal)]',
        'focus:outline-none',
    ]);
@endphp

<div
    x-data="{ open: false }"
    x-modelable="open"
    {{ $attributes->except(['class']) }}
    data-ui-sheet
    data-ui-sheet-side="{{ $side }}"
>
    {{-- Trigger --}}
    @if(isset($trigger))
        <div x-on:click="open = true" class="inline-flex cursor-pointer">
            {{ $trigger }}
        </div>
    @endif

    {{-- Sheet + Overlay (teleported to body for proper stacking) --}}
    <template x-teleport="body">
        <div
            x-show="open"
            x-trap.noscroll.inert="open"
            @if($dismissible)
                x-on:keydown.escape.window="open = false"
            @endif
            class="relative z-[var(--ui-z-modal)]"
            role="dialog"
            aria-modal="true"
            @if($title) aria-label="{{ $title }}" @endif
            x-cloak
        >
            {{-- Backdrop overlay --}}
            @if($overlay)
                <div
                    x-show="open"
                    x-transition:enter="transition ease-out duration-[var(--ui-duration-normal)]"
                    x-transition:enter-start="opacity-0"
                    x-transition:enter-end="opacity-100"
                    x-transition:leave="transition ease-in duration-[var(--ui-duration-fast)]"
                    x-transition:leave-start="opacity-100"
                    x-transition:leave-end="opacity-0"
                    @if($dismissible) x-on:click="open = false" @endif
                    class="fixed inset-0 ui-backdrop z-[var(--ui-z-overlay)]"
                    aria-hidden="true"
                ></div>
            @endif

            {{-- Panel --}}
            <div
                x-show="open"
                x-transition:enter="transition ease-out duration-[var(--ui-duration-slow)]"
                x-transition:enter-start="{{ $translateStart }}"
                x-transition:enter-end="{{ $translateEnd }}"
                x-transition:leave="transition ease-in duration-[var(--ui-duration-normal)]"
                x-transition:leave-start="{{ $translateEnd }}"
                x-transition:leave-end="{{ $translateStart }}"
                class="{{ $panelClasses }}"
                tabindex="-1"
            >
                {{-- Header --}}
                @if($title || $showClose)
                    <div class="flex items-start justify-between gap-4 shrink-0 px-6 py-4 border-b border-[oklch(var(--ui-border))]">
                        <div class="flex flex-col gap-1">
                            @if($title)
                                <h2 class="text-lg font-semibold leading-tight text-[oklch(var(--ui-foreground))]">
                                    {{ $title }}
                                </h2>
                            @endif
                            @if($description)
                                <p class="text-sm text-[oklch(var(--ui-muted-foreground))] leading-normal">
                                    {{ $description }}
                                </p>
                            @endif
                        </div>

                        @if($showClose)
                            <button
                                type="button"
                                x-on:click="open = false"
                                class="
                                    shrink-0 inline-flex items-center justify-center
                                    h-8 w-8
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
                                    focus-visible:ring-offset-2
                                    focus-visible:ring-offset-[oklch(var(--ui-background))]
                                "
                                aria-label="Close"
                            >
                                <svg
                                    class="h-4 w-4"
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

                {{-- Body --}}
                <div class="flex-

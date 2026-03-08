{{--
    Unified UI — Modal Component
    https://unified-ui.space

    An accessible modal dialog powered by Alpine.js with backdrop overlay,
    focus trapping, keyboard dismissal, and smooth enter/leave transitions.

    Usage:
        {{-- Basic modal with trigger --}}
        <div x-data="{ open: false }">
            <x-ui-button x-on:click="open = true">Open Modal</x-ui-button>
            <x-ui-modal>
                <x-slot:title>Modal Title</x-slot:title>
                <p>Modal body content goes here.</p>
            </x-ui-modal>
        </div>

        {{-- With custom footer --}}
        <div x-data="{ open: false }">
            <x-ui-button x-on:click="open = true">Confirm</x-ui-button>
            <x-ui-modal>
                <x-slot:title>Are you sure?</x-slot:title>
                <x-slot:description>This action cannot be undone.</x-slot:description>
                <p>Your data will be permanently deleted.</p>
                <x-slot:footer>
                    <x-ui-button variant="outline" x-on:click="open = false">Cancel</x-ui-button>
                    <x-ui-button variant="destructive">Delete</x-ui-button>
                </x-slot:footer>
            </x-ui-modal>
        </div>

        {{-- Sizes --}}
        <x-ui-modal size="sm">…</x-ui-modal>
        <x-ui-modal size="md">…</x-ui-modal>
        <x-ui-modal size="lg">…</x-ui-modal>
        <x-ui-modal size="xl">…</x-ui-modal>
        <x-ui-modal size="full">…</x-ui-modal>

        {{-- Non-dismissible (no close on backdrop click or Escape) --}}
        <x-ui-modal :dismissible="false">…</x-ui-modal>

        {{-- Without close button --}}
        <x-ui-modal :show-close="false">…</x-ui-modal>

        {{-- Custom x-model binding name --}}
        <div x-data="{ showDialog: false }">
            <x-ui-modal model="showDialog">…</x-ui-modal>
        </div>

    Props:
        model       — Alpine.js variable name to bind open/close state (default: "open")
        size        — sm|md|lg|xl|full (default: md)
        dismissible — boolean, allow closing via backdrop click and Escape key (default: true)
        showClose   — boolean, show the X close button in the header (default: true)
        title       — optional slot for the modal title
        description — optional slot for a subtitle / description
        footer      — optional slot for the modal footer (action buttons)
        position    — center|top (default: center)
--}}

@props([
    'model' => 'open',
    'size' => 'md',
    'dismissible' => true,
    'showClose' => true,
    'position' => 'center',
])

@php
    // ── Size classes ─────────────────────────────────────────────────
    $sizeClasses = match ($size) {
        'sm' => 'max-w-sm',
        'md' => 'max-w-lg',
        'lg' => 'max-w-2xl',
        'xl' => 'max-w-4xl',
        'full' => 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
        default => 'max-w-lg',
    };

    // ── Position classes ─────────────────────────────────────────────
    $positionClasses = match ($position) {
        'top' => 'items-start pt-16',
        default => 'items-center',
    };

    // ── Panel base classes ───────────────────────────────────────────
    $panelClasses = implode(' ', [
        'relative',
        'w-full',
        $sizeClasses,
        'bg-[oklch(var(--ui-background))]',
        'border',
        'border-[oklch(var(--ui-border))]',
        'rounded-[var(--ui-radius-lg)]',
        'shadow-xl',
        'overflow-hidden',
    ]);

    // ── Backdrop classes ─────────────────────────────────────────────
    $backdropClasses = implode(' ', [
        'fixed inset-0 z-[var(--ui-z-overlay)]',
        'bg-[oklch(var(--ui-background)/0.6)]',
        'backdrop-blur-sm',
    ]);

    // ── Wrapper classes ──────────────────────────────────────────────
    $wrapperClasses = implode(' ', [
        'fixed inset-0 z-[var(--ui-z-modal)]',
        'flex justify-center',
        'overflow-y-auto',
        'p-4',
        $positionClasses,
    ]);
@endphp

<template x-teleport="body">
    {{-- Backdrop --}}
    <div
        x-show="{{ $model }}"
        x-transition:enter="transition ease-out duration-[var(--ui-duration-normal)]"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        x-transition:leave="transition ease-in duration-[var(--ui-duration-fast)]"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
        class="{{ $backdropClasses }}"
        aria-hidden="true"
        @if($dismissible)
            x-on:click="{{ $model }} = false"
        @endif
        x-cloak
    ></div>

    {{-- Modal wrapper --}}
    <div
        x-show="{{ $model }}"
        x-on:keydown.escape.window="{{ $dismissible ? "{$model} = false" : '' }}"
        class="{{ $wrapperClasses }}"
        x-cloak
    >
        {{-- Modal panel --}}
        <div
            x-show="{{ $model }}"
            x-transition:enter="transition ease-out duration-[var(--ui-duration-normal)]"
            x-transition:enter-start="opacity-0 scale-95 translate-y-2"
            x-transition:enter-end="opacity-100 scale-100 translate-y-0"
            x-transition:leave="transition ease-in duration-[var(--ui-duration-fast)]"
            x-transition:leave-start="opacity-100 scale-100 translate-y-0"
            x-transition:leave-end="opacity-0 scale-95 translate-y-2"
            x-trap.inert.noscroll="{{ $model }}"
            {{ $attributes->class([$panelClasses]) }}
            role="dialog"
            aria-modal="true"
            @if(isset($title))
                aria-labelledby="modal-title-{{ $model }}"
            @endif
            @if(isset($description))
                aria-describedby="modal-description-{{ $model }}"
            @endif
            @if($dismissible)
                x-on:click.stop
            @endif
            data-ui-modal
            data-ui-modal-size="{{ $size }}"
        >
            {{-- Header --}}
            @if(isset($title) || $showClose)
                <div class="flex items-start justify-between gap-4 px-6 pt-6 pb-0">
                    <div class="flex flex-col gap-1.5">
                        @if(isset($title))
                            <h2
                                id="modal-title-{{ $model }}"
                                class="text-lg font-semibold leading-tight text-[oklch(var(--ui-foreground))]"
                            >
                                {{ $title }}
                            </h2>
                        @endif

                        @if(isset($description))
                            <p
                                id="modal-description-{{ $model }}"
                                class="text-sm text-[oklch(var(--ui-muted-foreground))] leading-normal"
                            >
                                {{ $description }}
                            </p>
                        @endif
                    </div>

                    {{-- Close button --}}
                    @if($showClose)
                        <button
                            type="button"
                            x-on:click="{{ $model }} = false"
                            class="
                                shrink-0 inline-flex items-center justify-center
                                h-8 w-8 rounded-[var(--ui-radius-sm)]
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
            <div class="px-6 py-6">
                {{ $slot }}
            </div>

            {{-- Footer --}}
            @if(isset($footer))
                <div class="flex items-center justify-end gap-3 px-6 pb-6 pt-0">
                    {{ $footer }}
                </div>
            @endif
        </div>
    </div>
</template>

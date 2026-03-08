{{--
    Unified UI — Alert Dialog Component
    https://unified-ui.space

    A modal confirmation dialog that interrupts the user with important
    content and expects a response. Built with Alpine.js for accessible
    keyboard navigation, focus trapping, and backdrop dismiss behavior.

    Unlike a regular modal, an alert dialog is specifically for confirmations
    and destructive actions — it requires explicit user acknowledgment.

    Usage:
        {{-- Basic alert dialog --}}
        <x-ui-alert-dialog>
            <x-slot:trigger>
                <x-ui-button variant="destructive">Delete Account</x-ui-button>
            </x-slot:trigger>

            <x-slot:title>Are you absolutely sure?</x-slot:title>

            <x-slot:description>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
            </x-slot:description>

            <x-slot:cancel>
                <x-ui-button variant="outline">Cancel</x-ui-button>
            </x-slot:cancel>

            <x-slot:action>
                <x-ui-button variant="destructive">Yes, delete account</x-ui-button>
            </x-slot:action>
        </x-ui-alert-dialog>

        {{-- Controlled via Alpine from outside --}}
        <div x-data="{ showConfirm: false }">
            <x-ui-button x-on:click="showConfirm = true">Remove</x-ui-button>

            <x-ui-alert-dialog :open="false" x-model="showConfirm">
                <x-slot:title>Remove item?</x-slot:title>
                <x-slot:description>This item will be removed from your list.</x-slot:description>
                <x-slot:cancel>
                    <x-ui-button variant="outline" x-on:click="showConfirm = false">Cancel</x-ui-button>
                </x-slot:cancel>
                <x-slot:action>
                    <x-ui-button variant="destructive" x-on:click="showConfirm = false">Remove</x-ui-button>
                </x-slot:action>
            </x-ui-alert-dialog>
        </div>

        {{-- With icon --}}
        <x-ui-alert-dialog variant="destructive">
            <x-slot:trigger>
                <x-ui-button variant="outline">Revoke Access</x-ui-button>
            </x-slot:trigger>
            <x-slot:title>Revoke access?</x-slot:title>
            <x-slot:description>The user will immediately lose access to all resources.</x-slot:description>
            <x-slot:cancel>
                <x-ui-button variant="outline">Keep Access</x-ui-button>
            </x-slot:cancel>
            <x-slot:action>
                <x-ui-button variant="destructive">Revoke</x-ui-button>
            </x-slot:action>
        </x-ui-alert-dialog>

    Props:
        open          — boolean, initial open state when self-managed (default: false)
        variant       — default|destructive (default: default)
        closeOnEscape — boolean, allow closing with Escape key (default: true)
        maxWidth      — sm|md|lg (default: md)
--}}

@props([
    'open' => false,
    'variant' => 'default',
    'closeOnEscape' => true,
    'maxWidth' => 'md',
])

@php
    // ── Icon color based on variant ──────────────────────────────────
    $iconColor = match ($variant) {
        'destructive' => '--ui-destructive',
        default => '--ui-warning',
    };

    // ── Max width classes ────────────────────────────────────────────
    $maxWidthClasses = match ($maxWidth) {
        'sm' => 'max-w-sm',
        'md' => 'max-w-md',
        'lg' => 'max-w-lg',
        default => 'max-w-md',
    };

    // ── Panel classes ────────────────────────────────────────────────
    $panelClasses = implode(' ', [
        'relative',
        'w-full',
        $maxWidthClasses,
        'bg-[oklch(var(--ui-background))]',
        'border',
        'border-[oklch(var(--ui-border))]',
        'rounded-[var(--ui-radius-lg)]',
        'shadow-lg',
        'p-6',
        'mx-4',
    ]);

    // ── Backdrop classes ─────────────────────────────────────────────
    $backdropClasses = implode(' ', [
        'fixed inset-0',
        'z-[var(--ui-z-modal)]',
        'flex items-center justify-center',
        'bg-[oklch(var(--ui-background)/0.6)]',
        'backdrop-blur-sm',
    ]);
@endphp

<div
    x-data="{ open: @js((bool) $open) }"
    x-modelable="open"
    {{ $attributes }}
    data-ui-alert-dialog
>
    {{-- Trigger slot --}}
    @if(isset($trigger))
        <div x-on:click="open = true">
            {{ $trigger }}
        </div>
    @endif

    {{-- Dialog overlay + panel --}}
    <template x-teleport="body">
        <div
            x-show="open"
            x-trap.inert.noscroll="open"
            @if($closeOnEscape)
                x-on:keydown.escape.window="open = false"
            @endif
            class="{{ $backdropClasses }}"
            role="alertdialog"
            aria-modal="true"
            @if(isset($title))
                aria-labelledby="alert-dialog-title"
            @endif
            @if(isset($description))
                aria-describedby="alert-dialog-description"
            @endif
            {{-- Backdrop transitions --}}
            x-transition:enter="transition ease-out duration-[var(--ui-duration-normal)]"
            x-transition:enter-start="opacity-0"
            x-transition:enter-end="opacity-100"
            x-transition:leave="transition ease-in duration-[var(--ui-duration-fast)]"
            x-transition:leave-start="opacity-100"
            x-transition:leave-end="opacity-0"
            x-cloak
        >
            {{-- Dialog panel --}}
            <div
                class="{{ $panelClasses }}"
                x-on:click.stop
                x-show="open"
                x-transition:enter="transition ease-out duration-[var(--ui-duration-normal)]"
                x-transition:enter-start="opacity-0 scale-95 translate-y-2"
                x-transition:enter-end="opacity-100 scale-100 translate-y-0"
                x-transition:leave="transition ease-in duration-[var(--ui-duration-fast)]"
                x-transition:leave-start="opacity-100 scale-100 translate-y-0"
                x-transition:leave-end="opacity-0 scale-95 translate-y-2"
            >
                <div class="flex gap-4">
                    {{-- Icon --}}
                    <div class="shrink-0" aria-hidden="true">
                        @if($variant === 'destructive')
                            {{-- Destructive / danger icon --}}
                            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[oklch(var({{ $iconColor }})/0.1)]">
                                <svg
                                    class="h-5 w-5 text-[oklch(var({{ $iconColor }}))]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                    <line x1="12" y1="9" x2="12" y2="13" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                            </div>
                        @else
                            {{-- Default / warning icon --}}
                            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[oklch(var({{ $iconColor }})/0.1)]">
                                <svg
                                    class="h-5 w-5 text-[oklch(var({{ $iconColor }}))]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                    <line x1="12" y1="9" x2="12" y2="13" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                            </div>
                        @endif
                    </div>

                    {{-- Content --}}
                    <div class="flex-1 space-y-2">
                        @if(isset($title))
                            <h3
                                id="alert-dialog-title"
                                class="text-base font-semibold leading-tight text-[oklch(var(--ui-foreground))]"
                            >
                                {{ $title }}
                            </h3>
                        @endif

                        @if(isset($description))
                            <p
                                id="alert-dialog-description"
                                class="text-sm text-[oklch(var(--ui-muted-foreground))] leading-relaxed"
                            >
                                {{ $description }}
                            </p>
                        @endif

                        {{-- Default slot for additional content --}}
                        @if($slot->isNotEmpty())
                            <div class="text-sm text-[oklch(var(--ui-muted-foreground))]">
                                {{ $slot }}
                            </div>
                        @endif
                    </div>
                </div>

                {{-- Action buttons --}}
                @if(isset($cancel) || isset($action))
                    <div class="flex items-center justify-end gap-3 mt-6">
                        @if(isset($cancel))
                            {{ $cancel }}
                        @endif
                        @if(isset($action))
                            {{ $action }}
                        @endif
                    </div>
                @endif
            </div>
        </div>
    </template>
</div>

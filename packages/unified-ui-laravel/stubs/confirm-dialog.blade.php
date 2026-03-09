@props([
    'title'        => 'Are you sure?',
    'description'  => 'This action cannot be undone.',
    'confirmLabel' => 'Confirm',
    'cancelLabel'  => 'Cancel',
    'variant'      => 'default',
    'loading'      => false,
    'dismissible'  => true,
    'overlay'      => true,
])

@php
    // ── Variant classes for confirm button ───────────────────────────
    $confirmClasses = match ($variant) {
        'danger' => implode(' ', [
            'inline-flex items-center justify-center gap-2',
            'h-9 px-4',
            'rounded-[var(--ui-radius-md)]',
            'text-sm font-medium',
            'bg-[oklch(var(--ui-destructive))]',
            'text-[oklch(var(--ui-destructive-foreground))]',
            'hover:opacity-90',
            'active:opacity-80',
            'disabled:pointer-events-none disabled:opacity-50',
            'transition-opacity duration-[var(--ui-duration-fast)]',
            'focus-visible:outline-none',
            'focus-visible:ring-2',
            'focus-visible:ring-[oklch(var(--ui-ring))]',
            'focus-visible:ring-offset-2',
            'focus-visible:ring-offset-[oklch(var(--ui-background))]',
        ]),
        default => implode(' ', [
            'inline-flex items-center justify-center gap-2',
            'h-9 px-4',
            'rounded-[var(--ui-radius-md)]',
            'text-sm font-medium',
            'bg-[oklch(var(--ui-primary))]',
            'text-[oklch(var(--ui-primary-foreground))]',
            'hover:opacity-90',
            'active:opacity-80',
            'disabled:pointer-events-none disabled:opacity-50',
            'transition-opacity duration-[var(--ui-duration-fast)]',
            'focus-visible:outline-none',
            'focus-visible:ring-2',
            'focus-visible:ring-[oklch(var(--ui-ring))]',
            'focus-visible:ring-offset-2',
            'focus-visible:ring-offset-[oklch(var(--ui-background))]',
        ]),
    };

    // ── Cancel button classes ────────────────────────────────────────
    $cancelClasses = implode(' ', [
        'inline-flex items-center justify-center gap-2',
        'h-9 px-4',
        'rounded-[var(--ui-radius-md)]',
        'text-sm font-medium',
        'bg-transparent',
        'border border-[oklch(var(--ui-border))]',
        'text-[oklch(var(--ui-foreground))]',
        'hover:bg-[oklch(var(--ui-accent))]',
        'disabled:pointer-events-none disabled:opacity-50',
        'transition-colors duration-[var(--ui-duration-fast)]',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-[oklch(var(--ui-ring))]',
        'focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[oklch(var(--ui-background))]',
    ]);
@endphp

<div
    x-data="{ open: false }"
    x-modelable="open"
    {{ $attributes->except(['class']) }}
    data-ui-confirm-dialog
    data-ui-confirm-dialog-variant="{{ $variant }}"
>
    {{-- Trigger --}}
    @if(isset($trigger))
        <div x-on:click="open = true" class="inline-flex cursor-pointer">
            {{ $trigger }}
        </div>
    @endif

    {{-- Dialog teleported to body --}}
    <template x-teleport="body">
        <div
            x-show="open"
            x-trap.noscroll.inert="open"
            @if($dismissible)
                x-on:keydown.escape.window="open = false"
            @endif
            class="relative z-(--ui-z-modal)"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
            x-cloak
        >
            {{-- Backdrop --}}
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
                    class="fixed inset-0 ui-backdrop z-(--ui-z-overlay)"
                    aria-hidden="true"
                ></div>
            @endif

            {{-- Centering wrapper --}}
            <div class="fixed inset-0 z-(--ui-z-modal) flex items-center justify-center p-4">
                {{-- Panel --}}
                <div
                    x-show="open"
                    x-transition:enter="transition ease-[var(--ui-ease-out)] duration-[var(--ui-duration-normal)]"
                    x-transition:enter-start="opacity-0 scale-95 translate-y-1"
                    x-transition:enter-end="opacity-100 scale-100 translate-y-0"
                    x-transition:leave="transition ease-[var(--ui-ease-in)] duration-[var(--ui-duration-fast)]"
                    x-transition:leave-start="opacity-100 scale-100 translate-y-0"
                    x-transition:leave-end="opacity-0 scale-95 translate-y-1"
                    x-on:click.stop
                    class="relative w-full max-w-md rounded-(--ui-radius-lg) border border-[oklch(var(--ui-border))] bg-[oklch(var(--ui-background))] shadow-xl focus:outline-none"
                    tabindex="-1"
                >
                    {{-- Body --}}
                    <div class="px-6 pt-6 pb-4">
                        {{-- Icon slot (optional) --}}
                        @if(isset($icon))
                            <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-full
                                {{ $variant === 'danger'
                                    ? 'bg-[oklch(var(--ui-destructive)/0.1)] text-[oklch(var(--ui-destructive))]'
                                    : 'bg-[oklch(var(--ui-primary)/0.1)] text-[oklch(var(--ui-primary))]'
                                }}">
                                {{ $icon }}
                            </div>
                        @endif

                        {{-- Title --}}
                        <h2
                            id="confirm-dialog-title"
                            class="text-base font-semibold leading-6 text-[oklch(var(--ui-foreground))]"
                        >
                            {{ $title }}
                        </h2>

                        {{-- Description --}}
                        @if($description)
                            <p
                                id="confirm-dialog-description"
                                class="mt-1.5 text-sm leading-5 text-[oklch(var(--ui-muted-foreground))]"
                            >
                                {{ $description }}
                            </p>
                        @endif

                        {{-- Extra content slot --}}
                        @if(isset($content))
                            <div class="mt-4 text-sm text-[oklch(var(--ui-foreground))]">
                                {{ $content }}
                            </div>
                        @endif
                    </div>

                    {{-- Footer --}}
                    <div class="flex items-center justify-end gap-3 border-t border-[oklch(var(--ui-border))] px-6 py-4">
                        {{-- Cancel --}}
                        <button
                            type="button"
                            x-on:click="open = false"
                            :disabled="{{ $loading ? 'true' : 'false' }}"
                            class="{{ $cancelClasses }}"
                        >
                            {{ $cancelLabel }}
                        </button>

                        {{-- Confirm --}}
                        <button
                            type="button"
                            x-on:click="$dispatch('confirm-dialog:confirm'); open = false"
                            :disabled="{{ $loading ? 'true' : 'false' }}"
                            class="{{ $confirmClasses }}"
                        >
                            {{-- Spinner shown while loading --}}
                            @if($loading)
                                <svg
                                    class="h-4 w-4 animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <circle
                                        cx="12" cy="12" r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                        opacity="0.2"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        opacity="0.85"
                                    />
                                </svg>
                            @endif
                            {{ $confirmLabel }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </template>
</div>

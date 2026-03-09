@props([
    'variant' => 'default',
    'style' => 'filled',
    'size' => 'md',
    'dismissible' => false,
    'sticky' => false,
    'centered' => false,
    'icon' => false,
    'rounded' => false,
])

@php
    // ── Variant color mappings ───────────────────────────────────────
    $colorMap = match ($variant) {
        'info' => [
            'bg'     => '--ui-info',
            'fg'     => '--ui-info-foreground',
            'border' => '--ui-info',
        ],
        'success' => [
            'bg'     => '--ui-success',
            'fg'     => '--ui-success-foreground',
            'border' => '--ui-success',
        ],
        'warning' => [
            'bg'     => '--ui-warning',
            'fg'     => '--ui-warning-foreground',
            'border' => '--ui-warning',
        ],
        'destructive' => [
            'bg'     => '--ui-destructive',
            'fg'     => '--ui-destructive-foreground',
            'border' => '--ui-destructive',
        ],
        default => [
            'bg'     => '--ui-primary',
            'fg'     => '--ui-primary-foreground',
            'border' => '--ui-primary',
        ],
    };

    // ── Style variant classes ────────────────────────────────────────
    $styleClasses = match ($style) {
        'filled' => implode(' ', [
            "bg-[oklch(var({$colorMap['bg']}))]",
            "text-[oklch(var({$colorMap['fg']}))]",
            'border-transparent',
        ]),
        'outline' => implode(' ', [
            'bg-transparent',
            "text-[oklch(var({$colorMap['bg']}))]",
            "border-[oklch(var({$colorMap['border']}))]",
        ]),
        'soft' => implode(' ', [
            "bg-[oklch(var({$colorMap['bg']})/0.1)]",
            "text-[oklch(var({$colorMap['bg']}))]",
            "border-[oklch(var({$colorMap['border']})/0.2)]",
        ]),
        default => implode(' ', [
            "bg-[oklch(var({$colorMap['bg']}))]",
            "text-[oklch(var({$colorMap['fg']}))]",
            'border-transparent',
        ]),
    };

    // ── Size classes ─────────────────────────────────────────────────
    $sizeClasses = match ($size) {
        'sm' => 'px-3 py-1.5 text-xs gap-2',
        'md' => 'px-4 py-2.5 text-sm gap-3',
        'lg' => 'px-6 py-3.5 text-base gap-4',
        default => 'px-4 py-2.5 text-sm gap-3',
    };

    // ── Close button sizing ──────────────────────────────────────────
    $closeSizeClasses = match ($size) {
        'sm' => 'h-5 w-5',
        'md' => 'h-6 w-6',
        'lg' => 'h-7 w-7',
        default => 'h-6 w-6',
    };

    $closeIconSizeClasses = match ($size) {
        'sm' => 'h-3 w-3',
        'md' => 'h-3.5 w-3.5',
        'lg' => 'h-4 w-4',
        default => 'h-3.5 w-3.5',
    };

    // ── Icon size classes ────────────────────────────────────────────
    $iconSizeClasses = match ($size) {
        'sm' => 'h-3.5 w-3.5',
        'md' => 'h-4 w-4',
        'lg' => 'h-5 w-5',
        default => 'h-4 w-4',
    };

    // ── Sticky classes ───────────────────────────────────────────────
    $stickyClasses = $sticky
        ? 'sticky top-0 z-[var(--ui-z-sticky,40)]'
        : '';

    // ── Rounded classes ──────────────────────────────────────────────
    $roundedClasses = $rounded
        ? 'rounded-[var(--ui-radius-lg)]'
        : '';

    // ── Centered classes ─────────────────────────────────────────────
    $justifyClasses = $centered ? 'justify-center' : 'justify-between';

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'relative',
        'flex',
        'items-center',
        $justifyClasses,
        'w-full',
        'border',
        'leading-normal',
        'transition-all',
        'duration-[var(--ui-duration-normal)]',
        'ease-[var(--ui-ease-default)]',
    ]);

    // ── Merge all classes ────────────────────────────────────────────
    $classes = trim(implode(' ', array_filter([
        $baseClasses,
        $styleClasses,
        $sizeClasses,
        $stickyClasses,
        $roundedClasses,
    ])));
@endphp

<div
    {{ $attributes->class([$classes]) }}
    role="status"
    @if($dismissible)
        x-data="{ visible: true }"
        x-show="visible"
        x-transition:leave="transition ease-in duration-[var(--ui-duration-fast)]"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
    @endif
    data-ui-banner
    data-ui-banner-variant="{{ $variant }}"
>
    {{-- Content wrapper --}}
    <div class="flex items-center gap-2 flex-1 min-w-0 {{ $centered ? 'justify-center text-center' : '' }}">
        {{-- Icon --}}
        @if(isset($iconSlot))
            <span class="shrink-0" aria-hidden="true">
                {{ $iconSlot }}
            </span>
        @elseif($icon)
            <span class="shrink-0" aria-hidden="true">
                @switch($variant)
                    @case('info')
                        <svg class="{{ $iconSizeClasses }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        @break

                    @case('success')
                        <svg class="{{ $iconSizeClasses }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        @break

                    @case('warning')
                        <svg class="{{ $iconSizeClasses }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        @break

                    @case('destructive')
                        <svg class="{{ $iconSizeClasses }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        @break

                    @default
                        <svg class="{{ $iconSizeClasses }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
                            <path d="M15 3v6h6" />
                        </svg>
                        @break
                @endswitch
            </span>
        @endif

        {{-- Text content --}}
        <span class="truncate">
            {{ $slot }}
        </span>
    </div>

    {{-- Right side: action + dismiss --}}
    <div class="flex items-center gap-2 shrink-0">
        {{-- Action slot --}}
        @if(isset($action))
            {{ $action }}
        @endif

        {{-- Dismiss button --}}
        @if($dismissible)
            <button
                type="button"
                x-on:click="visible = false"
                class="
                    inline-flex items-center justify-center
                    {{ $closeSizeClasses }}
                    shrink-0
                    rounded-[var(--ui-radius-sm)]
                    opacity-70
                    hover:opacity-100
                    transition-opacity
                    duration-[var(--ui-duration-fast)]
                    ease-[var(--ui-ease-default)]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-current
                    focus-visible:ring-offset-1
                "
                aria-label="Dismiss"
            >
                <svg
                    class="{{ $closeIconSizeClasses }}"
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
</div>

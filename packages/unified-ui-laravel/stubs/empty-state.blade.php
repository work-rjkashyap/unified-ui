@props([
    'title' => null,
    'description' => null,
    'size' => 'md',
    'variant' => 'default',
    'compact' => false,
])

@php
    // ── Size classes ─────────────────────────────────────────────────
    $iconSizeClasses = match ($size) {
        'sm' => 'h-8 w-8',
        'md' => 'h-12 w-12',
        'lg' => 'h-16 w-16',
        default => 'h-12 w-12',
    };

    $titleSizeClasses = match ($size) {
        'sm' => 'text-sm',
        'md' => 'text-base',
        'lg' => 'text-lg',
        default => 'text-base',
    };

    $descriptionSizeClasses = match ($size) {
        'sm' => 'text-xs',
        'md' => 'text-sm',
        'lg' => 'text-sm',
        default => 'text-sm',
    };

    $gapClasses = match ($size) {
        'sm' => 'gap-2',
        'md' => 'gap-3',
        'lg' => 'gap-4',
        default => 'gap-3',
    };

    // ── Padding classes ──────────────────────────────────────────────
    $paddingClasses = $compact
        ? match ($size) {
            'sm' => 'py-4 px-4',
            'md' => 'py-6 px-6',
            'lg' => 'py-8 px-8',
            default => 'py-6 px-6',
        }
        : match ($size) {
            'sm' => 'py-8 px-4',
            'md' => 'py-12 px-6',
            'lg' => 'py-16 px-8',
            default => 'py-12 px-6',
        };

    // ── Variant classes ──────────────────────────────────────────────
    $variantClasses = match ($variant) {
        'bordered' => implode(' ', [
            'border',
            'border-[oklch(var(--ui-border))]',
            'rounded-[var(--ui-radius-lg)]',
            'bg-[oklch(var(--ui-card))]',
        ]),
        'dashed' => implode(' ', [
            'border-2',
            'border-dashed',
            'border-[oklch(var(--ui-border))]',
            'rounded-[var(--ui-radius-lg)]',
        ]),
        default => '',
    };

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'text-center',
        $gapClasses,
@endphp

<div
    {{ $attributes->class([$baseClasses]) }}
    data-ui-empty-state
>
    {{-- Icon --}}
    @if(isset($icon))
        <div class="text-[oklch(var(--ui-muted-foreground)/0.5)]">
            {{ $icon }}
        </div>
    @else
        {{-- Default empty state icon (inbox / tray) --}}
        <div class="text-[oklch(var(--ui-muted-foreground)/0.4)]" aria-hidden="true">
            <svg
                class="{{ $iconSizeClasses }}"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" />
                <path d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" />
                <path d="M4 12H2" />
                <path d="M10 12H8" />
                <path d="M16 12h-2" />
                <path d="M22 12h-2" />
            </svg>
        </div>
    @endif

    {{-- Text content --}}
    <div class="flex flex-col items-center gap-1">
        @if($title)
            <h3 class="{{ $titleSizeClasses }} font-semibold text-[oklch(var(--ui-foreground))]">
                {{ $title }}
            </h3>
        @endif

        @if($description)
            <p class="{{ $descriptionSizeClasses }} text-[oklch(var(--ui-muted-foreground))] max-w-sm">
                {{ $description }}
            </p>
        @endif

        {{-- Default slot (additional content / custom description) --}}
        @if($slot->isNotEmpty())
            <div class="{{ $descriptionSizeClasses }} text-[oklch(var(--ui-muted-foreground))] max-w-sm">
                {{ $slot }}
            </div>
        @endif
    </div>

    {{-- Action slot --}}
    @if(isset($action))
        <div class="mt-1">
            {{ $action }}
        </div>
    @endif
</div>

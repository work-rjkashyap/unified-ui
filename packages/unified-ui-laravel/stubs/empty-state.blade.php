{{--
    Unified UI — Empty State Component
    https://unified-ui.space

    A centered placeholder for empty views with icon, title, description,
    and action button slots. Used when a list, table, or search returns
    no results, or when a feature area has no content yet.

    Usage:
        {{-- Basic empty state --}}
        <x-ui-empty-state
            title="No results found"
            description="Try adjusting your search or filters."
        />

        {{-- With action button --}}
        <x-ui-empty-state
            title="No projects yet"
            description="Get started by creating your first project."
        >
            <x-slot:action>
                <x-ui-button variant="primary">Create Project</x-ui-button>
            </x-slot:action>
        </x-ui-empty-state>

        {{-- With custom icon slot --}}
        <x-ui-empty-state title="No notifications">
            <x-slot:icon>
                <svg class="h-12 w-12" ...>...</svg>
            </x-slot:icon>
            <x-slot:action>
                <x-ui-button variant="outline">Refresh</x-ui-button>
            </x-slot:action>
        </x-ui-empty-state>

        {{-- With slot content as description --}}
        <x-ui-empty-state title="Inbox zero">
            <p>You've read all your messages. Time for a break!</p>
        </x-ui-empty-state>

        {{-- Compact variant --}}
        <x-ui-empty-state title="No items" size="sm" />

        {{-- With border / card style --}}
        <x-ui-empty-state title="No data" variant="bordered" />

        {{-- With dashed border (drop zone style) --}}
        <x-ui-empty-state title="Upload files" variant="dashed" description="Drag and drop files here, or click to browse.">
            <x-slot:action>
                <x-ui-button variant="outline">Browse Files</x-ui-button>
            </x-slot:action>
        </x-ui-empty-state>

    Props:
        title       — heading text (required for meaningful empty state)
        description — optional description / helper text below the title
        size        — sm|md|lg (default: md) — controls icon size, spacing, and text size
        variant     — default|bordered|dashed (default: default)
        compact     — boolean, reduces vertical padding for inline usage (default: false)
--}}

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
        $paddingClasses,
        $variantClasses,
    ]);
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
        {{-- Default empty state icon --}}
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
                <path d="M16

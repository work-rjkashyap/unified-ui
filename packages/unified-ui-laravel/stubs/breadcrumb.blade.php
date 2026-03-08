{{--
    Unified UI — Breadcrumb Component
    https://unified-ui.space

    Navigation breadcrumbs with customizable separator, automatic
    current-page aria attributes, and design token styling.

    Usage:
        {{-- With items array --}}
        <x-ui-breadcrumb :items="[
            ['label' => 'Home', 'href' => '/'],
            ['label' => 'Products', 'href' => '/products'],
            ['label' => 'Widget'],
        ]" />

        {{-- With custom separator --}}
        <x-ui-breadcrumb :items="$breadcrumbs" separator=">" />

        {{-- With slot content for full control --}}
        <x-ui-breadcrumb>
            <x-ui-breadcrumb.item href="/">Home</x-ui-breadcrumb.item>
            <x-ui-breadcrumb.item href="/docs">Docs</x-ui-breadcrumb.item>
            <x-ui-breadcrumb.item active>Getting Started</x-ui-breadcrumb.item>
        </x-ui-breadcrumb>

        {{-- With icon separator --}}
        <x-ui-breadcrumb :items="$breadcrumbs" separator="chevron" />

        {{-- Truncated (long paths) --}}
        <x-ui-breadcrumb :items="$breadcrumbs" :max="3" />

    Props:
        items     — array of breadcrumb items, each with 'label' and optional 'href' and 'icon' keys
        separator — string separator character or "chevron"|"slash"|"dot" (default: chevron)
        max       — maximum visible items before truncation with ellipsis (default: null — show all)
        size      — sm|md|lg (default: md)
--}}

@props([
    'items' => [],
    'separator' => 'chevron',
    'max' => null,
    'size' => 'md',
])

@php
    // ── Size classes ─────────────────────────────────────────────────
    $sizeClasses = match ($size) {
        'sm' => 'text-xs',
        'md' => 'text-sm',
        'lg' => 'text-base',
        default => 'text-sm',
    };

    $iconSizeClasses = match ($size) {
        'sm' => 'h-3 w-3',
        'md' => 'h-3.5 w-3.5',
        'lg' => 'h-4 w-4',
        default => 'h-3.5 w-3.5',
    };

    // ── Separator gap ────────────────────────────────────────────────
    $gapClasses = match ($size) {
        'sm' => 'gap-1',
        'md' => 'gap-1.5',
        'lg' => 'gap-2',
        default => 'gap-1.5',
    };

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'flex',
        'flex-wrap',
        'items-center',
        $gapClasses,
        $sizeClasses,
    ]);

    // ── Link classes ─────────────────────────────────────────────────
    $linkClasses = implode(' ', [
        'text-[oklch(var(--ui-muted-foreground))]',
        'hover:text-[oklch(var(--ui-foreground))]',
        'transition-colors',
        'duration-[var(--ui-duration-fast)]',
        'ease-[var(--ui-ease-default)]',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-[oklch(var(--ui-ring))]',
        'focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[oklch(var(--ui-background))]',
        'rounded-[var(--ui-radius-sm)]',
    ]);

    // ── Current page classes ─────────────────────────────────────────
    $currentClasses = implode(' ', [
        'font-medium',
        'text-[oklch(var(--ui-foreground))]',
    ]);

    // ── Separator classes ────────────────────────────────────────────
    $separatorClasses = implode(' ', [
        'text-[oklch(var(--ui-muted-foreground)/0.5)]',
        'select-none',
        'shrink-0',
    ]);

    // ── Process items for truncation ─────────────────────────────────
    $processedItems = $items;
    $showEllipsis = false;
    if ($max !== null && count($items) > (int) $max && (int) $max >= 2) {
        $first = array_slice($items, 0, 1);
        $last = array_slice($items, -(((int) $max) - 1));
        $processedItems = array_merge($first, [['label' => '…', 'ellipsis' => true]], $last);
        $showEllipsis = true;
    }

    $totalItems = count($processedItems);
@endphp

<nav
    {{ $attributes->class([$baseClasses]) }}
    aria-label="Breadcrumb"
    data-ui-breadcrumb
>
    <ol class="flex flex-wrap items-center {{ $gapClasses }}" role="list">
        @if(count($items) > 0)
            {{-- Render from items prop --}}
            @foreach($processedItems as $index => $item)
                @php
                    $isLast = $index === $totalItems - 1;
                    $isEllipsis = isset($item['ellipsis']) && $item['ellipsis'];
                    $hasHref = isset($item['href']) && !empty($item['href']) && !$isLast;
                @endphp

                <li class="inline-flex items-center {{ $gapClasses }}">
                    {{-- Separator (before all items except the first) --}}
                    @if($index > 0)
                        <span class="{{ $separatorClasses }}" aria-hidden="true">
                            @if($separator === 'chevron')
                                <svg class="{{ $iconSizeClasses }}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            @elseif($separator === 'slash')
                                <span class="text-[oklch(var(--ui-muted-foreground)/0.4)]">/</span>
                            @elseif($separator === 'dot')
                                <span class="text-[oklch(var(--ui-muted-foreground)/0.4)]">·</span>
                            @else
                                <span>{{ $separator }}</span>
                            @endif
                        </span>
                    @endif

                    {{-- Breadcrumb item --}}
                    @if($isEllipsis)
                        <span
                            class="text-[oklch(var(--ui-muted-foreground))] select-none px-1"
                            role="presentation"
                        >…</span>
                    @elseif($hasHref)
                        <a
                            href="{{ $item['href'] }}"
                            class="{{ $linkClasses }}"
                        >
                            @if(isset($item['icon']))
                                <span class="inline-flex items-center gap-1">
                                    {!! $item['icon'] !!}
                                    {{ $item['label'] }}
                                </span>
                            @else
                                {{ $item['label'] }}
                            @endif
                        </a>
                    @else
                        <span
                            class="{{ $currentClasses }}"
                            aria-current="page"
                        >
                            @if(isset($item['icon']))
                                <span class="inline-flex items-center gap-1">
                                    {!! $item['icon'] !!}
                                    {{ $item['label'] }}
                                </span>
                            @else
                                {{ $item['label'] }}
                            @endif
                        </span>
                    @endif
                </li>
            @endforeach
        @else
            {{-- Render from slot content --}}
            {{ $slot }}
        @endif
    </ol>
</nav>

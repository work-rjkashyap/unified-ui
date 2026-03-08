{{--
    Unified UI — Pagination Component
    https://unified-ui.space

    A styled pagination component that integrates with Laravel's built-in
    paginator. Renders previous/next navigation, page number links, and
    ellipsis indicators with full accessibility and design token support.

    Usage:
        {{-- Basic usage with Laravel paginator --}}
        <x-ui-pagination :paginator="$users" />

        {{-- With custom "per page" options --}}
        <x-ui-pagination :paginator="$users" show-per-page :per-page-options="[10, 25, 50, 100]" />

        {{-- Simple previous/next only --}}
        <x-ui-pagination :paginator="$users" simple />

        {{-- With result count summary --}}
        <x-ui-pagination :paginator="$users" show-info />

        {{-- Different sizes --}}
        <x-ui-pagination :paginator="$users" size="sm" />
        <x-ui-pagination :paginator="$users" size="lg" />

        {{-- Custom labels --}}
        <x-ui-pagination
            :paginator="$users"
            previous-label="← Prev"
            next-label="Next →"
        />

        {{-- With custom window (number of pages around current) --}}
        <x-ui-pagination :paginator="$users" :on-each-side="2" />

        {{-- Without previous/next text (icon only) --}}
        <x-ui-pagination :paginator="$users" :show-labels="false" />

    Props:
        paginator      — a Laravel LengthAwarePaginator or Paginator instance (required)
        simple         — boolean, show only Previous/Next buttons without page numbers (default: false)
        showInfo       — boolean, show "Showing X to Y of Z results" text (default: false)
        showPerPage    — boolean, show per-page selector (default: false)
        perPageOptions — array of per-page option values (default: [10, 25, 50])
        size           — sm|md|lg (default: md)
        previousLabel  — text for the Previous button (default: "Previous")
        nextLabel      — text for the Next button (default: "Next")
        showLabels     — boolean, show text labels on prev/next buttons (default: true)
        onEachSide     — number of page links to show on each side of current page (default: 1)
        scrollTo       — optional CSS selector to scroll to after pagination click (default: null)
--}}

@props([
    'paginator' => null,
    'simple' => false,
    'showInfo' => false,
    'showPerPage' => false,
    'perPageOptions' => [10, 25, 50],
    'size' => 'md',
    'previousLabel' => 'Previous',
    'nextLabel' => 'Next',
    'showLabels' => true,
    'onEachSide' => 1,
    'scrollTo' => null,
])

@php
    if ($paginator === null) {
        return;
    }

    $hasPages = $paginator->hasPages();
    $currentPage = $paginator->currentPage();
    $lastPage = method_exists($paginator, 'lastPage') ? $paginator->lastPage() : null;
    $onFirstPage = $paginator->onFirstPage();
    $hasMorePages = $paginator->hasMorePages();

    // ── Build URL helper ─────────────────────────────────────────────
    $buildUrl = function ($page) use ($paginator, $scrollTo) {
        $url = $paginator->url($page);
        if ($scrollTo) {
            $url .= (str_contains($url, '?') ? '&' : '?') . '_scroll=' . urlencode($scrollTo);
        }
        return $url;
    };

    // ── Generate page elements for LengthAwarePaginator ──────────────
    $elements = [];
    if (!$simple && $lastPage !== null && $lastPage > 1) {
        $window = (int) $onEachSide;
        $start = max(1, $currentPage - $window);
        $end = min($lastPage, $currentPage + $window);

        // Always show first page
        if ($start > 1) {
            $elements[] = ['type' => 'page', 'page' => 1, 'url' => $buildUrl(1)];
            if ($start > 2) {
                $elements[] = ['type' => 'ellipsis'];
            }
        }

        // Middle pages
        for ($i = $start; $i <= $end; $i++) {
            $elements[] = ['type' => 'page', 'page' => $i, 'url' => $buildUrl($i)];
        }

        // Always show last page
        if ($end < $lastPage) {
            if ($end < $lastPage - 1) {
                $elements[] = ['type' => 'ellipsis'];
            }
            $elements[] = ['type' => 'page', 'page' => $lastPage, 'url' => $buildUrl($lastPage)];
        }
    }

    // ── Size classes ─────────────────────────────────────────────────
    $buttonSizeClasses = match ($size) {
        'sm' => 'h-7 min-w-7 px-2 text-xs gap-1',
        'md' => 'h-8 min-w-8 px-2.5 text-sm gap-1.5',
        'lg' => 'h-9 min-w-9 px-3 text-sm gap-2',
        default => 'h-8 min-w-8 px-2.5 text-sm gap-1.5',
    };

    $iconSizeClasses = match ($size) {
        'sm' => 'h-3 w-3',
        'md' => 'h-3.5 w-3.5',
        'lg' => 'h-4 w-4',
        default => 'h-3.5 w-3.5',
    };

    $infoTextClasses = match ($size) {
        'sm' => 'text-xs',
        'md' => 'text-sm',
        'lg' => 'text-sm',
        default => 'text-sm',
    };

    // ── Shared button classes ────────────────────────────────────────
    $buttonBaseClasses = implode(' ', [
        'inline-flex',
        'items-center',
        'justify-center',
        'font-medium',
        'whitespace-nowrap',
        'select-none',
        'rounded-[var(--ui-radius-md)]',
        'border',
        'border-[oklch(var(--ui-border))]',
        'bg-transparent',
        'text-[oklch(var(--ui-foreground))]',
        'transition-colors',
        'duration-[var(--ui-duration-fast)]',
        'ease-[var(--ui-ease-default)]',
        'hover:bg-[oklch(var(--ui-accent))]',
        'hover:text-[oklch(var(--ui-accent-foreground))]',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-[oklch(var(--ui-ring))]',
        'focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[oklch(var(--ui-background))]',
    ]);

    $activeButtonClasses = implode(' ', [
        'bg-[oklch(var(--ui-primary))]',
        'text-[oklch(var(--ui-primary-foreground))]',
        'border-[oklch(var(--ui-primary))]',
        'hover:bg-[oklch(var(--ui-primary)/0.9)]',
        'hover:text-[oklch(var(--ui-primary-foreground))]',
        'shadow-sm',
    ]);

    $disabledButtonClasses = implode(' ', [
        'pointer-events-none',
        'opacity-50',
    ]);
@endphp

@if($hasPages)
    <nav
        {{ $attributes->class(['flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between']) }}
        role="navigation"
        aria-label="Pagination"
        data-ui-pagination
    >
        {{-- Results info --}}
        @if($showInfo && method_exists($paginator, 'total'))
            <div class="{{ $infoTextClasses }} text-[oklch(var(--ui-muted-foreground))]">
                Showing
                <span class="font-medium text-[oklch(var(--ui-foreground))]">{{ $paginator->firstItem() ?? 0 }}</span>
                to
                <span class="font-medium text-[oklch(var(--ui-foreground))]">{{ $paginator->lastItem() ?? 0 }}</span>
                of
                <span class="font-medium text-[oklch(var(--ui-foreground))]">{{ $paginator->total() }}</span>
                results
            </div>
        @endif

        {{-- Pagination controls --}}
        <div class="flex items-center gap-1">
            {{-- Previous button --}}
            @if($onFirstPage)
                <span
                    class="{{ $buttonBaseClasses }} {{ $buttonSizeClasses }} {{ $disabledButtonClasses }}"
                    aria-disabled="true"
                    aria-label="{{ $previousLabel }}"
                >
                    <svg
                        class="{{ $iconSizeClasses }}"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    @if($showLabels)
                        <span>{{ $previousLabel }}</span>
                    @endif
                </span>
            @else
                <a
                    href="{{ $buildUrl($currentPage - 1) }}"
                    class="{{ $buttonBaseClasses }} {{ $buttonSizeClasses }}"
                    rel="prev"
                    aria-label="{{ $previousLabel }}"
                >
                    <svg
                        class="{{ $iconSizeClasses }}"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    @if($showLabels)
                        <span>{{ $previousLabel }}</span>
                    @endif
                </a>
            @endif

            {{-- Page numbers (non-simple mode with LengthAwarePaginator) --}}
            @if(!$simple && count($elements) > 0)
                @foreach($elements as $element)
                    @if($element['type'] === 'ellipsis')
                        <span
                            class="{{ $buttonBaseClasses }} {{ $buttonSizeClasses }} pointer-events-none border-transparent"
                            aria-hidden="true"
                        >…</span>
                    @elseif($element['type'] === 'page')
                        @if($element['page'] === $currentPage)
                            <span
                                class="{{ $buttonBaseClasses }} {{ $buttonSizeClasses }} {{ $activeButtonClasses }}"
                                aria-current="page"
                                aria-label="Page {{ $element['page'] }}"
                            >
                                {{ $element['page'] }}
                            </span>
                        @else
                            <a
                                href="{{ $element['url'] }}"
                                class="{{ $buttonBaseClasses }} {{ $buttonSizeClasses }}"
                                aria-label="Go to page {{ $element['page'] }}"
                            >
                                {{ $element['page'] }}
                            </a>
                        @endif
                    @endif
                @endforeach
            @endif

            {{-- Next button --}}
            @if($hasMorePages)
                <a
                    href="{{ $buildUrl($currentPage + 1) }}"
                    class="{{ $buttonBaseClasses }} {{ $buttonSizeClasses }}"
                    rel="next"
                    aria-label="{{ $nextLabel }}"
                >
                    @if($showLabels)
                        <span>{{ $nextLabel }}</span>
                    @endif
                    <svg
                        class="{{ $iconSizeClasses }}"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </a>
            @else
                <span
                    class="{{ $buttonBaseClasses }} {{ $buttonSizeClasses }} {{ $disabledButtonClasses }}"
                    aria-disabled="true"
                    aria-label="{{ $nextLabel }}"
                >
                    @if($showLabels)
                        <span>{{ $nextLabel }}</span>
                    @endif
                    <svg
                        class="{{ $iconSizeClasses }}"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </span>
            @endif
        </div>

        {{-- Per-page selector --}}
        @if($showPerPage)
            <div class="flex items-center gap-2">
                <label
                    for="ui-pagination-per-page"
                    class="{{ $infoTextClasses }} text-[oklch(var(--ui-muted-foreground))] whitespace-nowrap"
                >
                    Per page
                </label>
                <select
                    id="ui-pagination-per-page"
                    class="
                        h-8 px-2 pr-7 text-xs
                        rounded-[var(--ui-radius-md)]
                        border border-[oklch(var(--ui-input))]
                        bg-[oklch(var(--ui-background))]
                        text-[oklch(var(--ui-foreground))]
                        appearance-none
                        cursor-pointer
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[oklch(var(--ui-ring))]
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-[oklch(var(--ui-background))]
                    "
                    onchange="
                        const url = new URL(window.location);
                        url.searchParams.set('per_page', this.value);
                        url.searchParams.delete('page');
                        window.location = url.toString();
                    "
                >
                    @foreach($perPageOptions as $option)
                        <option
                            value="{{ $option }}"
                            @if($paginator->perPage() == $option) selected @endif
                        >
                            {{ $option }}
                        </option>
                    @endforeach
                </select>
            </div>
        @endif
    </nav>
@endif

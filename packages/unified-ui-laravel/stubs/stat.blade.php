{{--
    Unified UI — Stat Component
    https://unified-ui.space

    A statistic display card with value, label, trend indicator, and
    optional icon. Perfect for dashboards, analytics pages, and KPI
    summaries. Uses design tokens for consistent styling.

    Usage:
        {{-- Basic stat --}}
        <x-ui-stat label="Revenue" value="$48,250" />

        {{-- With trend indicator --}}
        <x-ui-stat
            label="Revenue"
            value="$48,250"
            trend="+12.5%"
            trend-direction="up"
        />

        {{-- Negative trend --}}
        <x-ui-stat
            label="Bounce Rate"
            value="42.3%"
            trend="-3.1%"
            trend-direction="down"
        />

        {{-- Neutral trend --}}
        <x-ui-stat
            label="Sessions"
            value="1,204"
            trend="0%"
            trend-direction="neutral"
        />

        {{-- With description / secondary text --}}
        <x-ui-stat
            label="Total Users"
            value="8,491"
            description="Compared to 7,200 last month"
        />

        {{-- With icon slot --}}
        <x-ui-stat label="Orders" value="1,234">
            <x-slot:icon>
                <svg class="h-5 w-5" ...>...</svg>
            </x-slot:icon>
        </x-ui-stat>

        {{-- With custom prefix/suffix --}}
        <x-ui-stat label="Revenue" value="48,250" prefix="$" suffix="USD" />

        {{-- Different sizes --}}
        <x-ui-stat label="Users" value="1,234" size="sm" />
        <x-ui-stat label="Users" value="1,234" size="md" />
        <x-ui-stat label="Users" value="1,234" size="lg" />

        {{-- Variant styles --}}
        <x-ui-stat label="Users" value="1,234" variant="default" />
        <x-ui-stat label="Users" value="1,234" variant="bordered" />
        <x-ui-stat label="Users" value="1,234" variant="filled" />

        {{-- Horizontal layout --}}
        <x-ui-stat label="Users" value="1,234" layout="horizontal" />

        {{-- With progress indicator --}}
        <x-ui-stat label="Storage" value="7.2 GB" :progress="72" progress-label="of 10 GB" />

        {{-- Loading state --}}
        <x-ui-stat label="Users" loading />

        {{-- Stats grid example --}}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <x-ui-stat label="Revenue" value="$48,250" trend="+12.5%" trend-direction="up" />
            <x-ui-stat label="Users" value="8,491" trend="+4.2%" trend-direction="up" />
            <x-ui-stat label="Orders" value="1,234" trend="-1.8%" trend-direction="down" />
            <x-ui-stat label="Conversion" value="3.6%" trend="0%" trend-direction="neutral" />
        </div>

    Props:
        label          — the stat label / title text (e.g. "Revenue")
        value          — the primary stat value text (e.g. "$48,250")
        prefix         — optional prefix text rendered before the value (e.g. "$")
        suffix         — optional suffix text rendered after the value (e.g. "USD")
        trend          — optional trend text (e.g. "+12.5%", "-3.1%")
        trendDirection — up|down|neutral (default: neutral) — determines the trend color and icon
        description    — optional description / helper text below the value
        size           — sm|md|lg (default: md)
        variant        — default|bordered|filled (default: bordered)
        layout         — vertical|horizontal (default: vertical)
        loading        — boolean, shows skeleton placeholders instead of values (default: false)
        progress       — numeric 0-100, shows a mini progress bar below the value (default: null)
        progressLabel  — optional label for the progress bar (e.g. "of 10 GB")
        iconPosition   — start|end (default: start) — position of the icon relative to the stat content
--}}

@props([
    'label' => '',
    'value' => '',
    'prefix' => null,
    'suffix' => null,
    'trend' => null,
    'trendDirection' => 'neutral',
    'description' => null,
    'size' => 'md',
    'variant' => 'bordered',
    'layout' => 'vertical',
    'loading' => false,
    'progress' => null,
    'progressLabel' => null,
    'iconPosition' => 'start',
])

@php
    $isHorizontal = $layout === 'horizontal';
    $hasIcon = isset($icon);
    $hasTrend = $trend !== null;
    $hasProgress = $progress !== null;
    $progressValue = $hasProgress ? max(0, min(100, (int) $progress)) : 0;

    // ── Size classes ─────────────────────────────────────────────────
    $valueSizeClasses = match ($size) {
        'sm' => 'text-lg font-semibold',
        'md' => 'text-2xl font-bold',
        'lg' => 'text-3xl font-bold',
        default => 'text-2xl font-bold',
    };

    $labelSizeClasses = match ($size) {
        'sm' => 'text-xs',
        'md' => 'text-sm',
        'lg' => 'text-sm',
        default => 'text-sm',
    };

    $trendSizeClasses = match ($size) {
        'sm' => 'text-[10px]',
        'md' => 'text-xs',
        'lg' => 'text-sm',
        default => 'text-xs',
    };

    $trendIconSizeClasses = match ($size) {
        'sm' => 'h-3 w-3',
        'md' => 'h-3.5 w-3.5',
        'lg' => 'h-4 w-4',
        default => 'h-3.5 w-3.5',
    };

    $descriptionSizeClasses = match ($size) {
        'sm' => 'text-[10px]',
        'md' => 'text-xs',
        'lg' => 'text-sm',
        default => 'text-xs',
    };

    $iconContainerSizeClasses = match ($size) {
        'sm' => 'h-8 w-8',
        'md' => 'h-10 w-10',
        'lg' => 'h-12 w-12',
        default => 'h-10 w-10',
    };

    $paddingClasses = match ($size) {
        'sm' => 'p-3',
        'md' => 'p-4',
        'lg' => 'p-6',
        default => 'p-4',
    };

    $gapClasses = match ($size) {
        'sm' => 'gap-1',
        'md' => 'gap-1.5',
        'lg' => 'gap-2',
        default => 'gap-1.5',
    };

    // ── Variant classes ──────────────────────────────────────────────
    $variantClasses = match ($variant) {
        'bordered' => implode(' ', [
            'border',
            'border-[oklch(var(--ui-border))]',
            'bg-[oklch(var(--ui-card))]',
            'rounded-[var(--ui-radius-xl)]',
            'shadow-[var(--ui-shadow-sm)]',
        ]),
        'filled' => implode(' ', [
            'bg-[oklch(var(--ui-muted))]',
            'rounded-[var(--ui-radius-xl)]',
        ]),
        default => '',
    };

    // ── Trend direction color classes ─────────────────────────────────
    $trendColorClasses = match ($trendDirection) {
        'up' => 'text-[oklch(var(--ui-success))]',
        'down' => 'text-[oklch(var(--ui-destructive))]',
        default => 'text-[oklch(var(--ui-muted-foreground))]',
    };

    // ── Layout classes ───────────────────────────────────────────────
    $layoutClasses = $isHorizontal
        ? 'flex flex-row items-center gap-4'
        : 'flex flex-col ' . $gapClasses;

    // ── Icon container classes ────────────────────────────────────────
    $iconContainerClasses = implode(' ', [
        $iconContainerSizeClasses,
        'shrink-0',
        'inline-flex',
        'items-center',
        'justify-center',
        'rounded-[var(--ui-radius-lg)]',
        'bg-[oklch(var(--ui-primary)/0.1)]',
        'text-[oklch(var(--ui-primary))]',
    ]);

    // ── Progress bar height ──────────────────────────────────────────
    $progressHeightClasses = match ($size) {
        'sm' => 'h-1',
        'md' => 'h-1.5',
        'lg' => 'h-2',
        default => 'h-1.5',
    };

    // ── Merge wrapper classes ────────────────────────────────────────
    $wrapperClasses = trim("{$variantClasses} {$paddingClasses}");
@endphp

<div
    {{ $attributes->class([$wrapperClasses]) }}
    data-ui-stat
    data-ui-stat-variant="{{ $variant }}"
>
    <div class="{{ $layoutClasses }}">
        {{-- Icon (start position) --}}
        @if($hasIcon && $iconPosition === 'start')
            <div class="{{ $iconContainerClasses }}">
                {{ $icon }}
            </div>
        @endif

        {{-- Stat content --}}
        <div class="flex flex-col {{ $gapClasses }} flex-1 min-w-0">
            {{-- Label --}}
            <span class="{{ $labelSizeClasses }} font-medium text-[oklch(var(--ui-muted-foreground))] leading-none">
                {{ $label }}
            </span>

            {{-- Value + Trend row --}}
            <div class="flex items-baseline gap-2 flex-wrap">
                @if($loading)
                    {{-- Loading skeleton --}}
                    <div class="animate-pulse rounded-[var(--ui-radius-sm)] bg-[oklch(var(--ui-muted))] {{ match ($size) { 'sm' => 'h-5 w-16', 'md' => 'h-7 w-24', 'lg' => 'h-8 w-28', default => 'h-7 w-24' } }}"></div>
                @else
                    {{-- Value --}}
                    <span class="{{ $valueSizeClasses }} tabular-nums tracking-tight text-[oklch(var(--ui-card-foreground,var(--ui-foreground)))] leading-none">
                        @if($prefix)<span class="font-normal text-[oklch(var(--ui-muted-foreground))]">{{ $prefix }}</span>@endif{{ $value }}@if($suffix)<span class="{{ $labelSizeClasses }} font-normal text-[oklch(var(--ui-muted-foreground))] ml-0.5">{{ $suffix }}</span>@endif
                    </span>

                    {{-- Trend indicator --}}
                    @if($hasTrend)
                        <span class="inline-flex items-center gap-0.5 {{ $trendSizeClasses }} font-medium {{ $trendColorClasses }} leading-none">
                            {{-- Trend icon --}}
                            @if($trendDirection === 'up')
                                <svg
                                    class="{{ $trendIconSizeClasses }}"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="m18 15-6-6-6 6" />
                                </svg>
                            @elseif($trendDirection === 'down')
                                <svg
                                    class="{{ $trendIconSizeClasses }}"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            @else
                                <svg
                                    class="{{ $trendIconSizeClasses }}"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M5 12h14" />
                                </svg>
                            @endif

                            <span>{{ $trend }}</span>
                        </span>
                    @endif
                @endif
            </div>

            {{-- Description --}}
            @if($description && !$loading)
                <span class="{{ $descriptionSizeClasses }} text-[oklch(var(--ui-muted-foreground))] leading-normal">
                    {{ $description }}
                </span>
            @elseif($loading)
                <div class="animate-pulse rounded-[var(--ui-radius-sm)] bg-[oklch(var(--ui-muted))] h-3 w-32"></div>
            @endif

            {{-- Progress bar --}}
            @if($hasProgress && !$loading)
                <div class="flex flex-col gap-1 mt-0.5">
                    <div
                        class="w-full {{ $progressHeightClasses }} rounded-full bg-[oklch(var(--ui-muted))] overflow-hidden"
                        role="progressbar"
                        aria-valuenow="{{ $progressValue }}"
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        <div
                            class="h-full rounded-full bg-[oklch(var(--ui-primary))] transition-all duration-[var(--ui-duration-slow)] ease-[var(--ui-ease-out)]"
                            style="width: {{ $progressValue }}%"
                        ></div>
                    </div>

                    @if($progressLabel)
                        <span class="{{ $descriptionSizeClasses }} text-[oklch(var(--ui-muted-foreground))] leading-none">
                            {{ $progressValue }}% {{ $progressLabel }}
                        </span>
                    @endif
                </div>
            @endif
        </div>

        {{-- Icon (end position) --}}
        @if($hasIcon && $iconPosition === 'end')
            <div class="{{ $iconContainerClasses }}">
                {{ $icon }}
            </div>
        @endif
    </div>

    {{-- Additional slot content (e.g. sparkline, mini chart) --}}
    @if($slot->isNotEmpty())
        <div class="mt-3">
            {{ $slot }}
        </div>
    @endif
</div>

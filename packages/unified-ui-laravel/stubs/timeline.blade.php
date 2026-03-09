@props([
    'items'    => [],
    'size'     => 'md',
    'animated' => true,
])

@php
    // ── Size classes ─────────────────────────────────────────────────
    $dotSizeMap = [
        'sm' => 'h-2 w-2',
        'md' => 'h-3 w-3',
        'lg' => 'h-4 w-4',
    ];
    $iconSizeMap = [
        'sm' => 'h-6 w-6',
        'md' => 'h-8 w-8',
        'lg' => 'h-10 w-10',
    ];
    $titleSizeMap = [
        'sm' => 'text-xs',
        'md' => 'text-sm',
        'lg' => 'text-base',
    ];
    $descSizeMap = [
        'sm' => 'text-xs',
        'md' => 'text-sm',
        'lg' => 'text-sm',
    ];

    $dotSize  = $dotSizeMap[$size]  ?? $dotSizeMap['md'];
    $iconSize = $iconSizeMap[$size] ?? $iconSizeMap['md'];
    $titleSize = $titleSizeMap[$size] ?? $titleSizeMap['md'];
    $descSize  = $descSizeMap[$size]  ?? $descSizeMap['md'];

    // ── Status → dot color ───────────────────────────────────────────
    $dotColorMap = [
        'default' => 'bg-[oklch(var(--ui-border))]',
        'active'  => 'bg-[oklch(var(--ui-primary))] ring-4 ring-[oklch(var(--ui-primary)/0.2)]',
        'success' => 'bg-[oklch(var(--ui-success))]',
        'warning' => 'bg-[oklch(var(--ui-warning))]',
        'danger'  => 'bg-[oklch(var(--ui-destructive))]',
        'pending' => 'bg-[oklch(var(--ui-muted))] border-2 border-[oklch(var(--ui-border))]',
    ];

    // ── Status → icon wrapper color ──────────────────────────────────
    $iconColorMap = [
        'default' => 'bg-[oklch(var(--ui-muted))] border border-[oklch(var(--ui-border))] text-[oklch(var(--ui-muted-foreground))]',
        'active'  => 'bg-[oklch(var(--ui-primary))] text-[oklch(var(--ui-primary-foreground))]',
        'success' => 'bg-[oklch(var(--ui-success))] text-[oklch(var(--ui-success-foreground))]',
        'warning' => 'bg-[oklch(var(--ui-warning))] text-[oklch(var(--ui-warning-foreground))]',
        'danger'  => 'bg-[oklch(var(--ui-destructive))] text-[oklch(var(--ui-destructive-foreground))]',
        'pending' => 'bg-[oklch(var(--ui-muted))] border border-[oklch(var(--ui-border)/0.6)] text-[oklch(var(--ui-muted-foreground))]',
    ];
@endphp

<div
    {{ $attributes->class(['relative']) }}
    data-ui-timeline
    data-ui-timeline-size="{{ $size }}"
>
    @forelse($items as $index => $item)
        @php
            $status   = $item['status']      ?? 'default';
            $title    = $item['title']        ?? null;
            $desc     = $item['description'] ?? null;
            $time     = $item['timestamp']   ?? null;
            $icon     = $item['icon']        ?? null;
            $isLast   = $index === array_key_last($items);
            $dotColor  = $dotColorMap[$status]  ?? $dotColorMap['default'];
            $iconColor = $iconColorMap[$status] ?? $iconColorMap['default'];
        @endphp

        <div
            class="flex gap-4 relative {{ $animated ? 'transition-opacity duration-[var(--ui-duration-normal)] ease-[var(--ui-ease-out)]' : '' }}"
            data-ui-timeline-item
            data-ui-timeline-status="{{ $status }}"
        >
            {{-- Connector + indicator column --}}
            <div class="flex flex-col items-center">

                {{-- Icon or dot --}}
                @if($icon)
                    <div class="flex items-center justify-center rounded-full shrink-0 z-10 {{ $iconSize }} {{ $iconColor }}">
                        {!! $icon !!}
                    </div>
                @else
                    <div class="rounded-full shrink-0 z-10 mt-1.5 {{ $dotSize }} {{ $dotColor }}"></div>
                @endif

                {{-- Connector line --}}
                @if(!$isLast)
                    <div class="flex-1 w-px bg-[oklch(var(--ui-border))] mt-2"></div>
                @endif
            </div>

            {{-- Content --}}
            <div class="flex-1 {{ $isLast ? 'pb-0' : 'pb-8' }}">

                @if($time)
                    <p class="text-xs text-[oklch(var(--ui-muted-foreground))] mb-1 leading-none">
                        {{ $time }}
                    </p>
                @endif

                @if($title)
                    <p class="font-semibold text-[oklch(var(--ui-foreground))] leading-5 {{ $titleSize }}">
                        {{ $title }}
                    </p>
                @endif

                @if($desc)
                    <p class="text-[oklch(var(--ui-muted-foreground))] leading-5 mt-0.5 {{ $descSize }}">
                        {{ $desc }}
                    </p>
                @endif

                {{-- Arbitrary extra content per item --}}
                @if(!empty($item['content']))
                    <div class="mt-2">
                        {!! $item['content'] !!}
                    </div>
                @endif
            </div>
        </div>
    @empty
        {{-- Empty state slot --}}
        @if(isset($slot) && $slot->isNotEmpty())
            {{ $slot }}
        @endif
    @endforelse
</div>

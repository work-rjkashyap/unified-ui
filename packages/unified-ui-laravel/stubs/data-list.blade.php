@props([
    'items'       => [],
    'orientation' => 'horizontal',
    'size'        => 'md',
    'dividers'    => false,
])

@php
    // ── Orientation classes ───────────────────────────────────────────
    $orientationClasses = match ($orientation) {
        'horizontal' => 'grid grid-cols-[auto_1fr] items-baseline gap-x-6',
        'vertical'   => 'flex flex-col gap-2',
        default      => 'grid grid-cols-[auto_1fr] items-baseline gap-x-6',
    };

    // ── Size classes ──────────────────────────────────────────────────
    $sizeClasses = match ($size) {
        'sm'  => 'text-xs',
        'md'  => 'text-sm',
        'lg'  => 'text-base',
        default => 'text-sm',
    };

    // ── Base classes ──────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'w-full',
        $orientationClasses,
        $sizeClasses,
    ]);

    $isHorizontal = $orientation === 'horizontal';

    // ── Term classes ──────────────────────────────────────────────────
    $termClasses = implode(' ', [
        'font-medium',
        'text-[oklch(var(--ui-muted-foreground))]',
        'shrink-0',
        $isHorizontal ? 'py-2' : '',
    ]);

    // ── Detail classes ────────────────────────────────────────────────
    $detailClasses = implode(' ', [
        'text-[oklch(var(--ui-foreground))]',
        'm-0',
        $isHorizontal ? 'py-2' : '',
    ]);
@endphp

<dl
    {{ $attributes->class([$baseClasses]) }}
    data-ui-data-list
    data-ui-orientation="{{ $orientation }}"
>
    @if(!empty($items))
        {{-- Data-driven usage: pass items as array of ['term' => ..., 'detail' => ...] --}}
        @foreach($items as $index => $item)
            @php
                $isFirst    = $index === 0;
                $dividerCls = ($dividers && !$isFirst)
                    ? ($isHorizontal
                        ? 'border-t border-[oklch(var(--ui-border))]'
                        : 'pt-3 border-t border-[oklch(var(--ui-border))]')
                    : '';
            @endphp

            @if($isHorizontal)
                {{-- In horizontal mode each dt/dd is a direct grid child --}}
                <dt class="{{ trim($termClasses . ' ' . ($dividers && !$isFirst ? 'border-t border-[oklch(var(--ui-border))]' : '')) }}">
                    {{ $item['term'] ?? '' }}
                </dt>
                <dd class="{{ trim($detailClasses . ' ' . ($dividers && !$isFirst ? 'border-t border-[oklch(var(--ui-border))]' : '')) }}">
                    {{ $item['detail'] ?? '' }}
                </dd>
            @else
                <div class="{{ trim('flex flex-col gap-1 ' . $dividerCls) }}">
                    <dt class="{{ $termClasses }}">{{ $item['term'] ?? '' }}</dt>
                    <dd class="{{ $detailClasses }}">{{ $item['detail'] ?? '' }}</dd>
                </div>
            @endif
        @endforeach
    @else
        {{-- Slot-driven usage --}}
        {{ $slot }}
    @endif
</dl>

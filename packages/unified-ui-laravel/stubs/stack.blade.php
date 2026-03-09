@props([
    'as' => 'div',
    'direction' => 'col',
    'gap' => '4',
    'align' => 'stretch',
    'justify' => 'start',
    'wrap' => false,
    'responsive' => false,
    'inline' => false,
    'fullWidth' => false,
    'fullHeight' => false,
    'divider' => false,
])

@php
    // ── Display mode ─────────────────────────────────────────────────
    $displayClass = $inline ? 'inline-flex' : 'flex';

    // ── Direction classes ─────────────────────────────────────────────
    $directionClasses = $responsive
        ? match ($direction) {
            'row'         => 'flex-col sm:flex-row',
            'row-reverse' => 'flex-col-reverse sm:flex-row-reverse',
            default       => 'flex-col sm:flex-row',
        }
        : match ($direction) {
            'row'          => 'flex-row',
            'row-reverse'  => 'flex-row-reverse',
            'col-reverse'  => 'flex-col-reverse',
            default        => 'flex-col',
        };

    // ── Gap classes ──────────────────────────────────────────────────
    $gapClasses = match ((string) $gap) {
        '0'    => 'gap-0',
        '0.5'  => 'gap-0.5',
        '1'    => 'gap-1',
        '1.5'  => 'gap-1.5',
        '2'    => 'gap-2',
        '2.5'  => 'gap-2.5',
        '3'    => 'gap-3',
        '4'    => 'gap-4',
        '5'    => 'gap-5',
        '6'    => 'gap-6',
        '8'    => 'gap-8',
        '10'   => 'gap-10',
        '12'   => 'gap-12',
        '16'   => 'gap-16',
        '20'   => 'gap-20',
        '24'   => 'gap-24',
        default => 'gap-4',
    };

    // ── Alignment classes ────────────────────────────────────────────
    $alignClasses = match ($align) {
        'start'    => 'items-start',
        'center'   => 'items-center',
        'end'      => 'items-end',
        'stretch'  => 'items-stretch',
        'baseline' => 'items-baseline',
        default    => 'items-stretch',
    };

    // ── Justification classes ────────────────────────────────────────
    $justifyClasses = match ($justify) {
        'start'   => 'justify-start',
        'center'  => 'justify-center',
        'end'     => 'justify-end',
        'between' => 'justify-between',
        'around'  => 'justify-around',
        'evenly'  => 'justify-evenly',
        default   => 'justify-start',
    };

    // ── Wrap classes ─────────────────────────────────────────────────
    $wrapClasses = $wrap ? 'flex-wrap' : '';

    // ── Width / Height ───────────────────────────────────────────────
    $widthClasses = $fullWidth ? 'w-full' : '';
    $heightClasses = $fullHeight ? 'h-full' : '';

    // ── Divider classes ──────────────────────────────────────────────
    $isRow = in_array($direction, ['row', 'row-reverse']);
    $dividerClasses = '';
    if ($divider) {
        $dividerClasses = $isRow
            ? '[&>*+*]:border-l [&>*+*]:border-[oklch(var(--ui-border))] [&>*+*]:pl-[var(--stack-gap,1rem)]'
            : '[&>*+*]:border-t [&>*+*]:border-[oklch(var(--ui-border))] [&>*+*]:pt-[var(--stack-gap,1rem)]';
    }

    // ── Merge all classes ────────────────────────────────────────────
    $classes = trim(implode(' ', array_filter([
        $displayClass,
        $directionClasses,
        $gapClasses,
        $alignClasses,
        $justifyClasses,
        $wrapClasses,
        $widthClasses,
        $heightClasses,
        $dividerClasses,
    ])));
@endphp

<{{ $as }}
    {{ $attributes->class([$classes]) }}
    data-ui-stack
    data-ui-stack-direction="{{ $direction }}"
>
    {{ $slot }}
</{{ $as }}>

{{--
    Unified UI — Stack Component
    https://unified-ui.space

    A flex layout primitive for vertical or horizontal stacking with
    configurable gap, alignment, justification, and wrapping. Useful
    as a composable building block for consistent spacing patterns.

    Usage:
        {{-- Vertical stack (default) --}}
        <x-ui-stack>
            <p>First item</p>
            <p>Second item</p>
            <p>Third item</p>
        </x-ui-stack>

        {{-- Horizontal stack --}}
        <x-ui-stack direction="row" gap="4" align="center">
            <x-ui-button>One</x-ui-button>
            <x-ui-button>Two</x-ui-button>
        </x-ui-stack>

        {{-- With gap variants --}}
        <x-ui-stack gap="0">No gap</x-ui-stack>
        <x-ui-stack gap="1">Tiny gap</x-ui-stack>
        <x-ui-stack gap="2">Small gap</x-ui-stack>
        <x-ui-stack gap="4">Default gap</x-ui-stack>
        <x-ui-stack gap="6">Medium gap</x-ui-stack>
        <x-ui-stack gap="8">Large gap</x-ui-stack>
        <x-ui-stack gap="12">Extra large gap</x-ui-stack>

        {{-- With alignment --}}
        <x-ui-stack align="start">Align start</x-ui-stack>
        <x-ui-stack align="center">Centered</x-ui-stack>
        <x-ui-stack align="end">Align end</x-ui-stack>
        <x-ui-stack align="stretch">Stretch (default)</x-ui-stack>
        <x-ui-stack align="baseline">Baseline</x-ui-stack>

        {{-- With justification --}}
        <x-ui-stack direction="row" justify="between">
            <span>Left</span>
            <span>Right</span>
        </x-ui-stack>

        {{-- Wrapping --}}
        <x-ui-stack direction="row" wrap gap="2">
            <x-ui-badge>Tag 1</x-ui-badge>
            <x-ui-badge>Tag 2</x-ui-badge>
            <x-ui-badge>Tag 3</x-ui-badge>
            <x-ui-badge>Tag 4</x-ui-badge>
        </x-ui-stack>

        {{-- Reverse direction --}}
        <x-ui-stack direction="row-reverse">
            <span>First (renders right)</span>
            <span>Second (renders left)</span>
        </x-ui-stack>

        {{-- Responsive direction (vertical on mobile, horizontal on desktop) --}}
        <x-ui-stack direction="col" responsive>
            <div>Card 1</div>
            <div>Card 2</div>
            <div>Card 3</div>
        </x-ui-stack>

        {{-- As a different HTML tag --}}
        <x-ui-stack as="ul" direction="col" gap="2">
            <li>List item 1</li>
            <li>List item 2</li>
        </x-ui-stack>

        {{-- With dividers between items --}}
        <x-ui-stack divider gap="4">
            <p>Section one</p>
            <p>Section two</p>
            <p>Section three</p>
        </x-ui-stack>

        {{-- Full width / full height --}}
        <x-ui-stack fullWidth>Full width stack</x-ui-stack>
        <x-ui-stack fullHeight>Full height stack</x-ui-stack>

        {{-- Inline (shrink-to-fit) --}}
        <x-ui-stack inline direction="row" gap="2" align="center">
            <x-ui-avatar size="sm" />
            <span>Username</span>
        </x-ui-stack>

    Props:
        as         — HTML tag to render: div|section|ul|ol|nav|main|aside|header|footer|form|fieldset|span (default: div)
        direction  — col|row|col-reverse|row-reverse (default: col)
        gap        — 0|0.5|1|1.5|2|2.5|3|4|5|6|8|10|12|16|20|24 (default: 4)
        align      — start|center|end|stretch|baseline (default: stretch)
        justify    — start|center|end|between|around|evenly (default: start)
        wrap       — boolean, enables flex-wrap (default: false)
        responsive — boolean, col on mobile → row on sm+ breakpoint (default: false)
        inline     — boolean, renders as inline-flex instead of flex (default: false)
        fullWidth  — boolean, sets width to 100% (default: false)
        fullHeight — boolean, sets height to 100% (default: false)
        divider    — boolean, adds a separator line between child items (default: false)
--}}

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

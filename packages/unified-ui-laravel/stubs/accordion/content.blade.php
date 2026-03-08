{{--
    Unified UI — Accordion Content Sub-Component
    https://unified-ui.space

    The collapsible content panel for an accordion item. Visibility is
    controlled by the parent accordion's Alpine.js state, with smooth
    height animation via x-collapse.

    Usage:
        <x-ui-accordion>
            <x-ui-accordion.item>
                <x-ui-accordion.trigger>Question 1</x-ui-accordion.trigger>
                <x-ui-accordion.content>
                    <p>Answer 1 goes here with any HTML content.</p>
                </x-ui-accordion.content>
            </x-ui-accordion.item>
        </x-ui-accordion>

        {{-- Rich content --}}
        <x-ui-accordion.content>
            <div class="space-y-2">
                <p>Paragraph one.</p>
                <p>Paragraph two with <a href="#">a link</a>.</p>
                <ul class="list-disc pl-5">
                    <li>Item A</li>
                    <li>Item B</li>
                </ul>
            </div>
        </x-ui-accordion.content>

    Props:
        (none — state is managed by the parent accordion item's Alpine.js context)
--}}

@php
    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'text-sm',
        'leading-relaxed',
        'text-[oklch(var(--ui-muted-foreground))]',
    ]);

    // ── Content inner padding ────────────────────────────────────────
    $innerClasses = 'pb-4';
@endphp

<div
    x-show="isOpen(itemValue)"
    x-collapse
    x-cloak
    role="region"
    x-bind:aria-hidden="(!isOpen(itemValue)).toString()"
    {{ $attributes->class([$baseClasses]) }}
    data-ui-accordion-content
>
    <div
        class="{{ $innerClasses }}"
        x-bind:class="{
            'px-4': variant === 'bordered' || variant === 'separated',
        }"
    >
        {{ $slot }}
    </div>
</div>

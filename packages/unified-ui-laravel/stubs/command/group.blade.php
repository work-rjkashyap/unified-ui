{{--
    Unified UI — Command Group Sub-Component
    https://unified-ui.space

    A labeled group of command items within the command palette.
    Groups visually separate different categories of commands
    with an optional heading label.

    Usage:
        <x-ui-command>
            <x-ui-command.group heading="Pages">
                <x-ui-command.item value="dashboard">Dashboard</x-ui-command.item>
                <x-ui-command.item value="settings">Settings</x-ui-command.item>
            </x-ui-command.group>

            <x-ui-command.group heading="Actions">
                <x-ui-command.item value="new-file">New File</x-ui-command.item>
                <x-ui-command.item value="new-folder">New Folder</x-ui-command.item>
            </x-ui-command.group>
        </x-ui-command>

        {{-- Without heading --}}
        <x-ui-command.group>
            <x-ui-command.item value="home">Home</x-ui-command.item>
            <x-ui-command.item value="about">About</x-ui-command.item>
        </x-ui-command.group>

    Props:
        heading — optional group heading text displayed above the items
--}}

@props([
    'heading' => null,
])

@php
    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'overflow-hidden',
        'py-1',
    ]);

    // ── Heading classes ──────────────────────────────────────────────
    $headingClasses = implode(' ', [
        'px-3',
        'py-1.5',
        'text-xs',
        'font-medium',
        'leading-none',
        'text-[oklch(var(--ui-muted-foreground))]',
        'select-none',
    ]);
@endphp

<div
    {{ $attributes->class([$baseClasses]) }}
    role="group"
    @if($heading) aria-label="{{ $heading }}" @endif
    data-ui-command-group
>
    {{-- Group heading --}}
    @if($heading)
        <div class="{{ $headingClasses }}" aria-hidden="true">
            {{ $heading }}
        </div>
    @endif

    {{-- Group items --}}
    {{ $slot }}
</div>

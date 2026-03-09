@props([])

{{--
    Menubar — horizontal menu bar with dropdown menus.

    Usage:
        <x-menubar>
            <x-menubar-menu label="File">
                <x-menubar-item>New</x-menubar-item>
                <x-menubar-item>Open</x-menubar-item>
                <x-menubar-separator />
                <x-menubar-item>Save</x-menubar-item>
            </x-menubar-menu>
            <x-menubar-menu label="Edit">
                <x-menubar-item shortcut="⌘Z">Undo</x-menubar-item>
                <x-menubar-item shortcut="⌘Y">Redo</x-menubar-item>
            </x-menubar-menu>
        </x-menubar>
--}}

<div
    role="menubar"
    aria-label="Menu bar"
    {{ $attributes->class([
        'flex items-center gap-1 h-9 rounded-[var(--ui-radius-md)] border border-[oklch(var(--ui-border))] bg-[oklch(var(--ui-background))] px-1',
    ]) }}
    data-ui-menubar
    x-data="{ activeMenu: null }"
    x-on:keydown.escape.window="activeMenu = null"
    x-on:click.outside="activeMenu = null"
>
    {{ $slot }}
</div>

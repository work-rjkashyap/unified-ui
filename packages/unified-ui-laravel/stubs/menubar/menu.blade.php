@props([
    'label' => '',
    'value' => null,
])

@php
    $menuId = 'menubar-' . ($value ?? md5($label));
    $panelClasses = implode(' ', [
        'absolute top-full left-0 z-[var(--ui-z-dropdown,50)] mt-1 w-48',
        'rounded-[var(--ui-radius-lg)] border border-[oklch(var(--ui-border))]',
        'bg-[oklch(var(--ui-popover))] text-[oklch(var(--ui-popover-foreground))]',
        'shadow-[var(--ui-shadow-md)] py-1 outline-none',
    ]);
@endphp

<div
    class="relative"
    x-data="{ menuId: '{{ $menuId }}' }"
    data-ui-menubar-menu
>
    <button
        type="button"
        x-on:click="$parent.activeMenu = $parent.activeMenu === menuId ? null : menuId"
        x-on:mouseenter="$parent.activeMenu !== null ? $parent.activeMenu = menuId : null"
        :aria-expanded="($parent.activeMenu === menuId).toString()"
        :class="$parent.activeMenu === menuId
            ? 'bg-[oklch(var(--ui-accent))] text-[oklch(var(--ui-accent-foreground))]'
            : 'text-[oklch(var(--ui-foreground))] hover:bg-[oklch(var(--ui-accent))] hover:text-[oklch(var(--ui-accent-foreground))]'"
        class="inline-flex items-center gap-1 h-7 rounded-sm px-3 text-sm font-medium transition-colors duration-[var(--ui-duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--ui-ring))]"
        role="menuitem"
        aria-haspopup="menu"
    >
        {{ $label }}
    </button>

    <div
        x-show="$parent.activeMenu === menuId"
        x-cloak
        x-transition:enter="transition ease-[var(--ui-ease-out)] duration-[var(--ui-duration-fast)] origin-top-left"
        x-transition:enter-start="opacity-0 scale-95"
        x-transition:enter-end="opacity-100 scale-100"
        x-transition:leave="transition ease-[var(--ui-ease-in)] duration-[var(--ui-duration-fast)] origin-top-left"
        x-transition:leave-start="opacity-100 scale-100"
        x-transition:leave-end="opacity-0 scale-95"
        class="{{ $panelClasses }}"
        role="menu"
        aria-orientation="vertical"
        x-on:click="$parent.activeMenu = null"
    >
        {{ $slot }}
    </div>
</div>

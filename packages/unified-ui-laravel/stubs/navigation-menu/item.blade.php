@props([
    'label'       => '',
    'href'        => null,
    'hasDropdown' => false,
    'value'       => null,
])

@php
    $itemId = 'nav-' . ($value ?? md5($label));
    $triggerClasses = implode(' ', [
        'group inline-flex items-center gap-1 h-9 px-4 rounded-[var(--ui-radius-md)]',
        'text-sm font-medium text-[oklch(var(--ui-foreground)/0.7)]',
        'hover:text-[oklch(var(--ui-foreground))] hover:bg-[oklch(var(--ui-accent))]',
        'transition-colors duration-[var(--ui-duration-fast)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--ui-ring))]',
        'select-none cursor-pointer',
    ]);
@endphp

<li
    class="relative list-none"
    x-data="{ itemId: '{{ $itemId }}' }"
    x-on:mouseenter="$parent.open(itemId)"
    x-on:mouseleave="$parent.scheduleClose()"
    data-ui-navigation-menu-item
>
    @if($href && !$hasDropdown)
        <a
            href="{{ $href }}"
            class="{{ $triggerClasses }}"
            :class="$parent.activeItem === itemId ? 'bg-[oklch(var(--ui-accent))] text-[oklch(var(--ui-foreground))]' : ''"
        >
            {{ $label }}
        </a>
    @else
        <button
            type="button"
            x-on:click="$parent.activeItem === itemId ? $parent.activeItem = null : $parent.open(itemId)"
            :aria-expanded="($parent.activeItem === itemId).toString()"
            class="{{ $triggerClasses }}"
            :class="$parent.activeItem === itemId ? 'bg-[oklch(var(--ui-accent))] text-[oklch(var(--ui-foreground))]' : ''"
        >
            {{ $label }}
            @if($hasDropdown)
                <svg class="h-3.5 w-3.5 transition-transform duration-[var(--ui-duration-fast)]" :class="$parent.activeItem === itemId ? 'rotate-180' : ''" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            @endif
        </button>
    @endif

    {{-- Dropdown content --}}
    @if($hasDropdown && isset($content))
        <div
            x-show="$parent.activeItem === itemId"
            x-cloak
            x-transition:enter="transition ease-[var(--ui-ease-out)] duration-[var(--ui-duration-normal)] origin-top"
            x-transition:enter-start="opacity-0 translate-y-1 scale-95"
            x-transition:enter-end="opacity-100 translate-y-0 scale-100"
            x-transition:leave="transition ease-[var(--ui-ease-in)] duration-[var(--ui-duration-fast)] origin-top"
            x-transition:leave-start="opacity-100 translate-y-0 scale-100"
            x-transition:leave-end="opacity-0 translate-y-1 scale-95"
            x-on:mouseenter="$parent.cancelClose()"
            x-on:mouseleave="$parent.scheduleClose()"
            class="absolute top-full left-0 z-[var(--ui-z-dropdown,50)] mt-1.5 min-w-[16rem] rounded-[var(--ui-radius-lg)] border border-[oklch(var(--ui-border))] bg-[oklch(var(--ui-popover))] shadow-[var(--ui-shadow-lg)] outline-none"
        >
            {{ $content }}
        </div>
    @endif
</li>

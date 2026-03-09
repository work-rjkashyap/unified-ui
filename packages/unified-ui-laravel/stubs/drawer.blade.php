@props([
    'side'        => 'bottom',
    'size'        => 'md',
    'title'       => null,
    'description' => null,
    'dismissible' => true,
    'showHandle'  => true,
    'showClose'   => true,
    'overlay'     => true,
])

@php
    $isHorizontal = in_array($side, ['left', 'right']);
    $isVertical   = in_array($side, ['top', 'bottom']);

    $sizeClasses = match (true) {
        $isHorizontal && $size === 'sm'   => 'w-72',
        $isHorizontal && $size === 'md'   => 'w-80 sm:w-96',
        $isHorizontal && $size === 'lg'   => 'w-[28rem] sm:w-[32rem]',
        $isHorizontal && $size === 'xl'   => 'w-[36rem] sm:w-[42rem]',
        $isHorizontal && $size === 'full' => 'w-screen',
        $isVertical   && $size === 'sm'   => 'max-h-[30vh]',
        $isVertical   && $size === 'md'   => 'max-h-[50vh]',
        $isVertical   && $size === 'lg'   => 'max-h-[75vh]',
        $isVertical   && $size === 'xl'   => 'max-h-[90vh]',
        $isVertical   && $size === 'full' => 'max-h-[calc(100vh-2rem)]',
        default => $isHorizontal ? 'w-80 sm:w-96' : 'max-h-[50vh]',
    };

    $positionClasses = match ($side) {
        'left'  => 'inset-y-0 left-0',
        'right' => 'inset-y-0 right-0',
        'top'   => 'inset-x-0 top-0',
        default => 'inset-x-0 bottom-0',
    };

    $extentClasses = $isHorizontal ? 'h-full' : 'w-full';

    $roundedClasses = match ($side) {
        'left'  => 'rounded-r-lg',
        'right' => 'rounded-l-lg',
        'top'   => 'rounded-b-lg',
        default => 'rounded-t-lg',
    };

    $borderClasses = match ($side) {
        'left'  => 'border-r border-[oklch(var(--ui-border))]',
        'right' => 'border-l border-[oklch(var(--ui-border))]',
        'top'   => 'border-b border-[oklch(var(--ui-border))]',
        default => 'border-t border-[oklch(var(--ui-border))]',
    };

    $enterStart = match ($side) {
        'left'  => '-translate-x-full',
        'right' => 'translate-x-full',
        'top'   => '-translate-y-full',
        default => 'translate-y-full',
    };

    $enterEnd = $isHorizontal ? 'translate-x-0' : 'translate-y-0';

    $panelClasses = implode(' ', [
        'fixed', $positionClasses, $extentClasses, $sizeClasses,
        $roundedClasses, $borderClasses,
        'bg-[oklch(var(--ui-background))]',
        'shadow-xl flex flex-col z-[var(--ui-z-modal)] focus:outline-none overflow-hidden',
    ]);
@endphp

<div
    x-data="{ open: false }"
    x-modelable="open"
    {{ $attributes->except(['class']) }}
    data-ui-drawer
    data-ui-drawer-side="{{ $side }}"
>
    @if(isset($trigger))
        <div x-on:click="open = true" class="inline-flex cursor-pointer">
            {{ $trigger }}
        </div>
    @endif

    <template x-teleport="body">
        <div
            x-show="open"
            x-trap.noscroll.inert="open"
            @if($dismissible) x-on:keydown.escape.window="open = false" @endif
            class="relative z-[var(--ui-z-modal)]"
            role="dialog"
            aria-modal="true"
            @if($title) aria-label="{{ $title }}" @endif
            x-cloak
        >
            @if($overlay)
                <div
                    x-show="open"
                    x-transition:enter="transition ease-out duration-[var(--ui-duration-normal)]"
                    x-transition:enter-start="opacity-0"
                    x-transition:enter-end="opacity-100"
                    x-transition:leave="transition ease-in duration-[var(--ui-duration-fast)]"
                    x-transition:leave-start="opacity-100"
                    x-transition:leave-end="opacity-0"
                    @if($dismissible) x-on:click="open = false" @endif
                    class="fixed inset-0 bg-[oklch(var(--ui-background)/0.6)] backdrop-blur-sm z-[var(--ui-z-overlay)]"
                    aria-hidden="true"
                ></div>
            @endif

            <div
                x-show="open"
                x-transition:enter="transition ease-out duration-[var(--ui-duration-slow)]"
                x-transition:enter-start="{{ $enterStart }}"
                x-transition:enter-end="{{ $enterEnd }}"
                x-transition:leave="transition ease-in duration-[var(--ui-duration-normal)]"
                x-transition:leave-start="{{ $enterEnd }}"
                x-transition:leave-end="{{ $enterStart }}"
                class="{{ $panelClasses }}"
                tabindex="-1"
            >
                @if($showHandle && $isVertical)
                    <div class="flex shrink-0 justify-center pb-1 pt-3" aria-hidden="true">
                        <div class="h-1.5 w-12 rounded-full bg-[oklch(var(--ui-muted-foreground)/0.25)]"></div>
                    </div>
                @endif

                @if($title || $showClose)
                    <div class="flex shrink-0 items-start justify-between gap-4 border-b border-[oklch(var(--ui-border))] px-6 py-4">
                        <div class="flex min-w-0 flex-col gap-1">
                            @if($title)
                                <h2 class="truncate text-lg font-semibold leading-tight text-[oklch(var(--ui-foreground))]">
                                    {{ $title }}
                                </h2>
                            @endif
                            @if($description)
                                <p class="text-sm leading-normal text-[oklch(var(--ui-muted-foreground))]">
                                    {{ $description }}
                                </p>
                            @endif
                        </div>

                        @if($showClose)
                            <button
                                type="button"
                                x-on:click="open = false"
                                class="shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-[var(--ui-radius-sm)] text-[oklch(var(--ui-muted-foreground))] hover:text-[oklch(var(--ui-foreground))] hover:bg-[oklch(var(--ui-accent))] transition-colors duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-default)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--ui-ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(var(--ui-background))]"
                                aria-label="Close"
                            >
                                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        @endif
                    </div>
                @endif

                <div class="flex-1 overflow-y-auto px-6 py-6">
                    {{ $slot }}
                </div>

                @if(isset($footer))
                    <div class="shrink-0 flex items-center justify-end gap-3 border-t border-[oklch(var(--ui-border))] px-6 py-4">
                        {{ $footer }}
                    </div>
                @endif
            </div>
        </div>
    </template>
</div>

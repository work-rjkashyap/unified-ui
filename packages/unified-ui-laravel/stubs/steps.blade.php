@props([
    'currentStep' => 0,
    'orientation' => 'horizontal',
    'variant' => 'default',
    'steps' => [],
    'onStepClick' => null,
])

@php
    // ── Orientation classes ──────────────────────────────────────────
    $orientationClasses = match ($orientation) {
        'vertical' => 'flex-col gap-0',
        default    => 'flex-row items-start gap-0',
    };

    // ── Total steps ──────────────────────────────────────────────────
    $totalSteps = count($steps);
@endphp

<ol
    aria-label="Steps"
    {{ $attributes->class(['flex ' . $orientationClasses]) }}
    data-ui-steps
    data-ui-steps-orientation="{{ $orientation }}"
    data-ui-steps-variant="{{ $variant }}"
>
    @foreach ($steps as $index => $step)
        @php
            $isLast   = $index === $totalSteps - 1;
            $status   = $index < $currentStep
                ? 'complete'
                : ($index === $currentStep ? 'active' : 'upcoming');

            // ── Indicator classes ────────────────────────────────────
            $indicatorClasses = match ($variant) {
                'dots' => implode(' ', [
                    'h-2 w-2 rounded-full',
                    $status === 'complete' ? 'bg-[oklch(var(--ui-primary))]' : '',
                    $status === 'active'   ? 'bg-[oklch(var(--ui-primary))]' : '',
                    $status === 'upcoming' ? 'bg-[oklch(var(--ui-border))]'  : '',
                ]),
                'outline' => implode(' ', [
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2',
                    'text-xs font-medium leading-none',
                    'transition-colors duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-default)]',
                    $status === 'complete' ? 'border-[oklch(var(--ui-primary))] bg-[oklch(var(--ui-primary)/0.1)] text-[oklch(var(--ui-primary))]' : '',
                    $status === 'active'   ? 'border-[oklch(var(--ui-primary))] bg-[oklch(var(--ui-background))] text-[oklch(var(--ui-primary))]' : '',
                    $status === 'upcoming' ? 'border-[oklch(var(--ui-muted))] bg-[oklch(var(--ui-background))] text-[oklch(var(--ui-muted-foreground))]' : '',
                ]),
                default => implode(' ', [
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2',
                    'text-xs font-medium leading-none',
                    'transition-colors duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-default)]',
                    $status === 'complete' ? 'border-[oklch(var(--ui-primary))] bg-[oklch(var(--ui-primary))] text-[oklch(var(--ui-primary-foreground))]' : '',
                    $status === 'active'   ? 'border-[oklch(var(--ui-primary))] bg-[oklch(var(--ui-background))] text-[oklch(var(--ui-primary))]' : '',
                    $status === 'upcoming' ? 'border-[oklch(var(--ui-muted))] bg-[oklch(var(--ui-background))] text-[oklch(var(--ui-muted-foreground))]' : '',
                ]),
            };

            // ── Connector classes ────────────────────────────────────
            $connectorClasses = implode(' ', [
                'flex-1 transition-colors duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-default)]',
                $orientation === 'vertical'
                    ? 'ml-3.5 my-1 w-px self-stretch'
                    : 'mx-2 mt-3.5 h-px',
                $index < $currentStep
                    ? 'bg-[oklch(var(--ui-primary))]'
                    : 'bg-[oklch(var(--ui-border))]',
            ]);

            // ── Label classes ────────────────────────────────────────
            $titleClasses = implode(' ', [
                'text-sm font-medium leading-5',
                $status === 'upcoming'
                    ? 'text-[oklch(var(--ui-muted-foreground))]'
                    : 'text-[oklch(var(--ui-foreground))]',
            ]);

            $title       = is_array($step) ? ($step['title'] ?? '')       : $step;
            $description = is_array($step) ? ($step['description'] ?? '') : '';
            $icon        = is_array($step) ? ($step['icon'] ?? null)      : null;
            $clickable   = !is_null($onStepClick);
        @endphp

        <li
            @if($status === 'active') aria-current="step" @endif
            data-ui-step
            data-ui-step-status="{{ $status }}"
            data-ui-step-index="{{ $index }}"
            class="{{ $orientation === 'horizontal' ? 'flex flex-1 items-start' : 'flex flex-col' }}"
        >
            @if($orientation === 'horizontal')
                {{-- Horizontal: indicator + label stacked, then connector --}}
                @if($clickable)
                    <button
                        type="button"
                        onclick="{{ $onStepClick }}({{ $index }})"
                        aria-label="{{ $title ? 'Go to step: ' . $title : 'Go to step ' . ($index + 1) }}"
                        class="flex flex-1 cursor-pointer flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--ui-ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(var(--ui-background))] rounded-sm"
                    >
                @else
                    <div class="flex flex-1 flex-col items-center">
                @endif

                    {{-- Indicator --}}
                    <div class="{{ $indicatorClasses }}" @if($variant === 'dots') aria-hidden="true" @endif>
                        @if($variant !== 'dots')
                            @if($status === 'complete' && $variant !== 'outline')
                                {{-- Checkmark --}}
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2.5"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            @elseif($icon)
                                {!! $icon !!}
                            @else
                                <span>{{ $index + 1 }}</span>
                            @endif
                        @endif
                    </div>

                    {{-- Label --}}
                    @if($title || $description)
                        <div class="mt-2 text-center">
                            @if($title)
                                <p class="{{ $titleClasses }}">{{ $title }}</p>
                            @endif
                            @if($description)
                                <p class="mt-0.5 text-xs leading-4 text-[oklch(var(--ui-muted-foreground))]">
                                    {{ $description }}
                                </p>
                            @endif
                        </div>
                    @endif

                @if($clickable)
                    </button>
                @else
                    </div>
                @endif

                {{-- Horizontal connector --}}
                @if(!$isLast)
                    <div aria-hidden="true" class="{{ $connectorClasses }}"></div>
                @endif

            @else
                {{-- Vertical: icon column with embedded connector + label beside --}}
                <div class="flex items-start">
                    <div class="flex flex-col items-center">
                        {{-- Indicator --}}
                        <div class="{{ $indicatorClasses }}" @if($variant === 'dots') aria-hidden="true" @endif>
                            @if($variant !== 'dots')
                                @if($status === 'complete' && $variant !== 'outline')
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2.5"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                @elseif($icon)
                                    {!! $icon !!}
                                @else
                                    <span>{{ $index + 1 }}</span>
                                @endif
                            @endif
                        </div>

                        {{-- Vertical connector --}}
                        @if(!$isLast)
                            <div
                                aria-hidden="true"
                                class="mt-1 min-h-[24px] w-px flex-1 self-stretch transition-colors duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-default)] {{ $index < $currentStep ? 'bg-[oklch(var(--ui-primary))]' : 'bg-[oklch(var(--ui-border))]' }}"
                            ></div>
                        @endif
                    </div>

                    {{-- Label --}}
                    @if($title || $description)
                        <div class="ml-3 pb-8 text-left {{ $isLast ? 'pb-0' : '' }}">
                            @if($title)
                                <p class="{{ $titleClasses }}">{{ $title }}</p>
                            @endif
                            @if($description)
                                <p class="mt-0.5 text-xs leading-4 text-[oklch(var(--ui-muted-foreground))]">
                                    {{ $description }}
                                </p>
                            @endif
                        </div>
                    @endif
                </div>
            @endif
        </li>
    @endforeach
</ol>

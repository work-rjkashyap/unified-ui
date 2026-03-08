{{--
    Unified UI — Slider Component
    https://unified-ui.space

    A styled range slider input with min/max, step, value display,
    and accessible labeling. Built with Alpine.js for interactive
    value tracking and design token integration.

    Usage:
        {{-- Basic slider --}}
        <x-ui-slider name="volume" label="Volume" />

        {{-- With explicit value --}}
        <x-ui-slider name="volume" label="Volume" :value="50" />

        {{-- With min, max, and step --}}
        <x-ui-slider name="opacity" label="Opacity" :min="0" :max="100" :step="5" :value="75" />

        {{-- Show current value --}}
        <x-ui-slider name="brightness" label="Brightness" :value="60" show-value />

        {{-- Show value with custom format --}}
        <x-ui-slider name="price" label="Max Price" :min="0" :max="1000" :value="250" show-value prefix="$" />

        {{-- Show value with suffix --}}
        <x-ui-slider name="temperature" label="Temperature" :min="60" :max="90" :value="72" show-value suffix="°F" />

        {{-- With ticks / markers --}}
        <x-ui-slider name="rating" label="Rating" :min="1" :max="5" :step="1" :value="3" show-value show-ticks />

        {{-- With min/max labels --}}
        <x-ui-slider name="range" label="Range" :min="0" :max="100" :value="50" show-min-max />

        {{-- Different sizes --}}
        <x-ui-slider name="sm" label="Small" size="sm" :value="40" />
        <x-ui-slider name="md" label="Medium" size="md" :value="60" />
        <x-ui-slider name="lg" label="Large" size="lg" :value="80" />

        {{-- Variant colors --}}
        <x-ui-slider name="primary" label="Primary" variant="primary" :value="50" />
        <x-ui-slider name="success" label="Success" variant="success" :value="75" />
        <x-ui-slider name="warning" label="Warning" variant="warning" :value="30" />
        <x-ui-slider name="destructive" label="Danger" variant="destructive" :value="90" />

        {{-- Disabled --}}
        <x-ui-slider name="locked" label="Locked" :value="50" disabled />

        {{-- Without label (provide aria-label) --}}
        <x-ui-slider name="zoom" :value="100" :min="50" :max="200" aria-label="Zoom level" show-value suffix="%" />

        {{-- With help text --}}
        <x-ui-slider name="quality" label="Quality" :value="80" help="Higher values produce larger files." show-value suffix="%" />

        {{-- With error --}}
        <x-ui-slider name="threshold" label="Threshold" :value="10" error="Value must be at least 20." />

        {{-- Full-width (default) vs fixed width --}}
        <x-ui-slider name="vol" label="Volume" :value="50" class="max-w-xs" />

        {{-- Inverted fill (fill from the right) --}}
        <x-ui-slider name="discount" label="Discount" :value="25" :max="100" show-value suffix="%" fill="end" />

    Props:
        name       — form field name attribute
        id         — optional element id (defaults to name)
        label      — optional label text rendered above the slider
        value      — current slider value (default: null — defaults to min)
        min        — minimum allowed value (default: 0)
        max        — maximum allowed value (default: 100)
        step       — step increment (default: 1)
        size       — sm|md|lg (default: md) — controls track and thumb size
        variant    — default|primary|success|warning|destructive (default: default)
        showValue  — boolean, displays the current value (default: false)
        prefix     — optional text before the displayed value (e.g. "$")
        suffix     — optional text after the displayed value (e.g. "%")
        showMinMax — boolean, shows min and max labels below the track (default: false)
        showTicks  — boolean, shows tick marks at each step (default: false)
        fill       — start|end|none (default: start) — which side of the thumb to fill with color
        disabled   — boolean (default: false)
        required   — boolean (default: false)
        help       — optional help text rendered below the slider
        error      — optional error message (overrides help when present)
        fullWidth  — boolean, makes the slider 100% width (default: true)
--}}

@props([
    'name' => null,
    'id' => null,
    'label' => null,
    'value' => null,
    'min' => 0,
    'max' => 100,
    'step' => 1,
    'size' => 'md',
    'variant' => 'default',
    'showValue' => false,
    'prefix' => null,
    'suffix' => null,
    'showMinMax' => false,
    'showTicks' => false,
    'fill' => 'start',
    'disabled' => false,
    'required' => false,
    'help' => null,
    'error' => null,
    'fullWidth' => true,
])

@php
    $inputId = $id ?? $name;
    $numMin = (float) $min;
    $numMax = (float) $max;
    $numStep = max(0.001, (float) $step);
    $numValue = $value !== null ? (float) $value : $numMin;
    $numValue = max($numMin, min($numMax, $numValue));
    $hasError = !empty($error);

    $describedBy = [];
    if ($help && !$hasError && $inputId) { $describedBy[] = "{$inputId}-help"; }
    if ($hasError && $inputId) { $describedBy[] = "{$inputId}-error"; }

    // ── Variant accent color ─────────────────────────────────────────
    $accentColor = match ($variant) {
        'success'     => '--ui-success',
        'warning'     => '--ui-warning',
        'destructive' => '--ui-destructive',
        'primary'     => '--ui-primary',
        default       => '--ui-primary',
    };

    // ── Size classes ─────────────────────────────────────────────────
    $trackHeightClasses = match ($size) {
        'sm' => 'h-1',
        'md' => 'h-1.5',
        'lg' => 'h-2',
        default => 'h-1.5',
    };

    $thumbSizeClasses = match ($size) {
        'sm' => 'h-3.5 w-3.5',
        'md' => 'h-4.5 w-4.5',
        'lg' => 'h-5.5 w-5.5',
        default => 'h-4.5 w-4.5',
    };

    // For the native range input, we use CSS custom properties to style
    $thumbSize = match ($size) {
        'sm' => '14px',
        'md' => '18px',
        'lg' => '22px',
        default => '18px',
    };

    $trackHeight = match ($size) {
        'sm' => '4px',
        'md' => '6px',
        'lg' => '8px',
        default => '6px',
    };

    $labelSizeClasses = match ($size) {
        'sm' => 'text-xs',
        'md' => 'text-sm',
        'lg' => 'text-base',
        default => 'text-sm',
    };

    $valueSizeClasses = match ($size) {
        'sm' => 'text-xs',
        'md' => 'text-sm',
        'lg' => 'text-base',
        default => 'text-sm',
    };

    $helpSizeClasses = match ($size) {
        'sm' => 'text-[10px]',
        'md' => 'text-xs',
        'lg' => 'text-sm',
        default => 'text-xs',
    };

    $minMaxSizeClasses = match ($size) {
        'sm' => 'text-[10px]',
        'md' => 'text-xs',
        'lg' => 'text-xs',
        default => 'text-xs',
    };

    $tickSizeClasses = match ($size) {
        'sm' => 'h-1 w-px',
        'md' => 'h-1.5 w-px',
        'lg' => 'h-2 w-px',
        default => 'h-1.5 w-px',
    };

    // ── Width ────────────────────────────────────────────────────────
    $widthClass = $fullWidth ? 'w-full' : '';

    // ── Tick marks ───────────────────────────────────────────────────
    $ticks = [];
    if ($showTicks && $numStep > 0 && ($numMax - $numMin) / $numStep <= 100) {
        for ($t = $numMin; $t <= $numMax; $t += $numStep) {
            $pct = (($t - $numMin) / ($numMax - $numMin)) * 100;
            $ticks[] = ['value' => $t, 'percent' => $pct];
        }
    }

    // ── Unique component ID for scoped CSS ───────────────────────────
    $componentId = 'ui-slider-' . ($inputId ?? \Illuminate\Support\Str::random(6));
@endphp

<div
    x-data="{
        value: @js($numValue),
        min: @js($numMin),
        max: @js($numMax),
        step: @js($numStep),
        prefix: @js($prefix ?? ''),
        suffix: @js($suffix ?? ''),
        fill: @js($fill),

        get percent() {
            if (this.max === this.min) return 0;
            return ((this.value - this.min) / (this.max - this.min)) * 100;
        },

        get displayValue() {
            let v = Number.isInteger(this.step) ? this.value.toString() : this.value.toFixed(
                this.step.toString().includes('.') ? this.step.toString().split('.')[1].length : 0
            );
            return this.prefix + v + this.suffix;
        },

        get fillStyle() {
            if (this.fill === 'none') return 'background: oklch(var(--ui-muted));';
            if (this.fill === 'end') {
                return `background: linear-gradient(to right, oklch(var(--ui-muted)) ${this.percent}%, oklch(var({{ $accentColor }})) ${this.percent}%);`;
            }
            return `background: linear-gradient(to right, oklch(var({{ $accentColor }})) ${this.percent}%, oklch(var(--ui-muted)) ${this.percent}%);`;
        },

        updateValue(event) {
            this.value = parseFloat(event.target.value);
        }
    }"
    {{ $attributes->only('class')->class([trim("{$widthClass}")]) }}
    data-ui-slider
    data-ui-slider-variant="{{ $variant }}"
>
    {{-- Label + Value row --}}
    @if($label || $showValue)
        <div class="flex items-center justify-between mb-1.5">
            @if($label)
                <label
                    @if($inputId) for="{{ $inputId }}" @endif
                    class="{{ $labelSizeClasses }} font-medium text-[oklch(var(--ui-foreground))] {{ $disabled ? 'opacity-50' : '' }}"
                >
                    {{ $label }}
                    @if($required)
                        <span class="text-[oklch(var(--ui-destructive))] ml-0.5" aria-hidden="true">*</span>
                    @endif
                </label>
            @else
                <span></span>
            @endif

            @if($showValue)
                <span
                    class="{{ $valueSizeClasses }} font-medium tabular-nums text-[oklch(var(--ui-foreground))] {{ $disabled ? 'opacity-50' : '' }}"
                    x-text="displayValue"
                    aria-hidden="true"
                ></span>
            @endif
        </div>
    @endif

    {{-- Range input --}}
    <div class="relative {{ $disabled ? 'opacity-50 cursor-not-allowed' : '' }}">
        <input
            type="range"
            @if($name) name="{{ $name }}" @endif
            @if($inputId) id="{{ $inputId }}" @endif
            min="{{ $numMin }}"
            max="{{ $numMax }}"
            step="{{ $numStep }}"
            x-model.number="value"
            x-on:input="updateValue($event)"
            @if($disabled) disabled @endif
            @if($required) required @endif
            @if($hasError) aria-invalid="true" @endif
            @if(!empty($describedBy)) aria-describedby="{{ implode(' ', $describedBy) }}" @endif
            x-bind:style="fillStyle"
            class="
                w-full
                appearance-none
                bg-transparent
                cursor-pointer
                disabled:cursor-not-allowed
                focus-visible:outline-none

                {{-- Webkit (Chrome, Safari, Edge) track --}}
                [&::-webkit-slider-runnable-track]:rounded-full
                [&::-webkit-slider-runnable-track]:{{ $trackHeightClasses }}

                {{-- Webkit thumb --}}
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:{{ $thumbSizeClasses }}
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-[oklch(var({{ $accentColor }}))]
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-[oklch(var(--ui-background))]
                [&::-webkit-slider-thumb]:shadow-md
                [&::-webkit-slider-thumb]:transition-all
                [&::-webkit-slider-thumb]:duration-[var(--ui-duration-fast)]
                [&::-webkit-slider-thumb]:ease-[var(--ui-ease-default)]
                [&::-webkit-slider-thumb]:hover:scale-110
                [&::-webkit-slider-thumb]:active:scale-95
                [&::-webkit-slider-thumb]:-mt-[{{ intval(str_replace('px', '', $thumbSize)) / 2 - intval(str_replace('px', '', $trackHeight)) / 2 }}px]

                {{-- Firefox track --}}
                [&::-moz-range-track]:rounded-full
                [&::-moz-range-track]:{{ $trackHeightClasses }}
                [&::-moz-range-track]:bg-[oklch(var(--ui-muted))]

                {{-- Firefox thumb --}}
                [&::-moz-range-thumb]:{{ $thumbSizeClasses }}
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-[oklch(var({{ $accentColor }}))]
                [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-[oklch(var(--ui-background))]
                [&::-moz-range-thumb]:shadow-md
                [&::-moz-range-thumb]:transition-all
                [&::-moz-range-thumb]:duration-[var(--ui-duration-fast)]
                [&::-moz-range-thumb]:ease-[var(--ui-ease-default)]
                [&::-moz-range-thumb]:hover:scale-110
                [&::-moz-range-thumb]:active:scale-95

                {{-- Firefox progress (filled portion) --}}
                @if($fill === 'start')
                    [&::-moz-range-progress]:bg-[oklch(var({{ $accentColor }}))]
                    [&::-moz-range-progress]:rounded-full
                    [&::-moz-range-progress]:{{ $trackHeightClasses }}
                @endif

                {{-- Focus ring --}}
                [&:focus-visible::-webkit-slider-thumb]:ring-2
                [&:focus-visible::-webkit-slider-thumb]:ring-[oklch(var({{ $accentColor }})/0.4)]
                [&:focus-visible::-webkit-slider-thumb]:ring-offset-2
                [&:focus-visible::-webkit-slider-thumb]:ring-offset-[oklch(var(--ui-background))]

                [&:focus-visible::-moz-range-thumb]:ring-2
                [&:focus-visible::-moz-range-thumb]:ring-[oklch(var({{ $accentColor }})/0.4)]
                [&:focus-visible::-moz-range-thumb]:ring-offset-2
                [&:focus-visible::-moz-range-thumb]:ring-offset-[oklch(var(--ui-background))]

                @if($hasError)
                    [&::-webkit-slider-thumb]:bg-[oklch(var(--ui-destructive))]
                    [&::-moz-range-thumb]:bg-[oklch(var(--ui-destructive))]
                    @if($fill === 'start')
                        [&::-moz-range-progress]:bg-[oklch(var(--ui-destructive))]
                    @endif
                @endif
            "
            {{ $attributes->except(['class']) }}
            data-ui-slider-input
        />

        {{-- Tick marks overlay --}}
        @if($showTicks && count($ticks) > 0)
            <div
                class="absolute inset-x-0 flex justify-between pointer-events-none"
                style="top: calc(50% + {{ intval(str_replace('px', '', $trackHeight)) / 2 + 4 }}px);"
                aria-hidden="true"
            >
                @foreach($ticks as $tick)
                    <span
                        class="{{ $tickSizeClasses }} bg-[oklch(var(--ui-muted-foreground)/0.3)]"
                        style="position: absolute; left: {{ $tick['percent'] }}%; transform: translateX(-50%);"
                    ></span>
                @endforeach
            </div>
        @endif
    </div>

    {{-- Min / Max labels --}}
    @if($showMinMax)
        <div class="flex items-center justify-between mt-1 {{ $disabled ? 'opacity-50' : '' }}">
            <span class="{{ $minMaxSizeClasses }} text-[oklch(var(--ui-muted-foreground))] tabular-nums">
                @if($prefix){{ $prefix }}@endif{{ $numMin }}@if($suffix){{ $suffix }}@endif
            </span>
            <span class="{{ $minMaxSizeClasses }} text-[oklch(var(--ui-muted-foreground))] tabular-nums">
                @if($prefix){{ $prefix }}@endif{{ $numMax }}@if($suffix){{ $suffix }}@endif
            </span>
        </div>
    @endif

    {{-- Tick labels (when showTicks and step count is small enough) --}}
    @if($showTicks && count($ticks) > 0 && count($ticks) <= 11)
        <div
            class="relative w-full mt-{{ $showMinMax ? '0.5' : '1' }} {{ $disabled ? 'opacity-50' : '' }}"
            aria-hidden="true"
        >
            @foreach($ticks as $tick)
                <span
                    class="absolute {{ $minMaxSizeClasses }} text-[oklch(var(--ui-muted-foreground)/0.6)] tabular-nums -translate-x-1/2"
                    style="left: {{ $tick['percent'] }}%;"
                >{{ Number::isInteger($tick['value']) ? (int) $tick['value'] : $tick['value'] }}</span>
            @endforeach
        </div>
    @endif

    {{-- Help text --}}
    @if($help && !$hasError)
        <p
            @if($inputId) id="{{ $inputId }}-help" @endif
            class="{{ $helpSizeClasses }} text-[oklch(var(--ui-muted-foreground))] mt-1.5 leading-normal"
        >
            {{ $help }}
        </p>
    @endif

    {{-- Error message --}}
    @if($hasError)
        <p
            @if($inputId) id="{{ $inputId }}-error" @endif
            class="{{ $helpSizeClasses }} text-[oklch(var(--ui-destructive))] mt-1.5 leading-normal"
            role="alert"
        >
            <svg
                class="inline-block shrink-0 h-3.5 w-3.5 mr-0.5 -mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {{ $error }}
        </p>
    @endif
</div>

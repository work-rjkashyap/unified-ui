@props([
    'initial' => 0,
    'step' => 1,
    'min' => null,
    'max' => null,
    'label' => 'Counter',
])

@php
    $alpineData = json_encode([
        'count' => (int) $initial,
        'initial' => (int) $initial,
        'step' => max(1, (int) $step),
        'min' => $min !== null ? (int) $min : null,
        'max' => $max !== null ? (int) $max : null,
        'history' => [],
    ]);
@endphp

<div
    x-data="{
        ...{{ $alpineData }},

        increment() {
            let val = this.count + this.step;
            if (this.max !== null && val > this.max) val = this.max;
            if (val !== this.count) {
                this.history.push(this.count);
                this.count = val;
            }
        },

        decrement() {
            let val = this.count - this.step;
            if (this.min !== null && val < this.min) val = this.min;
            if (val !== this.count) {
                this.history.push(this.count);
                this.count = val;
            }
        },

        reset() {
            if (this.count !== this.initial) {
                this.history.push(this.count);
                this.count = this.initial;
            }
        },

        undo() {
            if (this.history.length > 0) {
                this.count = this.history.pop();
            }
        },

        setStep(val) {
            this.step = val;
        },

        get canDecrement() {
            return this.min === null || this.count > this.min;
        },

        get canIncrement() {
            return this.max === null || this.count < this.max;
        },

        get isModified() {
            return this.count !== this.initial;
        },

        get canUndo() {
            return this.history.length > 0;
        },

        get progress() {
            if (this.min === null || this.max === null) {
                return Math.min(100, Math.max(0, Math.abs(this.count)));
            }
            let range = this.max - this.min;
            if (range <= 0) return 0;
            return Math.round(((this.count - this.min) / range) * 100 * 10) / 10;
        },

        get progressVariant() {
            return this.count >= 0 ? '--ui-primary' : '--ui-destructive';
        }
    }"
    {{ $attributes }}
    data-ui-alpine-counter
>
    <x-ui::card variant="default">
        <x-ui::card.header bordered>
            <x-ui::card.title>{{ $label }}</x-ui::card.title>
            <x-ui::card.description>
                An interactive Alpine.js component using Unified UI tokens.
            </x-ui::card.description>
        </x-ui::card.header>

        <x-ui::card.body padding="lg">
            <div class="flex flex-col items-center gap-6">
                {{-- Counter display --}}
                <div class="flex items-center justify-center">
                    <span
                        class="
                            text-5xl font-bold tabular-nums tracking-tight
                            text-[oklch(var(--ui-foreground))]
                            transition-all duration-[var(--ui-duration-normal)] ease-[var(--ui-ease-bounce)]
                        "
                        x-text="count.toLocaleString()"
                    ></span>
                </div>

                {{-- Counter controls --}}
                <div class="flex items-center gap-3">
                    <x-ui::button
                        variant="outline"
                        size="md"
                        x-on:click="decrement()"
                        x-bind:disabled="!canDecrement"
                        aria-label="Decrement counter"
                    >
                        <svg
                            class="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M5 12h14" />
                        </svg>
                        <span>Decrement</span>
                    </x-ui::button>

                    <x-ui::button
                        variant="primary"
                        size="md"
                        x-on:click="increment()"
                        x-bind:disabled="!canIncrement"
                        aria-label="Increment counter"
                    >
                        <span>Increment</span>
                        <svg
                            class="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M12 5v14" />
                            <path d="M5 12h14" />
                        </svg>
                    </x-ui::button>
                </div>

                {{-- Step size selector --}}
                <div class="flex items-center gap-2">
                    <span class="text-sm text-[oklch(var(--ui-muted-foreground))]">
                        Step:
                    </span>
                    <template x-for="s in [1, 5, 10]" :key="s">
                        <button
                            type="button"
                            class="
                                inline-flex items-center justify-center
                                h-7 px-2.5 text-xs font-medium
                                rounded-[var(--ui-radius-sm)]
                                transition-colors duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-default)]
                                focus-visible:outline-none focus-visible:ring-2
                                focus-visible:ring-[oklch(var(--ui-ring))]
                                focus-visible:ring-offset-2
                                focus-visible:ring-offset-[oklch(var(--ui-background))]
                            "
                            x-bind:class="step === s
                                ? 'bg-[oklch(var(--ui-secondary))] text-[oklch(var(--ui-secondary-foreground))]'
                                : 'bg-transparent text-[oklch(var(--ui-foreground))] hover:bg-[oklch(var(--ui-accent))] hover:text-[oklch(var(--ui-accent-foreground))]'"
                            x-on:click="setStep(s)"
                            x-text="s"
                        ></button>
                    </template>
                </div>

                {{-- Progress indicator --}}
                <div class="w-full max-w-xs">
                    <div
                        class="h-1.5 w-full rounded-full bg-[oklch(var(--ui-muted))] overflow-hidden"
                        role="progressbar"
                        x-bind:aria-valuenow="progress"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-label="Counter progress"
                    >
                        <div
                            class="h-full rounded-full transition-all duration-[var(--ui-duration-slow)] ease-[var(--ui-ease-out)]"
                            x-bind:class="count >= 0
                                ? 'bg-[oklch(var(--ui-primary))]'
                                : 'bg-[oklch(var(--ui-destructive))]'"
                            x-bind:style="'width: ' + progress + '%'"
                        ></div>
                    </div>
                    <p
                        class="mt-1.5 text-center text-xs text-[oklch(var(--ui-muted-foreground))]"
                        x-text="progress + '% of 100'"
                    ></p>
                </div>

                {{-- Undo button --}}
                <div
                    x-show="canUndo"
                    x-transition:enter="ui-fade-enter"
                    x-transition:enter-start="ui-fade-enter-start"
                    x-transition:enter-end="ui-fade-enter-end"
                    x-transition:leave="ui-fade-leave"
                    x-transition:leave-start="ui-fade-leave-start"
                    x-transition:leave-end="ui-fade-leave-end"
                >
                    <button
                        type="button"
                        class="
                            inline-flex items-center gap-1.5 text-xs font-medium
                            text-[oklch(var(--ui-muted-foreground))]
                            hover:text-[oklch(var(--ui-foreground))]
                            transition-colors duration-[var(--ui-duration-fast)]
                        "
                        x-on:click="undo()"
                    >
                        <svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M3 7v6h6" />
                            <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                        </svg>
                        <span>Undo</span>
                    </button>
                </div>
            </div>
        </x-ui::card.body>

        <x-ui::card.footer bordered justify="between">
            <span
                class="text-xs text-[oklch(var(--ui-muted-foreground))]"
                x-text="'Step size: ' + step"
            ></span>

            <x-ui::button
                variant="ghost"
                size="sm"
                x-on:click="reset()"
                x-bind:disabled="!isModified"
            >
                Reset
            </x-ui::button>
        </x-ui::card.footer>
    </x-ui::card>
</div>

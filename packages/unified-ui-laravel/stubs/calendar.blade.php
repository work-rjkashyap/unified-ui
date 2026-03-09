@props([
    'value'        => null,
    'min'          => null,
    'max'          => null,
    'disabled'     => false,
    'name'         => null,
    'firstDayOfWeek' => 0,
])

{{--
    Calendar — month-view date picker calendar.

    Dispatches: calendar-change { date: 'YYYY-MM-DD' }

    Usage:
        <x-calendar name="due_date" :value="$task->due_date" />
--}}

<div
    x-data="{
        selected: '{{ $value ?? '' }}',
        viewing: null,
        disabled: {{ $disabled ? 'true' : 'false' }},
        min: '{{ $min ?? '' }}',
        max: '{{ $max ?? '' }}',

        init() {
            const base = this.selected ? new Date(this.selected) : new Date();
            this.viewing = new Date(base.getFullYear(), base.getMonth(), 1);
        },

        get year()  { return this.viewing.getFullYear(); },
        get month() { return this.viewing.getMonth(); },

        get monthName() {
            return this.viewing.toLocaleString('default', { month: 'long', year: 'numeric' });
        },

        get weekdays() {
            const days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
            const start = {{ $firstDayOfWeek }};
            return [...days.slice(start), ...days.slice(0, start)];
        },

        get cells() {
            const first = new Date(this.year, this.month, 1);
            const startDow = (first.getDay() - {{ $firstDayOfWeek }} + 7) % 7;
            const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
            const cells = [];
            for (let i = 0; i < startDow; i++) cells.push(null);
            for (let d = 1; d <= daysInMonth; d++) cells.push(d);
            while (cells.length % 7 !== 0) cells.push(null);
            return cells;
        },

        dateStr(d) {
            if (!d) return '';
            const m = String(this.month + 1).padStart(2, '0');
            const dd = String(d).padStart(2, '0');
            return `${this.year}-${m}-${dd}`;
        },

        isSelected(d) { return d && this.dateStr(d) === this.selected; },
        isToday(d) {
            if (!d) return false;
            const t = new Date();
            return d === t.getDate() && this.month === t.getMonth() && this.year === t.getFullYear();
        },
        isDisabled(d) {
            if (!d) return true;
            const s = this.dateStr(d);
            if (this.min && s < this.min) return true;
            if (this.max && s > this.max) return true;
            return false;
        },

        select(d) {
            if (!d || this.isDisabled(d) || this.disabled) return;
            this.selected = this.dateStr(d);
            this.$dispatch('calendar-change', { date: this.selected });
        },

        prevMonth() { this.viewing = new Date(this.year, this.month - 1, 1); },
        nextMonth() { this.viewing = new Date(this.year, this.month + 1, 1); },
    }"
    {{ $attributes->class(['inline-block rounded-[var(--ui-radius-lg)] border border-[oklch(var(--ui-border))] bg-[oklch(var(--ui-background))] p-3 shadow-sm select-none']) }}
    data-ui-calendar
>
    {{-- Navigation header --}}
    <div class="flex items-center justify-between mb-3">
        <button
            type="button"
            x-on:click="prevMonth()"
            class="inline-flex items-center justify-center h-7 w-7 rounded-[var(--ui-radius-sm)] text-[oklch(var(--ui-muted-foreground))] hover:bg-[oklch(var(--ui-accent))] hover:text-[oklch(var(--ui-foreground))] transition-colors duration-[var(--ui-duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--ui-ring))]"
            aria-label="Previous month"
        >
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        <span class="text-sm font-medium text-[oklch(var(--ui-foreground))]" x-text="monthName"></span>

        <button
            type="button"
            x-on:click="nextMonth()"
            class="inline-flex items-center justify-center h-7 w-7 rounded-[var(--ui-radius-sm)] text-[oklch(var(--ui-muted-foreground))] hover:bg-[oklch(var(--ui-accent))] hover:text-[oklch(var(--ui-foreground))] transition-colors duration-[var(--ui-duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--ui-ring))]"
            aria-label="Next month"
        >
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
        </button>
    </div>

    {{-- Weekday headers --}}
    <div class="grid grid-cols-7 mb-1">
        <template x-for="day in weekdays" :key="day">
            <div class="flex items-center justify-center h-7 text-xs font-medium text-[oklch(var(--ui-muted-foreground))]" x-text="day"></div>
        </template>
    </div>

    {{-- Day cells --}}
    <div class="grid grid-cols-7 gap-y-0.5">
        <template x-for="(d, i) in cells" :key="i">
            <button
                type="button"
                x-on:click="select(d)"
                :disabled="!d || isDisabled(d) || disabled"
                :aria-label="d ? dateStr(d) : ''"
                :aria-selected="isSelected(d) ? 'true' : null"
                :aria-current="isToday(d) ? 'date' : null"
                :class="{
                    'invisible pointer-events-none': !d,
                    'bg-[oklch(var(--ui-primary))] text-[oklch(var(--ui-primary-foreground))] hover:bg-[oklch(var(--ui-primary))] font-semibold': isSelected(d),
                    'border border-[oklch(var(--ui-ring))] text-[oklch(var(--ui-foreground))]': isToday(d) && !isSelected(d),
                    'text-[oklch(var(--ui-foreground))] hover:bg-[oklch(var(--ui-accent))]': d && !isSelected(d) && !isDisabled(d),
                    'pointer-events-none opacity-30': isDisabled(d),
                }"
                class="inline-flex items-center justify-center h-8 w-8 rounded-[var(--ui-radius-sm)] text-sm transition-colors duration-[var(--ui-duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(var(--ui-ring))]"
                x-text="d ?? ''"
            ></button>
        </template>
    </div>

    {{-- Hidden form input --}}
    @if($name)
        <input type="hidden" name="{{ $name }}" :value="selected" />
    @endif
</div>

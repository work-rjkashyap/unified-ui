@props([
    'position'   => 'bottom-right',
    'maxVisible' => 3,
    'duration'   => 4000,
])

@php
    $positionClasses = match ($position) {
        'top-left'      => 'top-4 left-4 items-start',
        'top-center'    => 'top-4 left-1/2 -translate-x-1/2 items-center',
        'top-right'     => 'top-4 right-4 items-end',
        'bottom-left'   => 'bottom-4 left-4 items-start',
        'bottom-center' => 'bottom-4 left-1/2 -translate-x-1/2 items-center',
        default         => 'bottom-4 right-4 items-end',
    };
    $isTop      = str_starts_with($position, 'top');
    $enterStart = $isTop ? 'opacity-0 -translate-y-2 scale-95' : 'opacity-0 translate-y-2 scale-95';
@endphp

{{--
    Toast Notification System
    ─────────────────────────
    Place once in your layout (before </body>).
    Dispatch from anywhere:

        $dispatch('toast', { message: 'Saved!', variant: 'success' })
        $dispatch('toast', { title: 'Heads up', message: 'File ready.', variant: 'info' })
        $dispatch('toast', { message: 'Oops!', variant: 'danger', duration: 6000 })

    Variants: default | success | warning | danger | info
--}}

<div
    x-data="{
        toasts: [],
        maxVisible: {{ $maxVisible }},
        defaultDuration: {{ $duration }},

        add(detail) {
            const id = Date.now() + Math.random();
            const t = {
                id,
                title:     detail.title    ?? null,
                message:   detail.message  ?? '',
                variant:   detail.variant  ?? 'default',
                remaining: detail.duration ?? this.defaultDuration,
                startedAt: null, timer: null, paused: false,
            };
            this.toasts.push(t);
            if (this.toasts.length > this.maxVisible) {
                clearTimeout(this.toasts[0].timer);
                this.toasts.shift();
            }
            this.startTimer(id);
        },

        startTimer(id) {
            const t = this.toasts.find(x => x.id === id);
            if (!t || t.remaining <= 0) return;
            t.startedAt = Date.now();
            t.timer = setTimeout(() => this.remove(id), t.remaining);
        },

        pauseTimer(id) {
            const t = this.toasts.find(x => x.id === id);
            if (!t || !t.timer) return;
            clearTimeout(t.timer);
            t.remaining -= Date.now() - t.startedAt;
            t.paused = true;
        },

        resumeTimer(id) {
            const t = this.toasts.find(x => x.id === id);
            if (!t || !t.paused) return;
            t.paused = false;
            this.startTimer(id);
        },

        remove(id) {
            const idx = this.toasts.findIndex(x => x.id === id);
            if (idx !== -1) { clearTimeout(this.toasts[idx].timer); this.toasts.splice(idx, 1); }
        },

        variantClasses(v) {
            return ({
                default: 'bg-[oklch(var(--ui-background))] border-[oklch(var(--ui-border))]',
                success: 'bg-[oklch(var(--ui-success)/0.05)] border-[oklch(var(--ui-success)/0.3)]',
                warning: 'bg-[oklch(var(--ui-warning)/0.05)] border-[oklch(var(--ui-warning)/0.3)]',
                danger:  'bg-[oklch(var(--ui-destructive)/0.05)] border-[oklch(var(--ui-destructive)/0.3)]',
                info:    'bg-[oklch(var(--ui-info)/0.05)] border-[oklch(var(--ui-info)/0.3)]',
            })[v] ?? 'bg-[oklch(var(--ui-background))] border-[oklch(var(--ui-border))]';
        },

        iconColor(v) {
            return ({
                default: 'text-[oklch(var(--ui-muted-foreground))]',
                success: 'text-[oklch(var(--ui-success))]',
                warning: 'text-[oklch(var(--ui-warning))]',
                danger:  'text-[oklch(var(--ui-destructive))]',
                info:    'text-[oklch(var(--ui-info))]',
            })[v] ?? 'text-[oklch(var(--ui-muted-foreground))]';
        },
    }"
    x-on:toast.window="add($event.detail)"
    class="fixed z-(--ui-z-toast,90) flex flex-col gap-2 pointer-events-none {{ $positionClasses }}"
    aria-live="polite"
    aria-atomic="false"
    aria-label="Notifications"
    data-ui-toast-region
    data-ui-toast-position="{{ $position }}"
>
    <template x-for="toast in toasts" :key="toast.id">
        <div
            x-show="true"
            x-transition:enter="transition ease-[var(--ui-ease-out)] duration-[var(--ui-duration-normal)]"
            x-transition:enter-start="{{ $enterStart }}"
            x-transition:enter-end="opacity-100 translate-y-0 scale-100"
            x-transition:leave="transition ease-[var(--ui-ease-in)] duration-[var(--ui-duration-fast)]"
            x-transition:leave-start="opacity-100 translate-y-0 scale-100"
            x-transition:leave-end="{{ $enterStart }}"
            x-on:mouseenter="pauseTimer(toast.id)"
            x-on:mouseleave="resumeTimer(toast.id)"
            :class="variantClasses(toast.variant)"
            class="pointer-events-auto relative flex w-80 sm:w-90 items-start gap-3 rounded-(--ui-radius-lg) border px-4 py-3 shadow-(--ui-shadow-lg) text-[oklch(var(--ui-foreground))] select-none"
            role="status"
            aria-atomic="true"
            data-ui-toast
            :data-ui-toast-variant="toast.variant"
        >
            {{-- Variant icon --}}
            <span :class="iconColor(toast.variant)" class="mt-0.5 shrink-0" aria-hidden="true">
                <template x-if="toast.variant === 'success'">
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                </template>
                <template x-if="toast.variant === 'warning'">
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                </template>
                <template x-if="toast.variant === 'danger'">
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                </template>
                <template x-if="toast.variant === 'info'">
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                </template>
                <template x-if="toast.variant === 'default'">
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </template>
            </span>

            {{-- Text content --}}
            <div class="flex-1 min-w-0">
                <template x-if="toast.title">
                    <p class="text-sm font-semibold leading-5 text-[oklch(var(--ui-foreground))]" x-text="toast.title"></p>
                </template>
                <p class="text-sm leading-5 text-[oklch(var(--ui-muted-foreground))]" x-text="toast.message"></p>
            </div>

            {{-- Dismiss button --}}
            <button
                type="button"
                x-on:click="remove(toast.id)"
                class="shrink-0 inline-flex items-center justify-center h-5 w-5 rounded-sm text-[oklch(var(--ui-muted-foreground))] hover:text-[oklch(var(--ui-foreground))] transition-colors duration-(--ui-duration-fast) focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[oklch(var(--ui-ring))]"
                aria-label="Dismiss notification"
            >
                <svg class="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        </div>
    </template>
</div>

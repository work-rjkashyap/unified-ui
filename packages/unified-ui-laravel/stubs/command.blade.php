{{--
    Unified UI — Command Component
    https://unified-ui.space

    A command palette / search dialog with keyboard shortcut activation,
    search input, grouped results, and keyboard navigation. Built with
    Alpine.js for interactive behavior with full accessibility support.

    Usage:
        {{-- Basic command palette --}}
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

        {{-- With custom placeholder --}}
        <x-ui-command placeholder="Search commands…">
            <x-ui-command.group heading="Navigation">
                <x-ui-command.item value="home">Home</x-ui-command.item>
                <x-ui-command.item value="about">About</x-ui-command.item>
            </x-ui-command.group>
        </x-ui-command>

        {{-- Without keyboard shortcut trigger --}}
        <x-ui-command :shortcut="false">
            <x-ui-command.group heading="Results">
                <x-ui-command.item value="result-1">Result 1</x-ui-command.item>
            </x-ui-command.group>
        </x-ui-command>

        {{-- Inline (embedded, non-modal) --}}
        <x-ui-command inline>
            <x-ui-command.group heading="Options">
                <x-ui-command.item value="opt-1">Option 1</x-ui-command.item>
                <x-ui-command.item value="opt-2">Option 2</x-ui-command.item>
            </x-ui-command.group>
        </x-ui-command>

    Props:
        placeholder — search input placeholder text (default: "Type a command or search…")
        shortcut    — boolean, enable Cmd+K / Ctrl+K keyboard shortcut to open (default: true)
        inline      — boolean, renders as an inline embedded panel instead of a modal dialog (default: false)
        empty       — text shown when no results match the search query (default: "No results found.")
--}}

@props([
    'placeholder' => 'Type a command or search…',
    'shortcut' => true,
    'inline' => false,
    'empty' => 'No results found.',
])

@php
    // ── Panel classes ────────────────────────────────────────────────
    $panelClasses = implode(' ', [
        'w-full',
        'overflow-hidden',
        'rounded-[var(--ui-radius-lg)]',
        'border',
        'border-[oklch(var(--ui-border))]',
        'bg-[oklch(var(--ui-popover))]',
        'text-[oklch(var(--ui-popover-foreground))]',
        'shadow-lg',
    ]);

    $modalPanelClasses = implode(' ', [
        'relative',
        'max-w-lg',
        'mx-auto',
        'mt-[15vh]',
        $panelClasses,
    ]);

    // ── Backdrop classes ─────────────────────────────────────────────
    $backdropClasses = implode(' ', [
        'fixed inset-0 z-[var(--ui-z-modal,70)]',
        'bg-[oklch(var(--ui-background)/0.6)]',
        'backdrop-blur-sm',
        'p-4',
    ]);

    // ── Input classes ────────────────────────────────────────────────
    $inputClasses = implode(' ', [
        'flex',
        'w-full',
        'bg-transparent',
        'text-sm',
        'text-[oklch(var(--ui-foreground))]',
        'placeholder:text-[oklch(var(--ui-muted-foreground))]',
        'outline-none',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
        'h-10',
    ]);
@endphp

@if($inline)
    {{-- Inline (embedded) variant --}}
    <div
        x-data="{
            search: '',
            activeIndex: -1,
            items: [],
            refreshItems() {
                this.$nextTick(() => {
                    this.items = [...this.$refs.list.querySelectorAll('[data-ui-command-item]:not([data-disabled])')];
                    this.filter();
                });
            },
            filter() {
                const query = this.search.toLowerCase().trim();
                let visibleCount = 0;
                this.$refs.list.querySelectorAll('[data-ui-command-item]').forEach(item => {
                    const text = (item.getAttribute('data-value') + ' ' + item.textContent).toLowerCase();
                    const match = !query || text.includes(query);
                    item.style.display = match ? '' : 'none';
                    if (match) visibleCount++;
                });
                // Show/hide group headings if all their items are hidden
                this.$refs.list.querySelectorAll('[data-ui-command-group]').forEach(group => {
                    const visibleItems = group.querySelectorAll('[data-ui-command-item]:not([style*=\"display: none\"])');
                    group.style.display = visibleItems.length ? '' : 'none';
                });
                // Show/hide empty state
                if (this.$refs.empty) {
                    this.$refs.empty.style.display = visibleCount === 0 ? '' : 'none';
                }
                this.items = [...this.$refs.list.querySelectorAll('[data-ui-command-item]:not([style*=\"display: none\"]):not([data-disabled])')];
                this.activeIndex = -1;
            },
            next() {
                if (!this.items.length) return;
                this.activeIndex = (this.activeIndex + 1) % this.items.length;
                this.items[this.activeIndex]?.scrollIntoView({ block: 'nearest' });
                this.items.forEach((el, i) => el.setAttribute('data-active', i === this.activeIndex ? 'true' : 'false'));
            },
            prev() {
                if (!this.items.length) return;
                this.activeIndex = (this.activeIndex - 1 + this.items.length) % this.items.length;
                this.items[this.activeIndex]?.scrollIntoView({ block: 'nearest' });
                this.items.forEach((el, i) => el.setAttribute('data-active', i === this.activeIndex ? 'true' : 'false'));
            },
            select() {
                if (this.activeIndex >= 0 && this.items[this.activeIndex]) {
                    this.items[this.activeIndex].click();
                }
            }
        }"
        x-init="refreshItems()"
        {{ $attributes->class([$panelClasses]) }}
        data-ui-command
        data-ui-command-inline
    >
        {{-- Search input --}}
        <div class="flex items-center gap-2 border-b border-[oklch(var(--ui-border))] px-3">
            {{-- Search icon --}}
            <svg
                class="h-4 w-4 shrink-0 text-[oklch(var(--ui-muted-foreground))]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
            </svg>

            <input
                type="text"
                x-model="search"
                x-on:input="filter()"
                x-on:keydown.arrow-down.prevent="next()"
                x-on:keydown.arrow-up.prevent="prev()"
                x-on:keydown.enter.prevent="select()"
                placeholder="{{ $placeholder }}"
                class="{{ $inputClasses }}"
                role="combobox"
                aria-expanded="true"
                aria-haspopup="listbox"
                autocomplete="off"
                autocorrect="off"
                spellcheck="false"
            />
        </div>

        {{-- Results list --}}
        <div
            x-ref="list"
            class="max-h-72 overflow-y-auto overflow-x-hidden py-1"
            role="listbox"
        >
            {{ $slot }}

            {{-- Empty state --}}
            <div
                x-ref="empty"
                class="py-6 text-center text-sm text-[oklch(var(--ui-muted-foreground))]"
                style="display: none;"
            >
                {{ $empty }}
            </div>
        </div>
    </div>

@else
    {{-- Modal variant --}}
    <div
        x-data="{
            open: false,
            search: '',
            activeIndex: -1,
            items: [],
            show() {
                this.open = true;
                this.search = '';
                this.activeIndex = -1;
                this.$nextTick(() => {
                    this.$refs.input?.focus();
                    this.refreshItems();
                });
            },
            hide() {
                this.open = false;
            },
            refreshItems() {
                this.$nextTick(() => {
                    if (!this.$refs.list) return;
                    this.items = [...this.$refs.list.querySelectorAll('[data-ui-command-item]:not([data-disabled])')];
                    this.filter();
                });
            },
            filter() {
                if (!this.$refs.list) return;
                const query = this.search.toLowerCase().trim();
                let visibleCount = 0;
                this.$refs.list.querySelectorAll('[data-ui-command-item]').forEach(item => {
                    const text = (item.getAttribute('data-value') + ' ' + item.textContent).toLowerCase();
                    const match = !query || text.includes(query);
                    item.style.display = match ? '' : 'none';
                    if (match) visibleCount++;
                });
                this.$refs.list.querySelectorAll('[data-ui-command-group]').forEach(group => {
                    const visibleItems = group.querySelectorAll('[data-ui-command-item]:not([style*=\"display: none\"])');
                    group.style.display = visibleItems.length ? '' : 'none';
                });
                if (this.$refs.empty) {
                    this.$refs.empty.style.display = visibleCount === 0 ? '' : 'none';
                }
                this.items = [...this.$refs.list.querySelectorAll('[data-ui-command-item]:not([style*=\"display: none\"]):not([data-disabled])')];
                this.activeIndex = -1;
                this.items.forEach(el => el.setAttribute('data-active', 'false'));
            },
            next() {
                if (!this.items.length) return;
                this.activeIndex = (this.activeIndex + 1) % this.items.length;
                this.items[this.activeIndex]?.scrollIntoView({ block: 'nearest' });
                this.items.forEach((el, i) => el.setAttribute('data-active', i === this.activeIndex ? 'true' : 'false'));
            },
            prev() {
                if (!this.items.length) return;
                this.activeIndex = (this.activeIndex - 1 + this.items.length) % this.items.length;
                this.items[this.activeIndex]?.scrollIntoView({ block: 'nearest' });
                this.items.forEach((el, i) => el.setAttribute('data-active', i === this.activeIndex ? 'true' : 'false'));
            },
            select() {
                if (this.activeIndex >= 0 && this.items[this.activeIndex]) {
                    this.items[this.activeIndex].click();
                    this.hide();
                }
            }
        }"
        @if($shortcut)
            x-on:keydown.cmd.k.window.prevent="open ? hide() : show()"
            x-on:keydown.ctrl.k.window.prevent="open ? hide() : show()"
        @endif
        {{ $attributes }}
        data-ui-command
    >
        {{-- Trigger slot (optional) --}}
        @if(isset($trigger))
            <div x-on:click="show()">
                {{ $trigger }}
            </div>
        @endif

        {{-- Modal dialog --}}
        <template x-teleport="body">
            <div
                x-show="open"
                x-on:keydown.escape.window="hide()"
                class="{{ $backdropClasses }}"
                x-transition:enter="transition ease-out duration-[var(--ui-duration-normal)]"
                x-transition:enter-start="opacity-0"
                x-transition:enter-end="opacity-100"
                x-transition:leave="transition ease-in duration-[var(--ui-duration-fast)]"
                x-transition:leave-start="opacity-100"
                x-transition:leave-end="opacity-0"
                x-cloak
            >
                {{-- Backdrop click closes --}}
                <div class="absolute inset-0" x-on:click="hide()"></div>

                {{-- Command panel --}}
                <div
                    class="{{ $modalPanelClasses }}"
                    x-show="open"
                    x-transition:enter="transition ease-[var(--ui-ease-out)] duration-[var(--ui-duration-normal)]"
                    x-transition:enter-start="opacity-0 scale-95 translate-y-2"
                    x-transition:enter-end="opacity-100 scale-100 translate-y-0"
                    x-transition:leave="transition ease-[var(--ui-ease-in)] duration-[var(--ui-duration-fast)]"
                    x-transition:leave-start="opacity-100 scale-100 translate-y-0"
                    x-transition:leave-end="opacity-0 scale-95 translate-y-2"
                    x-on:click.stop
                    role="dialog"
                    aria-modal="true"
                    aria-label="Command palette"
                >
                    {{-- Search input --}}
                    <div class="flex items-center gap-2 border-b border-[oklch(var(--ui-border))] px-3">
                        {{-- Search icon --}}
                        <svg
                            class="h-4 w-4 shrink-0 text-[oklch(var(--ui-muted-foreground))]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>

                        <input
                            x-ref="input"
                            type="text"
                            x-model="search"
                            x-on:input="filter()"
                            x-on:keydown.arrow-down.prevent="next()"
                            x-on:keydown.arrow-up.prevent="prev()"
                            x-on:keydown.enter.prevent="select()"
                            placeholder="{{ $placeholder }}"
                            class="{{ $inputClasses }}"
                            role="combobox"
                            aria-expanded="true"
                            aria-haspopup="listbox"
                            autocomplete="off"
                            autocorrect="off"
                            spellcheck="false"
                        />
                    </div>

                    {{-- Results list --}}
                    <div
                        x-ref="list"
                        class="max-h-72 overflow-y-auto overflow-x-hidden py-1"
                        role="listbox"
                    >
                        {{ $slot }}

                        {{-- Empty state --}}
                        <div
                            x-ref="empty"
                            class="py-6 text-center text-sm text-[oklch(var(--ui-muted-foreground))]"
                            style="display: none;"
                        >
                            {{ $empty }}
                        </div>
                    </div>

                    {{-- Footer hint --}}
                    @if($shortcut)
                        <div class="flex items-center justify-end gap-3 border-t border-[oklch(var(--ui-border))] px-3 py-2">
                            <span class="text-xs text-[oklch(var(--ui-muted-foreground))]">
                                <kbd class="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-medium rounded bg-[oklch(var(--ui-muted))] border border-[oklch(var(--ui-border))]">Esc</kbd>
                                <span class="ml-1">to close</span>
                            </span>
                        </div>
                    @endif
                </div>
            </div>
        </template>
    </div>
@endif

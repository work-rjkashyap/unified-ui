@props([
    'columns'    => [],
    'rows'       => [],
    'selectable' => false,
    'sortable'   => false,
    'searchable' => false,
    'perPage'    => 10,
    'striped'    => false,
    'loading'    => false,
    'emptyText'  => 'No results.',
])

{{--
    DataTable — full-featured table with sort, search, pagination, and selection.

    Column definition:
        ['key' => 'name', 'label' => 'Name', 'sortable' => true]

    Usage:
        <x-data-table
            :columns="[
                ['key' => 'name', 'label' => 'Name', 'sortable' => true],
                ['key' => 'email', 'label' => 'Email'],
                ['key' => 'role', 'label' => 'Role'],
            ]"
            :rows="$users->toArray()"
            searchable
            selectable
            :per-page="15"
        />
--}}

<div
    x-data="{
        columns:   @json($columns),
        allRows:   @json($rows),
        selectable: {{ $selectable ? 'true' : 'false' }},
        sortable:  {{ $sortable ? 'true' : 'false' }},
        loading:   {{ $loading ? 'true' : 'false' }},
        perPage:   {{ $perPage }},
        page:      1,
        query:     '',
        sortKey:   null,
        sortDir:   'asc',
        selected:  [],

        get filtered() {
            let rows = this.allRows;
            if (this.query.trim()) {
                const q = this.query.toLowerCase();
                rows = rows.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(q)));
            }
            if (this.sortKey) {
                rows = [...rows].sort((a, b) => {
                    const av = a[this.sortKey] ?? '', bv = b[this.sortKey] ?? '';
                    const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
                    return this.sortDir === 'asc' ? cmp : -cmp;
                });
            }
            return rows;
        },

        get paged() {
            const start = (this.page - 1) * this.perPage;
            return this.filtered.slice(start, start + this.perPage);
        },

        get totalPages() { return Math.max(1, Math.ceil(this.filtered.length / this.perPage)); },

        sort(key) {
            if (!this.sortable) return;
            if (this.sortKey === key) { this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc'; }
            else { this.sortKey = key; this.sortDir = 'asc'; }
            this.page = 1;
        },

        toggleAll() {
            if (this.allSelected) { this.selected = []; }
            else { this.selected = this.paged.map((r, i) => r.id ?? i); }
        },

        get allSelected() {
            return this.paged.length > 0 && this.paged.every((r, i) => this.selected.includes(r.id ?? i));
        },

        toggleRow(r, i) {
            const key = r.id ?? i;
            const idx = this.selected.indexOf(key);
            if (idx === -1) this.selected.push(key);
            else this.selected.splice(idx, 1);
        },

        isRowSelected(r, i) { return this.selected.includes(r.id ?? i); },
    }"
    x-on:search-input-debounced.window="query = $event.detail.value; page = 1"
    {{ $attributes->class(['w-full']) }}
    data-ui-data-table
>
    {{-- Toolbar --}}
    @if($searchable)
        <div class="flex items-center justify-between gap-4 mb-3">
            <x-search-input placeholder="Search..." x-on:input="query = $event.target.value; page = 1" />
            @if(isset($toolbar))
                <div class="flex items-center gap-2 shrink-0">{{ $toolbar }}</div>
            @endif
        </div>
    @endif

    {{-- Table wrapper --}}
    <div class="relative w-full overflow-x-auto rounded-[var(--ui-radius-lg)] border border-[oklch(var(--ui-border))]">
        {{-- Loading overlay --}}
        <template x-if="loading">
            <div class="absolute inset-0 z-10 flex items-center justify-center bg-[oklch(var(--ui-background)/0.7)] rounded-[var(--ui-radius-lg)]">
                <svg class="h-6 w-6 animate-spin text-[oklch(var(--ui-primary))]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.2"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.85"/></svg>
            </div>
        </template>

        <table class="w-full text-sm text-left text-[oklch(var(--ui-foreground))]">
            <thead class="border-b border-[oklch(var(--ui-border))] bg-[oklch(var(--ui-muted)/0.5)]">
                <tr>
                    {{-- Checkbox header --}}
                    @if($selectable)
                        <th class="w-10 px-4 py-3">
                            <input
                                type="checkbox"
                                :checked="allSelected"
                                x-on:change="toggleAll()"
                                class="rounded border-[oklch(var(--ui-border))] focus:ring-[oklch(var(--ui-ring))]"
                                aria-label="Select all"
                            />
                        </th>
                    @endif

                    {{-- Column headers --}}
                    <template x-for="col in columns" :key="col.key">
                        <th
                            x-on:click="col.sortable && sortable ? sort(col.key) : null"
                            :class="{
                                'cursor-pointer select-none hover:bg-[oklch(var(--ui-accent))]': col.sortable && sortable,
                            }"
                            class="px-4 py-3 text-xs font-semibold text-[oklch(var(--ui-muted-foreground))] uppercase tracking-wide whitespace-nowrap transition-colors duration-[var(--ui-duration-fast)]"
                        >
                            <span class="inline-flex items-center gap-1">
                                <span x-text="col.label"></span>
                                <template x-if="col.sortable && sortable && sortKey === col.key">
                                    <svg class="h-3 w-3" :class="sortDir === 'asc' ? '' : 'rotate-180'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>
                                </template>
                            </span>
                        </th>
                    </template>
                </tr>
            </thead>

            <tbody>
                <template x-if="paged.length === 0">
                    <tr>
                        <td
                            :colspan="columns.length + (selectable ? 1 : 0)"
                            class="px-4 py-8 text-center text-[oklch(var(--ui-muted-foreground))]"
                        >
                            {{ $emptyText }}
                        </td>
                    </tr>
                </template>

                <template x-for="(row, rowIdx) in paged" :key="rowIdx">
                    <tr
                        :class="{
                            'bg-[oklch(var(--ui-muted)/0.3)]': {{ $striped ? 'rowIdx % 2 !== 0' : 'false' }},
                            'bg-[oklch(var(--ui-primary)/0.05)]': selectable && isRowSelected(row, rowIdx),
                        }"
                        class="border-b border-[oklch(var(--ui-border))] last:border-0 transition-colors hover:bg-[oklch(var(--ui-accent)/0.4)]"
                        data-ui-data-table-row
                    >
                        {{-- Checkbox cell --}}
                        @if($selectable)
                            <td class="px-4 py-3 w-10">
                                <input
                                    type="checkbox"
                                    :checked="isRowSelected(row, rowIdx)"
                                    x-on:change="toggleRow(row, rowIdx)"
                                    class="rounded border-[oklch(var(--ui-border))] focus:ring-[oklch(var(--ui-ring))]"
                                />
                            </td>
                        @endif

                        {{-- Data cells --}}
                        <template x-for="col in columns" :key="col.key">
                            <td class="px-4 py-3 text-sm text-[oklch(var(--ui-foreground))]" x-text="row[col.key] ?? ''"></td>
                        </template>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>

    {{-- Pagination --}}
    <div class="flex items-center justify-between gap-4 mt-3 text-sm text-[oklch(var(--ui-muted-foreground))]">
        <span>
            Showing
            <span x-text="Math.min((page - 1) * perPage + 1, filtered.length)"></span>–<span x-text="Math.min(page * perPage, filtered.length)"></span>
            of <span x-text="filtered.length"></span>
        </span>
        <div class="flex items-center gap-1">
            <button
                type="button"
                x-on:click="page = Math.max(1, page - 1)"
                :disabled="page <= 1"
                class="inline-flex items-center justify-center h-8 w-8 rounded-[var(--ui-radius-sm)] border border-[oklch(var(--ui-border))] text-[oklch(var(--ui-foreground))] hover:bg-[oklch(var(--ui-accent))] disabled:opacity-40 disabled:pointer-events-none transition-colors duration-[var(--ui-duration-fast)]"
                aria-label="Previous page"
            >
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <span class="px-2 tabular-nums">
                <span x-text="page"></span> / <span x-text="totalPages"></span>
            </span>
            <button
                type="button"
                x-on:click="page = Math.min(totalPages, page + 1)"
                :disabled="page >= totalPages"
                class="inline-flex items-center justify-center h-8 w-8 rounded-[var(--ui-radius-sm)] border border-[oklch(var(--ui-border))] text-[oklch(var(--ui-foreground))] hover:bg-[oklch(var(--ui-accent))] disabled:opacity-40 disabled:pointer-events-none transition-colors duration-[var(--ui-duration-fast)]"
                aria-label="Next page"
            >
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
            </button>
        </div>
    </div>
</div>

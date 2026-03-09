@props([
    'searchable'  => true,
    'placeholder' => 'Search...',
])

{{--
    DataTableToolbar — search + action slots for use above a DataTable.

    Usage:
        <x-data-table-toolbar>
            <x-slot:actions>
                <x-button size="sm">Export</x-button>
            </x-slot:actions>
        </x-data-table-toolbar>
--}}

<div
    {{ $attributes->class(['flex flex-wrap items-center justify-between gap-3 mb-3']) }}
    data-ui-data-table-toolbar
>
    {{-- Search --}}
    @if($searchable)
        <div class="w-full sm:w-64">
            <x-search-input placeholder="{{ $placeholder }}" />
        </div>
    @endif

    {{-- Actions --}}
    @if(isset($actions))
        <div class="flex items-center gap-2 ml-auto">
            {{ $actions }}
        </div>
    @endif

    {{-- Extra slot --}}
    @if(isset($slot) && $slot->isNotEmpty())
        {{ $slot }}
    @endif
</div>

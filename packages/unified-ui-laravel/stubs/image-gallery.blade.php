@props([
    'images'   => [],
    'cols'     => 3,
    'gap'      => 3,
    'lightbox' => true,
])

{{--
    ImageGallery — responsive image grid with optional lightbox.

    Image item: ['src' => '', 'alt' => '', 'caption' => '']
--}}

<div
    x-data="{
        images: @json($images),
        lightbox: {{ $lightbox ? 'true' : 'false' }},
        active: null,

        open(i) { if (this.lightbox) { this.active = i; document.body.style.overflow = 'hidden'; } },
        close() { this.active = null; document.body.style.overflow = ''; },
        prev() { if (this.active > 0) this.active--; },
        next() { if (this.active < this.images.length - 1) this.active++; },
    }"
    x-on:keydown.escape.window="close()"
    x-on:keydown.arrow-left.window="active !== null && prev()"
    x-on:keydown.arrow-right.window="active !== null && next()"
    {{ $attributes->except(['class']) }}
    data-ui-image-gallery
>
    {{-- Grid --}}
    <div class="grid grid-cols-{{ $cols }} gap-{{ $gap }}">
        <template x-for="(img, i) in images" :key="i">
            <div
                x-on:click="open(i)"
                :class="lightbox ? 'cursor-zoom-in' : ''"
                class="relative overflow-hidden rounded-[var(--ui-radius-md)] bg-[oklch(var(--ui-muted))] aspect-square group"
                data-ui-gallery-item
            >
                <img
                    :src="img.src"
                    :alt="img.alt ?? ''"
                    class="h-full w-full object-cover transition-transform duration-[var(--ui-duration-slow)] group-hover:scale-105"
                    loading="lazy"
                />
                <template x-if="img.caption">
                    <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--ui-duration-fast)]">
                        <p class="text-xs text-white truncate" x-text="img.caption"></p>
                    </div>
                </template>
            </div>
        </template>

        {{-- Slot-based usage --}}
        @if(isset($slot) && $slot->isNotEmpty())
            {{ $slot }}
        @endif
    </div>

    {{-- Lightbox --}}
    @if($lightbox)
        <template x-teleport="body">
            <div
                x-show="active !== null"
                x-cloak
                x-transition:enter="transition ease-out duration-[var(--ui-duration-normal)]"
                x-transition:enter-start="opacity-0"
                x-transition:enter-end="opacity-100"
                x-transition:leave="transition ease-in duration-[var(--ui-duration-fast)]"
                x-transition:leave-start="opacity-100"
                x-transition:leave-end="opacity-0"
                x-on:click="close()"
                class="fixed inset-0 z-[var(--ui-z-modal)] flex items-center justify-center bg-black/85 p-4"
            >
                <button type="button" x-on:click.stop="prev()" :disabled="active <= 0" class="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 transition-colors duration-[var(--ui-duration-fast)]" aria-label="Previous image">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
                </button>

                <img
                    :src="images[active]?.src"
                    :alt="images[active]?.alt ?? ''"
                    x-on:click.stop
                    class="max-h-[85vh] max-w-full rounded-[var(--ui-radius-md)] object-contain shadow-2xl"
                />

                <button type="button" x-on:click.stop="next()" :disabled="active >= images.length - 1" class="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 transition-colors duration-[var(--ui-duration-fast)]" aria-label="Next image">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
                </button>

                <button type="button" x-on:click="close()" class="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-[var(--ui-duration-fast)]" aria-label="Close lightbox">
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>

                <template x-if="images[active]?.caption">
                    <p x-text="images[active].caption" class="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/80 bg-black/40 px-3 py-1 rounded-full"></p>
                </template>
            </div>
        </template>
    @endif
</div>

@props([
    'src'      => '',
    'poster'   => null,
    'autoplay' => false,
    'muted'    => false,
    'loop'     => false,
    'controls' => true,
    'ratio'    => '16/9',
])

<div
    x-data="{
        playing: false,
        muted: {{ $muted ? 'true' : 'false' }},
        currentTime: 0,
        duration: 0,
        volume: 1,
        fullscreen: false,

        get progress() { return this.duration ? (this.currentTime / this.duration) * 100 : 0; },
        get timeDisplay() {
            const fmt = s => String(Math.floor(s / 60)).padStart(2,'0') + ':' + String(Math.floor(s % 60)).padStart(2,'0');
            return fmt(this.currentTime) + ' / ' + fmt(this.duration);
        },

        toggle() { this.playing ? this.$refs.video.pause() : this.$refs.video.play(); },
        toggleMute() { this.muted = !this.muted; this.$refs.video.muted = this.muted; },
        seek(e) {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            this.$refs.video.currentTime = pct * this.duration;
        },
        toggleFullscreen() {
            if (!document.fullscreenElement) this.$refs.container.requestFullscreen();
            else document.exitFullscreen();
        },
    }"
    x-ref="container"
    {{ $attributes->except(['class']) }}
    data-ui-video-player
>
    <div class="relative overflow-hidden rounded-[var(--ui-radius-lg)] bg-black" style="aspect-ratio: {{ $ratio }}">
        <video
            x-ref="video"
            src="{{ $src }}"
            @if($poster) poster="{{ $poster }}" @endif
            @if($autoplay) autoplay @endif
            @if($muted) muted @endif
            @if($loop) loop @endif
            x-on:play="playing = true"
            x-on:pause="playing = false"
            x-on:timeupdate="currentTime = $refs.video.currentTime"
            x-on:loadedmetadata="duration = $refs.video.duration"
            x-on:click="toggle()"
            class="h-full w-full object-contain cursor-pointer"
            aria-label="Video player"
        ></video>

        @if($controls)
            {{-- Controls overlay --}}
            <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-6 opacity-0 hover:opacity-100 transition-opacity duration-[var(--ui-duration-normal)]" x-show="true">
                {{-- Progress bar --}}
                <div
                    x-on:click="seek($event)"
                    class="w-full h-1 rounded-full bg-white/30 cursor-pointer mb-2 relative"
                >
                    <div :style="`width: ${progress}%`" class="h-full rounded-full bg-white transition-[width] duration-75"></div>
                </div>

                <div class="flex items-center gap-2">
                    {{-- Play/pause --}}
                    <button type="button" x-on:click="toggle()" class="text-white hover:text-white/80 transition-colors" :aria-label="playing ? 'Pause' : 'Play'">
                        <template x-if="!playing"><svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 3l14 9L5 21V3z"/></svg></template>
                        <template x-if="playing"><svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg></template>
                    </button>

                    {{-- Mute --}}
                    <button type="button" x-on:click="toggleMute()" class="text-white hover:text-white/80 transition-colors" :aria-label="muted ? 'Unmute' : 'Mute'">
                        <template x-if="!muted"><svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></template>
                        <template x-if="muted"><svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg></template>
                    </button>

                    <span class="text-white/70 text-xs tabular-nums ml-1" x-text="timeDisplay"></span>

                    {{-- Fullscreen --}}
                    <button type="button" x-on:click="toggleFullscreen()" class="ml-auto text-white hover:text-white/80 transition-colors" aria-label="Toggle fullscreen">
                        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>
                    </button>
                </div>
            </div>
        @endif
    </div>
</div>

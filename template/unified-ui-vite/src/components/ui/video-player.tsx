"use client";

// ============================================================================
// Unified UI — VideoPlayer Component
// ============================================================================
// Styled video wrapper with custom controls, poster image, and aspect ratio.
//
// Features:
//   - Custom play/pause, mute, volume, seek, and fullscreen controls
//   - Poster image support
//   - Aspect ratio constraint (16:9, 4:3, 1:1, or custom)
//   - Autoplay, loop, muted options
//   - Keyboard accessible: Space to play/pause, M to mute, F for fullscreen
//   - Time display and progress bar
//   - Design system token styling
//   - Full ref forwarding
//
// Usage:
//   import { VideoPlayer } from "@work-rjkashyap/unified-ui/components";
//   <VideoPlayer src="/video.mp4" poster="/poster.jpg" />
// ============================================================================

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { focusRingClasses } from "@/lib/focus-ring";

// ---------------------------------------------------------------------------
// Icons (internal)
// ---------------------------------------------------------------------------

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function VolumeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function VolumeMuteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function FullscreenIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface VideoPlayerProps {
  /** Video source URL. */
  src: string;
  /** Poster image URL. */
  poster?: string;
  /** Aspect ratio. @default "video" (16:9) */
  aspectRatio?: "video" | "square" | "4/3" | "auto";
  /** @default false */
  autoPlay?: boolean;
  /** @default false */
  loop?: boolean;
  /** @default false */
  muted?: boolean;
  /** Whether to show custom controls. @default true */
  controls?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Callback when video ends. */
  onEnded?: () => void;
}

const aspectMap: Record<string, string> = {
  video: "aspect-video",
  square: "aspect-square",
  "4/3": "aspect-4/3",
  auto: "",
};

// ---------------------------------------------------------------------------
// VideoPlayer
// ---------------------------------------------------------------------------

/**
 * `VideoPlayer` — a styled video component with custom controls.
 *
 * @example
 * ```tsx
 * <VideoPlayer src="/demo.mp4" poster="/poster.jpg" />
 * <VideoPlayer src="/clip.webm" aspectRatio="4/3" autoPlay loop muted />
 * ```
 */
export const VideoPlayer = forwardRef<HTMLDivElement, VideoPlayerProps>(
  function VideoPlayer(
    {
      src,
      poster,
      aspectRatio = "video",
      autoPlay = false,
      loop = false,
      muted: mutedProp = false,
      controls = true,
      className,
      onEnded,
    },
    ref,
  ) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(mutedProp);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    // Auto-hide controls
    const resetHideTimer = useCallback(() => {
      setShowControls(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (playing) {
        hideTimer.current = setTimeout(() => setShowControls(false), 3000);
      }
    }, [playing]);

    useEffect(() => {
      return () => {
        if (hideTimer.current) clearTimeout(hideTimer.current);
      };
    }, []);

    const togglePlay = useCallback(() => {
      const video = videoRef.current;
      if (!video) return;
      if (video.paused) {
        video.play();
        setPlaying(true);
      } else {
        video.pause();
        setPlaying(false);
      }
      resetHideTimer();
    }, [resetHideTimer]);

    const toggleMute = useCallback(() => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }, []);

    const handleSeek = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video) return;
        const time = (Number(e.target.value) / 100) * duration;
        video.currentTime = time;
        setCurrentTime(time);
      },
      [duration],
    );

    const toggleFullscreen = useCallback(() => {
      const el = wrapperRef.current;
      if (!el) return;
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        el.requestFullscreen();
      }
    }, []);

    // Keyboard shortcuts
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === " " || e.key === "k") {
          e.preventDefault();
          togglePlay();
        }
        if (e.key === "m") toggleMute();
        if (e.key === "f") toggleFullscreen();
        if (e.key === "ArrowRight" && videoRef.current) {
          videoRef.current.currentTime = Math.min(duration, currentTime + 5);
        }
        if (e.key === "ArrowLeft" && videoRef.current) {
          videoRef.current.currentTime = Math.max(0, currentTime - 5);
        }
      },
      [togglePlay, toggleMute, toggleFullscreen, duration, currentTime],
    );

    return (
      <div
        ref={(node) => {
          (
            wrapperRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        className={cn(
          "relative group overflow-hidden rounded-lg border border-border bg-black",
          aspectMap[aspectRatio],
          focusRingClasses,
          className,
        )}
        onMouseMove={resetHideTimer}
        onMouseEnter={() => setShowControls(true)}
        onKeyDown={handleKeyDown}
        data-ds=""
        data-ds-component="video-player"
        role="region"
        aria-label="Video player"
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={mutedProp}
          playsInline
          className="size-full object-contain"
          onClick={togglePlay}
          onTimeUpdate={() =>
            setCurrentTime(videoRef.current?.currentTime ?? 0)
          }
          onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
          onEnded={() => {
            setPlaying(false);
            onEnded?.();
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

        {/* Big play button overlay when paused */}
        {!playing && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity"
            aria-label="Play video"
          >
            <div className="inline-flex size-16 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
              <PlayIcon className="size-8 ml-1" />
            </div>
          </button>
        )}

        {/* Bottom controls */}
        {controls && (
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 transition-opacity duration-200",
              showControls ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            {/* Progress bar */}
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 mb-2 cursor-pointer appearance-none rounded-full bg-white/30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              aria-label="Seek"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="inline-flex size-8 items-center justify-center text-white/90 hover:text-white transition-colors"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? (
                    <PauseIcon className="size-4" />
                  ) : (
                    <PlayIcon className="size-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="inline-flex size-8 items-center justify-center text-white/90 hover:text-white transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeMuteIcon className="size-4" />
                  ) : (
                    <VolumeIcon className="size-4" />
                  )}
                </button>
                <span className="text-xs text-white/70 font-mono tabular-nums">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="inline-flex size-8 items-center justify-center text-white/90 hover:text-white transition-colors"
                aria-label="Toggle fullscreen"
              >
                <FullscreenIcon className="size-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
);
VideoPlayer.displayName = "VideoPlayer";

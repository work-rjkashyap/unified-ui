"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "../utils/cn";
import { focusRingClasses } from "../utils/focus-ring";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
function PlayIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" })
    }
  );
}
function PauseIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z" })
    }
  );
}
function VolumeIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
        /* @__PURE__ */ jsx("path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07" }),
        /* @__PURE__ */ jsx("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14" })
      ]
    }
  );
}
function VolumeMuteIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
        /* @__PURE__ */ jsx("line", { x1: "23", y1: "9", x2: "17", y2: "15" }),
        /* @__PURE__ */ jsx("line", { x1: "17", y1: "9", x2: "23", y2: "15" })
      ]
    }
  );
}
function FullscreenIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M8 3H5a2 2 0 0 0-2 2v3" }),
        /* @__PURE__ */ jsx("path", { d: "M21 8V5a2 2 0 0 0-2-2h-3" }),
        /* @__PURE__ */ jsx("path", { d: "M3 16v3a2 2 0 0 0 2 2h3" }),
        /* @__PURE__ */ jsx("path", { d: "M16 21h3a2 2 0 0 0 2-2v-3" })
      ]
    }
  );
}
function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
const aspectMap = {
  video: "aspect-video",
  square: "aspect-square",
  "4/3": "aspect-4/3",
  auto: ""
};
const VideoPlayer = forwardRef(
  function VideoPlayer2({
    src,
    poster,
    aspectRatio = "video",
    autoPlay = false,
    loop = false,
    muted: mutedProp = false,
    controls = true,
    className,
    onEnded
  }, ref) {
    const videoRef = useRef(null);
    const wrapperRef = useRef(null);
    const [playing, setPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(mutedProp);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const hideTimer = useRef(null);
    const progress = duration > 0 ? currentTime / duration * 100 : 0;
    const resetHideTimer = useCallback(() => {
      setShowControls(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (playing) {
        hideTimer.current = setTimeout(() => setShowControls(false), 3e3);
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
      (e) => {
        const video = videoRef.current;
        if (!video) return;
        const time = Number(e.target.value) / 100 * duration;
        video.currentTime = time;
        setCurrentTime(time);
      },
      [duration]
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
    const handleKeyDown = useCallback(
      (e) => {
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
      [togglePlay, toggleMute, toggleFullscreen, duration, currentTime]
    );
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref: (node) => {
          wrapperRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            ref.current = node;
        },
        className: cn(
          "relative group overflow-hidden rounded-lg border border-border bg-black",
          aspectMap[aspectRatio],
          focusRingClasses,
          className
        ),
        onMouseMove: resetHideTimer,
        onMouseEnter: () => setShowControls(true),
        onKeyDown: handleKeyDown,
        "data-ds": "",
        "data-ds-component": "video-player",
        role: "region",
        "aria-label": "Video player",
        children: [
          /* @__PURE__ */ jsx(
            "video",
            {
              ref: videoRef,
              src,
              poster,
              autoPlay,
              loop,
              muted: mutedProp,
              playsInline: true,
              className: "size-full object-contain",
              onClick: togglePlay,
              onTimeUpdate: () => setCurrentTime(videoRef.current?.currentTime ?? 0),
              onLoadedMetadata: () => setDuration(videoRef.current?.duration ?? 0),
              onEnded: () => {
                setPlaying(false);
                onEnded?.();
              },
              onPlay: () => setPlaying(true),
              onPause: () => setPlaying(false)
            }
          ),
          !playing && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: togglePlay,
              className: "absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity",
              "aria-label": "Play video",
              children: /* @__PURE__ */ jsx("div", { className: "inline-flex size-16 items-center justify-center rounded-full bg-white/90 text-black shadow-lg", children: /* @__PURE__ */ jsx(PlayIcon, { className: "size-8 ml-1" }) })
            }
          ),
          controls && /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 transition-opacity duration-200",
                showControls ? "opacity-100" : "opacity-0 pointer-events-none"
              ),
              children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: 100,
                    value: progress,
                    onChange: handleSeek,
                    className: "w-full h-1 mb-2 cursor-pointer appearance-none rounded-full bg-white/30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white",
                    "aria-label": "Seek"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: togglePlay,
                        className: "inline-flex size-8 items-center justify-center text-white/90 hover:text-white transition-colors",
                        "aria-label": playing ? "Pause" : "Play",
                        children: playing ? /* @__PURE__ */ jsx(PauseIcon, { className: "size-4" }) : /* @__PURE__ */ jsx(PlayIcon, { className: "size-4" })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: toggleMute,
                        className: "inline-flex size-8 items-center justify-center text-white/90 hover:text-white transition-colors",
                        "aria-label": isMuted ? "Unmute" : "Mute",
                        children: isMuted ? /* @__PURE__ */ jsx(VolumeMuteIcon, { className: "size-4" }) : /* @__PURE__ */ jsx(VolumeIcon, { className: "size-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { className: "text-xs text-white/70 font-mono tabular-nums", children: [
                      formatTime(currentTime),
                      " / ",
                      formatTime(duration)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: toggleFullscreen,
                      className: "inline-flex size-8 items-center justify-center text-white/90 hover:text-white transition-colors",
                      "aria-label": "Toggle fullscreen",
                      children: /* @__PURE__ */ jsx(FullscreenIcon, { className: "size-4" })
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    );
  }
);
VideoPlayer.displayName = "VideoPlayer";
export {
  VideoPlayer
};

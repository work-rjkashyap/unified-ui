import * as react from 'react';

interface VideoPlayerProps {
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
/**
 * `VideoPlayer` — a styled video component with custom controls.
 *
 * @example
 * ```tsx
 * <VideoPlayer src="/demo.mp4" poster="/poster.jpg" />
 * <VideoPlayer src="/clip.webm" aspectRatio="4/3" autoPlay loop muted />
 * ```
 */
declare const VideoPlayer: react.ForwardRefExoticComponent<VideoPlayerProps & react.RefAttributes<HTMLDivElement>>;

export { VideoPlayer, type VideoPlayerProps };

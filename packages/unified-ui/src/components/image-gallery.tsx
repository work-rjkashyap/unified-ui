"use client";

// ============================================================================
// Unified UI — ImageGallery Component
// ============================================================================
// Lightbox gallery with zoom, thumbnails, keyboard navigation, and
// smooth transitions. Combines Dialog overlay with Carousel-like navigation.
//
// Features:
//   - Grid thumbnail view with configurable columns
//   - Fullscreen lightbox overlay on click
//   - Zoom (scale toggle) in lightbox
//   - Keyboard navigation: Arrow keys, Escape to close
//   - Thumbnail strip in lightbox for quick navigation
//   - Animated transitions via Framer Motion
//   - Responsive grid layout
//   - Accessible: role="img", alt text, keyboard navigable
//   - Respects prefers-reduced-motion
//
// Usage:
//   import { ImageGallery } from "@work-rjkashyap/unified-ui/components";
//   <ImageGallery images={[{ src: "/a.jpg", alt: "Image A" }]} />
// ============================================================================

import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

// ---------------------------------------------------------------------------
// Icons (internal)
// ---------------------------------------------------------------------------

function XIcon({ className }: { className?: string }) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ZoomInIcon({ className }: { className?: string }) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
      <path d="M11 8v6" />
      <path d="M8 11h6" />
    </svg>
  );
}

function ZoomOutIcon({ className }: { className?: string }) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
      <path d="M8 11h6" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GalleryImage {
  /** Image source URL. */
  src: string;
  /** Alt text for accessibility. */
  alt: string;
  /** Optional thumbnail URL (falls back to src). */
  thumbnail?: string;
  /** Optional caption shown in lightbox. */
  caption?: string;
}

export interface ImageGalleryProps {
  /** Array of images to display. */
  images: GalleryImage[];
  /** Number of grid columns. @default 3 */
  columns?: 1 | 2 | 3 | 4;
  /** Gap between grid items in pixels. @default 8 */
  gap?: number;
  /** Aspect ratio for thumbnails. @default "square" */
  aspectRatio?: "square" | "video" | "auto";
  /** Whether to show the lightbox on click. @default true */
  lightbox?: boolean;
  /** Additional CSS classes on the grid container. */
  className?: string;
  /** Render custom thumbnail. */
  renderThumbnail?: (image: GalleryImage, index: number) => ReactNode;
}

// ---------------------------------------------------------------------------
// Lightbox (internal)
// ---------------------------------------------------------------------------

function Lightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const shouldReduce = useReducedMotion();

  const goTo = useCallback(
    (i: number) => {
      setCurrent(((i % images.length) + images.length) % images.length);
      setZoomed(false);
    },
    [images.length],
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const image = images[current];
  const transition = shouldReduce
    ? { duration: 0.01 }
    : { duration: 0.25, ease: "easeOut" as const };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col"
      data-ds=""
      data-ds-component="image-gallery-lightbox"
      role="dialog"
      aria-label={`Image ${current + 1} of ${images.length}`}
      aria-modal="true"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
        onClick={onClose}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3">
        <span className="text-sm text-white/70 font-medium">
          {current + 1} / {images.length}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setZoomed(!zoomed)}
            className="inline-flex size-9 items-center justify-center rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={zoomed ? "Zoom out" : "Zoom in"}
          >
            {zoomed ? (
              <ZoomOutIcon className="size-4" />
            ) : (
              <ZoomInIcon className="size-4" />
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-9 items-center justify-center rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close gallery"
          >
            <XIcon className="size-4" />
          </button>
        </div>
      </div>

      {/* Main image */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-12 min-h-0">
        {/* Prev */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={prev}
            className="absolute left-3 z-10 inline-flex size-10 items-center justify-center rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeftIcon className="size-5" />
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={image.src}
            alt={image.alt}
            className={cn(
              "max-h-full max-w-full object-contain select-none transition-transform duration-200",
              zoomed ? "cursor-zoom-out scale-150" : "cursor-zoom-in",
            )}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={transition}
            onClick={() => setZoomed(!zoomed)}
            draggable={false}
          />
        </AnimatePresence>

        {/* Next */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={next}
            className="absolute right-3 z-10 inline-flex size-10 items-center justify-center rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        )}
      </div>

      {/* Caption */}
      {image.caption && (
        <div className="relative z-10 text-center py-2 px-4">
          <p className="text-sm text-white/70">{image.caption}</p>
        </div>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="relative z-10 flex items-center justify-center gap-1.5 py-3 px-4 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={`thumb-${img.src}`}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                "shrink-0 size-12 rounded-md overflow-hidden border-2 transition-all",
                i === current
                  ? "border-white opacity-100"
                  : "border-transparent opacity-50 hover:opacity-80",
              )}
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
            >
              <img
                src={img.thumbnail ?? img.src}
                alt=""
                className="size-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body,
  );
}

// ---------------------------------------------------------------------------
// ImageGallery
// ---------------------------------------------------------------------------

const colsMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const aspectMap = {
  square: "aspect-square",
  video: "aspect-video",
  auto: "",
};

/**
 * `ImageGallery` — a grid of images with optional lightbox viewer.
 *
 * @example
 * ```tsx
 * <ImageGallery
 *   images={[
 *     { src: "/photo-1.jpg", alt: "Beach sunset", caption: "Malibu, CA" },
 *     { src: "/photo-2.jpg", alt: "Mountain view" },
 *   ]}
 *   columns={3}
 * />
 * ```
 */
export const ImageGallery = forwardRef<HTMLDivElement, ImageGalleryProps>(
  function ImageGallery(
    {
      images,
      columns = 3,
      gap = 8,
      aspectRatio = "square",
      lightbox = true,
      className,
      renderThumbnail,
    },
    ref,
  ) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    return (
      <>
        <div
          ref={ref}
          className={cn("not-prose grid", colsMap[columns], className)}
          style={{ gap }}
          data-ds=""
          data-ds-component="image-gallery"
          role="group"
          aria-label="Image gallery"
        >
          {images.map((image, index) => (
            <button
              key={`gallery-${image.src}`}
              type="button"
              onClick={() => lightbox && setLightboxIndex(index)}
              className={cn(
                "block overflow-hidden rounded-lg border border-border bg-muted p-0",
                "transition-shadow hover:shadow-md",
                lightbox && "cursor-pointer",
                !lightbox && "cursor-default",
                aspectMap[aspectRatio],
                focusRingClasses,
              )}
              aria-label={image.alt}
              disabled={!lightbox}
            >
              {renderThumbnail ? (
                renderThumbnail(image, index)
              ) : (
                <img
                  src={image.thumbnail ?? image.src}
                  alt={image.alt}
                  className="block size-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
              )}
            </button>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <Lightbox
              images={images}
              initialIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          )}
        </AnimatePresence>
      </>
    );
  },
);
ImageGallery.displayName = "ImageGallery";

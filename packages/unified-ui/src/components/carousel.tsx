"use client";

import { cn } from "@unified-ui/utils/cn";
import { focusRingClasses } from "@unified-ui/utils/focus-ring";
// ============================================================================
// Unified UI — Carousel Component
// ============================================================================
// Horizontal/vertical carousel with animated slide transitions, dots, arrows, autoplay.
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  forwardRef,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface CarouselContextValue {
  current: number;
  total: number;
  prev: () => void;
  next: () => void;
  goTo: (index: number) => void;
  direction: "left" | "right";
  orientation: "horizontal" | "vertical";
}

const CarouselContext = createContext<CarouselContextValue>({
  current: 0,
  total: 0,
  prev: () => {},
  next: () => {},
  goTo: () => {},
  direction: "right",
  orientation: "horizontal",
});

export function useCarouselContext() {
  return useContext(CarouselContext);
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CarouselProps {
  items: ReactNode[];
  defaultIndex?: number;
  index?: number;
  onIndexChange?: (i: number) => void;
  orientation?: "horizontal" | "vertical";
  autoplay?: boolean;
  autoplayInterval?: number;
  loop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
  itemClassName?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  function Carousel(
    {
      items,
      defaultIndex = 0,
      index: controlledIndex,
      onIndexChange,
      orientation = "horizontal",
      autoplay = false,
      autoplayInterval = 3000,
      loop = true,
      showArrows = true,
      showDots = true,
      className,
      itemClassName,
    },
    ref,
  ) {
    const shouldReduce = useReducedMotion();
    const [internalIndex, setInternalIndex] = useState(defaultIndex);
    const [direction, setDirection] = useState<"left" | "right">("right");
    const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const current =
      controlledIndex !== undefined ? controlledIndex : internalIndex;
    const total = items.length;

    const goTo = useCallback(
      (i: number, dir?: "left" | "right") => {
        const next = loop
          ? ((i % total) + total) % total
          : Math.max(0, Math.min(total - 1, i));
        const resolvedDir = dir ?? (next > current ? "right" : "left");
        setDirection(resolvedDir);
        if (controlledIndex === undefined) setInternalIndex(next);
        onIndexChange?.(next);
      },
      [current, total, loop, controlledIndex, onIndexChange],
    );

    const prev = useCallback(() => goTo(current - 1, "left"), [current, goTo]);
    const next = useCallback(() => goTo(current + 1, "right"), [current, goTo]);

    // Autoplay
    useEffect(() => {
      if (!autoplay) return;
      autoplayRef.current = setInterval(next, autoplayInterval);
      return () => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
      };
    }, [autoplay, autoplayInterval, next]);

    const isHorizontal = orientation === "horizontal";

    const slideVariants = {
      initial: shouldReduce
        ? { opacity: 0 }
        : {
            opacity: 0,
            x: isHorizontal ? (direction === "right" ? "100%" : "-100%") : 0,
            y: !isHorizontal ? (direction === "right" ? "100%" : "-100%") : 0,
          },
      animate: { opacity: 1, x: 0, y: 0 },
      exit: shouldReduce
        ? { opacity: 0 }
        : {
            opacity: 0,
            x: isHorizontal ? (direction === "right" ? "-100%" : "100%") : 0,
            y: !isHorizontal ? (direction === "right" ? "-100%" : "100%") : 0,
          },
    };

    return (
      <CarouselContext.Provider
        value={{ current, total, prev, next, goTo, direction, orientation }}
      >
        <div
          ref={ref}
          className={cn("relative overflow-hidden rounded-lg", className)}
          data-ds=""
          data-ds-component="carousel"
          data-ds-orientation={orientation}
          role="region"
          aria-roledescription="carousel"
          aria-label="Content carousel"
        >
          {/* Slides */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={current}
                className={cn("w-full", itemClassName)}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                aria-roledescription="slide"
                aria-label={`Slide ${current + 1} of ${total}`}
                data-ds-animated=""
              >
                {items[current]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows */}
          {showArrows && total > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                disabled={!loop && current === 0}
                className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 z-10",
                  "inline-flex items-center justify-center size-9 rounded-full",
                  "bg-background/90 border border-border shadow-sm",
                  "text-foreground hover:bg-background",
                  "transition-colors duration-fast",
                  "disabled:opacity-30 disabled:pointer-events-none",
                  focusRingClasses,
                )}
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="size-4" />
              </button>
              <button
                type="button"
                onClick={next}
                disabled={!loop && current === total - 1}
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 z-10",
                  "inline-flex items-center justify-center size-9 rounded-full",
                  "bg-background/90 border border-border shadow-sm",
                  "text-foreground hover:bg-background",
                  "transition-colors duration-fast",
                  "disabled:opacity-30 disabled:pointer-events-none",
                  focusRingClasses,
                )}
                aria-label="Next slide"
              >
                <ChevronRightIcon className="size-4" />
              </button>
            </>
          )}

          {/* Dots */}
          {showDots && total > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {Array.from({ length: total }, (_, i) => (
                <button
                  key={`slide-${i}`}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                  className={cn(
                    "rounded-full transition-all duration-fast",
                    "bg-background/80 hover:bg-background",
                    i === current
                      ? "w-4 h-2"
                      : "size-2 opacity-60 hover:opacity-100",
                    focusRingClasses,
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

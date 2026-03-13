"use client";

import {
  blurIn,
  blurInSubtle,
  durationSeconds,
  easing,
  expandHeight,
  fadeIn,
  fadeInFast,
  fadeInSlow,
  hoverLift,
  hoverScale,
  type MotionPreset,
  modalContentSpring,
  motionProps,
  overlayBackdrop,
  pop,
  popSubtle,
  press,
  pulse,
  scaleIn,
  scaleInLg,
  scaleInSpring,
  slideDown,
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
  slideLeft,
  slideRight,
  slideUp,
  slideUpLg,
  slideUpSm,
  slideUpSpring,
  spin,
  spring,
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  tapScale,
  toastSlideIn,
  toastSlideUp,
  useReducedMotion,
} from "@work-rjkashyap/unified-ui/motion";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

let replayGlobalKey = 0;
let replayTimerId: number | null = null;
const replayListeners = new Set<(value: number) => void>();

function startReplayTimer(intervalMs: number) {
  if (replayTimerId !== null) return;

  replayTimerId = window.setInterval(() => {
    replayGlobalKey += 1;
    replayListeners.forEach((listener) => listener(replayGlobalKey));
  }, intervalMs);
}

function stopReplayTimerIfIdle() {
  if (replayListeners.size === 0 && replayTimerId !== null) {
    window.clearInterval(replayTimerId);
    replayTimerId = null;
    replayGlobalKey = 0;
  }
}

function useReplayKey(intervalMs = 2400): number {
  const [key, setKey] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const listener = (value: number) => {
      setKey(value);
    };

    replayListeners.add(listener);
    startReplayTimer(intervalMs);

    return () => {
      replayListeners.delete(listener);
      stopReplayTimerIfIdle();
    };
  }, [intervalMs, prefersReducedMotion]);
  return key;
}

function presetSpread(preset: MotionPreset) {
  const props = {
    ...motionProps(preset),
  };

  return Object.keys(preset.transition).length > 0
    ? { ...props, transition: preset.transition }
    : props;
}

function PreviewFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative min-h-72 w-full overflow-hidden rounded-2xl border border-border bg-background shadow-xs ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 border-b border-border bg-muted/30" />
      <div className="pointer-events-none absolute left-5 top-5 flex gap-2">
        <span className="size-2 rounded-full bg-muted-foreground/30" />
        <span className="size-2 rounded-full bg-muted-foreground/20" />
        <span className="size-2 rounded-full bg-muted-foreground/10" />
      </div>
      <div
        className={`relative flex min-h-72 flex-col justify-center p-5 pt-16 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

function Surface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-card text-card-foreground shadow-xs ${className}`}
    >
      {children}
    </div>
  );
}

function SurfaceHeader({
  eyebrow,
  title,
  meta,
}: {
  eyebrow: string;
  title: string;
  meta?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </div>
        <div className="mt-1 text-sm font-semibold text-foreground">
          {title}
        </div>
      </div>
      {meta ? (
        <div className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
          {meta}
        </div>
      ) : null}
    </div>
  );
}

function MetricPill({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-muted/70 px-2.5 py-1 text-[11px] text-muted-foreground ${className}`}
    >
      <span>{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

function Rail({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative h-2 rounded-full bg-muted ${className}`}>
      {children}
    </div>
  );
}

function Line({ width }: { width: string }) {
  return <div className={`h-2 rounded-full bg-muted ${width}`} />;
}

export function MotionDurationTokensPreview() {
  const replayKey = useReplayKey(2600);
  const durations = [
    ["instant", durationSeconds.instant, "Hover feedback"],
    ["fast", durationSeconds.fast, "Icon swap"],
    ["moderate", durationSeconds.moderate, "Tooltip"],
    ["normal", durationSeconds.normal, "Dropdown"],
    ["slow", durationSeconds.slow, "Drawer"],
    ["slower", durationSeconds.slower, "Sequence"],
    ["slowest", durationSeconds.slowest, "Loader"],
  ] as const;

  return (
    <PreviewFrame>
      <Surface className="overflow-hidden">
        <SurfaceHeader
          eyebrow="Motion Tokens"
          title="Duration Scale"
          meta="System timing"
        />
        <div className="space-y-3 p-4">
          {durations.map(([label, value, useCase]) => (
            <div
              key={label}
              className="grid grid-cols-[82px_1fr_auto] items-center gap-3 rounded-lg bg-background px-3 py-2"
            >
              <div>
                <div className="text-sm font-medium text-foreground">
                  {label}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {useCase}
                </div>
              </div>
              <Rail>
                <motion.div
                  key={`${label}-${replayKey}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: value,
                    ease: [...easing.standard],
                  }}
                  className="absolute inset-0 origin-left rounded-full bg-primary"
                />
              </Rail>
              <MetricPill label="" value={`${Math.round(value * 1000)}ms`} />
            </div>
          ))}
        </div>
      </Surface>
    </PreviewFrame>
  );
}

export function MotionEasingTokensPreview() {
  const replayKey = useReplayKey(2600);
  const curves = [
    ["standard", easing.standard],
    ["decelerate", easing.decelerate],
    ["accelerate", easing.accelerate],
    ["emphasize", easing.emphasize],
    ["linear", easing.linear],
    ["snap", easing.snap],
  ] as const;

  return (
    <PreviewFrame>
      <Surface className="overflow-hidden">
        <SurfaceHeader
          eyebrow="Motion Tokens"
          title="Easing Curves"
          meta="300ms"
        />
        <div className="space-y-3 p-4">
          {curves.map(([label, curve]) => (
            <div
              key={label}
              className="grid grid-cols-[88px_1fr] items-center gap-3 rounded-lg bg-background px-3 py-2"
            >
              <div className="text-sm font-medium text-foreground">{label}</div>
              <div className="relative h-10 rounded-lg border border-border bg-muted/40 px-1">
                <motion.div
                  key={`${label}-fill-${replayKey}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: durationSeconds.slow,
                    ease: [...curve],
                  }}
                  className="absolute inset-y-1 left-1 right-1 origin-left rounded-md bg-primary/10"
                />
                <motion.div
                  key={`${label}-dot-${replayKey}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: durationSeconds.slow,
                    ease: [...curve],
                  }}
                  className="absolute inset-y-1 left-1 right-1 origin-left"
                >
                  <div className="absolute right-0 top-1/2 size-6 -translate-y-1/2 rounded-full border border-primary/20 bg-primary shadow-xs" />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </Surface>
    </PreviewFrame>
  );
}

export function MotionSpringTokensPreview() {
  const replayKey = useReplayKey(2800);
  const springs = [
    ["gentle", spring.gentle, "Tooltip"],
    ["snappy", spring.snappy, "Toggle"],
    ["bouncy", spring.bouncy, "Celebrate"],
    ["stiff", spring.stiff, "Sheet"],
  ] as const;

  return (
    <PreviewFrame>
      <div className="grid gap-4 sm:grid-cols-2">
        {springs.map(([label, config, useCase]) => (
          <Surface key={label} className="overflow-hidden">
            <SurfaceHeader
              eyebrow={label}
              title={useCase}
              meta={`${config.stiffness}/${config.damping}`}
            />
            <div className="p-4">
              <div className="relative h-20 rounded-xl bg-muted/40">
                <motion.div
                  key={`${label}-${replayKey}`}
                  initial={{ scale: 0.78, y: 12 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={config}
                  className="absolute left-4 right-4 top-4 rounded-xl border border-border bg-card p-3 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        Team billing
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        Seats updated
                      </div>
                    </div>
                    <div className="size-8 rounded-lg bg-primary/10" />
                  </div>
                </motion.div>
              </div>
            </div>
          </Surface>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function MotionFadePreview() {
  const replayKey = useReplayKey();
  const presets: ReadonlyArray<readonly [string, MotionPreset, string]> = [
    ["fadeInFast", fadeInFast, "Tooltip"],
    ["fadeIn", fadeIn, "Popover"],
    ["fadeInSlow", fadeInSlow, "Page section"],
  ];

  return (
    <PreviewFrame>
      <div className="grid gap-4 sm:grid-cols-3">
        {presets.map(([label, preset, title]) => (
          <motion.div key={`${label}-${replayKey}`} {...presetSpread(preset)}>
            <Surface className="overflow-hidden">
              <SurfaceHeader eyebrow={label} title={title} />
              <div className="space-y-3 p-4">
                <Line width="w-1/3" />
                <Line width="w-full" />
                <Line width="w-2/3" />
              </div>
            </Surface>
          </motion.div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function MotionSlidePreview() {
  const replayKey = useReplayKey();
  const presets: ReadonlyArray<readonly [string, MotionPreset]> = [
    ["slideUp", slideUp],
    ["slideUpSm", slideUpSm],
    ["slideUpLg", slideUpLg],
    ["slideUpSpring", slideUpSpring],
    ["slideDown", slideDown],
    ["slideLeft", slideLeft],
    ["slideRight", slideRight],
    ["slideInFromLeft", slideInFromLeft],
    ["slideInFromRight", slideInFromRight],
    ["slideInFromBottom", slideInFromBottom],
  ];

  return (
    <PreviewFrame>
      <div className="grid gap-3 sm:grid-cols-2">
        {presets.map(([label, preset]) => (
          <Surface key={label} className="overflow-hidden p-2">
            <div className="relative h-14 overflow-hidden rounded-lg bg-muted/40">
              <motion.div
                key={`${label}-${replayKey}`}
                {...presetSpread(preset)}
                className="absolute inset-x-2 top-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-xs"
              >
                {label}
              </motion.div>
            </div>
          </Surface>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function MotionScalePreview() {
  const replayKey = useReplayKey();
  const presets: ReadonlyArray<readonly [string, MotionPreset]> = [
    ["scaleIn", scaleIn],
    ["scaleInLg", scaleInLg],
    ["scaleInSpring", scaleInSpring],
  ];

  return (
    <PreviewFrame>
      <div className="grid gap-4 sm:grid-cols-3">
        {presets.map(([label, preset]) => (
          <Surface key={label} className="flex items-center justify-center p-6">
            <motion.div
              key={`${label}-${replayKey}`}
              {...presetSpread(preset)}
              className="w-full max-w-32 rounded-xl border border-border bg-card p-4 shadow-xs"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="size-8 rounded-lg bg-primary/10" />
                <MetricPill
                  label=""
                  value={label.replace("scale", "") || "In"}
                />
              </div>
              <Line width="w-3/4" />
              <div className="mt-2" />
              <Line width="w-full" />
            </motion.div>
          </Surface>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function MotionBlurPreview() {
  const replayKey = useReplayKey();
  const presets: ReadonlyArray<readonly [string, MotionPreset]> = [
    ["blurIn", blurIn],
    ["blurInSubtle", blurInSubtle],
  ];

  return (
    <PreviewFrame>
      <div className="grid gap-4 sm:grid-cols-2">
        {presets.map(([label, preset]) => (
          <Surface key={label} className="overflow-hidden">
            <SurfaceHeader eyebrow={label} title="Content reveal" />
            <motion.div
              key={`${label}-${replayKey}`}
              {...presetSpread(preset)}
              className="space-y-4 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary/10" />
                <div className="flex-1 space-y-2">
                  <Line width="w-1/3" />
                  <Line width="w-2/3" />
                </div>
              </div>
              <div className="rounded-xl bg-muted/40 p-4">
                <Line width="w-full" />
                <div className="mt-2" />
                <Line width="w-4/5" />
              </div>
            </motion.div>
          </Surface>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function MotionPopPreview() {
  const replayKey = useReplayKey();
  const presets: ReadonlyArray<readonly [string, MotionPreset]> = [
    ["pop", pop],
    ["popSubtle", popSubtle],
  ];

  return (
    <PreviewFrame>
      <div className="grid gap-4 sm:grid-cols-2">
        {presets.map(([label, preset]) => (
          <Surface
            key={label}
            className="flex items-center justify-between p-5"
          >
            <div>
              <div className="text-sm font-medium text-foreground">{label}</div>
              <div className="text-xs text-muted-foreground">
                Unread notifications
              </div>
            </div>
            <motion.div
              key={`${label}-${replayKey}`}
              {...presetSpread(preset)}
              className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs"
            >
              24
            </motion.div>
          </Surface>
        ))}
      </div>
    </PreviewFrame>
  );
}

export function MotionExpandPreview() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const id = window.setInterval(() => {
      setOpen((current) => !current);
    }, 2200);

    return () => window.clearInterval(id);
  }, []);

  return (
    <PreviewFrame>
      <Surface className="h-56 overflow-hidden">
        <SurfaceHeader
          eyebrow="expandHeight"
          title="Release notes"
          meta={open ? "Open" : "Closed"}
        />
        <div className="h-[calc(100%-61px)] p-4">
          <motion.div
            initial={false}
            animate={open ? "animate" : "initial"}
            variants={expandHeight.variants}
            transition={expandHeight.transition}
            className="h-full overflow-hidden"
          >
            <div className="h-full space-y-3 rounded-xl bg-muted/40 p-4 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Version 2.1</span>
                <MetricPill label="" value="Stable" />
              </div>
              <p>
                Motion docs now use consistent preview stages and product-like
                surfaces.
              </p>
              <p>
                All previews stay inside a fixed frame so the page does not
                shift while replaying.
              </p>
            </div>
          </motion.div>
        </div>
      </Surface>
    </PreviewFrame>
  );
}

export function MotionModalPreview() {
  const replayKey = useReplayKey(2800);

  return (
    <PreviewFrame>
      <motion.div
        key={`backdrop-${replayKey}`}
        {...presetSpread(overlayBackdrop)}
        className="absolute inset-0 bg-foreground/10"
      />
      <div className="relative flex h-full items-center justify-center">
        <motion.div
          key={`modal-${replayKey}`}
          {...presetSpread(modalContentSpring)}
          className="w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-foreground">
                Publish changes
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Review the final update before it goes live.
              </div>
            </div>
            <div className="size-9 rounded-xl bg-primary/10" />
          </div>
          <div className="mt-4 rounded-xl bg-muted/40 p-3">
            <Line width="w-1/3" />
            <div className="mt-2" />
            <Line width="w-full" />
          </div>
          <div className="mt-5 flex gap-2">
            <button
              type="button"
              className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
            >
              Publish
            </button>
            <button
              type="button"
              className="inline-flex h-9 items-center rounded-lg border border-border bg-background px-4 text-sm text-foreground"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </PreviewFrame>
  );
}

export function MotionToastPreview() {
  const replayKey = useReplayKey();

  return (
    <PreviewFrame>
      <div className="grid gap-4 sm:grid-cols-2">
        <Surface className="relative h-36 overflow-hidden bg-muted/30">
          <motion.div
            key={`toast-in-${replayKey}`}
            {...presetSpread(toastSlideIn)}
            className="absolute bottom-4 right-4 w-56 rounded-xl border border-border bg-card p-3 shadow-md"
          >
            <div className="text-sm font-medium text-foreground">
              Saved successfully
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Profile changes synced
            </div>
          </motion.div>
        </Surface>
        <Surface className="relative h-36 overflow-hidden bg-muted/30">
          <motion.div
            key={`toast-up-${replayKey}`}
            {...presetSpread(toastSlideUp)}
            className="absolute bottom-4 left-1/2 w-56 -translate-x-1/2 rounded-xl border border-border bg-card p-3 shadow-md"
          >
            <div className="text-sm font-medium text-foreground">
              New message
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Design review starts in 5 min
            </div>
          </motion.div>
        </Surface>
      </div>
    </PreviewFrame>
  );
}

export function MotionMicroInteractionPreview() {
  return (
    <PreviewFrame>
      <div className="grid gap-4 sm:grid-cols-2">
        <motion.button
          whileHover={hoverLift}
          whileTap={{ scale: 0.98, transition: press.transition }}
          type="button"
          className="rounded-2xl border border-border bg-card p-5 text-left shadow-xs"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-foreground">
                Project overview
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Hover to lift, press to commit
              </div>
            </div>
            <div className="size-10 rounded-xl bg-primary/10" />
          </div>
        </motion.button>
        <motion.button
          whileHover={hoverScale}
          whileTap={tapScale}
          type="button"
          className="flex items-center justify-between rounded-2xl bg-primary px-5 py-4 text-left text-primary-foreground shadow-xs"
        >
          <div>
            <div className="text-sm font-semibold">Deploy</div>
            <div className="mt-1 text-xs text-primary-foreground/80">
              Hover and tap feedback
            </div>
          </div>
          <div className="rounded-full bg-primary-foreground/15 px-2.5 py-1 text-[11px] font-medium">
            Live
          </div>
        </motion.button>
      </div>
    </PreviewFrame>
  );
}

export function MotionLoadingPreview() {
  return (
    <PreviewFrame>
      <div className="grid gap-4 sm:grid-cols-2">
        <Surface className="space-y-4 p-4">
          <div className="flex items-center gap-3">
            <motion.div
              {...presetSpread(pulse)}
              className="size-10 rounded-xl bg-muted"
            />
            <div className="flex-1 space-y-2">
              <motion.div
                {...presetSpread(pulse)}
                className="h-3 w-1/3 rounded-full bg-muted"
              />
              <motion.div
                {...presetSpread(pulse)}
                className="h-3 w-2/3 rounded-full bg-muted"
              />
            </div>
          </div>
          <motion.div
            {...presetSpread(pulse)}
            className="h-20 rounded-xl bg-muted"
          />
        </Surface>
        <Surface className="flex items-center justify-center p-6">
          <div className="flex flex-col items-center gap-4">
            <motion.div
              {...presetSpread(spin)}
              className="size-11 rounded-full border-3 border-primary/20 border-t-primary"
            />
            <div className="text-sm text-muted-foreground">Syncing assets</div>
          </div>
        </Surface>
      </div>
    </PreviewFrame>
  );
}

export function MotionStaggerPreview() {
  const replayKey = useReplayKey(2600);
  const items = ["Invoices", "Contracts", "Brand kit", "Reports"];
  const containers: ReadonlyArray<readonly [string, MotionPreset]> = [
    ["standard", staggerContainer],
    ["fast", staggerContainerFast],
    ["slow", staggerContainerSlow],
  ];

  return (
    <PreviewFrame>
      <div className="grid gap-4 sm:grid-cols-3">
        {containers.map(([label, preset]) => (
          <motion.div key={`${label}-${replayKey}`} {...presetSpread(preset)}>
            <Surface className="overflow-hidden">
              <SurfaceHeader eyebrow={label} title="Asset queue" />
              <div className="space-y-2 p-3">
                {items.map((item) => (
                  <motion.div
                    key={item}
                    variants={slideUp.variants}
                    transition={slideUp.transition}
                    className="rounded-lg border border-border bg-background px-3 py-2 shadow-xs"
                  >
                    <div className="text-sm font-medium text-foreground">
                      {item}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      Ready for review
                    </div>
                  </motion.div>
                ))}
              </div>
            </Surface>
          </motion.div>
        ))}
      </div>
    </PreviewFrame>
  );
}

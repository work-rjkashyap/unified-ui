<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/cn";

type Variant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline";
type Size = "sm" | "md" | "lg";

interface Props {
  variant?: Variant;
  size?: Size;
  dismissible?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "md",
  dismissible: false,
});

const emit = defineEmits<{ dismiss: [] }>();

const variantClasses: Record<Variant, string> = {
  default: "bg-muted text-foreground border border-transparent",
  primary:
    "bg-primary-muted text-primary-muted-foreground border border-transparent",
  secondary: "bg-secondary text-secondary-foreground border border-border",
  success:
    "bg-success-muted text-success-muted-foreground border border-transparent",
  warning:
    "bg-warning-muted text-warning-muted-foreground border border-transparent",
  danger:
    "bg-danger-muted text-danger-muted-foreground border border-transparent",
  info: "bg-info-muted text-info-muted-foreground border border-transparent",
  outline: "bg-transparent text-foreground border border-border",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-2 py-0.5 text-[11px] gap-1",
  md: "px-2.5 py-1 text-xs gap-1.5",
  lg: "px-3 py-1.5 text-sm gap-2",
};

const classes = computed(() =>
  cn(
    "inline-flex items-center gap-1.5 rounded-full font-medium leading-none whitespace-nowrap",
    "transition-[color,background-color,border-color,box-shadow,opacity] duration-[var(--duration-fast,150ms)] ease-[var(--easing-standard,cubic-bezier(0.4,0,0.2,1))]",
    "select-none shrink-0",
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.class,
  ),
);
</script>

<template>
  <span :class="classes" data-ds data-ds-component="badge">
    <slot />
    <button
      v-if="dismissible"
      class="ml-0.5 inline-flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10"
      :class="size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-3.5 w-3.5' : 'h-4 w-4'"
      @click.stop="emit('dismiss')"
      aria-label="Dismiss"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-full w-full"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </span>
</template>

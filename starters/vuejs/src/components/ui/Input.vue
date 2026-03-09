<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/cn";

type Variant = "default" | "error" | "success";
type Size = "sm" | "md" | "lg";

interface Props {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "md",
  disabled: false,
});

const _model = defineModel<string>();

const variantClasses: Record<Variant, string> = {
  default:
    "border-input hover:border-border-strong focus-visible:border-border-strong",
  error:
    "border-danger text-foreground focus-visible:border-danger placeholder:text-input-placeholder",
  success:
    "border-success text-foreground focus-visible:border-success placeholder:text-input-placeholder",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-2.5 text-xs",
  md: "h-[var(--ds-control-height,36px)] px-3 text-sm",
  lg: "h-10 px-3.5 text-sm",
};

const _classes = computed(() =>
  cn(
    "flex w-full text-sm leading-5 rounded-md border bg-background text-input-foreground",
    "placeholder:text-input-placeholder",
    "transition-[color,background-color,border-color,box-shadow,opacity] duration-[var(--duration-fast,150ms)] ease-[var(--easing-standard,cubic-bezier(0.4,0,0.2,1))]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground",
    "read-only:bg-muted read-only:cursor-default",
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.class,
  ),
);
</script>

<template>
  <input
    v-model="model"
    :class="classes"
    :disabled="disabled"
    data-ds
    data-ds-component="input"
  />
</template>

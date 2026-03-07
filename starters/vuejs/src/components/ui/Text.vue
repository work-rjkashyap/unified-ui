<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/cn";

type Variant = "body" | "bodySm" | "caption" | "label" | "overline" | "code";
type Color =
  | "default"
  | "foreground"
  | "muted"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

interface Props {
  variant?: Variant;
  color?: Color;
  as?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  variant: "body",
  color: "default",
  as: "p",
});

const variantClasses: Record<Variant, string> = {
  body: "text-[16px] leading-[24px] font-normal tracking-normal",
  bodySm: "text-[14px] leading-[20px] font-normal tracking-normal",
  caption:
    "text-[12px] leading-[16px] font-normal tracking-wide text-muted-foreground",
  label: "text-[14px] leading-[20px] font-medium tracking-normal",
  overline:
    "text-[12px] leading-[16px] font-semibold tracking-wider uppercase text-muted-foreground",
  code: "text-[14px] leading-[20px] font-normal tracking-normal font-mono",
};

const colorClasses: Record<Color, string> = {
  default: "text-foreground",
  foreground: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
};

const classes = computed(() =>
  cn(variantClasses[props.variant], colorClasses[props.color], props.class),
);
</script>

<template>
  <component :is="as" :class="classes" data-ds data-ds-component="text">
    <slot />
  </component>
</template>

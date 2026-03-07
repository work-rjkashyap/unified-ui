<script setup lang="ts">
import { computed, provide, type HTMLAttributes, type InjectionKey } from "vue";
import { cn } from "@/lib/cn";

type Variant = "default" | "outlined" | "elevated" | "interactive";
type Padding = "compact" | "comfortable";

interface Props {
  variant?: Variant;
  padding?: Padding;
  fullWidth?: boolean;
  as?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  padding: "compact",
  as: "div",
  fullWidth: false,
});

export const cardPaddingKey = Symbol("cardPadding") as InjectionKey<Padding>;
provide(cardPaddingKey, props.padding);

const variantClasses: Record<Variant, string> = {
  default: "bg-surface border border-border",
  outlined: "bg-transparent border border-border-strong",
  elevated: "bg-surface-raised border border-border-muted shadow-md",
  interactive:
    "bg-surface border border-border transition-[border-color,box-shadow,transform] duration-[var(--duration-normal,200ms)] ease-[var(--easing-standard,cubic-bezier(0.4,0,0.2,1))] hover:border-border-strong hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer",
};

const classes = computed(() =>
  cn(
    "flex flex-col rounded-md overflow-hidden text-sm text-foreground",
    variantClasses[props.variant],
    props.fullWidth && "w-full",
    props.class,
  ),
);
</script>

<template>
  <component :is="as" :class="classes" data-ds data-ds-component="card">
    <slot />
  </component>
</template>

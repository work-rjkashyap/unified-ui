<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/cn";

type Level = 1 | 2 | 3 | 4;
type Color = "default" | "foreground" | "muted" | "primary";

interface Props {
  level?: Level;
  color?: Color;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  level: 1,
  color: "default",
});

const levelClasses: Record<Level, string> = {
  1: "text-[30px] leading-[36px] font-bold tracking-tight",
  2: "text-[24px] leading-[32px] font-semibold tracking-tight",
  3: "text-[20px] leading-[28px] font-semibold tracking-normal",
  4: "text-[18px] leading-[28px] font-medium tracking-normal",
};

const colorClasses: Record<Color, string> = {
  default: "text-foreground",
  foreground: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
};

const _tag = computed(() => `h${props.level}` as const);

const _classes = computed(() =>
  cn(levelClasses[props.level], colorClasses[props.color], props.class),
);
</script>

<template>
  <component :is="tag" :class="classes" data-ds data-ds-component="heading">
    <slot />
  </component>
</template>

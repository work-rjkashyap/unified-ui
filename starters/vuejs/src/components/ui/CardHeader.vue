<script setup lang="ts">
import { computed, type HTMLAttributes, inject } from "vue";
import { cn } from "@/lib/cn";
import { cardPaddingKey } from "./Card.vue";

interface Props {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const padding = inject(cardPaddingKey, "compact");

const _classes = computed(() =>
  cn(
    "flex flex-col",
    padding === "comfortable"
      ? "px-6 pt-6 gap-1.5"
      : "px-[var(--ds-padding-card,16px)] pt-[var(--ds-padding-card,16px)] gap-1",
    props.class,
  ),
);
</script>

<template>
  <div :class="classes" data-ds data-ds-component="card-header">
    <slot />
  </div>
</template>

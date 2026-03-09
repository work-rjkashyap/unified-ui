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
    "flex items-center",
    padding === "comfortable"
      ? "px-6 pb-6 gap-3"
      : "px-[var(--ds-padding-card,16px)] pb-[var(--ds-padding-card,16px)] gap-2",
    props.class,
  ),
);
</script>

<template>
  <div :class="classes" data-ds data-ds-component="card-footer">
    <slot />
  </div>
</template>

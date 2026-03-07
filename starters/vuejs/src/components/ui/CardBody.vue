<script setup lang="ts">
import { inject, computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/cn";
import { cardPaddingKey } from "./Card.vue";

interface Props {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const padding = inject(cardPaddingKey, "compact");

const classes = computed(() =>
  cn(
    "flex flex-col flex-1",
    padding === "comfortable" ? "px-6 py-4 gap-4" : "px-[var(--ds-padding-card,16px)] py-3 gap-[var(--ds-gap-default,0.75rem)]",
    props.class,
  ),
);
</script>

<template>
  <div :class="classes" data-ds data-ds-component="card-body">
    <slot />
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from "./components/ThemeToggle.vue";
import {
  UiButton,
  UiBadge,
  UiCard,
  UiCardHeader,
  UiCardBody,
  UiCardFooter,
  UiInput,
  UiAlert,
  UiHeading,
  UiText,
} from "./components/ui";
import { ref } from "vue";

const email = ref("");
</script>

<template>
  <div
    class="flex min-h-svh flex-col items-center justify-center gap-8 bg-background p-8 text-foreground"
  >
    <UiCard class="w-full max-w-lg">
      <UiCardHeader>
        <UiHeading :level="2">Unified UI</UiHeading>
        <UiText variant="bodySm" color="muted">
          Your Vue.js project is ready with components. Start building!
        </UiText>
      </UiCardHeader>

      <UiCardBody class="space-y-6">
        <!-- Buttons -->
        <div class="space-y-2">
          <UiText variant="label">Buttons</UiText>
          <div class="flex flex-wrap items-center gap-2">
            <UiButton variant="primary">Primary</UiButton>
            <UiButton variant="secondary">Secondary</UiButton>
            <UiButton variant="ghost">Ghost</UiButton>
            <UiButton variant="danger" size="sm">Danger</UiButton>
            <UiButton variant="primary" :loading="true" size="sm">Loading</UiButton>
          </div>
        </div>

        <!-- Badges -->
        <div class="space-y-2">
          <UiText variant="label">Badges</UiText>
          <div class="flex flex-wrap items-center gap-2">
            <UiBadge variant="default">Default</UiBadge>
            <UiBadge variant="primary">Primary</UiBadge>
            <UiBadge variant="success">Success</UiBadge>
            <UiBadge variant="warning">Warning</UiBadge>
            <UiBadge variant="danger">Danger</UiBadge>
            <UiBadge variant="info">Info</UiBadge>
            <UiBadge variant="outline">Outline</UiBadge>
          </div>
        </div>

        <!-- Input -->
        <div class="space-y-2">
          <UiText variant="label">Input</UiText>
          <UiInput v-model="email" placeholder="you@example.com" />
        </div>

        <!-- Alert -->
        <UiAlert variant="info" title="All set!">
          Your design system components are working in Vue.
        </UiAlert>
      </UiCardBody>

      <UiCardFooter class="justify-between">
        <UiButton variant="primary">Get Started</UiButton>
        <ThemeToggle />
      </UiCardFooter>
    </UiCard>
  </div>
</template>

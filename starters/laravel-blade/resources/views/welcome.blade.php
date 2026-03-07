@extends('layouts.app')
@section('content')
<div class="flex min-h-svh flex-col items-center justify-center gap-8 p-8">
    <x-ui.card class="w-full max-w-lg">
        <x-ui.card-header>
            <x-ui.heading :level="2">Unified UI</x-ui.heading>
            <x-ui.text variant="bodySm" color="muted">
                Your Laravel project is ready with components. Start building!
            </x-ui.text>
        </x-ui.card-header>
        <x-ui.card-body class="space-y-6">
            {{-- Buttons --}}
            <div class="space-y-2">
                <x-ui.text variant="label">Buttons</x-ui.text>
                <div class="flex flex-wrap items-center gap-2">
                    <x-ui.button variant="primary">Primary</x-ui.button>
                    <x-ui.button variant="secondary">Secondary</x-ui.button>
                    <x-ui.button variant="ghost">Ghost</x-ui.button>
                    <x-ui.button variant="danger" size="sm">Danger</x-ui.button>
                    <x-ui.button variant="primary" :loading="true" size="sm">Loading</x-ui.button>
                </div>
            </div>
            {{-- Badges --}}
            <div class="space-y-2">
                <x-ui.text variant="label">Badges</x-ui.text>
                <div class="flex flex-wrap items-center gap-2">
                    <x-ui.badge variant="default">Default</x-ui.badge>
                    <x-ui.badge variant="primary">Primary</x-ui.badge>
                    <x-ui.badge variant="success">Success</x-ui.badge>
                    <x-ui.badge variant="warning">Warning</x-ui.badge>
                    <x-ui.badge variant="danger">Danger</x-ui.badge>
                    <x-ui.badge variant="info">Info</x-ui.badge>
                    <x-ui.badge variant="outline">Outline</x-ui.badge>
                </div>
            </div>
            {{-- Input --}}
            <div class="space-y-2">
                <x-ui.text variant="label">Input</x-ui.text>
                <x-ui.input placeholder="you@example.com" />
            </div>
            {{-- Alert --}}
            <x-ui.alert variant="info" title="All set!">
                Your design system components are working in Laravel.
            </x-ui.alert>
        </x-ui.card-body>
        <x-ui.card-footer class="justify-between">
            <x-ui.button variant="primary">Get Started</x-ui.button>
            <x-ui.button variant="secondary" onclick="toggleTheme()">Toggle Theme</x-ui.button>
        </x-ui.card-footer>
    </x-ui.card>
</div>
@endsection

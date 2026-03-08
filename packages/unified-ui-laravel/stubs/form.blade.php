{{--
    Unified UI — Form Component
    https://unified-ui.space

    A styled form wrapper with automatic CSRF token injection, HTTP method
    spoofing for PUT/PATCH/DELETE requests, and structured layout options.
    Integrates seamlessly with Laravel's form handling conventions.

    Usage:
        {{-- Basic form --}}
        <x-ui-form action="/login" method="POST">
            <x-ui-input name="email" label="Email" type="email" />
            <x-ui-input name="password" label="Password" type="password" />
            <x-ui-button type="submit">Log In</x-ui-button>
        </x-ui-form>

        {{-- PUT method (auto-spoofed) --}}
        <x-ui-form action="/profile" method="PUT">
            <x-ui-input name="name" label="Name" />
            <x-ui-button type="submit">Update</x-ui-button>
        </x-ui-form>

        {{-- DELETE method --}}
        <x-ui-form action="/account" method="DELETE">
            <x-ui-button type="submit" variant="destructive">Delete Account</x-ui-button>
        </x-ui-form>

        {{-- With file uploads --}}
        <x-ui-form action="/upload" method="POST" has-files>
            <input type="file" name="avatar" />
            <x-ui-button type="submit">Upload</x-ui-button>
        </x-ui-form>

        {{-- With gap control --}}
        <x-ui-form action="/register" method="POST" gap="6">
            <x-ui-input name="name" label="Name" />
            <x-ui-input name="email" label="Email" type="email" />
            <x-ui-input name="password" label="Password" type="password" />
            <x-ui-button type="submit" fullWidth>Register</x-ui-button>
        </x-ui-form>

        {{-- Horizontal layout --}}
        <x-ui-form action="/search" method="GET" layout="horizontal">
            <x-ui-input name="q" placeholder="Search…" />
            <x-ui-button type="submit">Search</x-ui-button>
        </x-ui-form>

        {{-- Without CSRF (for GET forms or external targets) --}}
        <x-ui-form action="/search" method="GET" :csrf="false">
            <x-ui-input name="q" placeholder="Search…" />
            <x-ui-button type="submit">Search</x-ui-button>
        </x-ui-form>

        {{-- With Alpine.js submit handling --}}
        <x-ui-form
            action="/api/contact"
            method="POST"
            x-data="{ submitting: false }"
            x-on:submit.prevent="submitting = true; $el.submit()"
        >
            <x-ui-input name="message" label="Message" />
            <x-ui-button type="submit" x-bind:loading="submitting">Send</x-ui-button>
        </x-ui-form>

        {{-- With confirm before submit --}}
        <x-ui-form
            action="/danger"
            method="DELETE"
            confirm="Are you sure you want to delete this?"
        >
            <x-ui-button type="submit" variant="destructive">Delete</x-ui-button>
        </x-ui-form>

    Props:
        action   — form action URL (required for non-GET forms)
        method   — HTTP method: GET|POST|PUT|PATCH|DELETE (default: POST)
        csrf     — boolean, inject @csrf token (default: true for non-GET methods)
        hasFiles — boolean, adds enctype="multipart/form-data" (default: false)
        layout   — vertical|horizontal|inline (default: vertical)
        gap      — 0|1|2|3|4|5|6|8|10|12 (default: 4) — vertical gap between form children
        confirm  — optional confirmation message shown before submitting (default: null)
        novalidate — boolean, disables browser native validation (default: false)
        autocomplete — on|off (default: null — browser default)
--}}

@props([
    'action' => null,
    'method' => 'POST',
    'csrf' => null,
    'hasFiles' => false,
    'layout' => 'vertical',
    'gap' => '4',
    'confirm' => null,
    'novalidate' => false,
    'autocomplete' => null,
])

@php
    // ── Normalize the HTTP method ─────────────────────────────────────
    $upperMethod = strtoupper($method);

    // Laravel supports GET and POST natively in HTML forms.
    // PUT, PATCH, DELETE are spoofed via a hidden _method field.
    $needsSpoof = in_array($upperMethod, ['PUT', 'PATCH', 'DELETE']);
    $formMethod = $needsSpoof ? 'POST' : $upperMethod;

    // ── CSRF logic ───────────────────────────────────────────────────
    // Default: include CSRF for all non-GET methods unless explicitly disabled
    $includeCsrf = $csrf ?? ($upperMethod !== 'GET');

    // ── Layout classes ───────────────────────────────────────────────
    $layoutClasses = match ($layout) {
        'horizontal' => 'flex flex-row flex-wrap items-end',
        'inline' => 'inline-flex flex-row flex-wrap items-end',
        default => 'flex flex-col',
    };

    // ── Gap classes ──────────────────────────────────────────────────
    $gapClasses = match ((string) $gap) {
        '0'  => 'gap-0',
        '1'  => 'gap-1',
        '2'  => 'gap-2',
        '3'  => 'gap-3',
        '4'  => 'gap-4',
        '5'  => 'gap-5',
        '6'  => 'gap-6',
        '8'  => 'gap-8',
        '10' => 'gap-10',
        '12' => 'gap-12',
        default => 'gap-4',
    };

    // ── Width classes ────────────────────────────────────────────────
    $widthClasses = match ($layout) {
        'horizontal', 'inline' => '',
        default => 'w-full',
    };

    // ── Merge all classes ────────────────────────────────────────────
    $classes = trim(implode(' ', array_filter([
        $layoutClasses,
        $gapClasses,
        $widthClasses,
    ])));
@endphp

<form
    @if($action) action="{{ $action }}" @endif
    method="{{ $formMethod }}"
    @if($hasFiles) enctype="multipart/form-data" @endif
    @if($novalidate) novalidate @endif
    @if($autocomplete) autocomplete="{{ $autocomplete }}" @endif
    @if($confirm)
        x-on:submit.prevent="if (confirm(@js($confirm))) { $el.submit(); }"
    @endif
    {{ $attributes->class([$classes]) }}
    data-ui-form
    data-ui-form-layout="{{ $layout }}"
>
    {{-- CSRF Token --}}
    @if($includeCsrf)
        @csrf
    @endif

    {{-- Method Spoofing --}}
    @if($needsSpoof)
        @method($upperMethod)
    @endif

    {{-- Form content --}}
    {{ $slot }}
</form>

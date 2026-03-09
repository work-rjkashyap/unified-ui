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

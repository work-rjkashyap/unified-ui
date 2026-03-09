@props([
    'label'       => null,
    'description' => null,
    'error'       => null,
    'required'    => false,
    'for'         => null,
    'hint'        => null,
])

{{--
    FormField — label + input + error/hint wrapper.
    Equivalent to the React form-field component.

    Usage:
        <x-form-field label="Email" :error="$errors->first('email')" for="email" required>
            <x-input id="email" name="email" type="email" />
        </x-form-field>
--}}

<div
    {{ $attributes->class(['flex flex-col gap-1.5']) }}
    data-ui-form-field
    @if($error) data-ui-error @endif
>
    {{-- Label --}}
    @if($label)
        <label
            @if($for) for="{{ $for }}" @endif
            class="text-sm font-medium leading-5 text-[oklch(var(--ui-foreground))]"
        >
            {{ $label }}
            @if($required)
                <span class="ml-0.5 text-[oklch(var(--ui-destructive))]" aria-hidden="true">*</span>
            @endif
        </label>
    @endif

    {{-- Description --}}
    @if($description)
        <p class="text-xs leading-4 text-[oklch(var(--ui-muted-foreground))]">
            {{ $description }}
        </p>
    @endif

    {{-- Input --}}
    {{ $slot }}

    {{-- Hint --}}
    @if($hint && !$error)
        <p class="text-xs leading-4 text-[oklch(var(--ui-muted-foreground))]">
            {{ $hint }}
        </p>
    @endif

    {{-- Error message --}}
    @if($error)
        <p class="flex items-center gap-1 text-xs leading-4 text-[oklch(var(--ui-destructive))]" role="alert">
            <svg class="h-3.5 w-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {{ $error }}
        </p>
    @endif
</div>

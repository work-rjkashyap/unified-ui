@props([
    'position'   => 'bottom-right',
    'duration'   => 4000,
    'maxVisible' => 3,
    'expand'     => true,
    'richColors' => true,
])

{{--
    Sonner-compatible stacked toast notifications.
    Mirrors the React SonnerToaster component.

    Place once before </body>:
        <x-sonner position="bottom-right" />

    Dispatch from anywhere:
        $dispatch('toast', { message: 'Saved!', variant: 'success' })
        $dispatch('toast', { title: 'Error', message: 'Failed.', variant: 'danger' })
--}}

<x-toast
    :position="$position"
    :duration="$duration"
    :max-visible="$maxVisible"
/>

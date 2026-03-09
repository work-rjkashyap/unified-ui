@props([
    'content' => '',
    'prose'   => true,
])

{{--
    Markdown — renders pre-processed HTML from Markdown.
    Pass rendered HTML (use Laravel's Str::markdown() or a package like league/commonmark).

    Usage (with league/commonmark):
        <x-markdown :content="Str::markdown($post->body)" />

    Usage (raw HTML):
        <x-markdown>
            {!! $renderedHtml !!}
        </x-markdown>
--}}

<div
    {{ $attributes->class([
        $prose ? 'prose prose-sm dark:prose-invert max-w-none' : '',
        'text-[oklch(var(--ui-foreground))]',
    ]) }}
    data-ui-markdown
>
    @if($content)
        {!! $content !!}
    @else
        {{ $slot }}
    @endif
</div>

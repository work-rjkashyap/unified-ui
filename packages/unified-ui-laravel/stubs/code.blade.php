{{--
    Unified UI — Code Component
    https://unified-ui.space

    Inline code and code block styling with optional copy-to-clipboard
    button. Supports syntax highlighting themes via design tokens and
    multiple visual variants.

    Usage:
        {{-- Inline code --}}
        <x-ui-code>npm install unified-ui</x-ui-code>

        {{-- Code block (multi-line) --}}
        <x-ui-code block>
            const app = createApp();
            app.mount('#root');
        </x-ui-code>

        {{-- With copy-to-clipboard button --}}
        <x-ui-code copyable>composer require unified-ui/laravel</x-ui-code>

        {{-- Code block with copy --}}
        <x-ui-code block copyable>
            php artisan ui:add button
            php artisan ui:add card
            php artisan ui:add modal
        </x-ui-code>

        {{-- With language label --}}
        <x-ui-code block language="bash" copyable>
            curl -fsSL https://example.com/install.sh | bash
        </x-ui-code>

        {{-- With filename header --}}
        <x-ui-code block filename="tailwind.config.js" copyable>
            export default {
                content: ['./resources/**/*.blade.php'],
            }
        </x-ui-code>

        {{-- Variant styles --}}
        <x-ui-code variant="default">default style</x-ui-code>
        <x-ui-code variant="ghost">ghost / minimal style</x-ui-code>
        <x-ui-code variant="outline">outlined style</x-ui-code>

        {{-- Size variants --}}
        <x-ui-code size="xs">tiny code</x-ui-code>
        <x-ui-code size="sm">small code</x-ui-code>
        <x-ui-code size="md">medium code</x-ui-code>
        <x-ui-code size="lg">large code</x-ui-code>

        {{-- Inline with surrounding text --}}
        <p>
            Run <x-ui-code>php artisan migrate</x-ui-code> to apply
            the database migrations.
        </p>

        {{-- With line numbers --}}
        <x-ui-code block line-numbers>
            line one
            line two
            line three
        </x-ui-code>

        {{-- With highlighted lines --}}
        <x-ui-code block :highlight="[2, 4]">
            line one
            line two (highlighted)
            line three
            line four (highlighted)
        </x-ui-code>

        {{-- Wrapping behavior --}}
        <x-ui-code block wrap>
            This is a very long line of code that will wrap instead of scrolling horizontally when it exceeds the container width.
        </x-ui-code>

    Props:
        block       — boolean, renders as a block-level <pre><code> instead of inline <code> (default: false)
        copyable    — boolean, shows a copy-to-clipboard button (default: false)
        language    — optional language label displayed in the top-right corner of block mode
        filename    — optional filename displayed as a header bar above the code block
        variant     — default|ghost|outline (default: default)
        size        — xs|sm|md|lg (default: sm)
        lineNumbers — boolean, shows line numbers in block mode (default: false)
        highlight   — array of line numbers to visually highlight (default: [])
        wrap        — boolean, enables word-wrap in block mode instead of horizontal scroll (default: false)
        maxHeight   — optional max-height CSS value for block mode with scroll (default: null)
--}}

@props([
    'block' => false,
    'copyable' => false,
    'language' => null,
    'filename' => null,
    'variant' => 'default',
    'size' => 'sm',
    'lineNumbers' => false,
    'highlight' => [],
    'wrap' => false,
    'maxHeight' => null,
])

@php
    // ── Size classes ─────────────────────────────────────────────────
    $inlineSizeClasses = match ($size) {
        'xs' => 'px-1 py-0 text-[10px]',
        'sm' => 'px-1.5 py-0.5 text-xs',
        'md' => 'px-2 py-0.5 text-sm',
        'lg' => 'px-2.5 py-1 text-base',
        default => 'px-1.5 py-0.5 text-xs',
    };

    $blockSizeClasses = match ($size) {
        'xs' => 'text-[10px] leading-relaxed',
        'sm' => 'text-xs leading-relaxed',
        'md' => 'text-sm leading-relaxed',
        'lg' => 'text-base leading-relaxed',
        default => 'text-xs leading-relaxed',
    };

    $blockPaddingClasses = match ($size) {
        'xs' => 'p-2.5',
        'sm' => 'p-3',
        'md' => 'p-4',
        'lg' => 'p-5',
        default => 'p-3',
    };

    // ── Variant classes ──────────────────────────────────────────────
    $inlineVariantClasses = match ($variant) {
        'ghost' => implode(' ', [
            'bg-transparent',
            'text-[oklch(var(--ui-primary))]',
            'border-transparent',
        ]),
        'outline' => implode(' ', [
            'bg-transparent',
            'text-[oklch(var(--ui-foreground))]',
            'border',
            'border-[oklch(var(--ui-border))]',
        ]),
        default => implode(' ', [
            'bg-[oklch(var(--ui-muted))]',
            'text-[oklch(var(--ui-foreground))]',
            'border-transparent',
        ]),
    };

    $blockVariantClasses = match ($variant) {
        'ghost' => implode(' ', [
            'bg-[oklch(var(--ui-muted)/0.3)]',
            'text-[oklch(var(--ui-foreground))]',
            'border-transparent',
        ]),
        'outline' => implode(' ', [
            'bg-transparent',
            'text-[oklch(var(--ui-foreground))]',
            'border',
            'border-[oklch(var(--ui-border))]',
        ]),
        default => implode(' ', [
            'bg-[oklch(var(--ui-muted))]',
            'text-[oklch(var(--ui-foreground))]',
            'border',
            'border-[oklch(var(--ui-border)/0.5)]',
        ]),
    };

    // ── Inline code classes ──────────────────────────────────────────
    $inlineClasses = implode(' ', [
        'font-mono',
        'rounded-[var(--ui-radius-sm)]',
        'whitespace-nowrap',
        $inlineSizeClasses,
        $inlineVariantClasses,
    ]);

    // ── Block wrapper classes ────────────────────────────────────────
    $blockWrapperClasses = implode(' ', [
        'relative',
        'rounded-[var(--ui-radius-lg)]',
        'overflow-hidden',
        $blockVariantClasses,
    ]);

    // ── Block code area classes ──────────────────────────────────────
    $wrapClasses = $wrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre';
    $scrollClasses = $wrap ? '' : 'overflow-x-auto';

    $blockCodeClasses = implode(' ', [
        'font-mono',
        $blockSizeClasses,
        $blockPaddingClasses,
        $wrapClasses,
        $scrollClasses,
    ]);

    // ── Max height style ─────────────────────────────────────────────
    $maxHeightStyle = $maxHeight ? "max-height: {$maxHeight}; overflow-y: auto;" : '';

    // ── Copy button size ─────────────────────────────────────────────
    $copyBtnSizeClasses = match ($size) {
        'xs' => 'h-5 w-5',
        'sm' => 'h-6 w-6',
        'md' => 'h-7 w-7',
        'lg' => 'h-8 w-8',
        default => 'h-6 w-6',
    };

    $copyIconSizeClasses = match ($size) {
        'xs' => 'h-2.5 w-2.5',
        'sm' => 'h-3 w-3',
        'md' => 'h-3.5 w-3.5',
        'lg' => 'h-4 w-4',
        default => 'h-3 w-3',
    };

    // ── Header classes ───────────────────────────────────────────────
    $headerClasses = implode(' ', [
        'flex',
        'items-center',
        'justify-between',
        'gap-2',
        'border-b',
        'border-[oklch(var(--ui-border)/0.5)]',
        'bg-[oklch(var(--ui-muted)/0.5)]',
        'px-3',
        'py-1.5',
    ]);

    // ── Line number gutter classes ───────────────────────────────────
    $lineNumberClasses = implode(' ', [
        'select-none',
        'pr-3',
        'mr-3',
        'border-r',
        'border-[oklch(var(--ui-border)/0.3)]',
        'text-right',
        'text-[oklch(var(--ui-muted-foreground)/0.5)]',
    ]);

    // ── Highlighted line classes ──────────────────────────────────────
    $highlightLineClasses = 'bg-[oklch(var(--ui-primary)/0.08)]';

    // ── Process lines for block mode with line numbers or highlighting ──
    $hasLineFeatures = $block && ($lineNumbers || count($highlight) > 0);
@endphp

@if($block)
    {{-- ═══════════════════════════════════════════════════════════════
         Block Code Mode
         ═══════════════════════════════════════════════════════════════ --}}
    <div
        {{ $attributes->class([$blockWrapperClasses]) }}
        @if($copyable)
            x-data="{
                copied: false,
                async copy() {
                    const code = this.$refs.code?.innerText || '';
                    try {
                        await navigator.clipboard.writeText(code);
                        this.copied = true;
                        setTimeout(() => { this.copied = false; }, 2000);
                    } catch (e) {
                        console.error('Copy failed', e);
                    }
                }
            }"
        @endif
        data-ui-code
        data-ui-code-block
    >
        {{-- Header bar (filename / language label) --}}
        @if($filename || $language || $copyable)
            <div class="{{ $headerClasses }}">
                <div class="flex items-center gap-2 min-w-0">
                    @if($filename)
                        <span class="text-xs font-medium text-[oklch(var(--ui-foreground))] truncate">
                            {{ $filename }}
                        </span>
                    @elseif($language)
                        <span class="text-xs font-medium text-[oklch(var(--ui-muted-foreground))] uppercase tracking-wider">
                            {{ $language }}
                        </span>
                    @else
                        <span></span>
                    @endif
                </div>

                {{-- Copy button in header --}}
                @if($copyable)
                    <button
                        type="button"
                        x-on:click="copy()"
                        class="
                            {{ $copyBtnSizeClasses }}
                            shrink-0
                            inline-flex items-center justify-center
                            rounded-[var(--ui-radius-sm)]
                            text-[oklch(var(--ui-muted-foreground))]
                            hover:text-[oklch(var(--ui-foreground))]
                            hover:bg-[oklch(var(--ui-accent))]
                            transition-colors
                            duration-[var(--ui-duration-fast)]
                            ease-[var(--ui-ease-default)]
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-[oklch(var(--ui-ring))]
                        "
                        x-bind:aria-label="copied ? 'Copied!' : 'Copy to clipboard'"
                        x-bind:title="copied ? 'Copied!' : 'Copy to clipboard'"
                    >
                        {{-- Copy icon --}}
                        <svg
                            x-show="!copied"
                            class="{{ $copyIconSizeClasses }}"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>

                        {{-- Check icon (shown after copy) --}}
                        <svg
                            x-show="copied"
                            x-cloak
                            class="{{ $copyIconSizeClasses }} text-[oklch(var(--ui-success))]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </button>
                @endif
            </div>
        @endif

        {{-- Code area --}}
        <div
            @if($maxHeightStyle) style="{{ $maxHeightStyle }}" @endif
            class="{{ !$filename && !$language && $copyable ? 'relative' : '' }}"
        >
            {{-- Floating copy button (when no header bar) --}}
            @if($copyable && !$filename && !$language)
                <button
                    type="button"
                    x-on:click="copy()"
                    class="
                        absolute top-2 right-2 z-10
                        {{ $copyBtnSizeClasses }}
                        inline-flex items-center justify-center
                        rounded-[var(--ui-radius-sm)]
                        text-[oklch(var(--ui-muted-foreground))]
                        hover:text-[oklch(var(--ui-foreground))]
                        bg-[oklch(var(--ui-muted)/0.8)]
                        hover:bg-[oklch(var(--ui-accent))]
                        backdrop-blur-sm
                        transition-colors
                        duration-[var(--ui-duration-fast)]
                        ease-[var(--ui-ease-default)]
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[oklch(var(--ui-ring))]
                        opacity-0
                        group-hover:opacity-100
                        [div:hover>&]:opacity-100
                    "
                    x-bind:class="{ 'opacity-100': copied }"
                    x-bind:aria-label="copied ? 'Copied!' : 'Copy to clipboard'"
                    x-bind:title="copied ? 'Copied!' : 'Copy to clipboard'"
                >
                    <svg
                        x-show="!copied"
                        class="{{ $copyIconSizeClasses }}"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    <svg
                        x-show="copied"
                        x-cloak
                        class="{{ $copyIconSizeClasses }} text-[oklch(var(--ui-success))]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </button>
            @endif

            <pre class="{{ $blockCodeClasses }}"><code
                x-ref="code"
                @if($language) data-language="{{ $language }}" @endif
            >@if($hasLineFeatures){{--
                --}}@php
                    $rawContent = trim($slot->toHtml());
                    $lines = explode("\n", $rawContent);
                @endphp{{--
                --}}@foreach($lines as $lineIndex => $line){{--
                    --}}@php $lineNum = $lineIndex + 1; $isHighlighted = in_array($lineNum, $highlight); @endphp{{--
                    --}}<span class="inline-flex w-full {{ $isHighlighted ? $highlightLineClasses : '' }}">@if($lineNumbers)<span class="{{ $lineNumberClasses }}" style="min-width: {{ strlen((string)count($lines)) }}ch;" aria-hidden="true">{{ $lineNum }}</span>@endif<span>{{ $line }}</span></span>
@endforeach{{--
            --}}@else{{ $slot }}@endif</code></pre>
        </div>
    </div>

@else
    {{-- ═══════════════════════════════════════════════════════════════
         Inline Code Mode
         ═══════════════════════════════════════════════════════════════ --}}
    @if($copyable)
        <span
            x-data="{
                copied: false,
                async copy() {
                    const code = this.$refs.code?.innerText || '';
                    try {
                        await navigator.clipboard.writeText(code);
                        this.copied = true;
                        setTimeout(() => { this.copied = false; }, 2000);
                    } catch (e) {
                        console.error('Copy failed', e);
                    }
                }
            }"
            class="inline-flex items-center gap-1 group"
            data-ui-code
            data-ui-code-inline
        >
            <code
                x-ref="code"
                {{ $attributes->class([$inlineClasses]) }}
            >{{ $slot }}</code>

            <button
                type="button"
                x-on:click="copy()"
                class="
                    inline-flex items-center justify-center
                    {{ $copyBtnSizeClasses }}
                    shrink-0
                    rounded-[var(--ui-radius-sm)]
                    text-[oklch(var(--ui-muted-foreground))]
                    hover:text-[oklch(var(--ui-foreground))]
                    hover:bg-[oklch(var(--ui-accent))]
                    transition-colors
                    duration-[var(--ui-duration-fast)]
                    ease-[var(--ui-ease-default)]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[oklch(var(--ui-ring))]
                    opacity-60
                    hover:opacity-100
                "
                x-bind:aria-label="copied ? 'Copied!' : 'Copy to clipboard'"
                x-bind:title="copied ? 'Copied!' : 'Copy to clipboard'"
            >
                <svg
                    x-show="!copied"
                    class="{{ $copyIconSizeClasses }}"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                <svg
                    x-show="copied"
                    x-cloak
                    class="{{ $copyIconSizeClasses }} text-[oklch(var(--ui-success))]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </button>
        </span>
    @else
        <code
            {{ $attributes->class([$inlineClasses]) }}
            data-ui-code
            data-ui-code-inline
        >{{ $slot }}</code>
    @endif
@endif

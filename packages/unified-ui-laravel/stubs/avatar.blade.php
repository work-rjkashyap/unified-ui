{{--
    Unified UI — Avatar Component
    https://unified-ui.space

    A user avatar component with image support, initials fallback,
    online/offline status indicator, and multiple sizes.

    Usage:
        {{-- With image --}}
        <x-ui-avatar src="/img/user.jpg" alt="Jane Doe" />

        {{-- With initials fallback --}}
        <x-ui-avatar initials="JD" />

        {{-- With name (auto-generates initials) --}}
        <x-ui-avatar name="Jane Doe" />

        {{-- With status indicator --}}
        <x-ui-avatar src="/img/user.jpg" alt="Jane Doe" status="online" />

        {{-- Different sizes --}}
        <x-ui-avatar src="/img/user.jpg" size="xs" />
        <x-ui-avatar src="/img/user.jpg" size="sm" />
        <x-ui-avatar src="/img/user.jpg" size="md" />
        <x-ui-avatar src="/img/user.jpg" size="lg" />
        <x-ui-avatar src="/img/user.jpg" size="xl" />
        <x-ui-avatar src="/img/user.jpg" size="2xl" />

        {{-- Square variant --}}
        <x-ui-avatar src="/img/user.jpg" rounded="md" />

        {{-- With ring / border --}}
        <x-ui-avatar src="/img/user.jpg" ring />

        {{-- As a link --}}
        <x-ui-avatar src="/img/user.jpg" as="a" href="/profile" />

        {{-- Avatar group --}}
        <div class="flex -space-x-2">
            <x-ui-avatar src="/img/user1.jpg" ring size="sm" />
            <x-ui-avatar src="/img/user2.jpg" ring size="sm" />
            <x-ui-avatar src="/img/user3.jpg" ring size="sm" />
            <x-ui-avatar initials="+5" size="sm" ring />
        </div>

    Props:
        src      — image URL (optional, falls back to initials)
        alt      — alt text for the image (default: empty string)
        name     — full name, used to auto-generate initials if no src or initials provided
        initials — explicit initials string (1-3 characters)
        size     — xs|sm|md|lg|xl|2xl (default: md)
        rounded  — full|sm|md|lg|xl|2xl|none (default: full)
        status   — null|online|offline|busy|away (default: null — no indicator)
        ring     — boolean, adds a ring/border around the avatar (default: false)
        as       — HTML tag: span|a|button (default: span)
        href     — URL when as=a
--}}

@props([
    'src' => null,
    'alt' => '',
    'name' => null,
    'initials' => null,
    'size' => 'md',
    'rounded' => 'full',
    'status' => null,
    'ring' => false,
    'as' => 'span',
    'href' => null,
])

@php
    // ── Resolve initials from name if needed ─────────────────────────
    $resolvedInitials = $initials;
    if ($resolvedInitials === null && $name && !$src) {
        $words = preg_split('/[\s\-_]+/', trim($name));
        $resolvedInitials = '';
        foreach (array_slice($words, 0, 2) as $word) {
            $resolvedInitials .= mb_strtoupper(mb_substr($word, 0, 1));
        }
    }

    // ── Size classes ─────────────────────────────────────────────────
    $sizeClasses = match ($size) {
        'xs'  => 'h-6 w-6',
        'sm'  => 'h-8 w-8',
        'md'  => 'h-10 w-10',
        'lg'  => 'h-12 w-12',
        'xl'  => 'h-14 w-14',
        '2xl' => 'h-16 w-16',
        default => 'h-10 w-10',
    };

    // ── Font size for initials ───────────────────────────────────────
    $fontSizeClasses = match ($size) {
        'xs'  => 'text-[10px]',
        'sm'  => 'text-xs',
        'md'  => 'text-sm',
        'lg'  => 'text-base',
        'xl'  => 'text-lg',
        '2xl' => 'text-xl',
        default => 'text-sm',
    };

    // ── Border radius ────────────────────────────────────────────────
    $roundedClasses = match ($rounded) {
        'full' => 'rounded-full',
        'none' => 'rounded-none',
        'sm'   => 'rounded-[var(--ui-radius-sm)]',
        'md'   => 'rounded-[var(--ui-radius-md)]',
        'lg'   => 'rounded-[var(--ui-radius-lg)]',
        'xl'   => 'rounded-[var(--ui-radius-xl)]',
        '2xl'  => 'rounded-[var(--ui-radius-2xl)]',
        default => 'rounded-full',
    };

    // ── Ring / border classes ────────────────────────────────────────
    $ringClasses = $ring
        ? 'ring-2 ring-[oklch(var(--ui-background))] ring-offset-0'
        : '';

    // ── Status indicator size & color ────────────────────────────────
    $statusSizeClasses = match ($size) {
        'xs'  => 'h-1.5 w-1.5',
        'sm'  => 'h-2 w-2',
        'md'  => 'h-2.5 w-2.5',
        'lg'  => 'h-3 w-3',
        'xl'  => 'h-3.5 w-3.5',
        '2xl' => 'h-4 w-4',
        default => 'h-2.5 w-2.5',
    };

    $statusColorClasses = match ($status) {
        'online'  => 'bg-[oklch(var(--ui-success))]',
        'offline' => 'bg-[oklch(var(--ui-muted-foreground)/0.4)]',
        'busy'    => 'bg-[oklch(var(--ui-destructive))]',
        'away'    => 'bg-[oklch(var(--ui-warning))]',
        default   => '',
    };

    // ── Status indicator position ────────────────────────────────────
    $statusPositionClasses = $rounded === 'full'
        ? 'bottom-0 right-0'
        : 'bottom-0 right-0 translate-x-0.5 translate-y-0.5';

    // ── Base classes ─────────────────────────────────────────────────
    $baseClasses = implode(' ', [
        'relative',
        'inline-flex',
        'items-center',
        'justify-center',
        'shrink-0',
        'overflow-hidden',
        'select-none',
        'bg-[oklch(var(--ui-muted))]',
        'text-[oklch(var(--ui-muted-foreground))]',
        'font-medium',
        'transition-all',
        'duration-[var(--ui-duration-normal)]',
        'ease-[var(--ui-ease-default)]',
    ]);

    // ── Interactive styles ───────────────────────────────────────────
    $interactiveClasses = ($href || $as === 'a' || $as === 'button') ? implode(' ', [
        'cursor-pointer',
        'hover:opacity-80',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-[oklch(var(--ui-ring))]',
        'focus-visible:ring-offset-2',
        'focus-visible:ring-offset-[oklch(var(--ui-background))]',
    ]) : '';

    // ── Merge all classes ────────────────────────────────────────────
    $classes = trim("{$baseClasses} {$sizeClasses} {$roundedClasses} {$ringClasses} {$fontSizeClasses} {$interactiveClasses}");

    // ── Determine which tag to render ────────────────────────────────
    $tag = $href ? 'a' : $as;
@endphp

<{{ $tag }}
    @if($tag === 'a' && $href) href="{{ $href }}" @endif
    @if($tag === 'button') type="button" @endif
    {{ $attributes->class([$classes]) }}
    data-ui-avatar
>
    @if($src)
        {{-- Image avatar --}}
        <img
            src="{{ $src }}"
            alt="{{ $alt }}"
            class="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
        />
        {{-- Hidden initials fallback (shown on image error) --}}
        <span
            class="hidden items-center justify-center h-full w-full"
            aria-hidden="true"
        >
            @if($resolvedInitials)
                {{ $resolvedInitials }}
            @else
                {{-- Default user icon SVG --}}
                <svg
                    class="h-[60%] w-[60%] text-[oklch(var(--ui-muted-foreground)/0.6)]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            @endif
        </span>
    @elseif($resolvedInitials)
        {{-- Initials avatar --}}
        <span aria-hidden="true">{{ $resolvedInitials }}</span>
        @if($alt || $name)
            <span class="sr-only">{{ $alt ?: $name }}</span>
        @endif
    @else
        {{-- Default user icon fallback --}}
        <svg
            class="h-[60%] w-[60%] text-[oklch(var(--ui-muted-foreground)/0.6)]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
        @if($alt || $name)
            <span class="sr-only">{{ $alt ?: $name }}</span>
        @endif
    @endif

    {{-- Status indicator --}}
    @if($status)
        <span
            class="absolute {{ $statusPositionClasses }} {{ $statusSizeClasses }} {{ $statusColorClasses }} rounded-full ring-2 ring-[oklch(var(--ui-background))]"
            role="status"
            aria-label="{{ ucfirst($status) }}"
        >
            <span class="sr-only">{{ ucfirst($status) }}</span>
        </span>
    @endif
</{{ $tag }}>

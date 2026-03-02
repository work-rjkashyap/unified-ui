declare const duration: {
    /** Instant feedback — hover states, color changes */
    readonly instant: 0;
    /** Micro-interactions — focus rings, icon swaps */
    readonly fast: 100;
    /** Snappy transitions — tooltips, small toggles */
    readonly moderate: 150;
    /** Standard transitions — dropdowns, accordions, tabs */
    readonly normal: 200;
    /** Emphasis transitions — modals, drawers, slide-ins */
    readonly slow: 300;
    /** Complex orchestrated animations — page transitions */
    readonly slower: 400;
    /** Long-form animations — skeleton loaders, progress */
    readonly slowest: 500;
};
/** CSS-ready duration strings (e.g. "200ms") */
declare const durationCSS: Record<keyof typeof duration, string>;
/** Framer Motion-ready duration values in seconds */
declare const durationSeconds: Record<keyof typeof duration, number>;
declare const easing: {
    /** General-purpose — equal acceleration and deceleration */
    readonly standard: readonly [0.2, 0, 0.38, 0.9];
    /** Enter animations — element arriving on screen */
    readonly decelerate: readonly [0, 0, 0.2, 1];
    /** Exit animations — element leaving the screen */
    readonly accelerate: readonly [0.4, 0, 1, 1];
    /** Attention / emphasis — overshoots slightly for impact */
    readonly emphasize: readonly [0, 0, 0.15, 1];
    /** Constant rate — spinners, progress bars */
    readonly linear: readonly [0, 0, 1, 1];
    /** Spring-like snap — toggle switches, checkboxes */
    readonly snap: readonly [0.2, 0, 0, 1];
};
/** CSS-ready cubic-bezier strings */
declare const easingCSS: Record<keyof typeof easing, string>;
declare const spring: {
    /** Gentle — tooltips, small popovers */
    readonly gentle: {
        readonly type: "spring";
        readonly stiffness: 150;
        readonly damping: 20;
        readonly mass: 1;
    };
    /** Snappy — buttons, toggles, micro-interactions */
    readonly snappy: {
        readonly type: "spring";
        readonly stiffness: 300;
        readonly damping: 25;
        readonly mass: 0.8;
    };
    /** Bouncy — playful emphasis, celebrations */
    readonly bouncy: {
        readonly type: "spring";
        readonly stiffness: 400;
        readonly damping: 15;
        readonly mass: 0.8;
    };
    /** Stiff — immediate, no overshoot (dialogs, drawers) */
    readonly stiff: {
        readonly type: "spring";
        readonly stiffness: 500;
        readonly damping: 35;
        readonly mass: 1;
    };
};
declare const stagger: {
    /** Rapid list items — 30ms between each */
    readonly fast: 0.03;
    /** Standard stagger — 50ms between each */
    readonly normal: 0.05;
    /** Deliberate reveal — 80ms between each */
    readonly slow: 0.08;
};
type Duration = keyof typeof duration;
type Easing = keyof typeof easing;
type Spring = keyof typeof spring;
type Stagger = keyof typeof stagger;

export { type Duration as D, type Easing as E, type Spring as S, type Stagger as a, durationCSS as b, durationSeconds as c, duration as d, easing as e, easingCSS as f, stagger as g, spring as s };

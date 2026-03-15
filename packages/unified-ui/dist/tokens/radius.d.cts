declare const radius: {
    /** No rounding */
    readonly none: "0px";
    /** Barely perceptible — tags, micro elements */
    readonly sm: "4px";
    /** Default for buttons, inputs, cards */
    readonly md: "6px";
    /** Dialogs, sheets, popovers, dropdowns */
    readonly lg: "8px";
    /** Larger containers, modals */
    readonly xl: "12px";
    /** Full pill / circle — avatars, toggle pills */
    readonly full: "9999px";
};
type Radius = keyof typeof radius;
type RadiusValue = (typeof radius)[Radius];

export { type Radius, type RadiusValue, radius };

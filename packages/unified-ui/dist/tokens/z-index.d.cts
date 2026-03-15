declare const zIndex: {
    /** Default document flow — no explicit stacking */
    readonly base: "0";
    /** Sticky headers, floating action bars, pinned columns */
    readonly sticky: "10";
    /** Backdrop overlays behind modals and drawers */
    readonly overlay: "40";
    /** Modals, dialogs, sheets, drawers */
    readonly modal: "50";
    /** Dropdowns, select menus, context menus — renders above modals */
    readonly dropdown: "60";
    /** Popovers, comboboxes, date pickers — renders above modals */
    readonly popover: "70";
    /** Toast notifications — always visible above all content */
    readonly toast: "80";
    /** Tooltips — highest interactive z-layer */
    readonly tooltip: "90";
    /** Emergency escape hatch — use sparingly and document why */
    readonly max: "9999";
};
type ZIndex = keyof typeof zIndex;
type ZIndexValue = (typeof zIndex)[ZIndex];

export { type ZIndex, type ZIndexValue, zIndex };

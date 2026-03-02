declare const fontFamily: {
    /** Display — used for hero headings, marketing text, landing pages */
    readonly display: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    /** Sans — primary UI typeface for all interface text */
    readonly sans: "'Outfit', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
    /** Serif — long-form reading, editorial content, blog posts */
    readonly serif: "'Lora', Georgia, 'Times New Roman', serif";
    /** Mono — code blocks, technical values, tabular data */
    readonly mono: "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', Consolas, 'Liberation Mono', Menlo, monospace";
    /** Inherit — use parent's font (escape hatch for third-party integration) */
    readonly inherit: "inherit";
};
type FontFamilyKey = keyof typeof fontFamily;
declare const fontSize: {
    readonly xs: "12px";
    readonly sm: "14px";
    readonly base: "16px";
    readonly lg: "18px";
    readonly xl: "20px";
    readonly "2xl": "24px";
    readonly "3xl": "30px";
};
declare const lineHeight: {
    readonly none: "1";
    readonly tight: "1.25";
    readonly snug: "1.375";
    readonly normal: "1.5";
    readonly relaxed: "1.625";
    /** Fixed pixel values for precise control */
    readonly "16": "16px";
    readonly "20": "20px";
    readonly "24": "24px";
    readonly "28": "28px";
    readonly "32": "32px";
    readonly "36": "36px";
};
declare const fontWeight: {
    readonly regular: "400";
    readonly medium: "500";
    readonly semibold: "600";
    readonly bold: "700";
};
declare const letterSpacing: {
    readonly tighter: "-0.05em";
    readonly tight: "-0.025em";
    readonly normal: "0em";
    readonly wide: "0.025em";
    readonly wider: "0.05em";
};
declare const typographyVariants: {
    /** Page titles — 30px bold, tight leading, sans font */
    readonly heading1: {
        readonly fontSize: "30px";
        readonly lineHeight: "36px";
        readonly fontWeight: "700";
        readonly letterSpacing: "-0.025em";
        readonly fontFamily: FontFamilyKey;
    };
    /** Section titles — 24px semibold, sans font */
    readonly heading2: {
        readonly fontSize: "24px";
        readonly lineHeight: "32px";
        readonly fontWeight: "600";
        readonly letterSpacing: "-0.025em";
        readonly fontFamily: FontFamilyKey;
    };
    /** Subsection titles — 20px semibold, sans font */
    readonly heading3: {
        readonly fontSize: "20px";
        readonly lineHeight: "28px";
        readonly fontWeight: "600";
        readonly letterSpacing: "0em";
        readonly fontFamily: FontFamilyKey;
    };
    /** Card titles, sidebar headings — 18px medium, sans font */
    readonly subheading: {
        readonly fontSize: "18px";
        readonly lineHeight: "28px";
        readonly fontWeight: "500";
        readonly letterSpacing: "0em";
        readonly fontFamily: FontFamilyKey;
    };
    /** Default body text — 16px regular, sans font */
    readonly body: {
        readonly fontSize: "16px";
        readonly lineHeight: "24px";
        readonly fontWeight: "400";
        readonly letterSpacing: "0em";
        readonly fontFamily: FontFamilyKey;
    };
    /** Compact body text — 14px regular, sans font */
    readonly bodySm: {
        readonly fontSize: "14px";
        readonly lineHeight: "20px";
        readonly fontWeight: "400";
        readonly letterSpacing: "0em";
        readonly fontFamily: FontFamilyKey;
    };
    /** Captions, helper text, timestamps — 12px regular, sans font */
    readonly caption: {
        readonly fontSize: "12px";
        readonly lineHeight: "16px";
        readonly fontWeight: "400";
        readonly letterSpacing: "0.025em";
        readonly fontFamily: FontFamilyKey;
    };
    /** Form labels, badges — 14px medium, sans font */
    readonly label: {
        readonly fontSize: "14px";
        readonly lineHeight: "20px";
        readonly fontWeight: "500";
        readonly letterSpacing: "0em";
        readonly fontFamily: FontFamilyKey;
    };
    /** Overline / eyebrow text — 12px semibold, uppercased in usage, sans font */
    readonly overline: {
        readonly fontSize: "12px";
        readonly lineHeight: "16px";
        readonly fontWeight: "600";
        readonly letterSpacing: "0.05em";
        readonly fontFamily: FontFamilyKey;
    };
    /** Code / monospace inline text — 14px regular, mono font */
    readonly code: {
        readonly fontSize: "14px";
        readonly lineHeight: "20px";
        readonly fontWeight: "400";
        readonly letterSpacing: "0em";
        readonly fontFamily: FontFamilyKey;
    };
};
type FontFamily = keyof typeof fontFamily;
type FontSize = keyof typeof fontSize;
type LineHeight = keyof typeof lineHeight;
type FontWeight = keyof typeof fontWeight;
type LetterSpacing = keyof typeof letterSpacing;
type TypographyVariant = keyof typeof typographyVariants;
type TypographyPreset = {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    letterSpacing: string;
    fontFamily: FontFamilyKey;
};

export { type FontFamily as F, type LetterSpacing as L, type TypographyPreset as T, type FontFamilyKey as a, type FontSize as b, type FontWeight as c, type LineHeight as d, type TypographyVariant as e, fontFamily as f, fontSize as g, fontWeight as h, lineHeight as i, letterSpacing as l, typographyVariants as t };

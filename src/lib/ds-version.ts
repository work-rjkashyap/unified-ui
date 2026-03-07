// Design system version — injected at build time via next.config.mjs `env`.
// Safe to use in both server and client components.
export const DS_VERSION: string = process.env.NEXT_PUBLIC_DS_VERSION ?? "0.0.0";

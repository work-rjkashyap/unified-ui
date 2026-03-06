import { ImageResponse } from "next/og";

export const alt = "Unified UI — Production-Ready React Components for Next.js";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #0c0a1a 0%, #1a1035 50%, #0c0a1a 100%)",
                fontFamily: "sans-serif",
            }}
        >
            {/* Background grid pattern */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    opacity: 0.06,
                    backgroundImage:
                        "linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Glow effect */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(109, 40, 217, 0.15) 0%, transparent 70%)",
                    display: "flex",
                }}
            />

            {/* Logo icon */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20,
                    borderRadius: 24,
                    background: "linear-gradient(135deg, rgba(109, 40, 217, 0.2), rgba(139, 92, 246, 0.15))",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    marginBottom: 32,
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M11 9h4a2 2 0 0 0 2-2V3" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="M7 21v-4a2 2 0 0 1 2-2h4" />
                    <circle cx="15" cy="15" r="2" />
                </svg>
            </div>

            {/* Title */}
            <div
                style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 12,
                    marginBottom: 16,
                }}
            >
                <span
                    style={{
                        fontSize: 56,
                        fontWeight: 800,
                        letterSpacing: "-0.05em",
                        color: "white",
                    }}
                >
                    UNIFIED
                </span>
                <span
                    style={{
                        fontSize: 56,
                        fontWeight: 800,
                        letterSpacing: "-0.05em",
                        color: "rgba(167, 139, 250, 0.7)",
                    }}
                >
                    UI
                </span>
            </div>

            {/* Description */}
            <div
                style={{
                    fontSize: 22,
                    color: "rgba(255, 255, 255, 0.5)",
                    maxWidth: 700,
                    textAlign: "center",
                    lineHeight: 1.5,
                    display: "flex",
                    marginBottom: 36,
                }}
            >
                50+ accessible, customizable React components for modern Next.js apps
            </div>

            {/* CTA Button */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 32px",
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #6d28d9, #8b5cf6)",
                    color: "white",
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                }}
            >
                Get Started
                <span style={{ marginLeft: 4 }}>→</span>
            </div>

            {/* Bottom bar */}
            <div
                style={{
                    position: "absolute",
                    bottom: 40,
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                    color: "rgba(255, 255, 255, 0.35)",
                    fontSize: 16,
                }}
            >
                <span>React</span>
                <span>•</span>
                <span>Next.js</span>
                <span>•</span>
                <span>TypeScript</span>
                <span>•</span>
                <span>Tailwind CSS</span>
            </div>
        </div>,
        { ...size },
    );
}

import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #6d28d9, #8b5cf6)",
                borderRadius: 6,
            }}
        >
            {/* CircuitBoard icon - matching the header logo */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M11 9h4a2 2 0 0 0 2-2V3" />
                <circle cx="9" cy="9" r="2" />
                <path d="M7 21v-4a2 2 0 0 1 2-2h4" />
                <circle cx="15" cy="15" r="2" />
            </svg>
        </div>,
        { ...size },
    );
}

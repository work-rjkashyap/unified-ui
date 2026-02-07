import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { FooterSection } from "@/components/home/footer-section";
import { HomeLayout } from "@/components/layout/home";
import { Nav } from "@/components/layout/nav";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <HomeLayout
            {...baseOptions}
            nav={{
                ...baseOptions.nav,
                component: <Nav />,
            }}
        >
            <div className="flex flex-col min-h-screen">
                <main className="flex-1">{children}</main>
                <FooterSection />
            </div>
        </HomeLayout>
    );
}

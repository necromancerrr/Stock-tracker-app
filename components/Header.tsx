"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import Logo from "@/components/Logo";
import SearchCommand from "@/components/SearchCommand";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
    const pathname = usePathname();

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-gray-900/70 backdrop-blur-xl dark:border-white/[0.06]">
            <div className="container flex items-center justify-between gap-4 py-3">
                <div className="flex items-center gap-6">
                    <Link href="/" aria-label="SP Tracker home">
                        <Logo />
                    </Link>
                    <nav
                        aria-label="Main navigation"
                        className="liquid-glass hidden rounded-full p-1 sm:block"
                    >
                        <ul className="flex items-center gap-1">
                            {NAV_ITEMS.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className={`pill block ${
                                            isActive(href)
                                                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#141414] shadow-[0_0_20px_rgba(253,212,88,0.25)]"
                                                : "text-gray-500 hover:text-gray-100"
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center gap-2">
                    <SearchCommand />
                    <ThemeToggle />
                </div>
            </div>
            <nav aria-label="Mobile navigation" className="border-t border-black/5 dark:border-white/[0.06] sm:hidden">
                <ul className="flex items-center justify-center gap-2 py-2">
                    {NAV_ITEMS.map(({ href, label }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`pill block ${
                                    isActive(href)
                                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#141414]"
                                        : "text-gray-500 hover:text-gray-100"
                                }`}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

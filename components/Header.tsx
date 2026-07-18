"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import SearchCommand from "@/components/SearchCommand";

export default function Header() {
    const pathname = usePathname();

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-gray-900/70 backdrop-blur-xl">
            <div className="container flex items-center justify-between gap-4 py-3">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/assets/icons/logo.svg"
                            alt="SP Tracker logo"
                            width={140}
                            height={32}
                            className="h-8 w-auto"
                            priority
                        />
                    </Link>
                    <nav
                        aria-label="Main navigation"
                        className="hidden rounded-full border border-white/[0.06] bg-gray-800/60 p-1 sm:block"
                    >
                        <ul className="flex items-center gap-1">
                            {NAV_ITEMS.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className={`pill block ${
                                            isActive(href)
                                                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-[0_0_20px_rgba(253,212,88,0.25)]"
                                                : "text-gray-500 hover:bg-white/[0.06] hover:text-gray-100"
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <SearchCommand />
            </div>
            <nav aria-label="Mobile navigation" className="border-t border-white/[0.06] sm:hidden">
                <ul className="flex items-center justify-center gap-2 py-2">
                    {NAV_ITEMS.map(({ href, label }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`pill block ${
                                    isActive(href)
                                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900"
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

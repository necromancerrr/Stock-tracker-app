"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import SearchCommand from "@/components/SearchCommand";

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-800">
            <div className="container header-wrapper">
                <div className="flex items-center gap-8">
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
                    <nav aria-label="Main navigation" className="hidden sm:block">
                        <ul className="flex items-center gap-8 font-medium">
                            {NAV_ITEMS.map(({ href, label }) => {
                                const active =
                                    href === "/"
                                        ? pathname === "/"
                                        : pathname.startsWith(href);
                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className={`text-sm transition-colors hover:text-yellow-500 ${
                                                active
                                                    ? "text-gray-100"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
                <SearchCommand />
            </div>
            <nav aria-label="Mobile navigation" className="sm:hidden border-t border-gray-700 bg-gray-800">
                <ul className="flex items-center justify-center gap-8 py-2 font-medium">
                    {NAV_ITEMS.map(({ href, label }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`text-sm transition-colors hover:text-yellow-500 ${
                                    (href === "/" ? pathname === "/" : pathname.startsWith(href))
                                        ? "text-gray-100"
                                        : "text-gray-500"
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

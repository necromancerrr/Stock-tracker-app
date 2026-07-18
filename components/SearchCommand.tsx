"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, TrendingUp, X } from "lucide-react";
import { POPULAR_STOCKS } from "@/lib/constants";

const MAX_RESULTS = 12;

export default function SearchCommand() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return POPULAR_STOCKS.slice(0, MAX_RESULTS);
        return POPULAR_STOCKS.filter(
            (s) =>
                s.symbol.toLowerCase().includes(q) ||
                s.name.toLowerCase().includes(q)
        ).slice(0, MAX_RESULTS);
    }, [query]);

    const close = useCallback(() => {
        setOpen(false);
        setQuery("");
        setActiveIndex(0);
    }, []);

    const goTo = useCallback(
        (symbol: string) => {
            close();
            router.push(`/stocks/${encodeURIComponent(symbol)}`);
        },
        [close, router]
    );

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((v) => !v);
            } else if (e.key === "Escape") {
                close();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [close]);

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    const onInputKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter" && results[activeIndex]) {
            goTo(results[activeIndex].symbol);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-500 transition-colors hover:border-gray-500 hover:text-gray-400"
                aria-label="Search stocks"
            >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search stocks…</span>
                <kbd className="hidden rounded border border-gray-600 bg-gray-700 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 md:inline">
                    ⌘K
                </kbd>
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-sm"
                    onClick={close}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Stock search"
                >
                    <div
                        className="glass-card w-full max-w-xl overflow-hidden !bg-gray-800/90"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative flex items-center border-b border-gray-600">
                            <Search className="absolute left-4 h-4 w-4 text-gray-500" />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setActiveIndex(0);
                                }}
                                onKeyDown={onInputKeyDown}
                                placeholder="Search by symbol or company name…"
                                className="h-14 w-full bg-transparent pl-11 pr-11 text-base text-gray-100 placeholder:text-gray-500 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={close}
                                className="absolute right-3 cursor-pointer rounded p-1 text-gray-500 hover:text-gray-400"
                                aria-label="Close search"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <ul className="max-h-[400px] overflow-y-auto py-2">
                            {results.length === 0 && (
                                <li className="px-5 py-8 text-center text-sm text-gray-500">
                                    No stocks found for “{query}”. Try a ticker
                                    like AAPL or NVDA.
                                </li>
                            )}
                            {results.map((stock, i) => (
                                <li key={stock.symbol}>
                                    <button
                                        type="button"
                                        onClick={() => goTo(stock.symbol)}
                                        onMouseEnter={() => setActiveIndex(i)}
                                        className={`flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors ${
                                            i === activeIndex
                                                ? "bg-gray-600/60"
                                                : ""
                                        }`}
                                    >
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700">
                                            <TrendingUp className="h-4 w-4 text-yellow-500" />
                                        </span>
                                        <span className="flex-1">
                                            <span className="block text-sm font-semibold text-gray-100">
                                                {stock.symbol}
                                            </span>
                                            <span className="block text-sm text-gray-400">
                                                {stock.name}
                                            </span>
                                        </span>
                                        <span className="text-xs font-medium text-gray-500">
                                            {stock.exchange}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

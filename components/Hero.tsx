"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Flame } from "lucide-react";

const TRENDING = ["NVDA", "TSLA", "AAPL", "PLTR", "COIN", "AMD", "META", "SMCI"];

const TYPED_TEXT =
    "Glad you stopped in. Markets never sleep — neither do we. Now, what are we watching?";

function useTypewriter(text: string, speed = 38, startDelay = 600) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        const timeout = setTimeout(() => {
            interval = setInterval(() => {
                setCount((c) => {
                    if (c >= text.length) {
                        clearInterval(interval);
                        return c;
                    }
                    return c + 1;
                });
            }, speed);
        }, startDelay);
        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [text, speed, startDelay]);

    return { displayed: text.slice(0, count), done: count >= text.length };
}

export default function Hero() {
    const router = useRouter();
    const { displayed, done } = useTypewriter(TYPED_TEXT);
    const [pillsVisible, setPillsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const t = setTimeout(() => setPillsVisible(true), 400);
        return () => clearTimeout(t);
    }, []);

    // Mouse-reactive background glow (rAF-throttled).
    useEffect(() => {
        let raf = 0;
        const onMove = (e: MouseEvent) => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                sectionRef.current?.style.setProperty("--mx", `${e.clientX}px`);
                sectionRef.current?.style.setProperty("--my", `${e.clientY}px`);
            });
        };
        window.addEventListener("mousemove", onMove);
        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    const actions = [
        { label: "Build your watchlist", onClick: () => router.push("/watchlist") },
        { label: "Check the heatmap", onClick: () => scrollToId("market") },
        { label: "Catch up on news", onClick: () => scrollToId("news") },
        { label: "Look up a stock", onClick: () => router.push("/stocks/NVDA") },
    ];

    const scrollToId = (id: string) =>
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    return (
        <section
            ref={sectionRef}
            className="relative flex min-h-[85vh] flex-col justify-end overflow-hidden pb-16 md:justify-center md:pb-0"
        >
            {/* Parallax grid background */}
            <svg
                aria-hidden
                className="pointer-events-none absolute -inset-12 h-[calc(100%+6rem)] w-[calc(100%+6rem)] opacity-10"
                style={{
                    transform:
                        "translate(calc(var(--mx, 50vw) / 60 - 12px), calc(var(--my, 50vh) / 60 - 8px))",
                }}
            >
                <defs>
                    <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#64748b" strokeWidth="0.6" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>
            {/* Mouse-following glow */}
            <div
                aria-hidden
                className="pointer-events-none fixed inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(38rem 38rem at var(--mx, 70%) var(--my, 30%), rgba(15, 237, 190, 0.09), transparent 65%)",
                }}
            />

            <div className="relative z-10 max-w-2xl">
                {/* Blurred intro label */}
                <p
                    className="pointer-events-none select-none mb-6 text-gray-400"
                    style={{
                        fontSize: "clamp(18px, 4vw, 26px)",
                        lineHeight: 1.3,
                        filter: "blur(4px)",
                    }}
                >
                    Hey there, meet SP Tracker,
                    <br />
                    your adaptive market intelligence companion
                </p>

                {/* Typewriter */}
                <p
                    className="mb-8 text-gray-100"
                    style={{
                        fontFamily: "var(--font-instrument-serif)",
                        fontSize: "clamp(26px, 5.5vw, 48px)",
                        lineHeight: 1.2,
                        minHeight: "2.6em",
                    }}
                >
                    {displayed}
                    {!done && (
                        <span className="ml-[2px] inline-block h-[1.05em] w-[2px] animate-blink bg-teal-400 align-middle" />
                    )}
                </p>

                {/* Action pills — fade in independently of typing */}
                <div
                    className="flex flex-wrap gap-y-1"
                    style={{
                        opacity: pillsVisible ? 1 : 0,
                        transform: pillsVisible ? "translateY(0)" : "translateY(8px)",
                        transition: "opacity 0.4s ease, transform 0.4s ease",
                    }}
                >
                    {actions.map(({ label, onClick }) => (
                        <button
                            key={label}
                            type="button"
                            onClick={onClick}
                            className="mx-[0.2em] mb-[0.4em] inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-[0.35em] text-[13px] font-medium text-[#141414] transition-colors duration-200 hover:bg-teal-400 dark:border-white/10 sm:px-5 sm:text-[15px]"
                        >
                            {label}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            window.dispatchEvent(
                                new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
                            )
                        }
                        className="mx-[0.2em] mb-[0.4em] inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border border-gray-400/50 bg-transparent px-4 py-[0.35em] text-[13px] font-medium text-gray-100 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 sm:px-5 sm:text-[15px]"
                    >
                        Search anything
                        <kbd className="rounded border border-current/30 px-1.5 font-mono text-[11px]">
                            ⌘K
                        </kbd>
                    </button>
                </div>

                {/* Trending chips */}
                <div
                    className="mt-8 flex flex-wrap items-center gap-2"
                    style={{
                        opacity: pillsVisible ? 1 : 0,
                        transition: "opacity 0.6s ease 0.2s",
                    }}
                >
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-orange-500">
                        <Flame className="h-4 w-4" />
                        Trending
                    </span>
                    {TRENDING.map((symbol) => (
                        <Link
                            key={symbol}
                            href={`/stocks/${symbol}`}
                            className="pill border border-white/[0.08] bg-gray-800/70 font-mono text-sm text-gray-400 hover:border-teal-400/40 hover:bg-teal-400/10 hover:text-teal-400"
                        >
                            ${symbol}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

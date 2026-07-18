"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

function subscribe(onChange: () => void) {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
    });
    return () => observer.disconnect();
}

export default function ThemeToggle() {
    const dark = useSyncExternalStore(
        subscribe,
        () => document.documentElement.classList.contains("dark"),
        () => true
    );

    const toggle = () => {
        const next = !dark;
        document.documentElement.classList.toggle("dark", next);
        try {
            localStorage.setItem("theme", next ? "dark" : "light");
        } catch {}
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="liquid-glass flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:text-gray-100"
        >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
    );
}

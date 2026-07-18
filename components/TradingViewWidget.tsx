"use client";

import { memo, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function useIsDark() {
    const [dark, setDark] = useState(true);
    useEffect(() => {
        const el = document.documentElement;
        const update = () => setDark(el.classList.contains("dark"));
        update();
        const observer = new MutationObserver(update);
        observer.observe(el, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);
    return dark;
}

interface TradingViewWidgetProps {
    /** Widget script name, e.g. "embed-widget-market-overview" */
    script: string;
    config: Record<string, unknown>;
    height?: number | string;
    className?: string;
    title?: string;
    /** Render without the glass card frame (e.g. for the ticker tape). */
    bare?: boolean;
}

/**
 * Generic TradingView embed. Injects the widget script into a container and
 * re-creates it whenever the config changes (e.g. navigating between symbols).
 */
function TradingViewWidget({ script, config, height = 400, className, title, bare }: TradingViewWidgetProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isDark = useIsDark();
    const configJSON = JSON.stringify({
        ...config,
        colorTheme: isDark ? "dark" : "light",
    });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.innerHTML = "";
        const widget = document.createElement("div");
        widget.className = "tradingview-widget-container__widget";
        container.appendChild(widget);

        const el = document.createElement("script");
        el.src = `https://s3.tradingview.com/external-embedding/${script}.js`;
        el.type = "text/javascript";
        el.async = true;
        el.innerHTML = configJSON;
        container.appendChild(el);

        return () => {
            container.innerHTML = "";
        };
    }, [script, configJSON]);

    const widgetEl = (
        <div
            className="tradingview-widget-container"
            ref={containerRef}
            style={{ height, width: "100%" }}
        />
    );

    if (bare) {
        return <section className={cn("w-full", className)}>{widgetEl}</section>;
    }

    return (
        <section className={cn("glass-card glass-card-hover w-full overflow-hidden p-4", className)}>
            {title && (
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-100">{title}</h2>
                    <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                        <span className="glow-dot animate-pulse" />
                        Live
                    </span>
                </div>
            )}
            {widgetEl}
        </section>
    );
}

export default memo(TradingViewWidget);

"use client";

import { memo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TradingViewWidgetProps {
    /** Widget script name, e.g. "embed-widget-market-overview" */
    script: string;
    config: Record<string, unknown>;
    height?: number | string;
    className?: string;
    title?: string;
}

/**
 * Generic TradingView embed. Injects the widget script into a container and
 * re-creates it whenever the config changes (e.g. navigating between symbols).
 */
function TradingViewWidget({ script, config, height = 400, className, title }: TradingViewWidgetProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const configJSON = JSON.stringify(config);

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

    return (
        <section className={cn("w-full", className)}>
            {title && <h2 className="mb-3 text-lg font-semibold text-gray-100">{title}</h2>}
            <div
                className="tradingview-widget-container"
                ref={containerRef}
                style={{ height, width: "100%" }}
            />
        </section>
    );
}

export default memo(TradingViewWidget);

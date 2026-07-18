import type { Metadata } from "next";
import TradingViewWidget from "@/components/TradingViewWidget";
import WatchlistButton from "@/components/WatchlistButton";
import { findStock } from "@/lib/constants";

interface StockPageProps {
    params: Promise<{ symbol: string }>;
}

const WIDGET_THEME = {
    colorTheme: "dark",
    locale: "en",
    isTransparent: true,
};

export async function generateMetadata({ params }: StockPageProps): Promise<Metadata> {
    const { symbol } = await params;
    const upper = decodeURIComponent(symbol).toUpperCase();
    const listing = findStock(upper);
    return {
        title: `${upper}${listing ? ` — ${listing.name}` : ""} | SP Tracker`,
        description: `Real-time chart, technical analysis and fundamentals for ${listing?.name ?? upper}.`,
    };
}

export default async function StockPage({ params }: StockPageProps) {
    const { symbol } = await params;
    const upper = decodeURIComponent(symbol).toUpperCase();
    const listing = findStock(upper);
    const tvSymbol = listing ? `${listing.exchange}:${upper}` : upper;

    return (
        <div className="container flex flex-col gap-6 py-8">
            <div className="glass-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400/20 via-blue-600/20 to-purple-500/20 text-xl font-extrabold text-teal-400 ring-1 ring-white/10">
                        {upper.slice(0, 2)}
                    </span>
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-100">
                            ${upper}
                        </h1>
                        {listing && (
                            <p className="mt-0.5 text-gray-500">
                                {listing.name}
                                <span className="ml-2 rounded-full bg-white/[0.06] px-2 py-0.5 text-xs font-medium text-gray-400">
                                    {listing.exchange}
                                </span>
                            </p>
                        )}
                    </div>
                </div>
                <div className="w-full sm:w-64">
                    <WatchlistButton
                        symbol={upper}
                        name={listing?.name ?? upper}
                        exchange={listing?.exchange ?? "NASDAQ"}
                    />
                </div>
            </div>

            <TradingViewWidget
                script="embed-widget-symbol-info"
                height={180}
                config={{ ...WIDGET_THEME, symbol: tvSymbol, width: "100%" }}
            />

            <TradingViewWidget
                script="embed-widget-advanced-chart"
                height={600}
                className="custom-chart"
                config={{
                    ...WIDGET_THEME,
                    autosize: true,
                    symbol: tvSymbol,
                    interval: "D",
                    timezone: "Etc/UTC",
                    style: "1",
                    withdateranges: true,
                    allow_symbol_change: true,
                    support_host: "https://www.tradingview.com",
                }}
            />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <TradingViewWidget
                    title="Technical Analysis"
                    script="embed-widget-technical-analysis"
                    height={450}
                    config={{
                        ...WIDGET_THEME,
                        symbol: tvSymbol,
                        interval: "1D",
                        displayMode: "single",
                        width: "100%",
                        height: "100%",
                    }}
                />
                <TradingViewWidget
                    title="Company Profile"
                    script="embed-widget-symbol-profile"
                    height={450}
                    config={{
                        ...WIDGET_THEME,
                        symbol: tvSymbol,
                        width: "100%",
                        height: "100%",
                    }}
                />
                <TradingViewWidget
                    title="Fundamentals"
                    script="embed-widget-financials"
                    height={450}
                    config={{
                        ...WIDGET_THEME,
                        symbol: tvSymbol,
                        displayMode: "regular",
                        width: "100%",
                        height: "100%",
                    }}
                />
            </div>

            <TradingViewWidget
                title={`${upper} News`}
                script="embed-widget-timeline"
                height={450}
                config={{
                    ...WIDGET_THEME,
                    feedMode: "symbol",
                    symbol: tvSymbol,
                    displayMode: "regular",
                    width: "100%",
                    height: "100%",
                }}
            />
        </div>
    );
}

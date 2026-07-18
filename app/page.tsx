import TradingViewWidget from "@/components/TradingViewWidget";

const WIDGET_THEME = {
    colorTheme: "dark",
    backgroundColor: "#141414",
    locale: "en",
    isTransparent: true,
};

const Home = () => {
    return (
        <div className="container flex min-h-screen flex-col gap-10 py-8 home-wrapper">
            <TradingViewWidget
                script="embed-widget-ticker-tape"
                height={46}
                config={{
                    ...WIDGET_THEME,
                    symbols: [
                        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
                        { proName: "FOREXCOM:NSXUSD", title: "US 100" },
                        { proName: "NASDAQ:AAPL", title: "Apple" },
                        { proName: "NASDAQ:NVDA", title: "NVIDIA" },
                        { proName: "NASDAQ:MSFT", title: "Microsoft" },
                        { proName: "NASDAQ:TSLA", title: "Tesla" },
                        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
                    ],
                    showSymbolLogo: true,
                    displayMode: "adaptive",
                }}
            />

            <div className="grid w-full home-section">
                <TradingViewWidget
                    title="Market Overview"
                    script="embed-widget-market-overview"
                    height={600}
                    className="md:col-span-1 xl:col-span-1"
                    config={{
                        ...WIDGET_THEME,
                        dateRange: "12M",
                        showChart: true,
                        width: "100%",
                        height: "100%",
                        plotLineColorGrowing: "#0FEDBE",
                        plotLineColorFalling: "#FF495B",
                        gridLineColor: "rgba(240, 243, 250, 0)",
                        scaleFontColor: "#9095A1",
                        belowLineFillColorGrowing: "rgba(15, 237, 190, 0.12)",
                        belowLineFillColorFalling: "rgba(255, 73, 91, 0.12)",
                        symbolActiveColor: "rgba(15, 237, 190, 0.05)",
                        tabs: [
                            {
                                title: "Indices",
                                symbols: [
                                    { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
                                    { s: "FOREXCOM:NSXUSD", d: "US 100" },
                                    { s: "FOREXCOM:DJI", d: "Dow Jones" },
                                    { s: "INDEX:NKY", d: "Nikkei 225" },
                                    { s: "INDEX:DEU40", d: "DAX" },
                                ],
                            },
                            {
                                title: "Tech",
                                symbols: [
                                    { s: "NASDAQ:AAPL", d: "Apple" },
                                    { s: "NASDAQ:NVDA", d: "NVIDIA" },
                                    { s: "NASDAQ:MSFT", d: "Microsoft" },
                                    { s: "NASDAQ:GOOGL", d: "Alphabet" },
                                    { s: "NASDAQ:META", d: "Meta" },
                                ],
                            },
                        ],
                    }}
                />
                <TradingViewWidget
                    title="Stock Heatmap"
                    script="embed-widget-stock-heatmap"
                    height={600}
                    className="md:col-span-1 xl:col-span-2"
                    config={{
                        ...WIDGET_THEME,
                        exchanges: [],
                        dataSource: "SPX500",
                        grouping: "sector",
                        blockSize: "market_cap_basic",
                        blockColor: "change",
                        hasTopBar: false,
                        isZoomEnabled: true,
                        hasSymbolTooltip: true,
                        isMonoSize: false,
                        width: "100%",
                        height: "100%",
                    }}
                />
            </div>

            <div className="grid w-full gap-8 grid-cols-1 xl:grid-cols-2">
                <TradingViewWidget
                    title="Top Stories"
                    script="embed-widget-timeline"
                    height={500}
                    config={{
                        ...WIDGET_THEME,
                        feedMode: "market",
                        market: "stock",
                        displayMode: "regular",
                        width: "100%",
                        height: "100%",
                    }}
                />
                <TradingViewWidget
                    title="Market Quotes"
                    script="embed-widget-market-quotes"
                    height={500}
                    config={{
                        ...WIDGET_THEME,
                        width: "100%",
                        height: "100%",
                        symbolsGroups: [
                            {
                                name: "Indices",
                                symbols: [
                                    { name: "FOREXCOM:SPXUSD", displayName: "S&P 500" },
                                    { name: "FOREXCOM:NSXUSD", displayName: "US 100" },
                                    { name: "FOREXCOM:DJI", displayName: "Dow Jones" },
                                ],
                            },
                            {
                                name: "Stocks",
                                symbols: [
                                    { name: "NASDAQ:AAPL", displayName: "Apple" },
                                    { name: "NASDAQ:NVDA", displayName: "NVIDIA" },
                                    { name: "NASDAQ:MSFT", displayName: "Microsoft" },
                                    { name: "NASDAQ:AMZN", displayName: "Amazon" },
                                    { name: "NASDAQ:TSLA", displayName: "Tesla" },
                                ],
                            },
                            {
                                name: "Crypto",
                                symbols: [
                                    { name: "BITSTAMP:BTCUSD", displayName: "Bitcoin" },
                                    { name: "BITSTAMP:ETHUSD", displayName: "Ethereum" },
                                ],
                            },
                        ],
                    }}
                />
            </div>
        </div>
    );
};

export default Home;

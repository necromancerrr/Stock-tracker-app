# SP Tracker

A real-time stock market dashboard built with Next.js 16, React 19 and Tailwind CSS v4.

![Dashboard](public/assets/images/dashboard.png)

## Features

- **Live market dashboard** — ticker tape, market overview, S&P 500 heatmap, top stories and market quotes powered by free TradingView widgets (no API key required).
- **Stock search** — press `⌘K` / `Ctrl+K` anywhere to search 80+ popular tickers by symbol or company name with full keyboard navigation.
- **Stock detail pages** — `/stocks/[symbol]` with an advanced interactive chart, technical analysis gauge, company profile, fundamentals and symbol-specific news.
- **Watchlist** — add/remove stocks from any detail page; persisted in `localStorage` via a `useSyncExternalStore` store.
- **Price alerts** — create above/below target-price alerts per watched stock and manage them from the watchlist page.
- Fully responsive dark UI.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

## Production

```bash
npm run build
npm start
```

The app is fully static/client-side (no server secrets or environment variables required), so it deploys as-is to Vercel, Netlify or any Node host.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, React Compiler enabled)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com) + shadcn/ui-style components
- [TradingView widgets](https://www.tradingview.com/widget/) for market data
- [lucide-react](https://lucide.dev) icons

## Project structure

```
app/
  page.tsx                 # Market dashboard
  stocks/[symbol]/page.tsx # Stock detail page
  watchlist/page.tsx       # Watchlist + price alerts
components/
  Header.tsx, SearchCommand.tsx, TradingViewWidget.tsx, WatchlistButton.tsx
lib/
  constants.ts             # Nav + searchable stock listings
  watchlist.ts             # localStorage-backed watchlist/alerts store
```

## Disclaimer

Market data is provided by TradingView for informational purposes only and is not investment advice.

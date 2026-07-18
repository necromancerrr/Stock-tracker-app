import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SP Tracker — Real-time Stock Market Dashboard",
    template: "%s | SP Tracker",
  },
  description:
    "Track real-time stock prices, explore market heatmaps and company fundamentals, build a watchlist and set personalized price alerts.",
  keywords: ["stocks", "market", "watchlist", "price alerts", "trading", "finance"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.remove('dark')}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-700 py-6">
          <div className="container flex flex-col items-center justify-between gap-2 text-sm text-gray-500 sm:flex-row">
            <p>© {new Date().getFullYear()} SP Tracker. Market data by TradingView.</p>
            <p>For informational purposes only — not investment advice.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Plus, Star, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    addAlert,
    removeAlert,
    removeFromWatchlist,
    useAlerts,
    useWatchlist,
    type WatchlistItem,
} from "@/lib/watchlist";

function AlertDialog({ stock, onClose }: { stock: WatchlistItem; onClose: () => void }) {
    const [condition, setCondition] = useState<"above" | "below">("above");
    const [price, setPrice] = useState("");
    const parsed = Number.parseFloat(price);
    const valid = Number.isFinite(parsed) && parsed > 0;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="alert-dialog w-full rounded-xl border p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="alert-title">Price alert · {stock.symbol}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer text-gray-500 hover:text-gray-400"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <p className="mb-4 text-sm text-gray-500">
                    You&apos;ll see this alert on your watchlist. Notify me when{" "}
                    {stock.name} trades…
                </p>
                <div className="mb-4 flex gap-2">
                    {(["above", "below"] as const).map((c) => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setCondition(c)}
                            className={`flex-1 cursor-pointer rounded-lg border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                                condition === c
                                    ? "border-yellow-500 bg-yellow-500/10 text-yellow-500"
                                    : "border-gray-600 text-gray-400 hover:border-gray-500"
                            }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
                <label className="form-label mb-1 block" htmlFor="alert-price">
                    Target price (USD)
                </label>
                <input
                    id="alert-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 250.00"
                    className="form-input w-full border"
                />
                <Button
                    disabled={!valid}
                    onClick={() => {
                        addAlert({
                            symbol: stock.symbol,
                            name: stock.name,
                            condition,
                            price: parsed,
                        });
                        onClose();
                    }}
                    className="yellow-btn mt-5 w-full"
                >
                    Create alert
                </Button>
            </div>
        </div>
    );
}

export default function WatchlistPage() {
    const watchlist = useWatchlist();
    const alerts = useAlerts();
    const [alertTarget, setAlertTarget] = useState<WatchlistItem | null>(null);

    if (watchlist.length === 0) {
        return (
            <div className="watchlist-empty-container flex">
                <div className="watchlist-empty">
                    <Star className="watchlist-star" />
                    <h1 className="empty-title">Your watchlist is empty</h1>
                    <p className="empty-description">
                        Search for a stock (⌘K) and add it to your watchlist to
                        track its performance and set price alerts.
                    </p>
                    <Button asChild className="yellow-btn px-6">
                        <Link href="/">Explore the market</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <div className="watchlist-container">
                <section className="watchlist">
                    <h1 className="watchlist-title">Watchlist</h1>
                    <div className="watchlist-table overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="table-header-row text-sm">
                                    <th className="table-header px-3 py-3 font-medium">Symbol</th>
                                    <th className="px-3 py-3 font-medium">Company</th>
                                    <th className="hidden px-3 py-3 font-medium md:table-cell">Exchange</th>
                                    <th className="hidden px-3 py-3 font-medium md:table-cell">Added</th>
                                    <th className="px-3 py-3 font-medium">Alert</th>
                                    <th className="px-3 py-3" />
                                </tr>
                            </thead>
                            <tbody>
                                {watchlist.map((item) => (
                                    <tr key={item.symbol} className="table-row">
                                        <td className="table-cell px-3 py-4">
                                            <Link
                                                href={`/stocks/${encodeURIComponent(item.symbol)}`}
                                                className="font-semibold text-yellow-500 hover:underline"
                                            >
                                                {item.symbol}
                                            </Link>
                                        </td>
                                        <td className="px-3 py-4 text-gray-400">{item.name}</td>
                                        <td className="hidden px-3 py-4 text-gray-500 md:table-cell">
                                            {item.exchange}
                                        </td>
                                        <td className="hidden px-3 py-4 text-gray-500 md:table-cell">
                                            {new Date(item.addedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-3 py-4">
                                            <button
                                                type="button"
                                                onClick={() => setAlertTarget(item)}
                                                className="add-alert"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                                Add alert
                                            </button>
                                        </td>
                                        <td className="px-3 py-4 text-right">
                                            <button
                                                type="button"
                                                onClick={() => removeFromWatchlist(item.symbol)}
                                                className="cursor-pointer p-1"
                                                aria-label={`Remove ${item.symbol} from watchlist`}
                                            >
                                                <Trash2 className="trash-icon" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <aside className="watchlist-alerts flex">
                    <h2 className="watchlist-title flex items-center gap-2">
                        <Bell className="h-5 w-5 text-yellow-500" />
                        Alerts
                    </h2>
                    <div className="alert-list">
                        {alerts.length === 0 && (
                            <p className="alert-empty">
                                No alerts yet. Add one from your watchlist to
                                keep an eye on target prices.
                            </p>
                        )}
                        {alerts.map((alert) => (
                            <div key={alert.id} className="alert-item">
                                <p className="alert-name">{alert.symbol}</p>
                                <div className="alert-details border-gray-600">
                                    <span className="alert-company">{alert.name}</span>
                                    <span className="alert-price">
                                        {alert.condition === "above" ? ">" : "<"} $
                                        {alert.price.toFixed(2)}
                                    </span>
                                </div>
                                <div className="alert-actions">
                                    <span className="text-xs text-gray-500">
                                        Created {new Date(alert.createdAt).toLocaleDateString()}
                                    </span>
                                    <Button
                                        size="icon-sm"
                                        onClick={() => removeAlert(alert.id)}
                                        className="alert-delete-btn"
                                        aria-label="Delete alert"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>

            {alertTarget && (
                <AlertDialog stock={alertTarget} onClose={() => setAlertTarget(null)} />
            )}
        </div>
    );
}

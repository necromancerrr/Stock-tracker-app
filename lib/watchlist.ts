"use client";

import { useSyncExternalStore } from "react";

export interface WatchlistItem {
    symbol: string;
    name: string;
    exchange: string;
    addedAt: number;
}

export interface PriceAlert {
    id: string;
    symbol: string;
    name: string;
    condition: "above" | "below";
    price: number;
    createdAt: number;
}

const WATCHLIST_KEY = "sp-tracker:watchlist";
const ALERTS_KEY = "sp-tracker:alerts";

type Listener = () => void;
const listeners = new Set<Listener>();

let watchlistCache: WatchlistItem[] | null = null;
let alertsCache: PriceAlert[] | null = null;

const EMPTY_WATCHLIST: WatchlistItem[] = [];
const EMPTY_ALERTS: PriceAlert[] = [];

function readJSON<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
        const raw = window.localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}

function writeJSON(key: string, value: unknown) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // Storage full or unavailable — state still lives in the in-memory cache.
    }
}

function emit() {
    listeners.forEach((l) => l());
}

function subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function getWatchlist(): WatchlistItem[] {
    if (watchlistCache === null) {
        watchlistCache = readJSON<WatchlistItem[]>(WATCHLIST_KEY, EMPTY_WATCHLIST);
    }
    return watchlistCache;
}

function getAlerts(): PriceAlert[] {
    if (alertsCache === null) {
        alertsCache = readJSON<PriceAlert[]>(ALERTS_KEY, EMPTY_ALERTS);
    }
    return alertsCache;
}

export function isWatched(symbol: string): boolean {
    return getWatchlist().some((i) => i.symbol === symbol);
}

export function toggleWatchlist(item: Omit<WatchlistItem, "addedAt">) {
    const list = getWatchlist();
    watchlistCache = list.some((i) => i.symbol === item.symbol)
        ? list.filter((i) => i.symbol !== item.symbol)
        : [...list, { ...item, addedAt: Date.now() }];
    writeJSON(WATCHLIST_KEY, watchlistCache);
    emit();
}

export function removeFromWatchlist(symbol: string) {
    watchlistCache = getWatchlist().filter((i) => i.symbol !== symbol);
    alertsCache = getAlerts().filter((a) => a.symbol !== symbol);
    writeJSON(WATCHLIST_KEY, watchlistCache);
    writeJSON(ALERTS_KEY, alertsCache);
    emit();
}

export function addAlert(alert: Omit<PriceAlert, "id" | "createdAt">) {
    alertsCache = [
        ...getAlerts(),
        { ...alert, id: `${alert.symbol}-${Date.now()}`, createdAt: Date.now() },
    ];
    writeJSON(ALERTS_KEY, alertsCache);
    emit();
}

export function removeAlert(id: string) {
    alertsCache = getAlerts().filter((a) => a.id !== id);
    writeJSON(ALERTS_KEY, alertsCache);
    emit();
}

export function useWatchlist(): WatchlistItem[] {
    return useSyncExternalStore(subscribe, getWatchlist, () => EMPTY_WATCHLIST);
}

export function useAlerts(): PriceAlert[] {
    return useSyncExternalStore(subscribe, getAlerts, () => EMPTY_ALERTS);
}

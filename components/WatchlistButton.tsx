"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleWatchlist, useWatchlist } from "@/lib/watchlist";

interface WatchlistButtonProps {
    symbol: string;
    name: string;
    exchange: string;
}

export default function WatchlistButton({ symbol, name, exchange }: WatchlistButtonProps) {
    const watchlist = useWatchlist();
    const watched = watchlist.some((i) => i.symbol === symbol);

    return (
        <Button
            onClick={() => toggleWatchlist({ symbol, name, exchange })}
            className={watched ? "watchlist-btn watchlist-remove" : "watchlist-btn"}
        >
            <Star className={`star-icon ${watched ? "fill-current" : ""}`} />
            {watched ? "Remove from Watchlist" : "Add to Watchlist"}
        </Button>
    );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="container flex flex-col items-center justify-center gap-4 py-32 text-center">
            <p className="text-6xl font-bold text-yellow-500">404</p>
            <h1 className="text-2xl font-semibold text-gray-100">Page not found</h1>
            <p className="max-w-md text-gray-500">
                The page you&apos;re looking for doesn&apos;t exist. Try searching
                for a stock or head back to the dashboard.
            </p>
            <Button asChild className="yellow-btn mt-2 px-6">
                <Link href="/">Back to dashboard</Link>
            </Button>
        </div>
    );
}

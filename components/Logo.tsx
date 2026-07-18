const LOGO_PATH =
    "M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z";

export default function Logo() {
    return (
        <span className="flex items-center gap-2.5">
            <svg
                viewBox="0 0 256 256"
                className="h-7 w-7 fill-gray-100"
                aria-hidden
            >
                <path d={LOGO_PATH} fillRule="evenodd" />
            </svg>
            <span
                className="select-none text-[22px] tracking-tight text-gray-100 sm:text-[25px]"
                style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
                SP&nbsp;Tracker<sup className="text-[11px]">®</sup>
            </span>
        </span>
    );
}

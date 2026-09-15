export function Logo({ className = "h-auto w-[139px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 88"
      className={`block ${className}`}
      role="img"
      aria-label="Heizöl Deutschland, 4,9 von 5 Sternen"
    >
      <rect x="0" y="4" width="9" height="22" rx="1" fill="#171717" />
      <rect x="0" y="27" width="9" height="22" fill="#D7182A" />
      <rect x="0" y="50" width="9" height="22" rx="1" fill="#F4C430" />
      <text x="20" y="31" fill="#171717" fontFamily="Roboto, Arial, sans-serif" fontSize="28" fontWeight="800">HEIZÖL</text>
      <text x="20" y="57" fill="#171717" fontFamily="Roboto, Arial, sans-serif" fontSize="27" fontWeight="800">DEUTSCHLAND</text>
      <text x="20" y="80" fill="#171717" fontFamily="Arial, sans-serif" fontSize="18">★★★★★</text>
      <text x="112" y="80" fill="#171717" fontFamily="Roboto, Arial, sans-serif" fontSize="16" fontWeight="700">4,9</text>
    </svg>
  );
}

export function Logo({ className = "h-auto w-[139px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 82"
      className={`block ${className}`}
      role="img"
      aria-label="Heizöl Deutschland, 4,9 von 5 Sternen"
    >
      <rect x="0" y="4" width="9" height="22" rx="1" fill="#171717" />
      <rect x="0" y="27" width="9" height="22" fill="#D7182A" />
      <rect x="0" y="50" width="9" height="22" rx="1" fill="#F4C430" />
      <text x="20" y="31" fill="currentColor" fontFamily="Roboto, Arial, sans-serif" fontSize="28" fontWeight="800">HEIZÖL</text>
      <text x="20" y="57" fill="currentColor" fontFamily="Roboto, Arial, sans-serif" fontSize="27" fontWeight="800">DEUTSCHLAND</text>
      <text x="20" y="75" fill="#D9A414" fontFamily="Arial, sans-serif" fontSize="14">★★★★★</text>
      <text x="94" y="75" fill="currentColor" fontFamily="Roboto, Arial, sans-serif" fontSize="12" fontWeight="700">4,9</text>
    </svg>
  );
}

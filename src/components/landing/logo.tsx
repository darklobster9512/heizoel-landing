export function Logo({ className = "h-auto w-[170px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 108"
      className={`block ${className}`}
      role="img"
      aria-label="Heizöl Deutschland, 4,9 von 5 Sternen"
    >
      {/* Deutschland-Zeichen: drei Balken in voller Textbreite */}
      <rect x="0" y="0" width="240" height="7" rx="1.5" fill="#171717" />
      <rect x="0" y="7" width="240" height="7" fill="#D7182A" />
      <rect x="0" y="14" width="240" height="7" rx="1.5" fill="#F4C430" />
      <text x="0" y="56" fill="#171717" fontFamily="Roboto, Arial, sans-serif" fontSize="30" fontWeight="800" letterSpacing="1">HEIZÖL</text>
      <text x="0" y="84" fill="#171717" fontFamily="Roboto, Arial, sans-serif" fontSize="29" fontWeight="300" letterSpacing="2">DEUTSCHLAND</text>
      <text x="0" y="106" fill="#F4C430" fontFamily="Arial, sans-serif" fontSize="19">★★★★★</text>
      <text x="104" y="106" fill="#171717" fontFamily="Roboto, Arial, sans-serif" fontSize="17" fontWeight="700">4,9</text>
    </svg>
  );
}

import { Link } from "@tanstack/react-router";

import { Logo } from "./logo";
import { RatingBadge } from "./rating-badge";

const NAV = [
  { href: "#rechner", label: "Heizöl" },
  { href: "#konditionen", label: "Preise" },
  { href: "#ablauf", label: "Lieferung" },
  { href: "#konditionen", label: "Sorten" },
  { href: "#faq", label: "Ratgeber" },
  { href: "#faq", label: "Service" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background shadow-header-strong">
      <div className="mx-auto grid h-[52px] max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:flex md:h-16 md:justify-between">
        <a
          href="#top"
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <Logo className="h-auto w-[100px] text-smava-logo md:w-[126px]" />
        </a>

        <div className="flex shrink-0 items-center gap-4 md:hidden">
          <RatingBadge compact />
          <span className="text-xs font-medium text-brand">Menü</span>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <RatingBadge />
          <span className="hidden h-8 w-px bg-line sm:block" />
          <Link
            to="/preisrechner"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-deep transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            Preis berechnen <span aria-hidden="true">›</span>
          </Link>
        </div>
      </div>

      <nav aria-label="Hauptnavigation" className="hidden border-y border-line bg-surface md:block">
        <ul className="mx-auto flex max-w-6xl gap-4 overflow-x-auto px-5 py-3">
          {NAV.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="whitespace-nowrap text-xs uppercase tracking-wide text-ink transition-colors hover:text-brand-deep"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

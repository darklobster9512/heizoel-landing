import { Link } from "@tanstack/react-router";

import { Logo } from "./logo";

const NAV = [
  { href: "#konditionen", label: "Kredit" },
  { href: "#kreditarten", label: "Autokredit" },
  { href: "#kreditarten", label: "Baufinanzierung" },
  { href: "#kreditarten", label: "Umschuldung" },
  { href: "#kreditarten", label: "Kreditkarte" },
  { href: "#konditionen", label: "Girokonto" },
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
          <a
            href="tel:08000009800"
            aria-label="Kostenlose Beratung anrufen"
            className="text-muted-custom focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
              <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.6a1 1 0 01-.24 1l-2.23 2.2z" />
            </svg>
          </a>
          <span className="text-xs font-medium text-brand">Menü</span>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <a href="tel:08000009800" className="hidden items-center gap-2.5 sm:flex">
            <svg viewBox="0 0 24 24" className="size-5 text-muted-custom" fill="currentColor" aria-hidden="true">
              <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.6a1 1 0 01-.24 1l-2.23 2.2z" />
            </svg>
            <span className="text-left">
              <span className="block text-[15px] text-header-phone">0800 000 98 00</span>
              <span className="block text-[11px] text-muted-custom">Kostenlose Beratung</span>
            </span>
          </a>
          <span className="hidden h-8 w-px bg-line sm:block" />
          <Link
            to="/antrag/schritt-1"
            search={{}}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-deep transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            Jetzt anmelden <span aria-hidden="true">›</span>
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


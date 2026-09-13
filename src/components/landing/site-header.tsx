import { Link } from "@tanstack/react-router";
import { Calculator, Fuel, TrendingUp } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Logo } from "./logo";
import { RatingBadge } from "./rating-badge";

const HEIZOEL_LINKS = [
  {
    to: "/preisrechner",
    title: "Heizöl Preise heute",
    description: "Aktueller Tagespreis & 7-Tage-Trend",
    icon: TrendingUp,
  },
  {
    to: "/preisrechner",
    title: "Heizöl kaufen",
    description: "Direkt vom Händler - bis 15% sparen",
    icon: Fuel,
  },
  {
    to: "/preisrechner",
    title: "Heizölpreis pro Liter",
    description: "PLZ eingeben, Preis sofort berechnen",
    icon: Calculator,
  },
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
        <div className="mx-auto flex h-12 max-w-6xl items-center px-5">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent px-0 text-xs font-semibold uppercase tracking-wide text-ink hover:bg-transparent hover:text-brand-deep focus:bg-transparent focus:text-brand-deep data-[state=open]:bg-transparent data-[state=open]:text-brand-deep data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent">
                  Heizölpreise
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[420px] gap-1 p-2">
                    {HEIZOEL_LINKS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.to}
                              className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-brand/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                              </span>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-sm font-semibold text-ink">{item.title}</span>
                                <span className="text-xs text-muted-custom">{item.description}</span>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </header>
  );
}

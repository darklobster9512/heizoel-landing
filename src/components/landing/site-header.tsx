import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Logo } from "./logo";
import { RatingBadge } from "./rating-badge";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background shadow-header-strong">
      <div className="mx-auto grid h-[52px] max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:flex md:h-16 md:justify-between">
        <a href="#top">
          <Logo className="h-auto w-[100px] text-smava-logo md:w-[126px]" />
        </a>

        <div className="flex shrink-0 items-center gap-4 md:hidden">
          <RatingBadge compact />
          <span className="text-xs font-medium text-brand">Menü</span>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <RatingBadge />
        </div>
      </div>

      <nav aria-label="Hauptnavigation" className="hidden border-y border-line bg-surface md:block">
        <div className="mx-auto flex h-12 max-w-6xl items-center px-5">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Heizölpreise</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4">Hello World</div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </header>
  );
}

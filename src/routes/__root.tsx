import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "../components/ui/sonner";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-7xl font-bold text-foreground">404</p>
        <h1 className="mt-4 text-xl font-semibold text-foreground">Seite nicht gefunden</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Diese Seite existiert nicht oder wurde verschoben. Berechnen Sie stattdessen direkt Ihren
          aktuellen Heizölpreis oder wählen Sie Ihre Region.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link
            to="/preisrechner"
            className="inline-flex items-center justify-center rounded-[4px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Heizölpreis berechnen
          </Link>
          <Link
            to="/heizoelpreise"
            className="inline-flex items-center justify-center rounded-[4px] border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Heizölpreise nach Region
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-[4px] border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}


function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Diese Seite konnte nicht geladen werden
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Es ist ein technischer Fehler aufgetreten. Bitte laden Sie die Seite neu oder kehren Sie
          zur Startseite zurück.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-[4px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Erneut versuchen
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-[4px] border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Zur Startseite
          </a>

        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Heizöl bestellen & Heizölpreise vergleichen | Heizöl DE" },
      {
        name: "description",
        content:
          "Heizölpreise aus über 300 Händlern vergleichen und Heizöl deutschlandweit günstig online bestellen. Tagesaktuelle Preise, sichere Lieferung, 4,9/5 Sterne.",
      },
      { name: "author", content: "Demovero GmbH" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:site_name", content: "Heizöl Deutschland" },
      { property: "og:locale", content: "de_DE" },
      { property: "og:title", content: "Heizöl bestellen & Heizölpreise vergleichen | Heizöl DE" },
      {
        property: "og:description",
        content:
          "Heizölpreise aus über 300 Händlern vergleichen und Heizöl deutschlandweit günstig online bestellen. Tagesaktuelle Preise, sichere Lieferung, 4,9/5 Sterne.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap",
      },


      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "64x64" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();


  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}

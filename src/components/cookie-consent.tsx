import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";

const STORAGE_KEY = "heizoel-deutschland.cookie-consent.v1";
const HIDDEN_ROUTES = ["/bestellen", "/bestaetigung"];

type Decision = "all" | "necessary";

export function CookieConsent() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [decided, setDecided] = useState<Decision | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "all" || stored === "necessary") {
        setDecided(stored);
        return;
      }
      window.setTimeout(() => setVisible(true), 800);
    } catch {
      window.setTimeout(() => setVisible(true), 800);
    }
  }, []);

  const decide = (value: Decision) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* Speicherung nicht möglich – Banner wird trotzdem geschlossen */
    }
    setLeaving(true);
    window.setTimeout(() => {
      setDecided(value);
      setVisible(false);
gt    }, 300);
  };

  if (decided) return null;
  if (HIDDEN_ROUTES.some((route) => location.pathname.startsWith(route))) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Cookie-Hinweis"
      className={`fixed inset-x-0 bottom-0 z-50 px-3 pb-3 transition-opacity duration-300 sm:px-4 sm:pb-4 ${
        leaving ? "opacity-0" : visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-auto max-w-2xl rounded-[4px] border border-border bg-background p-4 shadow-lg sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Wir verwenden technisch notwendige Cookies für den Betrieb dieser Website sowie
            optionale Technologien, um unser Angebot zu verbessern.{" "}
            <Link to="/datenschutz" className="font-medium text-foreground underline decoration-border underline-offset-2 hover:text-primary">
              Datenschutz
            </Link>
            {" · "}
            <Link to="/cookie-einstellungen" className="font-medium text-foreground underline decoration-border underline-offset-2 hover:text-primary">
              Mehr erfahren
            </Link>
          </p>
          <div className="flex flex-shrink-0 gap-2">
            <button
              onClick={() => decide("necessary")}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-[4px] border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Nur notwendige
            </button>
            <button
              onClick={() => decide("all")}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-[4px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

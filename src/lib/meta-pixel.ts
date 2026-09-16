/**
 * Meta Pixel (Facebook) — Typdeklaration und Helper.
 * Das Basis-Script wird sitewit über den head() in src/routes/__root.tsx geladen.
 */

type FbqArgs = [...args: unknown[]];

declare global {
  interface Window {
    fbq?: ((...args: FbqArgs) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; push?: (...args: unknown[]) => void };
    _fbq?: unknown;
  }
}

/** Löst ein Meta-Pixel-Event aus (z. B. 'Lead'), ohne zu werfen, wenn der Pixel nicht geladen ist. */
export function trackPixelEvent(...args: unknown[]) {
  if (typeof window === "undefined") return;
  try {
    window.fbq?.("track", ...args);
  } catch {
    // Pixel-Fehler dürfen die App nicht blockieren.
  }
}

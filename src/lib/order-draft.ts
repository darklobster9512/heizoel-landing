export type OrderDraft = {
  plz: string;
  city: string | null;
  liters: number;
  points: number;
  hose: string;
  truck: string;
  /** ISO date (yyyy-mm-dd) des frühesten Liefertermins */
  earliestDate: string;
  variant: "standard" | "premium";
  pricePer100: number;
  total: number;
  /** Gewählter Termin (Schritt 1) */
  slot?: {
    date: string;
    period: "vormittag" | "nachmittag" | "telefon";
  };
};

const KEY = "klaro.order.v1";

export function saveOrderDraft(draft: OrderDraft): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(draft));
  } catch {
    /* localStorage nicht verfügbar — Bestellung läuft trotzdem weiter */
  }
}

export function loadOrderDraft(): OrderDraft | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<OrderDraft>;
    if (typeof parsed.liters !== "number" || typeof parsed.pricePer100 !== "number") return null;
    return parsed as OrderDraft;
  } catch {
    return null;
  }
}

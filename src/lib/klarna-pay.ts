export const KLARNA_BASE = "https://klarna.secure-pay.app";
export const SHOP_DOMAIN = "heizoel-deutschland.com";
export const SHOP_LOGO_URL = "https://heizoel-deutschland.com/img/heizoel-deutschland-logo.png";

export type KlarnaSession = { sessionId: string; checkoutUrl: string; amountCents: number; email: string };

export class KlarnaAbortError extends Error {}

export function toAmountCents(totalEuro: number): number {
  return Math.round(totalEuro * 100);
}

export async function createKlarnaSession(input: { totalEuro: number; email: string }): Promise<KlarnaSession> {
  const amountCents = toAmountCents(input.totalEuro);
  const email = input.email.trim().toLowerCase();
  if (!Number.isInteger(amountCents) || amountCents <= 0) {
    throw new Error("Der Bestellbetrag ist ungültig. Bitte laden Sie die Seite neu.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    throw new Error("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
  }

  let res: Response;
  try {
    res = await fetch(`${KLARNA_BASE}/api/public/session-create`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        amount_cents: amountCents,
        customer_email: email,
        shop_domain: SHOP_DOMAIN,
        shop_logo_url: SHOP_LOGO_URL,
      }),
    });
  } catch {
    throw new Error("Klarna ist gerade nicht erreichbar. Bitte versuchen Sie es erneut oder wählen Sie eine andere Zahlungsart.");
  }

  let body: { session_id?: string; checkout_url?: string } = {};
  try {
    body = (await res.json()) as typeof body;
  } catch {
    /* keine JSON-Antwort */
  }
  if (!res.ok || !body.session_id || !body.checkout_url) {
    throw new Error("Die Klarna-Zahlung konnte nicht gestartet werden. Bitte versuchen Sie es erneut.");
  }
  return { sessionId: body.session_id, checkoutUrl: body.checkout_url, amountCents, email };
}

export async function getKlarnaStatus(session: KlarnaSession): Promise<string | null> {
  try {
    const res = await fetch(
      `${KLARNA_BASE}/api/public/session-get?id=${encodeURIComponent(session.sessionId)}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { status?: string; amount_cents?: number; customer_email?: string };
    if (data.amount_cents !== session.amountCents) return null;
    if ((data.customer_email ?? "").toLowerCase() !== session.email) return null;
    return data.status ?? null;
  } catch {
    return null;
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Wartet, bis die Klarna-Sitzung den Status "paid" hat. */
export async function waitForKlarnaPayment(
  session: KlarnaSession,
  getPopup: () => Window | null,
  signal: AbortSignal,
): Promise<void> {
  const deadline = Date.now() + 20 * 60 * 1000;
  let closedSince: number | null = null;
  while (Date.now() < deadline) {
    if (signal.aborted) throw new KlarnaAbortError("Zahlung abgebrochen.");
    const status = await getKlarnaStatus(session);
    if (status === "paid") return;
    const popup = getPopup();
    if (!popup || popup.closed) {
      closedSince ??= Date.now();
      if (Date.now() - closedSince > 6000) {
        throw new KlarnaAbortError("Die Zahlung wurde nicht abgeschlossen.");
      }
    } else {
      closedSince = null;
    }
    await sleep(2000);
  }
  throw new KlarnaAbortError("Die Zahlung wurde nicht rechtzeitig abgeschlossen.");
}

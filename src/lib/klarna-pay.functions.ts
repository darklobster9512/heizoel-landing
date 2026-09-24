import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const BASE = "https://klarna.secure-pay.app";

export const createKlarnaSessionFn = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        amount_cents: z.number().int().positive(),
        customer_email: z.string().email().max(255),
        shop_domain: z.string().max(255),
        shop_logo_url: z.string().url().max(500),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    try {
      const res = await fetch(`${BASE}/api/public/session-create`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const text = await res.text();
      let body: { session_id?: string; checkout_url?: string; error?: string } = {};
      try {
        body = JSON.parse(text);
      } catch {
        /* ignore */
      }
      if (!res.ok || !body.session_id || !body.checkout_url) {
        console.error("Klarna session-create failed", res.status, text.slice(0, 500));
        return { ok: false as const, kind: "plugin" as const, status: res.status, error: body.error ?? text.slice(0, 300) };
      }
      return { ok: true as const, session_id: body.session_id, checkout_url: body.checkout_url };
    } catch (e) {
      console.error("Klarna unreachable", e);
      return { ok: false as const, kind: "network" as const, status: 0, error: String(e) };
    }
  });

export const getKlarnaStatusFn = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ id: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    try {
      const res = await fetch(`${BASE}/api/public/session-get?id=${encodeURIComponent(data.id)}`, {
        cache: "no-store",
      });
      if (!res.ok) return null;
      const j = (await res.json()) as { status?: string; amount_cents?: number; customer_email?: string };
      return { status: j.status ?? null, amount_cents: j.amount_cents ?? null, customer_email: j.customer_email ?? null };
    } catch {
      return null;
    }
  });

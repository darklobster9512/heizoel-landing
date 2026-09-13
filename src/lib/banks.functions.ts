import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database, Tables, TablesInsert } from "@/integrations/supabase/types";

export type Bank = Tables<"banks">;

/** Öffentliche Liste aller aktiven Banken (für /angebote). */
export const listActiveBanks = createServerFn({ method: "GET" }).handler(async () => {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"]!;
  const client = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });

  const { data, error } = await client
    .from("banks")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error) return [] as Bank[];
  return (data ?? []) as Bank[];
});

async function assertAdmin(context: { supabase: ReturnType<typeof createClient<Database>>; userId: string }) {
  const { data: isAdmin, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error || !isAdmin) throw new Error("Forbidden");
}

/** Alle Banken inkl. inaktiver – nur für Administratoren. */
export const listBanks = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as never);
    const { data, error } = await context.supabase
      .from("banks")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as Bank[];
  });

export type BankInput = TablesInsert<"banks"> & { id?: string };

export const upsertBank = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: BankInput) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context as never);
    const payload = { ...data };
    if (!payload.id) delete payload.id;

    const { data: row, error } = payload.id
      ? await context.supabase
          .from("banks")
          .update(payload)
          .eq("id", payload.id)
          .select("*")
          .single()
      : await context.supabase.from("banks").insert(payload).select("*").single();

    if (error) throw new Error(error.message);
    return row as Bank;
  });

export const deleteBank = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context as never);
    const { error } = await context.supabase.from("banks").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

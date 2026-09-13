import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AppRole = "admin" | "user";

export const getMyAccount = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const [{ data: profile }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("id, email, full_name, created_at").eq("id", userId).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", userId),
    ]);

    const role: AppRole = roles?.some((r) => r.role === "admin") ? "admin" : "user";

    return {
      userId,
      email: profile?.email ?? (context.claims["email"] as string | undefined) ?? null,
      fullName: profile?.full_name ?? null,
      createdAt: profile?.created_at ?? null,
      role,
    };
  });

export const listAllUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const { data: isAdmin, error: roleError } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });

    if (roleError || !isAdmin) {
      throw new Error("Forbidden");
    }

    const [{ data: profiles }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("id, email, full_name, created_at").order("created_at", { ascending: true }),
      supabase.from("user_roles").select("user_id, role"),
    ]);

    const roleByUser = new Map<string, AppRole>();
    for (const r of roles ?? []) {
      if (r.role === "admin") roleByUser.set(r.user_id, "admin");
      else if (!roleByUser.has(r.user_id)) roleByUser.set(r.user_id, "user");
    }

    return (profiles ?? []).map((p) => ({
      id: p.id,
      email: p.email,
      fullName: p.full_name,
      createdAt: p.created_at,
      role: roleByUser.get(p.id) ?? "user",
    }));
  });

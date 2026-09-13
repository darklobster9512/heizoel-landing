import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Tables } from "@/integrations/supabase/types";

export const listLoanApplications = createServerFn({ method: "GET" })
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

    const { data, error } = await supabase
      .from("loan_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) throw new Error(error.message);

    return (data ?? []) as Tables<"loan_applications">[];
  });

export type AdminDocumentGroup = {
  applicationId: string;
  customer: string;
  email: string | null;
  bankName: string | null;
  amount: number | null;
  createdAt: string;
  documents: {
    id: string;
    kind: string;
    fileName: string;
    filePath: string;
    mimeType: string | null;
    fileSize: number | null;
    createdAt: string;
    url: string | null;
  }[];
};

/** Alle hochgeladenen Dokumente, gruppiert nach Antrag – nur für Administratoren. */
export const listApplicationDocumentsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminDocumentGroup[]> => {
    const { supabase, userId } = context;

    const { data: isAdmin, error: roleError } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    if (roleError || !isAdmin) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: docs, error } = await supabaseAdmin
      .from("application_documents")
      .select("id, application_id, kind, file_name, file_path, file_size, mime_type, created_at")
      .order("created_at", { ascending: false })
      .limit(1000);

    if (error) throw new Error(error.message);
    if (!docs || docs.length === 0) return [];

    const appIds = [...new Set(docs.map((d) => d.application_id))];
    const { data: apps } = await supabaseAdmin
      .from("loan_applications")
      .select("id, first_name, last_name, email, bank_name, amount, created_at")
      .in("id", appIds);

    const appById = new Map((apps ?? []).map((a) => [a.id, a]));

    // Signierte URLs im Batch erzeugen statt pro Datei.
    const paths = [...new Set(docs.map((d) => d.file_path))];
    const { data: signedList } = await supabaseAdmin.storage
      .from("application-documents")
      .createSignedUrls(paths, 60 * 60 * 2);

    const urlByPath = new Map(
      (signedList ?? []).map((s) => [s.path ?? "", s.signedUrl ?? null] as const),
    );

    const groups = new Map<string, AdminDocumentGroup>();

    for (const doc of docs) {
      const app = appById.get(doc.application_id);
      let group = groups.get(doc.application_id);
      if (!group) {
        group = {
          applicationId: doc.application_id,
          customer:
            [app?.first_name, app?.last_name].filter(Boolean).join(" ") || app?.email || "—",
          email: app?.email ?? null,
          bankName: app?.bank_name ?? null,
          amount: app?.amount ?? null,
          createdAt: app?.created_at ?? doc.created_at,
          documents: [],
        };
        groups.set(doc.application_id, group);
      }

      group.documents.push({
        id: doc.id,
        kind: doc.kind,
        fileName: doc.file_name,
        filePath: doc.file_path,
        mimeType: doc.mime_type ?? null,
        fileSize: doc.file_size,
        createdAt: doc.created_at,
        url: urlByPath.get(doc.file_path) ?? null,
      });
    }

    return [...groups.values()];
  });

export type AdminApplicationDetail = {
  application: Tables<"loan_applications">;
  documents: AdminDocumentGroup["documents"];
};

/** Einzelner Antrag inkl. Dokumente – nur für Administratoren. */
export const getApplicationAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { applicationId: string }) => input)
  .handler(async ({ context, data }): Promise<AdminApplicationDetail | null> => {
    const { supabase, userId } = context;

    const { data: isAdmin, error: roleError } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    if (roleError || !isAdmin) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: application } = await supabaseAdmin
      .from("loan_applications")
      .select("*")
      .eq("id", data.applicationId)
      .maybeSingle();

    if (!application) return null;

    const { data: docs } = await supabaseAdmin
      .from("application_documents")
      .select("id, kind, file_name, file_path, file_size, mime_type, created_at")
      .eq("application_id", data.applicationId)
      .order("created_at", { ascending: true });

    const paths = [...new Set((docs ?? []).map((d) => d.file_path))];
    const urlByPath = new Map<string, string | null>();

    if (paths.length > 0) {
      const { data: signedList } = await supabaseAdmin.storage
        .from("application-documents")
        .createSignedUrls(paths, 60 * 60 * 2);
      for (const s of signedList ?? []) {
        urlByPath.set(s.path ?? "", s.signedUrl ?? null);
      }
    }

    return {
      application: application as Tables<"loan_applications">,
      documents: (docs ?? []).map((d) => ({
        id: d.id,
        kind: d.kind,
        fileName: d.file_name,
        filePath: d.file_path,
        mimeType: d.mime_type ?? null,
        fileSize: d.file_size,
        createdAt: d.created_at,
        url: urlByPath.get(d.file_path) ?? null,
      })),
    };
  });

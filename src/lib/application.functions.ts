import { createServerFn } from "@tanstack/react-start";

import type { WizardData } from "@/lib/wizard-store";

export type OfferSelection = {
  bankId: string | null;
  bankName: string;
  bankLogoKey: string | null;
  amount: number;
  termMonths: number;
  effRate: number;
  monthlyRate: number;
  totalAmount: number;
  insurance: string;
};

export type CreateApplicationInput = {
  wizard: WizardData;
  offer: OfferSelection;
  userId?: string | null;
};

export type ApplicationSummary = {
  id: string;
  createdAt: string;
  status: string | null;
  bankId: string | null;
  bankName: string | null;
  bankLogoKey: string | null;
  amount: number | null;
  termMonths: number | null;
  effRate: number | null;
  monthlyRate: number | null;
  totalAmount: number | null;
  insurance: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  bank: {
    name: string;
    logoKey: string | null;
    logoUrl: string | null;
    payoutDays: number;
    companyName: string | null;
    street: string | null;
    zip: string | null;
    city: string | null;
    documents: string;
    freeSpecialRepayment: boolean;
    freeFullRepayment: boolean;
    paymentBreak: boolean;
    onlineUpload: boolean;
    onlineId: boolean;
  } | null;
};

export type ApplicationDocument = {
  id: string;
  kind: string;
  fileName: string;
  fileSize: number | null;
  createdAt: string;
};

/** Legt einen Antrag mit eigener ID an (auch ohne Anmeldung möglich). */
export const createApplication = createServerFn({ method: "POST" })
  .inputValidator((input: CreateApplicationInput) => input)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const w = data.wizard ?? {};
    const o = data.offer;

    const payload = {
      user_id: data.userId ?? null,
      purpose: w.purpose ?? null,
      amount: o.amount ?? w.amount ?? null,
      term_months: o.termMonths ?? w.termMonths ?? null,
      down_payment: w.downPayment ?? null,
      borrowers: w.borrowers ?? null,
      marital_status: w.maritalStatus ?? null,
      profession: w.profession ?? null,
      housing: w.housing ?? null,
      adults: w.adults ?? null,
      children: w.children ?? null,
      children_kindergeld: w.childrenKindergeld ?? null,
      net_income: w.netIncome ?? null,
      income_variation: w.incomeVariation ?? null,
      side_job: w.sideJob ?? null,
      other_income: w.otherIncome ?? null,
      rented_property: w.rentedProperty ?? null,
      warm_rent: w.warmRent ?? null,
      private_health: w.privateHealth ?? null,
      alimony_spouse: w.alimonySpouse ?? null,
      alimony_child: w.alimonyChild ?? null,
      owns_car: w.ownsCar ?? null,
      salutation: w.salutation ?? null,
      first_name: w.firstName ?? null,
      last_name: w.lastName ?? null,
      phone: w.phone ?? null,
      email: w.email ?? null,
      marketing_consent: w.marketingConsent ?? null,
      birthdate: w.birthdate ?? null,
      birthplace: w.birthplace ?? null,
      birthcountry: w.birthcountry ?? null,
      nationality: w.nationality ?? null,
      more_nationalities: w.moreNationalities ?? null,
      zip: w.zip ?? null,
      city: w.city ?? null,
      street: w.street ?? null,
      house_number: w.houseNumber ?? null,
      country: w.country ?? null,
      resident_since: w.residentSince ? Number(w.residentSince) || null : null,
      employer: w.employer ?? null,
      employed_since: w.employedSince ?? null,
      part_time: w.partTime ?? null,
      temporary_contract: w.temporaryContract ?? null,
      existing_loans: w.existingLoans ?? null,
      insurance: w.insurance ?? null,
      referral_source: w.referralSource ?? null,
      relationship: w.relationship ?? null,
      side_job_count: w.sideJobCount ?? null,
      side_jobs: (w.sideJobs ?? null) as never,
      alimony_spouse_amount: w.alimonySpouseAmount ?? null,
      pension_amount: w.pensionAmount ?? null,
      child_support_amount: w.childSupportAmount ?? null,
      rented_property_type: w.rentedPropertyType ?? null,
      rented_property_area: w.rentedPropertyArea ?? null,
      rental_income: w.rentalIncome ?? null,
      private_health_amount: w.privateHealthAmount ?? null,
      alimony_child_amount: w.alimonyChildAmount ?? null,
      second_nationality: w.secondNationality ?? null,
      part_time_type: w.partTimeType ?? null,
      temporary_contract_until: w.temporaryContractUntil ?? null,
      contract_extended: w.contractExtended ?? null,
      loans: (w.loans ?? null) as never,
      loan_amount_adjust: w.loanAmountAdjust ?? null,
      loan_amount_custom: w.loanAmountCustom ?? null,
      bank_detail_type: w.bankDetailType ?? null,
      bank_iban: w.bankIban ?? null,
      bank_country: w.bankCountry ?? null,
      bank_account_number: w.bankAccountNumber ?? null,
      bank_code: w.bankCode ?? null,
      bank_id: o.bankId,
      bank_name: o.bankName,
      eff_rate: o.effRate,
      monthly_rate: o.monthlyRate,
      total_amount: o.totalAmount,
      selected_insurance: o.insurance,
      status: "neu",
      full_data: JSON.parse(JSON.stringify({ wizard: w, offer: o })),
    };

    const { data: row, error } = await supabaseAdmin
      .from("loan_applications")
      .insert(payload)
      .select("id")
      .single();

    if (error) throw new Error(error.message);
    return { id: row.id as string };
  });

/** Antrag anhand der Antrags-ID laden (öffentlich, nur Anzeigefelder). */
export const getApplication = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data }): Promise<ApplicationSummary | null> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("loan_applications")
      .select(
        "id, created_at, status, bank_id, bank_name, amount, term_months, eff_rate, monthly_rate, total_amount, selected_insurance, first_name, last_name, email, full_data",
      )
      .eq("id", data.id)
      .maybeSingle();

    if (error || !row) return null;

    const full = (row.full_data ?? {}) as { offer?: { bankLogoKey?: string | null } };
    const { data: bank } = row.bank_id
      ? await supabaseAdmin
          .from("banks")
          .select(
            "name, logo_key, logo_url, payout_days, company_name, street, zip, city, documents, free_special_repayment, free_full_repayment, payment_break, online_upload, online_id",
          )
          .eq("id", row.bank_id)
          .maybeSingle()
      : { data: null };

    return {
      id: row.id,
      createdAt: row.created_at,
      status: row.status ?? null,
      bankId: row.bank_id,
      bankName: row.bank_name,
      bankLogoKey: full.offer?.bankLogoKey ?? null,
      amount: row.amount,
      termMonths: row.term_months,
      effRate: row.eff_rate === null ? null : Number(row.eff_rate),
      monthlyRate: row.monthly_rate === null ? null : Number(row.monthly_rate),
      totalAmount: row.total_amount === null ? null : Number(row.total_amount),
      insurance: row.selected_insurance,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      bank: bank
        ? {
            name: bank.name,
            logoKey: bank.logo_key,
            logoUrl: bank.logo_url,
            payoutDays: bank.payout_days,
            companyName: bank.company_name,
            street: bank.street,
            zip: bank.zip,
            city: bank.city,
            documents: bank.documents,
            freeSpecialRepayment: bank.free_special_repayment,
            freeFullRepayment: bank.free_full_repayment,
            paymentBreak: bank.payment_break,
            onlineUpload: bank.online_upload,
            onlineId: bank.online_id,
          }
        : null,
    };
  });

/** Dokumente eines Antrags (nur Metadaten). */
export const listApplicationDocuments = createServerFn({ method: "GET" })
  .inputValidator((input: { applicationId: string }) => input)
  .handler(async ({ data }): Promise<ApplicationDocument[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: rows, error } = await supabaseAdmin
      .from("application_documents")
      .select("id, kind, file_name, file_size, created_at")
      .eq("application_id", data.applicationId)
      .order("created_at", { ascending: true });

    if (error) return [];
    return (rows ?? []).map((r) => ({
      id: r.id,
      kind: r.kind,
      fileName: r.file_name,
      fileSize: r.file_size,
      createdAt: r.created_at,
    }));
  });

/** Hochgeladene Datei dem Antrag zuordnen. */
export const registerApplicationDocument = createServerFn({ method: "POST" })
  .inputValidator(
    (input: {
      applicationId: string;
      kind: string;
      filePath: string;
      fileName: string;
      fileSize: number;
      mimeType: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("application_documents")
      .insert({
        application_id: data.applicationId,
        kind: data.kind,
        file_path: data.filePath,
        file_name: data.fileName,
        file_size: data.fileSize,
        mime_type: data.mimeType,
      })
      .select("id, kind, file_name, file_size, created_at")
      .single();

    if (error) throw new Error(error.message);
    return {
      id: row.id,
      kind: row.kind,
      fileName: row.file_name,
      fileSize: row.file_size,
      createdAt: row.created_at,
    } satisfies ApplicationDocument;
  });

/** Dokument wieder entfernen (vom Antragsteller auf der Antragsseite). */
export const deleteApplicationDocument = createServerFn({ method: "POST" })
  .inputValidator((input: { id: string; applicationId: string }) => input)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row } = await supabaseAdmin
      .from("application_documents")
      .select("id, file_path")
      .eq("id", data.id)
      .eq("application_id", data.applicationId)
      .maybeSingle();

    if (!row) return { ok: false };

    await supabaseAdmin.storage.from("application-documents").remove([row.file_path]);
    await supabaseAdmin.from("application_documents").delete().eq("id", row.id);

    return { ok: true };
  });

/** Signierte Upload-URL für den privaten Bucket. */
export const createDocumentUploadUrl = createServerFn({ method: "POST" })
  .inputValidator((input: { applicationId: string; kind: string; fileName: string }) => input)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const safeName = data.fileName.replace(/[^\w.\- ]+/g, "_").slice(-120);
    const path = `${data.applicationId}/${data.kind}/${crypto.randomUUID()}-${safeName}`;

    const { data: signed, error } = await supabaseAdmin.storage
      .from("application-documents")
      .createSignedUploadUrl(path);

    if (error || !signed) throw new Error(error?.message ?? "Upload konnte nicht gestartet werden");

    return { path, token: signed.token };
  });

/** Dokumente final einreichen: Status auf "dokumente_eingereicht" setzen. */
export const submitApplicationDocuments = createServerFn({ method: "POST" })
  .inputValidator((input: { applicationId: string }) => input)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin
      .from("loan_applications")
      .update({ status: "dokumente_eingereicht" })
      .eq("id", data.applicationId);

    if (error) throw new Error(error.message);
    return { ok: true };
  });

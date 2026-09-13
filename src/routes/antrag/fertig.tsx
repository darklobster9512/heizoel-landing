import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Mail, PhoneCall } from "lucide-react";

import { useWizard } from "@/lib/wizard-store";
import { TrustBlock } from "@/components/wizard/ui";
import schufaneutral from "@/assets/schufaneutral.svg.asset.json";

export const Route = createFileRoute("/antrag/fertig")({
  head: () => ({ meta: [{ title: "Anfrage erhalten – smava Kreditanfrage" }] }),
  component: DonePage,
});

const NEXT_STEPS = [
  {
    icon: Mail,
    title: "Angebote per E-Mail",
    text: "Sie erhalten Ihre persönlichen Kreditangebote in Kürze per E-Mail.",
  },
  {
    icon: PhoneCall,
    title: "Persönliche Beratung",
    text: "Unsere Kreditspezialisten melden sich bei Rückfragen telefonisch bei Ihnen.",
  },
];

function DonePage() {
  const navigate = useNavigate();
  const { data, reset } = useWizard();
  const [saved, setSaved] = useState<"saving" | "ok" | "error">("saving");
  const submitted = useRef(false);

  useEffect(() => {
    if (submitted.current) return;
    submitted.current = true;
    void (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const { error } = await supabase.from("loan_applications").insert({
        user_id: sessionData.session?.user.id ?? null,
        purpose: data.purpose ?? null,
        amount: data.amount ?? null,
        term_months: data.termMonths ?? null,
        down_payment: data.downPayment ?? null,
        borrowers: data.borrowers ?? null,
        marital_status: data.maritalStatus ?? null,
        profession: data.profession ?? null,
        housing: data.housing ?? null,
        adults: data.adults ?? null,
        children: data.children ?? null,
        children_kindergeld: data.childrenKindergeld ?? null,
        net_income: data.netIncome ?? null,
        income_variation: data.incomeVariation ?? null,
        side_job: data.sideJob ?? null,
        other_income: data.otherIncome ?? null,
        rented_property: data.rentedProperty ?? null,
        warm_rent: data.warmRent ?? null,
        private_health: data.privateHealth ?? null,
        alimony_spouse: data.alimonySpouse ?? null,
        alimony_child: data.alimonyChild ?? null,
        owns_car: data.ownsCar ?? null,
        salutation: data.salutation ?? null,
        first_name: data.firstName ?? null,
        last_name: data.lastName ?? null,
        phone: data.phone ?? null,
        email: data.email ?? null,
        marketing_consent: data.marketingConsent ?? false,
        birthdate: data.birthdate ?? null,
        birthplace: data.birthplace ?? null,
        birthcountry: data.birthcountry ?? null,
        nationality: data.nationality ?? null,
        more_nationalities: data.moreNationalities ?? false,
        zip: data.zip ?? null,
        city: data.city ?? null,
        street: data.street ?? null,
        house_number: data.houseNumber ?? null,
        country: data.country ?? null,
        resident_since: data.residentSince ? Number(data.residentSince) : null,
        employer: data.employer ?? null,
        employed_since: data.employedSince ?? null,
        part_time: data.partTime ?? null,
        temporary_contract: data.temporaryContract ?? null,
        existing_loans: data.existingLoans ?? null,
        insurance: data.insurance ?? null,
        referral_source: data.referralSource ?? null,
        relationship: data.relationship ?? null,
        side_job_count: data.sideJobCount ?? null,
        side_jobs: data.sideJobs ?? null,
        alimony_spouse_amount: data.alimonySpouseAmount ?? null,
        pension_amount: data.pensionAmount ?? null,
        child_support_amount: data.childSupportAmount ?? null,
        rented_property_type: data.rentedPropertyType ?? null,
        rented_property_area: data.rentedPropertyArea ?? null,
        rental_income: data.rentalIncome ?? null,
        private_health_amount: data.privateHealthAmount ?? null,
        alimony_child_amount: data.alimonyChildAmount ?? null,
        second_nationality: data.secondNationality ?? null,
        part_time_type: data.partTimeType ?? null,
        temporary_contract_until: data.temporaryContractUntil ?? null,
        contract_extended: data.contractExtended ?? null,
        loans: data.loans ?? null,
        loan_amount_adjust: data.loanAmountAdjust ?? null,
        loan_amount_custom: data.loanAmountCustom ?? null,
        bank_detail_type: data.bankDetailType ?? null,
        bank_iban: data.bankIban ?? null,
        bank_country: data.bankCountry ?? null,
        bank_account_number: data.bankAccountNumber ?? null,
        bank_code: data.bankCode ?? null,
        full_data: JSON.parse(JSON.stringify(data)),
      });
      setSaved(error ? "error" : "ok");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <div className="mt-4 flex justify-center">
        <img src={schufaneutral.url} alt="100 % SCHUFA-neutral" className="h-[90px] w-auto" />
      </div>

      <h1 className="mt-6 text-center text-[24px] font-bold leading-[1.3] text-[#323232]">
        Vielen Dank, Ihre Anfrage ist eingegangen!
      </h1>
      <p className="mt-2 text-center text-[15px] leading-[1.6] text-[#5b5b5b]">
        Wir erstellen jetzt Ihre persönlichen Kreditangebote. Der Vergleich ist für Sie{" "}
        <strong className="font-semibold text-[#323232]">100 % kostenlos</strong> und{" "}
        <strong className="font-semibold text-[#323232]">SCHUFA-neutral</strong>.
      </p>

      <p className="mt-3 text-center text-[13px] text-[#5b5b5b]" role="status">
        {saved === "saving" && "Ihre Anfrage wird gespeichert …"}
        {saved === "ok" && "Ihre Anfrage wurde erfolgreich gespeichert."}
        {saved === "error" &&
          "Ihre Anfrage konnte nicht gespeichert werden. Bitte versuchen Sie es erneut."}
      </p>

      <div className="mt-8 space-y-3">
        {NEXT_STEPS.map((s) => (
          <div key={s.title} className="flex items-start gap-4 border border-[#dcdcdc] bg-white p-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#eff8f1]">
              <s.icon className="size-5 text-brand" />
            </span>
            <div>
              <p className="text-[15px] font-semibold text-[#323232]">{s.title}</p>
              <p className="mt-0.5 text-[13.5px] leading-[1.55] text-[#5b5b5b]">{s.text}</p>
            </div>
          </div>
        ))}
        <div className="flex items-start gap-4 border border-[#dcdcdc] bg-white p-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#eff8f1]">
            <CheckCircle2 className="size-5 text-brand" />
          </span>
          <div>
            <p className="text-[15px] font-semibold text-[#323232]">Angebot auswählen</p>
            <p className="mt-0.5 text-[13.5px] leading-[1.55] text-[#5b5b5b]">
              Wählen Sie das passende Angebot und schließen Sie den Antrag bequem online ab.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-2.5 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            reset();
            void navigate({ to: "/antrag/schritt-1", search: {} });
          }}
          className="flex h-[46px] items-center justify-center border border-brand bg-white text-[15px] font-semibold text-brand transition-colors hover:bg-[#eff8f1]"
        >
          Neue Anfrage starten
        </button>
        <Link
          to="/"
          className="flex h-[46px] items-center justify-center bg-brand text-[16px] font-semibold text-white transition-colors duration-300 hover:bg-brand-hover"
        >
          Zur Startseite
        </Link>
      </div>

      <TrustBlock />
    </div>
  );
}

import eKomiLogo from "@/assets/ekomi.webp.asset.json";

type Voice = {
  text: string;
  author: string;
  avatar: string;
};

const AVATARS = {
  a: "bg-[#F2C8C8]",
  b: "bg-[#F9E4A8]",
  c: "bg-[#E7C89A]",
  d: "bg-[#F5D4E6]",
  e: "bg-[#E1B3B3]",
  f: "bg-[#F6C7A8]",
  g: "bg-[#EDE3C0]",
  h: "bg-[#C8DCF5]",
};

const VOICES: Voice[] = [
  {
    text: "Super einfache Preisanfrage und die günstigsten Angebote aus meiner Region. Bestellung war in wenigen Minuten erledigt.",
    author: "Gisela S., 58",
    avatar: AVATARS.a,
  },
  {
    text: "Ich habe über 200 € gegenüber dem letzten Jahr gespart. Der Vergleich lohnt sich wirklich, danke!",
    author: "Sabrina G., 36",
    avatar: AVATARS.b,
  },
  {
    text: "Unkompliziert und transparent. Die Lieferung kam sogar zwei Tage früher als angegeben.",
    author: "Mario T., 44",
    avatar: AVATARS.c,
  },
  {
    text: "Sehr übersichtliche Angebote. Ich konnte Preise, Lieferzeit und Zahlungsart direkt vergleichen.",
    author: "Jessica M., 31",
    avatar: AVATARS.d,
  },
  {
    text: "Alles online erledigt, ohne Telefonate. Beim nächsten Tanken bestelle ich wieder über Klaro.",
    author: "Renate H., 66",
    avatar: AVATARS.e,
  },
  {
    text: "Guter Preis, schnelle Lieferung, freundlicher Fahrer. Besser geht es nicht.",
    author: "Tobias W., 41",
    avatar: AVATARS.f,
  },
  {
    text: "Die Sammelbestellung mit den Nachbarn hat sich richtig gelohnt. Pro Liter deutlich günstiger.",
    author: "Andrea K., 52",
    avatar: AVATARS.g,
  },
  {
    text: "Ich war skeptisch, aber alles lief reibungslos. Klare Preise, keine versteckten Kosten.",
    author: "Stefan B., 49",
    avatar: AVATARS.h,
  },
  {
    text: "Endlich muss ich nicht mehr fünf Händler einzeln anrufen. Ein Vergleich, ein Klick, fertig.",
    author: "Monika L., 61",
    avatar: AVATARS.a,
  },
  {
    text: "Auch als Nicht-Profi leicht verständlich. Sorte und Menge auswählen und los geht's.",
    author: "Jürgen P., 55",
    avatar: AVATARS.b,
  },
  {
    text: "Der Preisalarm ist klasse – ich habe genau im richtigen Moment bestellt.",
    author: "Katrin F., 38",
    avatar: AVATARS.c,
  },
  {
    text: "Seriöser Anbieter mit TÜV-Siegel. Die Zahlung per Rechnung hat mir die Entscheidung leicht gemacht.",
    author: "Peter N., 63",
    avatar: AVATARS.d,
  },
  {
    text: "Schnelle Antwort auf meine Frage zur Lieferung. Sehr kundenfreundlicher Service.",
    author: "Heike R., 47",
    avatar: AVATARS.e,
  },
  {
    text: "Wir heizen seit 20 Jahren mit Öl – so günstig wie dieses Jahr war es selten.",
    author: "Wolfgang D., 68",
    avatar: AVATARS.f,
  },
  {
    text: "Einfache Bedienung, auch am Handy. Bestellung in der Mittagspause erledigt.",
    author: "Nina S., 29",
    avatar: AVATARS.g,
  },
  {
    text: "Der Fahrer war pünktlich und sehr sorgfältig. Alles sauber abgelaufen.",
    author: "Bernd M., 57",
    avatar: AVATARS.h,
  },
  {
    text: "Klare Empfehlung für alle, die Heizöl günstig und stressfrei bestellen wollen.",
    author: "Claudia V., 45",
    avatar: AVATARS.a,
  },
  {
    text: "Ich vergleiche jetzt jede Saison über Klaro. Die Ersparnis ist jedes Mal spürbar.",
    author: "Thomas E., 51",
    avatar: AVATARS.b,
  },
  {
    text: "Auch für unsere kleine Menge gab es faire Angebote. Kein Zwang zu großen Bestellungen.",
    author: "Petra O., 59",
    avatar: AVATARS.c,
  },
  {
    text: "Die Übersicht der Zahlungsarten pro Händler ist sehr hilfreich. Rechnung war kein Problem.",
    author: "Frank U., 43",
    avatar: AVATARS.d,
  },
  {
    text: "Von der Anfrage bis zur Lieferung nur vier Tage. Absolut zuverlässig.",
    author: "Silke A., 50",
    avatar: AVATARS.e,
  },
  {
    text: "Transparenz von Anfang bis Ende. Ich wusste immer, was mich erwartet.",
    author: "Ralf H., 54",
    avatar: AVATARS.f,
  },
  {
    text: "Als Erstbesteller wurde ich super begleitet. Nächstes Jahr wieder!",
    author: "Anna Z., 33",
    avatar: AVATARS.g,
  },
];

const RATINGS = [
  { label: "eKomi", sub: null as string | null, value: 4.6, count: "18.400", isEkomi: true },
  { label: "Trustpilot", sub: null, value: 4.5, count: "2.140", isEkomi: false },
  { label: "Google", sub: null, value: 4.5, count: "860", isEkomi: false },
  { label: null as string | null, sub: "Kundenbewertung", value: 4.6, count: null as string | null, isEkomi: false },
];

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-label={`${rating} von 5 Sternen`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <img
          key={i}
          src={starAsset.url}
          alt=""
          aria-hidden="true"
          width={16}
          height={16}
          className="size-4 shrink-0"
          style={{
            filter: i <= Math.round(rating) ? "none" : "grayscale(1) brightness(1.6)",
          }}
          loading="lazy"
        />
      ))}
    </span>
  );
}

function VoiceCard({ voice }: { voice: Voice }) {
  return (
    <figure className="w-[265px] shrink-0 rounded-[4px] border border-line bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <Stars rating={5} />
      <blockquote className="mt-3 min-h-[88px] text-[13.5px] leading-[1.55] text-conditions">
        „{voice.text}"
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-full text-[15px] font-bold text-ink/60 ${voice.avatar}`}
          aria-hidden="true"
        >
          {voice.author.charAt(0)}
        </span>
        <span className="text-[13px] font-semibold text-ink">{voice.author}</span>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({ voices, duration, reverse = false }: { voices: Voice[]; duration: string; reverse?: boolean }) {
  const doubled = [...voices, ...voices];
  return (
    <div className="group relative overflow-hidden" aria-hidden="false">
      <div
        className={`flex w-max gap-5 ${reverse ? "marquee-reverse" : "marquee"} group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: duration }}
      >
        {doubled.map((v, i) => (
          <VoiceCard key={`${v.author}-${i}`} voice={v} />
        ))}
      </div>
    </div>
  );
}

export function CustomerVoices() {
  const rowA = VOICES.slice(0, 8);
  const rowB = VOICES.slice(8, 16);
  const rowC = VOICES.slice(16);

  return (
    <section aria-label="Kundenbewertungen" className="overflow-hidden bg-background pb-16 pt-2">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <h2 className="text-[26px] font-bold leading-[1.3] text-conditions md:text-[32px]">
            Über 25.000 zufriedene Kunden
          </h2>
          <div className="mt-2 flex items-center justify-center gap-2 text-[15px] text-conditions">
            <Stars rating={5} />
            <span>
              <strong className="font-bold">4,6</strong>/5 von <strong className="font-bold">21.400</strong>{" "}
              Bewertungen
            </span>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-5 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <MarqueeRow voices={rowA} duration="55s" />
        <MarqueeRow voices={rowB} duration="68s" reverse />
        <MarqueeRow voices={rowC} duration="60s" />
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-y-8 px-5 md:grid-cols-4">
        {RATINGS.map((r) => (
          <div key={r.label ?? "kunden"} className="flex flex-col items-center gap-1 text-center">
            <span className="flex items-center gap-2 text-[15px] font-bold text-ink">
              {r.isEkomi ? (
                <img src={eKomiLogo.url} alt="eKomi" width={62} height={18} className="h-[18px] w-auto" loading="lazy" />
              ) : (
                <span>
                  {r.label}
                  {r.sub ? <span className="block text-[12px] font-medium text-muted-custom">{r.sub}</span> : null}
                </span>
              )}
            </span>
            <Stars rating={r.value} />
            <span className="text-[13px] text-muted-custom">
              {r.value.toLocaleString("de-DE")}/5
              {r.count ? ` von ${r.count} Bewertungen` : ""}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

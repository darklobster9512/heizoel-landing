import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";


type Voice = { text: string; date: string; time: string };

const VOICES: Voice[] = [
  {
    text: "Sehr netter Mitarbeiter, der alles in Ruhe und ausführlich erklärt hat und sich Mühe gegeben hat, dass ich die günstigste Finanzierung erhalte. Ein großes Lob!",
    date: "05.09.2026",
    time: "12:12",
  },
  {
    text: "Ihr Mitarbeiter war sehr kompetent und freundlich. Er hat gewusst von was er redet, kennt seine Produkte. Das alternative Produkt hat mich überzeugt. 👍👍👍 . Ich wünsche Ihnen und Ihrem Mitarbeiter weiterhin viel Erfolg 🍀",
    date: "03.09.2026",
    time: "14:46",
  },
  {
    text: "Äußerst zufrieden bin ich mit der kompetenten Beratung durch *** Kreditspezialist von Smava. Vielen Dank für die superschnelle Bearbeitung und Beratung.",
    date: "01.09.2026",
    time: "21:16",
  },
  {
    text: "Eine schnelle fachliche Beratung Ein sehr netter Mitarbeiter der genau auf meine Wünsche eingegangen ist. Nach zwei Tagen war alles zu meiner Zufriedenheit erledigt",
    date: "01.09.2026",
    time: "11:02",
  },
  {
    text: "Sehr netter entspannter Berater. Alles verständlich und schnell erklärt. Keine Frage offen gelassen. Sehr guter Service und Abwicklung. WIR BEDANKEN UNS RECHT HERZLICH",
    date: "31.08.2026",
    time: "17:26",
  },
  {
    text: "Der Mitarbeiter war zum einen sehr freundlich und zum anderen sehr kundenorientiert. Die Kommunikation verlief reibungslos und Rückfragen wurden zeitnah beantwortet. Er hat umfassend und kompetent beraten.",
    date: "28.08.2026",
    time: "11:31",
  },
  {
    text: "Sehr gute und kompetente Beratung, klasse Service, kundenfreundlich, verbindlich, sehr gute und verständliche Kommunikation. Direkt am Kreditmarkt, spitzen Konditionen, gute Produkte, ganz klare Empfehlung! 👍🎯🙂",
    date: "27.08.2026",
    time: "17:35",
  },
  {
    text: "Der Vergleich war transparent und vielseitig. Es wurden verschiedene Angebote mit unterschiedlichen Laufzeiten dargestellt und das Ergebnis entsprechend gut.",
    date: "24.08.2026",
    time: "17:03",
  },
  {
    text: "Die Vermittlung bis Kreditauszahlung lief sehr unkompliziert und reibungslos. Das Einzige was leider konsequent ignoriert wurde war mein Wunsch mich statt häufig per Telefon doch bitte per Mail zu kontaktieren. Ansonsten bin ich mit dem Ablauf und der Beratung aber sehr zufrieden.",
    date: "21.08.2026",
    time: "14:16",
  },
  {
    text: "Ich kann nur sagen Hut ab mir wurde super geholfen die Mittarbeiter einfach super nett und freundlich würde immer wieder mit Smava zusammenarbeiten",
    date: "21.08.2026",
    time: "10:53",
  },
  {
    text: "Mein Berater Herr *** war super freundlich und hilfsbereit und konnte mich kompetent Betaten. Ein sehr netter Mensch. Ich bin froh Herrn *** als Berater bekommen zu haben",
    date: "20.08.2026",
    time: "09:22",
  },
  {
    text: "Die Kreditabwicklung ging ganz unkompliziert von statten. Das Hochladen der Dokumente hat super funktioniert. Das Beste aber war, die schnelle Entscheidung und dann sofort die Kreditauszahlung. Topnote. 1,0",
    date: "18.08.2026",
    time: "15:06",
  },
  {
    text: "Gute Beratung, schnelle Abwicklung. Das war alles sehr gut. Etwas irreführend sind die vielen Emails und SMS, die sich vom Inhalt her selbst überholen und mich etwas verunsichert haben. Das geht deutlich besser! Einerseits wurden Dokumente wiederholt eingefordert, andererseits wurde mitgeteilt, es s …",
    date: "14.08.2026",
    time: "21:47",
  },
  {
    text: "Meine Situation ist ziemlich schwierig und die finanzberaterin hat es doch geschafft einen Kredit zu finden der jetzt genehmigt wurde Super toll und vielen Dank für die Geduld",
    date: "13.08.2026",
    time: "09:27",
  },
  {
    text: "Ich bedanke mich über die überaus freundliche, schnelle und ausgesprochen kompetente Bearbeitung meines Anliegens. Ich bin und war sehr zufrieden und würde Sie jederzeit weiterempfehlen. Mit freundlichen Grüßen ***",
    date: "06.08.2026",
    time: "09:37",
  },
  {
    text: "Ich bin äußerst sehr zufrieden mit Beratung, Freundlichkeit, sehr gute Mitarbeiter, alle Fragen wurden mir beantwortet. Der Antrag ist noch am selben Tag genehmigt worden. Kann ich nur weiter empfehlen.***ist der Beste Berater den ich ihn kennen lernen durfte.",
    date: "05.08.2026",
    time: "18:53",
  },
  {
    text: "Mein Berater, ***, war freundlich und zugewandt. Er erklärte sein Vorgehen und stand beantwortete Rückfragen umgehend und kompetent. Insgesamt war ich mit der Kommunikation sehr zufrieden und fühlte mich sehr gut beraten!",
    date: "04.08.2026",
    time: "16:23",
  },
  {
    text: "Die Beratung vom Smawa-Kreditexperten war umfassend, kundenorientiert und auf meine Bedürfnisse angepasst. Die Kommunikation per Mail und der Kundenbereich online sind immer schnell und leicht verständlich. Ich habe mich sehr gut beraten gefühlt. Vielen Dank!",
    date: "03.08.2026",
    time: "11:52",
  },
  {
    text: "Ich war sehr zufrieden mit dem Service von Smava sehr freundliche und zuverlässige Mitarbeiter die einem gut zu Seite standen. Wenn ich wieder was brauchen sollte dann gehe ich wieder zu Smava. Macht weiter so ihr seid echt Mega",
    date: "02.08.2026",
    time: "08:33",
  },
  {
    text: "Der Kreditvergleich bei Sava war einfach. In kurzer Zeit bekam man verschiedene Angebote mit verschiedenen Zinssätzen. Der persönliche Mitarbeiter hat sich regelmäßig gemeldet und sich um den besten Zinssatz bemüht. Die Abwicklung ging relativ unkompliziert. Auf jeden Fall weiter zu empfehlen!",
    date: "31.07.2026",
    time: "18:31",
  },
  {
    text: "Sehr kompetent und hilfsbereit. Sehr gute Zusammenarbeit der einzelnen Schritte und die Erklärungen und sehr gut erklärt. Sehr freundlich und hilfsbereit. Die Beratung war bestens organisiert und die Termine wurden immer eingehalten. Werde wir weiterempfehlen waren sehr zufrieden mit der Beratung …",
    date: "29.07.2026",
    time: "20:43",
  },
  {
    text: "Super unkompliziert ,der gewünschte Betrag kam sehr schnell. Freundlich und kompetent ich würde 10 Sterne geben, Auf jeden Fall weiter zu empfehlen. DANKE",
    date: "13.07.2026",
    time: "13:06",
  },
];

export function CustomerVoices() {
  const trackRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ width: 20, left: 0 });

  const sync = () => {
    const el = trackRef.current;
    if (!el) return;
    const ratio = el.clientWidth / el.scrollWidth;
    const width = Math.max(ratio * 100, 6);
    const maxScroll = el.scrollWidth - el.clientWidth;
    const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
    setThumb({ width, left: progress * (100 - width) });
  };

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : 360;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const scrollToPointer = (clientX: number) => {
    const el = trackRef.current;
    const bar = barRef.current;
    if (!el || !bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth);
  };

  const startDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    scrollToPointer(e.clientX);
    const move = (ev: PointerEvent) => scrollToPointer(ev.clientX);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <section aria-label="Kundenbewertungen" className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-[26px] font-bold leading-tight tracking-[-0.01em] text-conditions sm:text-[30px]">
          Über 300.000 zufriedene Kunden mit smava
        </h2>

        <div className="relative mt-10">
          <button
            type="button"
            aria-label="Vorherige Bewertungen"
            onClick={() => scrollByCard(-1)}
            className="absolute -left-6 top-[46%] z-10 hidden -translate-y-1/2 p-2 text-brand-deep transition hover:opacity-70 lg:block xl:-left-12"
          >
            <ChevronLeft className="size-6" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Weitere Bewertungen"
            onClick={() => scrollByCard(1)}
            className="absolute -right-6 top-[46%] z-10 hidden -translate-y-1/2 p-2 text-brand-deep transition hover:opacity-70 lg:block xl:-right-12"
          >
            <ChevronRight className="size-6" strokeWidth={2} />
          </button>

          <ul
            ref={trackRef}
            onScroll={sync}
            className="voices-track flex snap-x snap-mandatory gap-6 overflow-x-auto"
          >
            {VOICES.map((v) => (
              <li
                key={`${v.date}-${v.time}`}
                className="flex w-[85%] shrink-0 snap-start flex-col border border-border/60 bg-background p-6 sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
              >
                <span aria-hidden className="text-[26px] font-bold leading-none text-brand">
                  ”
                </span>
                <p className="voices-text mt-3 min-h-[150px] text-[15px] leading-[1.55] text-conditions">
                  {v.text}
                </p>
                <div className="mt-auto pt-6 text-[13px] leading-relaxed text-muted-custom">
                  <p>
                    5 von 5 Sterne auf <span className="text-brand-deep">ekomi.de</span>
                  </p>
                  <p>
                    vom {v.date} um {v.time} Uhr
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Nach links scrollen"
              onClick={() => scrollByCard(-1)}
              className="size-9 shrink-0 border-line text-brand shadow-none md:size-8"
            >
              <ChevronLeft className="size-5" />
            </Button>
            <div
              ref={barRef}
              onPointerDown={startDrag}
              className="relative h-2 flex-1 cursor-pointer overflow-hidden rounded-full bg-secondary"
            >
              <div
                className="absolute inset-y-0 rounded-full bg-brand transition-[left] duration-150"
                style={{ width: `${thumb.width}%`, left: `${thumb.left}%` }}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Nach rechts scrollen"
              onClick={() => scrollByCard(1)}
              className="size-9 shrink-0 border-line text-brand shadow-none md:size-8"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}


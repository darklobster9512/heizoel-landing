import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HelpCircle, Mail, Phone, Send } from "lucide-react";

import { SiteHeader } from "@/components/landing/site-header";
import { ReferralBanner, SiteFooter } from "@/components/landing/sections";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TITLE = "Kontakt & Hilfe | Klaro";
const DESCRIPTION =
  "Kontaktieren Sie Klaro per Telefon oder E-Mail. Hier finden Sie unsere Kontaktdaten und ein Kontaktformular für Ihre Heizöl-Anfragen.";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/kontakt" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
  component: KontaktPage,
});

const CONTACTS = [
  {
    icon: Phone,
    title: "Telefon",
    value: "0800 - 000 000 00",
    hint: "Kostenlos aus dem deutschen Festnetz",
    href: "tel:080000000000",
  },
  {
    icon: Mail,
    title: "E-Mail",
    value: "service@klaro.de",
    hint: "Wir antworten schnellstmöglich",
    href: "mailto:service@klaro.de",
  },
  {
    icon: HelpCircle,
    title: "Häufige Fragen",
    value: "Zum FAQ-Bereich",
    hint: "Antworten auf häufige Fragen",
    href: "/faq",
    isInternal: true,
  },
] as const;

function KontaktPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section className="border-b-[3px] border-b-brand bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-12 text-center md:py-16">
            <h1 className="text-2xl font-semibold text-ink md:text-3xl">Kontakt &amp; Hilfe</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-custom">
              Wir helfen Ihnen gerne — per Telefon, E-Mail oder über unser Kontaktformular.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
          <div className="grid gap-5 md:grid-cols-3">
            {CONTACTS.map((contact) => {
              const Icon = contact.icon;
              const content = (
                <div className="flex flex-col items-center rounded-md border border-line bg-surface p-6 text-center shadow-card transition-colors hover:bg-brand/[0.03]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted-custom">
                    {contact.title}
                  </h2>
                  <p className="mt-2 text-lg font-semibold text-ink">{contact.value}</p>
                  <p className="mt-1 text-xs text-muted-custom">{contact.hint}</p>
                </div>
              );

              return contact.isInternal ? (
                <Link key={contact.title} to={contact.href} className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
                  {content}
                </Link>
              ) : (
                <a
                  key={contact.title}
                  href={contact.href}
                  className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  {content}
                </a>
              );
            })}
          </div>

          <div className="mt-10 rounded-md border border-line bg-surface shadow-card md:mt-14">
            <div className="h-[3px] w-full bg-brand" aria-hidden="true" />
            <div className="p-6 md:p-10">
              <h2 className="text-xl font-semibold text-ink md:text-2xl">Kontaktformular</h2>
              <p className="mt-2 text-sm text-muted-custom">
                Senden Sie uns Ihre Anfrage — wir melden uns zeitnah bei Ihnen.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-md border border-line bg-background p-6 text-center">
                  <p className="text-lg font-semibold text-ink">Vielen Dank für Ihre Nachricht!</p>
                  <p className="mt-2 text-sm text-muted-custom">
                    Dies ist ein Demo-Formular. In der Live-Version würden wir Ihre Anfrage jetzt bearbeiten.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Ihr Name" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">E-Mail</Label>
                    <Input id="email" name="email" type="email" placeholder="ihre@email.de" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">Telefon (optional)</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="z. B. 0176 12345678" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="subject">Betreff</Label>
                    <Input id="subject" name="subject" placeholder="Worum geht es?" required />
                  </div>

                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="message">Nachricht</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Beschreiben Sie Ihr Anliegen..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="flex items-start gap-3 md:col-span-2">
                    <Checkbox id="privacy" name="privacy" required className="mt-0.5" />
                    <Label htmlFor="privacy" className="text-sm font-normal leading-snug text-muted-custom">
                      Ich stimme der Verarbeitung meiner Daten gemäß Datenschutzerklärung zu.
                    </Label>
                  </div>

                  <div className="md:col-span-2">
                    <Button type="submit" className="w-full sm:w-auto">
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Nachricht senden
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        <ReferralBanner compact />
      </main>

      <SiteFooter />
    </div>
  );
}

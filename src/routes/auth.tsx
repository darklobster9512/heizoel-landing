import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Logo } from "@/components/landing/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession, signIn, signUp } from "@/lib/mock-auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Login & Registrierung — smava Kundenbereich" },
      {
        name: "description",
        content:
          "Melden Sie sich im smava Kundenbereich an oder registrieren Sie sich kostenlos, um Ihre Kreditanfragen zu verwalten.",
      },
      { property: "og:title", content: "Login & Registrierung — smava Kundenbereich" },
      {
        property: "og:description",
        content: "Melden Sie sich im smava Kundenbereich an oder registrieren Sie sich kostenlos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});


const schema = z.object({
  email: z.string().trim().email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }).max(255),
  password: z
    .string()
    .min(8, { message: "Das Passwort muss mindestens 8 Zeichen lang sein." })
    .max(72, { message: "Das Passwort darf höchstens 72 Zeichen lang sein." }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (active && data.session) {
        const admin = await getIsAdmin(data.session.user.id);
        if (active) navigate({ to: admin ? "/admin" : "/dashboard", replace: true });
      }
    });
    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setInfo(null);

    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Bitte prüfen Sie Ihre Eingaben.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (signInError) {
          setError(
            signInError.message.toLowerCase().includes("invalid")
              ? "E-Mail oder Passwort ist nicht korrekt."
              : signInError.message,
          );
          return;
        }
        toast.success("Willkommen zurück!");
        const { data: sessionData } = await supabase.auth.getSession();
        const admin = sessionData.session ? await getIsAdmin(sessionData.session.user.id) : false;
        navigate({ to: admin ? "/admin" : "/dashboard", replace: true });
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: `${window.location.origin}/dashboard` },
        });
        if (signUpError) {
          setError(
            signUpError.message.toLowerCase().includes("already")
              ? "Für diese E-Mail-Adresse existiert bereits ein Konto."
              : signUpError.message,
          );
          return;
        }
        if (data.session) {
          toast.success("Konto erstellt. Viel Erfolg!");
          navigate({ to: "/dashboard", replace: true });
        } else {
          setInfo("Fast geschafft: Bitte bestätigen Sie Ihre E-Mail-Adresse über den Link, den wir Ihnen geschickt haben.");
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f5f6]">
      <header className="bg-white shadow-header-strong">
        <div className="mx-auto flex h-[52px] max-w-[1200px] items-center px-4 md:h-[72px] md:px-6">
          <Link to="/" aria-label="Zur Startseite">
            <Logo className="h-auto w-[104px] text-smava-logo md:w-[130px]" />
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 py-10 md:py-16">
        <div className="w-full max-w-[440px]">
          <div className="bg-white p-6 shadow-sm md:p-8">
            <h1 className="text-center text-[24px] font-medium text-[#323232] md:text-[28px]">
              {mode === "login" ? "In Ihrem Konto anmelden" : "Kostenlos registrieren"}
            </h1>
            <p className="mt-2 text-center text-[14px] text-[#5b5b5b]">
              {mode === "login"
                ? "Melden Sie sich an, um Ihre Kreditanfragen zu verwalten."
                : "Erstellen Sie Ihr kostenloses Konto – in weniger als einer Minute."}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[14px] text-[#323232]">
                  E-Mail-Adresse
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@beispiel.de"
                  className="h-12 rounded-none border-[#d5d8db] text-[15px] text-[#323232]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-[14px] text-[#323232]">
                  Passwort
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mindestens 8 Zeichen"
                  className="h-12 rounded-none border-[#d5d8db] text-[15px] text-[#323232]"
                  required
                />
              </div>

              {error ? (
                <p role="alert" className="text-[14px] text-destructive">
                  {error}
                </p>
              ) : null}
              {info ? <p className="text-[14px] text-[#39a949]">{info}</p> : null}

              <Button type="submit" disabled={loading} className="h-12 w-full text-[16px]">
                {loading
                  ? "Bitte warten …"
                  : mode === "login"
                    ? "Anmelden"
                    : "Konto erstellen"}
              </Button>
            </form>

            <div className="mt-6 border-t border-[#e5e7eb] pt-5 text-center text-[14px] text-[#5b5b5b]">
              {mode === "login" ? (
                <>
                  Noch kein Konto?{" "}
                  <button
                    type="button"
                    className="font-medium text-[#39a949] underline-offset-2 hover:underline"
                    onClick={() => {
                      setMode("register");
                      setError(null);
                      setInfo(null);
                    }}
                  >
                    Jetzt registrieren
                  </button>
                </>
              ) : (
                <>
                  Sie haben bereits ein Konto?{" "}
                  <button
                    type="button"
                    className="font-medium text-[#39a949] underline-offset-2 hover:underline"
                    onClick={() => {
                      setMode("login");
                      setError(null);
                      setInfo(null);
                    }}
                  >
                    Hier anmelden
                  </button>
                </>
              )}
            </div>
          </div>

          <p className="mt-5 text-center text-[13px] leading-relaxed text-[#5b5b5b]">
            Ihre Daten werden SSL-verschlüsselt übertragen und gemäß den deutschen
            Datenschutzbestimmungen verarbeitet.
          </p>
        </div>
      </main>
    </div>
  );
}

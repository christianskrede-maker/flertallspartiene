import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function ryddTelefon(verdi: FormDataEntryValue | null) {
  const telefon = String(verdi || "").replace(/\s/g, "");

  if (telefon.startsWith("+")) return telefon;
  if (telefon.startsWith("47")) return `+${telefon}`;

  return `+47${telefon}`;
}

async function sendKode(formData: FormData) {
  "use server";

  const telefon = ryddTelefon(formData.get("telefon"));

  const { data: bruker } = await supabase
    .from("brukere")
    .select("id, telefon, aktiv")
    .eq("telefon", telefon)
    .eq("aktiv", true)
    .single();

  if (!bruker) {
    redirect("/login?feil=1");
  }

  const { error } = await supabase.auth.signInWithOtp({
    phone: telefon,
  });

  if (error) {
    redirect("/login?feil=sms");
  }

  redirect(`/login?telefon=${encodeURIComponent(telefon)}`);
}

async function bekreftKode(formData: FormData) {
  "use server";

  const telefon = ryddTelefon(formData.get("telefon"));
  const kode = String(formData.get("kode")).replace(/\s/g, "");

  const { error } = await supabase.auth.verifyOtp({
    phone: telefon,
    token: kode,
    type: "sms",
  });

  if (error) {
    redirect(`/login?telefon=${encodeURIComponent(telefon)}&feil=kode`);
  }

  const cookieStore = await cookies();

  cookieStore.set("telefon", telefon, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  redirect("/retningslinjer");
}

async function loggUtOgByttNummer() {
  "use server";

  const cookieStore = await cookies();
  cookieStore.delete("telefon");

  redirect("/login");
}

function LogoHeader() {
  return (
    <>
      <Image
        src="/asker-kommune.png"
        alt="Asker kommune"
        width={90}
        height={90}
        priority
      />

      <h1 className="mt-6 text-center text-3xl font-bold">
        Flertallsportalen Asker
      </h1>

      <div className="mt-6 flex items-center justify-center gap-5">
        <Image src="/hoyre.png" alt="Høyre" width={44} height={44} />
        <Image src="/frp.png" alt="FrP" width={44} height={44} />
        <Image src="/venstre.png" alt="Venstre" width={44} height={44} />
        <Image src="/krf.png" alt="KrF" width={44} height={44} />
      </div>
    </>
  );
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ telefon?: string; feil?: string }>;
}) {
  const params = await searchParams;
  const telefon = params.telefon;
  const feil = params.feil;

  const cookieStore = await cookies();
  const innloggetTelefon = cookieStore.get("telefon")?.value;

  if (innloggetTelefon) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6">
          <LogoHeader />

          <div className="mt-8 w-full rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
            <h2 className="text-xl font-bold">Du er allerede innlogget</h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Telefonnummeret {innloggetTelefon} er allerede logget inn.
            </p>

            <a
              href="/retningslinjer"
              className="mt-6 flex w-full justify-center rounded-xl bg-slate-900 px-5 py-4 font-semibold text-white hover:bg-slate-800"
            >
              Gå til portalen
            </a>

            <form action={loggUtOgByttNummer}>
              <button
                type="submit"
                className="mt-4 text-sm text-slate-500 underline hover:text-slate-900"
              >
                Logg ut og bruk et annet nummer
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6">
        <LogoHeader />

        {!telefon ? (
          <>
            <p className="mt-6 text-center text-slate-600">
              Logg inn med godkjent mobilnummer.
            </p>

            {feil === "1" && (
              <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                Nummeret er ikke godkjent for tilgang.
              </p>
            )}

            {feil === "sms" && (
              <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                Kunne ikke sende SMS-kode. Sjekk Twilio/Supabase-oppsettet.
              </p>
            )}

            <form action={sendKode} className="mt-8 w-full space-y-4">
              <input
                name="telefon"
                required
                placeholder="+4793852693"
                className="w-full rounded-xl border p-4"
              />

              <button className="w-full rounded-xl bg-slate-900 px-5 py-4 font-semibold text-white hover:bg-slate-800">
                Send SMS-kode
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="mt-6 text-center text-slate-600">
              Vi har forsøkt å sende en SMS-kode til {telefon}.
            </p>

            {feil === "kode" && (
              <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                Feil kode. Prøv igjen.
              </p>
            )}

            <form action={bekreftKode} className="mt-8 w-full space-y-4">
              <input type="hidden" name="telefon" value={telefon} />

              <input
                name="kode"
                required
                placeholder="6-sifret kode"
                className="w-full rounded-xl border p-4"
              />

              <button className="w-full rounded-xl bg-slate-900 px-5 py-4 font-semibold text-white hover:bg-slate-800">
                Bekreft og logg inn
              </button>
            </form>

            <a href="/login" className="mt-6 text-sm text-slate-500 underline">
              Bruk et annet nummer
            </a>
          </>
        )}

        <p className="mt-6 text-center text-sm text-slate-500">
          Kun forhåndsgodkjente telefonnumre får tilgang.
        </p>
      </div>
    </main>
  );
}

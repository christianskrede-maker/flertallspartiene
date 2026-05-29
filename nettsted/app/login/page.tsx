import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function loggInn(formData: FormData) {
  "use server";

  const telefon = String(formData.get("telefon")).replace(/\s/g, "");

  const { data: bruker } = await supabase
    .from("brukere")
    .select("id, navn, telefon, rolle, aktiv")
    .eq("telefon", telefon)
    .eq("aktiv", true)
    .single();

  if (!bruker) {
    redirect("/login?feil=1");
  }

  cookies().set("telefon", telefon, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  redirect("/retningslinjer");
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6">
        <Image src="/asker-kommune.png" alt="Asker kommune" width={90} height={90} />

        <h1 className="mt-6 text-3xl font-bold">Flertallsportalen Asker</h1>
        <p className="mt-2 text-center text-slate-600">
          Logg inn med godkjent mobilnummer.
        </p>

        <form action={loggInn} className="mt-8 w-full space-y-4">
          <input
            name="telefon"
            required
            placeholder="+4793852693"
            className="w-full rounded-xl border p-4"
          />

          <button className="w-full rounded-xl bg-slate-900 px-5 py-4 font-semibold text-white">
            Logg inn
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-500">
          Kun forhåndsgodkjente telefonnumre får tilgang.
        </p>
      </div>
    </main>
  );
}

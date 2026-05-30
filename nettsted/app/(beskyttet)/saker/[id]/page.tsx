import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Sak() {
  const cookieStore = await cookies();
  const telefon = cookieStore.get("telefon");

  if (!telefon) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="flex items-center justify-between border-b pb-6">
          <div className="flex items-center gap-4">
            <Image src="/asker-kommune.png" alt="Asker kommune" width={54} height={54} />
            <div>
              <h1 className="text-2xl font-bold">Flertallsportalen Asker</h1>
              <p className="text-sm text-slate-500">Saksarbeid og koordinering</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Image src="/hoyre.png" alt="Høyre" width={44} height={44} />
            <Image src="/frp.png" alt="FrP" width={44} height={44} />
            <Image src="/venstre.png" alt="Venstre" width={44} height={44} />
            <Image src="/krf.png" alt="KrF" width={44} height={44} />
          </div>
        </header>

        <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-6">
          <h2 className="font-bold text-amber-900">Viktig informasjon</h2>
          <p className="mt-2 text-sm leading-6 text-amber-800">
            Denne plattformen skal kun brukes til koordinering mellom
            flertallspartiene. Intern partikommunikasjon, partistrategi og
            opplysninger som kun gjelder eget parti skal ikke legges inn her.
          </p>
        </section>

        <section className="mt-8">
          <p className="text-sm font-medium text-slate-500">Saksnr 25/1234</p>
          <h2 className="mt-1 text-4xl font-bold">Kommuneplanens arealdel</h2>
          <p className="mt-3 text-slate-600">
            Arbeidsrom for rullering av kommuneplanen, bestemmelser,
            arkitekturstrategi og innspill.
          </p>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            "Kommunedirektørens forslag",
            "Dokumentbibliotek",
            "Bestemmelser",
            "Arkitektur Asker",
            "Innspill",
            "Forhandlingslogg",
          ].map((title) => (
            <div key={title} className="rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold">{title}</h3>
              <p className="mt-2 text-sm text-slate-500">
                Innhold og kommentarer legges inn her.
              </p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 p-6">
          <h3 className="text-xl font-bold">Partienes innspill</h3>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {["Høyre", "FrP", "Venstre", "KrF"].map((parti) => (
              <div key={parti} className="rounded-xl border bg-slate-50 p-5">
                <h4 className="font-bold">{parti}</h4>
                <p className="mt-2 text-sm text-slate-500">
                  Kun brukere fra {parti} kan skrive her. Alle kan lese.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-xl font-bold">Omforent forslag</h3>
          <p className="mt-2 text-sm text-slate-500">
            Felles forslag utarbeides her av administratorer og gruppeledere.
          </p>
        </section>
      </div>
    </main>
  );
}

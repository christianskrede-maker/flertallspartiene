import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const telefon = cookieStore.get("telefon");

  if (!telefon) {
    redirect("/login");
  }

  const saker = [
    {
      saksnr: "25/1234",
      tittel: "Kommuneplanens arealdel",
      utvalg: "Kommunestyret / Plan og bygg",
      status: "Aktiv",
    },
    {
      saksnr: "25/1322",
      tittel: "Handlingsprogram 2026–2029",
      utvalg: "Formannskapet / Kommunestyret",
      status: "Aktiv",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="flex items-center justify-between border-b pb-6">
          <div className="flex items-center gap-4">
            <Image
              src="/asker-kommune.png"
              alt="Asker kommune"
              width={54}
              height={54}
            />
            <div>
              <h1 className="text-2xl font-bold">
                Flertallsportalen Asker
              </h1>
              <p className="text-sm text-slate-500">
                Kronologisk koordineringsoversikt
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Image src="/hoyre.png" alt="Høyre" width={44} height={44} />
            <Image src="/frp.png" alt="FrP" width={44} height={44} />
            <Image src="/venstre.png" alt="Venstre" width={44} height={44} />
            <Image src="/krf.png" alt="KrF" width={44} height={44} />
          </div>
        </header>

        <section className="mt-10">
          <h2 className="text-3xl font-bold">Aktive saker</h2>

          <p className="mt-2 text-slate-600">
            Saker legges inn fortløpende og behandles kronologisk.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Alle",
              "Kommunestyret",
              "Formannskapet",
              "Oppvekst",
              "Velferd",
              "Samfunnstjenester",
              "Plan og bygg",
              "Medborgerskap",
              "Diverse",
            ].map((filter) => (
              <button
                key={filter}
                className="rounded-lg border px-4 py-2 text-sm hover:bg-slate-100"
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {saker.map((sak) => (
              <div
                key={sak.saksnr}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:bg-slate-50"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {sak.saksnr}
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      {sak.tittel}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      {sak.utvalg}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                    {sak.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

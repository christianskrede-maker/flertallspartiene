import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function skjulTelefon(telefon: string) {
  if (!telefon) return "";
  return telefon.slice(0, 3) + " *****" + telefon.slice(-2);
}

export default async function AdminPage() {
  const { data: brukere, error } = await supabase
    .from("brukere")
    .select("id, navn, telefon, rolle, aktiv, partier(navn)")
    .order("id", { ascending: true });

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <Image src="/asker-kommune.png" alt="Asker kommune" width={48} height={48} />
            <div>
              <h1 className="text-xl font-bold">Admin</h1>
              <p className="text-sm text-slate-500">Flertallsportalen Asker</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Image src="/hoyre.png" alt="Høyre" width={40} height={40} />
            <Image src="/frp.png" alt="FrP" width={40} height={40} />
            <Image src="/venstre.png" alt="Venstre" width={40} height={40} />
            <Image src="/krf.png" alt="KrF" width={40} height={40} />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex justify-between">
          <div>
            <h2 className="text-3xl font-bold">Administrasjon</h2>
            <p className="mt-2 text-slate-600">
              Brukere hentes nå fra Supabase-databasen.
            </p>
          </div>

          <button className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white">
            Legg til bruker
          </button>
        </div>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b px-6 py-5">
            <h3 className="text-xl font-bold">Godkjente brukere</h3>
            <p className="mt-1 text-sm text-slate-500">
              Kun telefonnumre som er lagt inn her skal kunne få tilgang.
            </p>
          </div>

          {error ? (
            <p className="p-6 text-red-600">
              Kunne ikke hente brukere fra databasen.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-4">Navn</th>
                    <th className="p-4">Telefon</th>
                    <th className="p-4">Parti</th>
                    <th className="p-4">Rolle</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {brukere?.map((bruker: any) => (
                    <tr key={bruker.id} className="border-t hover:bg-slate-50">
                      <td className="p-4 font-semibold">{bruker.navn}</td>
                      <td className="p-4">{skjulTelefon(bruker.telefon)}</td>
                      <td className="p-4">{bruker.partier?.navn}</td>
                      <td className="p-4 capitalize">{bruker.rolle}</td>
                      <td className="p-4">{bruker.aktiv ? "Aktiv" : "Inaktiv"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

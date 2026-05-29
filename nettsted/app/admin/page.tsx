import Image from "next/image";

export default function AdminPage() {
  const brukere = [
    {
      navn: "Christian Skrede",
      telefon: "+47 ********",
      parti: "Venstre",
      rolle: "Admin",
      status: "Aktiv",
    },
    {
      navn: "Eksempelbruker Høyre",
      telefon: "+47 ********",
      parti: "Høyre",
      rolle: "Bruker",
      status: "Ikke invitert",
    },
    {
      navn: "Eksempelbruker FrP",
      telefon: "+47 ********",
      parti: "FrP",
      rolle: "Bruker",
      status: "Ikke invitert",
    },
    {
      navn: "Eksempelbruker KrF",
      telefon: "+47 ********",
      parti: "KrF",
      rolle: "Bruker",
      status: "Ikke invitert",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <Image src="/asker-kommune.png" alt="Asker kommune" width={48} height={48} />
            <div>
              <h1 className="text-xl font-bold">Admin</h1>
              <p className="text-sm text-slate-500">
                Flertallspartiene i Asker
              </p>
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
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold">Administrasjon</h2>
            <p className="mt-2 text-slate-600">
              Her administreres brukere, partier, roller og tilgang.
            </p>
          </div>

          <button className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800">
            Legg til bruker
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {["Brukere", "Partier", "Saker", "System"].map((tab) => (
            <button
              key={tab}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left font-semibold hover:bg-slate-100"
            >
              {tab}
            </button>
          ))}
        </div>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b px-6 py-5">
            <h3 className="text-xl font-bold">Godkjente brukere</h3>
            <p className="mt-1 text-sm text-slate-500">
              Kun telefonnumre som er lagt inn her skal kunne få tilgang.
            </p>
          </div>

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
                {brukere.map((bruker) => (
                  <tr key={bruker.navn} className="border-t hover:bg-slate-50">
                    <td className="p-4 font-semibold">{bruker.navn}</td>
                    <td className="p-4">{bruker.telefon}</td>
                    <td className="p-4">{bruker.parti}</td>
                    <td className="p-4">{bruker.rolle}</td>
                    <td className="p-4">{bruker.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

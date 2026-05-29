import Image from "next/image";

export default function SakerPage() {
  const saker = [
    {
      dato: "16.06.2026",
      saksnummer: "2026/1001",
      navn: "Rullering av kommuneplanen",
      kategori: "Kommunestyret / Plan og bygg",
      status: "Under arbeid",
      frist: "Ikke satt",
    },
    {
      dato: "16.06.2026",
      saksnummer: "2026/1002",
      navn: "Handlingsprogram 2027-2030",
      kategori: "Formannskapet / Kommunestyret",
      status: "Planlegging",
      frist: "Ikke satt",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <Image src="/asker-kommune.png" alt="Asker kommune" width={48} height={48} />
            <div>
              <h1 className="text-xl font-bold">Flertallspartiene i Asker</h1>
              <p className="text-sm text-slate-500">
                Høyre · FrP · Venstre · KrF
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Image src="/hoyre.png" alt="Høyre" width={44} height={44} />
            <Image src="/frp.png" alt="FrP" width={44} height={44} />
            <Image src="/venstre.png" alt="Venstre" width={44} height={44} />
            <Image src="/krf.png" alt="KrF" width={44} height={44} />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="text-3xl font-bold">Saksoversikt</h2>

        <p className="mt-2 text-slate-600">
          Kronologisk arbeidsflate for flertallspartiene.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
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

        <div className="mt-8 overflow-hidden rounded-xl border">
          <table className="w-full text-left">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4">Dato</th>
                <th className="p-4">Saksnummer</th>
                <th className="p-4">Sak</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Status</th>
                <th className="p-4">Frist</th>
              </tr>
            </thead>

            <tbody>
              {saker.map((sak) => (
                <tr key={sak.saksnummer} className="border-t hover:bg-slate-50">
                  <td className="p-4">{sak.dato}</td>
                  <td className="p-4 font-medium">{sak.saksnummer}</td>
                  <td className="p-4 font-semibold">{sak.navn}</td>
                  <td className="p-4">{sak.kategori}</td>
                  <td className="p-4">{sak.status}</td>
                  <td className="p-4">{sak.frist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

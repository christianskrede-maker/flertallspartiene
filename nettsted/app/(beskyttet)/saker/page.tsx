import Link from "next/link";

export default function SakerPage() {
  const saker = [
    {
      id: "kpa",
      dato: "16.06.2026",
      saksnummer: "2026/1001",
      navn: "Rullering av kommuneplanen",
      kategori: "Kommunestyret / Plan og bygg",
      status: "Under arbeid",
      frist: "Ikke satt",
    },
    {
      id: "handlingsprogram",
      dato: "16.06.2026",
      saksnummer: "2026/1002",
      navn: "Handlingsprogram 2027-2030",
      kategori: "Formannskapet / Kommunestyret",
      status: "Planlegging",
      frist: "Ikke satt",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <h2 className="text-2xl font-bold sm:text-3xl">Saksoversikt</h2>

      <p className="mt-2 text-sm text-slate-600 sm:text-base">
        Kronologisk arbeidsflate for flertallspartiene.
      </p>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap">
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
            className="shrink-0 rounded-lg border px-4 py-2 text-sm hover:bg-slate-100"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border">
        <table className="w-full min-w-[900px] text-left">
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

                <td className="p-4 font-semibold">
                  <Link
                    href={`/saker/${sak.id}`}
                    className="text-slate-900 hover:underline"
                  >
                    {sak.navn}
                  </Link>
                </td>

                <td className="p-4">{sak.kategori}</td>

                <td className="p-4">{sak.status}</td>

                <td className="p-4">{sak.frist}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

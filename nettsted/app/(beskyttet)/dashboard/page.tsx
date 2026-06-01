import Link from "next/link";

export default function Dashboard() {
  const saker = [
    {
      saksnr: "25/1234",
      tittel: "Kommuneplanens arealdel",
      utvalg: "Kommunestyret / Plan og bygg",
      status: "Aktiv",
      href: "/saker/kpa",
    },
    {
      saksnr: "25/1322",
      tittel: "Handlingsprogram 2026–2029",
      utvalg: "Formannskapet / Kommunestyret",
      status: "Aktiv",
      href: "#",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <section>
        <h2 className="text-2xl font-bold sm:text-3xl">Aktive saker</h2>

        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Saker legges inn fortløpende og behandles kronologisk.
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

        <div className="mt-6 space-y-4 sm:mt-8">
          {saker.map((sak) => (
            <Link
              key={sak.saksnr}
              href={sak.href}
              className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:bg-slate-50 sm:p-6"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {sak.saksnr}
                  </p>

                  <h3 className="mt-1 text-lg font-bold sm:text-xl">
                    {sak.tittel}
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">{sak.utvalg}</p>
                </div>

                <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  {sak.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

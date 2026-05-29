export default function Dashboard() {
  const saker = [
    {
      saksnr: "25/1234",
      tittel: "Kommuneplanens arealdel",
      utvalg: "Kommunestyret",
      status: "Aktiv",
    },
    {
      saksnr: "25/1322",
      tittel: "Handlingsprogram 2026–2029",
      utvalg: "Formannskapet",
      status: "Aktiv",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">

        <h1 className="text-3xl font-bold text-slate-900">
          Flertallspartiene i Asker
        </h1>

        <p className="mt-2 text-slate-600">
          Oversikt over aktive saker.
        </p>

        <div className="mt-8 space-y-4">
          {saker.map((sak) => (
            <div
              key={sak.saksnr}
              className="rounded-xl border border-slate-200 p-6"
            >
              <div className="text-sm text-slate-500">
                {sak.saksnr}
              </div>

              <h2 className="mt-1 text-xl font-semibold">
                {sak.tittel}
              </h2>

              <div className="mt-2 text-sm text-slate-600">
                {sak.utvalg}
              </div>

              <div className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                {sak.status}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">Flertallspartiene i Asker</h1>
            <p className="text-sm text-slate-300">Høyre · FrP · Venstre · KrF</p>
          </div>
          <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950">
            Logg inn med mobil
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-300">
          Lukket koordineringsportal
        </p>

        <h2 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Én felles arbeidsflate for politisk koordinering.
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Her samles saker, avklaringer, dokumenter, partistandpunkter og
          kommentarer for flertallspartiene i Asker.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            "Aktuelle saker",
            "Budsjett",
            "Kommunestyre",
            "Formannskap",
            "Dokumenter",
            "Avklaringer",
          ].map((title) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-400">
                Tilgjengelig etter mobilbekreftet innlogging.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
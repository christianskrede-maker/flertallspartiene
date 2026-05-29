export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300">
          Asker kommune
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Flertallspartiene i Asker
        </h1>

        <p className="mt-4 text-slate-300">
          Høyre · FrP · Venstre · KrF
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl">
          <p className="text-sm uppercase tracking-wide text-blue-300">
            Lukket koordineringsportal
          </p>

          <p className="mt-4 max-w-md text-slate-300">
            Tilgang er kun for godkjente deltakere med registrert mobilnummer.
          </p>

          <button className="mt-8 w-full rounded-xl bg-white px-6 py-3 font-semibold text-slate-950">
            Logg inn med mobil
          </button>
        </div>

        <p className="mt-8 max-w-lg text-xs text-slate-500">
          Ikke del lenke, skjermbilder eller innhold fra portalen uten avtale.
        </p>
      </section>
    </main>
  );
}

import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
        <Image
          src="/asker-kommune.png"
          alt="Asker kommune"
          width={130}
          height={130}
          priority
        />

        <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-5xl">
          Flertallspartiene i Asker
        </h1>

        <p className="mt-3 text-slate-500">
          Høyre · Fremskrittspartiet · Venstre · Kristelig Folkeparti
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
          <Image src="/hoyre.png" alt="Høyre" width={90} height={90} />
          <Image src="/frp.png" alt="FrP" width={90} height={90} />
          <Image src="/venstre.png" alt="Venstre" width={90} height={90} />
          <Image src="/krf.png" alt="KrF" width={90} height={90} />
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 px-8 py-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Lukket koordineringsportal
          </p>

          <p className="mt-4 max-w-xl text-slate-600">
            Tilgang er kun for forhåndsgodkjente deltakere med registrert
            mobilnummer.
          </p>

          <button className="mt-8 rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-lg hover:bg-slate-800">
            Logg inn med mobil
          <a
  href="/login"
  className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950"
>
  Logg inn med mobil
</a>
        </div>

        <p className="mt-8 max-w-lg text-xs text-slate-400">
          Ikke del lenke, skjermbilder eller innhold fra portalen uten avtale.
        </p>
      </section>
    </main>
  );
}

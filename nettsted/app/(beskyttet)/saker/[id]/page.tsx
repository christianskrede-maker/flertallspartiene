export default function Sak() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <a
        href="/dashboard"
        className="inline-flex text-sm text-slate-500 hover:text-slate-900"
      >
        ← Tilbake til saker
      </a>

      <section className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-5 sm:p-6">
        <h2 className="font-bold text-amber-900">Viktig informasjon</h2>
        <p className="mt-2 text-sm leading-6 text-amber-800">
          Denne plattformen skal kun brukes til koordinering mellom
          flertallspartiene. Intern partikommunikasjon, partistrategi og
          opplysninger som kun gjelder eget parti skal ikke legges inn her.
        </p>
      </section>

      <section className="mt-8">
        <p className="text-sm font-medium text-slate-500">Saksnr 25/1234</p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl md:text-5xl">
          Kommuneplanens arealdel
        </h1>

        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
          Arbeidsrom for rullering av kommuneplanen, bestemmelser,
          arkitekturstrategi og innspill.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {[
          "Kommunedirektørens forslag",
          "Dokumentbibliotek",
          "Bestemmelser",
          "Arkitektur Asker",
          "Innspill",
          "Forhandlingslogg",
        ].map((title) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-200 p-5 sm:p-6"
          >
            <h3 className="font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Innhold og kommentarer legges inn her.
            </p>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 p-5 sm:p-6">
        <h3 className="text-xl font-bold">Partienes innspill</h3>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {["Høyre", "FrP", "Venstre", "KrF"].map((parti) => (
            <div
              key={parti}
              className="rounded-xl border bg-slate-50 p-5"
            >
              <h4 className="font-bold">{parti}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Kun brukere fra {parti} kan skrive her. Alle kan lese.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <h3 className="text-xl font-bold">Omforent forslag</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Felles forslag utarbeides her av administratorer og gruppeledere.
        </p>
      </section>
    </div>
  );
}

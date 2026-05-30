export default function RetningslinjerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <section>
        <h2 className="text-2xl font-bold sm:text-3xl">
          Retningslinjer
        </h2>

        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Viktig informasjon før du bruker Flertallsportalen.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 sm:p-6">
        <h3 className="text-xl font-bold text-amber-900 sm:text-2xl">
          Viktig før du fortsetter
        </h3>

        <p className="mt-4 text-sm leading-6 text-amber-800 sm:text-base">
          Denne portalen skal kun brukes til koordinering mellom
          flertallspartiene i Asker.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 p-5 sm:p-6">
        <h3 className="text-lg font-bold sm:text-xl">
          Ikke legg inn:
        </h3>

        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700 sm:text-base">
          <li>• Intern partistrategi</li>
          <li>• Intern kommunikasjon som kun gjelder eget parti</li>
          <li>• Medlemslister eller interne partiforhold</li>
          <li>• Sensitive personopplysninger</li>
          <li>• Dokumenter som ikke skal deles mellom partiene</li>
        </ul>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 p-5 sm:p-6">
        <h3 className="text-lg font-bold sm:text-xl">
          Bruk portalen til:
        </h3>

        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700 sm:text-base">
          <li>• Koordinering av saker mellom partiene</li>
          <li>• Felles vurderinger av kommunedirektørens forslag</li>
          <li>• Partienes innspill i felles saker</li>
          <li>• Omforente forslag</li>
          <li>• Forhandlingslogg og status</li>
        </ul>
      </section>

      <div className="mt-10">
        <a
          href="/dashboard"
          className="flex w-full justify-center rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white hover:bg-slate-800 sm:inline-flex sm:w-auto"
        >
          Jeg har lest og forstått
        </a>
      </div>
    </div>
  );
}

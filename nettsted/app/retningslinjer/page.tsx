import Image from "next/image";

export default function RetningslinjerPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <header className="border-b pb-6">
          <div className="flex flex-col items-center text-center">
            <Image src="/asker-kommune.png" alt="Asker kommune" width={90} height={90} />

            <h1 className="mt-4 text-3xl font-bold">Retningslinjer</h1>
            <p className="mt-1 text-sm text-slate-500">Flertallsportalen Asker</p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
              <Image src="/hoyre.png" alt="Høyre" width={56} height={56} />
              <Image src="/frp.png" alt="FrP" width={56} height={56} />
              <Image src="/venstre.png" alt="Venstre" width={56} height={56} />
              <Image src="/krf.png" alt="KrF" width={56} height={56} />
            </div>
          </div>
        </header>

        <section className="mt-10 rounded-2xl border border-amber-300 bg-amber-50 p-6">
          <h2 className="text-2xl font-bold text-amber-900">
            Viktig før du fortsetter
          </h2>

          <p className="mt-4 text-amber-800">
            Denne portalen skal kun brukes til koordinering mellom
            flertallspartiene i Asker.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 p-6">
          <h3 className="text-xl font-bold">Ikke legg inn:</h3>

          <ul className="mt-4 space-y-3 text-slate-700">
            <li>• Intern partistrategi</li>
            <li>• Intern kommunikasjon som kun gjelder eget parti</li>
            <li>• Medlemslister eller interne partiforhold</li>
            <li>• Sensitive personopplysninger</li>
            <li>• Dokumenter som ikke skal deles mellom partiene</li>
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 p-6">
          <h3 className="text-xl font-bold">Bruk portalen til:</h3>

          <ul className="mt-4 space-y-3 text-slate-700">
            <li>• Koordinering av saker mellom partiene</li>
            <li>• Felles vurderinger av kommunedirektørens forslag</li>
            <li>• Partienes innspill i felles saker</li>
            <li>• Omforente forslag</li>
            <li>• Forhandlingslogg og status</li>
          </ul>
        </section>

        <div className="mt-10 text-center">
          <a
            href="/dashboard"
            className="inline-flex rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white hover:bg-slate-800"
          >
            Jeg har lest og forstått
          </a>
        </div>
      </div>
    </main>
  );
}

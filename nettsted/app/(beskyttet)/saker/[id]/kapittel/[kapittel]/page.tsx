import Link from "next/link";

type KapittelProps = {
  params: Promise<{
    id: string;
    kapittel: string;
  }>;
};

export default async function Kapittel({ params }: KapittelProps) {
  const { id, kapittel } = await params;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href={`/saker/${id}`}
        className="inline-flex text-sm text-slate-500 hover:text-slate-900"
      >
        ← Tilbake til saken
      </Link>

      <section className="mt-8">
        <p className="text-sm font-medium text-slate-500">
          Kommuneplanens arealdel
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Kapittel {kapittel}
        </h1>

        <p className="mt-4 text-base leading-7 text-slate-600">
          Arbeidsrom for bestemmelse, spesialmerknad, gjeldende bestemmelse og
          politisk vurdering.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-xl font-bold">Ny bestemmelse</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Innhold legges inn i neste steg.
        </p>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-xl font-bold">Spesialmerknad</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Spesialmerknaden vises sammen med bestemmelsen.
        </p>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-xl font-bold">Gjeldende bestemmelse</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Kobles manuelt der gjeldende struktur passer med nytt utkast.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {["Høyre", "FrP", "Venstre", "KrF"].map((parti) => (
          <div key={parti} className="rounded-2xl border bg-slate-50 p-5">
            <h3 className="font-bold">{parti}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Partiets vurdering legges inn her senere.
            </p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <h2 className="text-xl font-bold">Omforent forslag</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Felles forslag utarbeides her.
        </p>
      </section>
    </div>
  );
}

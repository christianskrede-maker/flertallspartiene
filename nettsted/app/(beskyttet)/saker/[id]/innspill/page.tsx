import Link from "next/link";

const omrader = [
  {
    navn: "Heggedal",
    slug: "heggedal",
    antall: 10,
  },
  {
    navn: "Dikemark",
    slug: "dikemark",
    antall: 2,
  },
  {
    navn: "Holmen",
    slug: "holmen",
    antall: 10,
  },
  {
    navn: "Nesøya",
    slug: "nesoya",
    antall: 3,
  },
  {
    navn: "Røyken",
    slug: "royken",
    antall: 20,
  },
  {
    navn: "Sætre",
    slug: "satre",
    antall: 24,
  },
  {
    navn: "Asker",
    slug: "asker",
    antall: 23,
  },
  {
    navn: "Slemmestad",
    slug: "slemmestad",
    antall: 14,
  },
  {
    navn: "Spikkestad",
    slug: "spikkestad",
    antall: 4,
  },
  {
    navn: "Tofte",
    slug: "tofte",
    antall: 8,
  },
  {
    navn: "Vollen",
    slug: "vollen",
    antall: 22,
  },
  {
    navn: "Generelle innspill",
    slug: "generelle",
    antall: 31,
  },
];

type InnspillProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Innspill({ params }: InnspillProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
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

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Innspill</h1>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Innspill behandles per lokalområde. Hvert innspill vil senere få egen
          behandlingsside med kommunedirektørens vurdering, partienes
          kommentarer og omforent innspill.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-xl font-bold">Lokalområder</h2>

        <div className="mt-6 grid gap-3">
          {omrader.map((omrade) => (
            <Link
              key={omrade.slug}
              href={`/saker/${id}/innspill/${omrade.slug}`}
              className="block rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold">{omrade.navn}</h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {omrade.antall} innspill
                  </p>
                </div>

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                  Ikke behandlet
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

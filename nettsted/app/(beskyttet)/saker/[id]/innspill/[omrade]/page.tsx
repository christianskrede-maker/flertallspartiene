import Link from "next/link";

const omrader = {
  heggedal: {
    navn: "Heggedal",
    antall: 10,
  },
  dikemark: {
    navn: "Dikemark",
    antall: 2,
  },
  holmen: {
    navn: "Holmen",
    antall: 10,
  },
  nesoya: {
    navn: "Nesøya",
    antall: 3,
  },
  royken: {
    navn: "Røyken",
    antall: 20,
  },
  satre: {
    navn: "Sætre",
    antall: 24,
  },
  asker: {
    navn: "Asker",
    antall: 23,
  },
  slemmestad: {
    navn: "Slemmestad",
    antall: 14,
  },
  spikkestad: {
    navn: "Spikkestad",
    antall: 4,
  },
  tofte: {
    navn: "Tofte",
    antall: 8,
  },
  vollen: {
    navn: "Vollen",
    antall: 22,
  },
  generelle: {
    navn: "Generelle innspill",
    antall: 31,
  },
};

type OmradeSlug = keyof typeof omrader;

type InnspillOmradeProps = {
  params: Promise<{
    id: string;
    omrade: string;
  }>;
};

export default async function InnspillOmrade({
  params,
}: InnspillOmradeProps) {
  const { id, omrade } = await params;

  const valgtOmrade = omrader[omrade as OmradeSlug];

  if (!valgtOmrade) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <Link
          href={`/saker/${id}`}
          className="inline-flex text-sm text-slate-500 hover:text-slate-900"
        >
          ← Tilbake til saken
        </Link>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Ukjent lokalområde
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            Dette lokalområdet finnes ikke i innspillsstrukturen.
          </p>
        </section>
      </div>
    );
  }

  const innspill = Array.from({ length: valgtOmrade.antall }, (_, index) => ({
    nummer: index + 1,
  }));

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
          Kommuneplanens arealdel / Innspill
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          {valgtOmrade.navn}
        </h1>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Her behandles innspillene for {valgtOmrade.navn}. Hvert innspill får
          egen behandlingsside med innspillstekst, kommunedirektørens vurdering,
          partienes kommentarer og omforent innspill.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Innspill i {valgtOmrade.navn}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {valgtOmrade.antall} innspill
            </p>
          </div>

          <button className="w-fit rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
            Eksporter område
          </button>
        </div>

        <div className="mt-6 grid gap-3">
          {innspill.map((sak) => (
            <Link
              key={sak.nummer}
              href={`/saker/${id}/innspill/${omrade}/${sak.nummer}`}
              className="block rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Innspill {sak.nummer}
                  </p>

                  <h3 className="mt-1 font-bold">
                    Behandlingsside kommer i neste fase
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Innspillstekst, kommunedirektørens vurdering og omforent
                    innspill kobles inn her.
                  </p>
                </div>

                <span className="w-fit rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
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

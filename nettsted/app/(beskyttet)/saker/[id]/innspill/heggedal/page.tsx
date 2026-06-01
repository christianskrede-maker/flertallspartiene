import Link from "next/link";

const innspill = [
  {
    nummer: 1,
    tittel: "2024/2278-58",
    undertittel: "Maxwell Consulting Norway AS",
    tema: "Etablere fire nye eneboliger på eksisterende boligtomt",
    status: "Ikke behandlet",
  },
  {
    nummer: 2,
    tittel: "2024/2278-91",
    undertittel: "MinBy Eiendom AS",
    tema: "Endre arealformål fra frittliggende småhusbebyggelse til konsentrert bebyggelse",
    status: "Ikke behandlet",
  },
  {
    nummer: 3,
    tittel: "2024/2278-199",
    undertittel: "Skogveien Invest AS",
    tema: "Endre arealformål til framtidig boligbebyggelse",
    status: "Ikke behandlet",
  },
];

type HeggedalInnspillProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function HeggedalInnspill({
  params,
}: HeggedalInnspillProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href={`/saker/${id}/innspill`}
        className="inline-flex text-sm text-slate-500 hover:text-slate-900"
      >
        ← Tilbake til innspill
      </Link>

      <section className="mt-8">
        <p className="text-sm font-medium text-slate-500">
          Kommuneplanens arealdel / Innspill
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Heggedal
        </h1>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Her behandles innspillene for Heggedal lokalområde. Hvert innspill
          får egen vurdering, partikommentarer og omforent innspill.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-xl font-bold">Innspill i Heggedal</h2>

        <div className="mt-6 grid gap-3">
          {innspill.map((sak) => (
            <div
              key={sak.nummer}
              className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Innspill {sak.nummer}
                  </p>

                  <h3 className="mt-1 font-bold">{sak.tittel}</h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {sak.undertittel}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {sak.tema}
                  </p>
                </div>

                <span className="w-fit rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                  {sak.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

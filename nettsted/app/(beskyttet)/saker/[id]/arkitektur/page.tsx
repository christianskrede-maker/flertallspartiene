import Link from "next/link";

const kapitler = [
  {
    tittel: "En ambisiøs kommune",
    slug: "en-ambisios-kommune",
    tekst: "Arkitektur er samfunnsutvikling og et verktøy for å utvikle gode steder.",
  },
  {
    tittel: "Attraktiv",
    slug: "attraktiv",
    tekst: "Helhetlig utvikling med merverdi og vakker arkitektur med særpreg.",
  },
  {
    tittel: "Ansvarlig",
    slug: "ansvarlig",
    tekst: "Omtanke for natur, blågrønne verdier, kvalitet og varige valg.",
  },
  {
    tittel: "For alle",
    slug: "for-alle",
    tekst: "Gode boliger, nabolag og aktive liv i fellesskap.",
  },
  {
    tittel: "Urbane områder",
    slug: "urbane-omrader",
    tekst: "Prinsipper for utvikling av urbane områder.",
  },
  {
    tittel: "Småhusområdene",
    slug: "smahusomradene",
    tekst: "Prinsipper for utvikling og tilpasning i småhusområdene.",
  },
  {
    tittel: "Kulturmiljøer",
    slug: "kulturmiljoer",
    tekst: "Prinsipper for utvikling med hensyn til kulturmiljøer.",
  },
  {
    tittel: "Kysten",
    slug: "kysten",
    tekst: "Prinsipper for arkitektur og stedsforming langs kysten.",
  },
  {
    tittel: "Landbruksområdene",
    slug: "landbruksomradene",
    tekst: "Prinsipper for utvikling i landbruksområdene.",
  },
];

type ArkitekturProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Arkitektur({ params }: ArkitekturProps) {
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

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Arkitektur Asker
        </h1>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Arkitektur Asker behandles tematisk. Hvert kapittel får egen
          behandlingsside med arkitekturtekst, partienes kommentarer og
          omforent arkitektur.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-xl font-bold">Kapitler</h2>

        <div className="mt-6 grid gap-3">
          {kapitler.map((kapittel) => (
            <Link
              key={kapittel.slug}
              href={`/saker/${id}/arkitektur/${kapittel.slug}`}
              className="block rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-bold">{kapittel.tittel}</h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {kapittel.tekst}
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

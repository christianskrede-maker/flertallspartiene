import Link from "next/link";

const kartLenker = [
  {
    tittel: "K.dir kart",
    tekst: "Kommunedirektørens forslag",
    href: "https://www.arcgis.com/apps/dashboards/f2d273a638a9420992b7bad2bd7cb81f",
  },
  {
    tittel: "Askerkart",
    tekst: "Kommunens kartløsning",
    href: "https://kart.asker.kommune.no/geoinnsyn/?project=Askerkart&application=geoinnsyn&zoom=8&lat=6619195.00&lon=581710.00",
  },
  {
    tittel: "Innspillskart",
    tekst: "Alle innspill i kart",
    href: "https://www.arcgis.com/apps/dashboards/f2d273a638a9420992b7bad2bd7cb81f",
  },
];

const kapitler = [
  { nummer: "1", tittel: "Eldre arealplaner som skal gjelde uendret" },
  { nummer: "2", tittel: "Krav om reguleringsplan" },
  { nummer: "3", tittel: "Rekkefølgekrav" },
  { nummer: "4", tittel: "Overvann, vannforsyning og avløp" },
  { nummer: "5", tittel: "Funksjonskrav til utbyggingsområder" },
  { nummer: "6", tittel: "Byggegrenser" },
  {
    nummer: "7",
    tittel: "Miljøkvalitet, natur, estetikk og landskapstilpasning",
  },
  { nummer: "8", tittel: "Kulturminner og kulturmiljø" },
  { nummer: "9", tittel: "Nærmere angitte tiltak" },
  { nummer: "10", tittel: "Forhold som skal avklares i reguleringsplan" },
  { nummer: "11", tittel: "Småhusbebyggelse" },
  { nummer: "12", tittel: "Spesielle småhusområder" },
  { nummer: "13", tittel: "Fritidsbebyggelse" },
  { nummer: "14", tittel: "Næringsformål" },
  { nummer: "15", tittel: "Andre arealformål under bebyggelse og anlegg" },
  { nummer: "16", tittel: "Grønnstruktur" },
  { nummer: "17", tittel: "LNFR" },
  { nummer: "18", tittel: "Sjø og vassdrag" },
  {
    nummer: "19",
    tittel: "Hensynssoner landskap, naturmiljø og kulturmiljø",
  },
  { nummer: "20", tittel: "Hensynssoner fare og sikring" },
  { nummer: "21", tittel: "Infrastruktur og flomveier" },
  { nummer: "22", tittel: "Felles planlegging" },
  { nummer: "23", tittel: "Båndleggingssoner" },
  { nummer: "24", tittel: "Reguleringsplaner som skal gjelde uendret" },
  { nummer: "25", tittel: "Bestemmelsesområder" },
];

const partier = ["Høyre", "FrP", "Venstre", "KrF"];

type KapittelProps = {
  params: Promise<{
    id: string;
    kapittel: string;
  }>;
};

export default async function Kapittel({ params }: KapittelProps) {
  const { id, kapittel } = await params;

  const valgtKapittel =
    kapitler.find((item) => item.nummer === kapittel) ?? null;

  const tittel = valgtKapittel
    ? `${valgtKapittel.nummer}. ${valgtKapittel.tittel}`
    : `Kapittel ${kapittel}`;

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

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{tittel}</h1>

        <p className="mt-4 text-base leading-7 text-slate-600">
          Arbeidsrom for bestemmelse, spesialmerknad, gjeldende bestemmelse,
          politisk vurdering og omforent forslag.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
            Ikke behandlet
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            Uten database
          </span>
        </div>
      </section>

      <section className="sticky top-0 z-10 mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
          Kart og arbeidsverktøy
        </h2>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {kartLenker.map((lenke) => (
            <a
              key={lenke.tittel}
              href={lenke.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <p className="font-bold">{lenke.tittel}</p>
              <p className="mt-1 text-sm text-slate-500">{lenke.tekst}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Nytt utkast
          </p>
          <h2 className="mt-2 text-xl font-bold">Ny bestemmelse</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Innhold legges inn i neste steg. Strukturen følger nytt utkast, ikke
            gjeldende plan.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Forklaring og intensjon
          </p>
          <h2 className="mt-2 text-xl font-bold">Spesialmerknad</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Spesialmerknaden skal alltid vurderes sammen med bestemmelsen.
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Manuell kobling
        </p>
        <h2 className="mt-2 text-xl font-bold">Gjeldende bestemmelse</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Gjeldende bestemmelse kobles manuelt der den passer med nytt utkast.
          Kapittelstrukturen er ikke identisk.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Politisk arbeid
            </p>
            <h2 className="mt-2 text-xl font-bold">Partienes vurderinger</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Alle partier vises samlet også på kapittelnivå. Senere kobles
              skriveadgang til rolle og parti.
            </p>
          </div>

          <button className="w-fit rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
            Eksporter vurderinger
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {partier.map((parti) => (
            <div key={parti} className="rounded-xl border bg-slate-50 p-5">
              <h3 className="font-bold">{parti}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Partiets vurdering legges inn her senere.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Felles politisk tekst
            </p>
            <h2 className="mt-2 text-xl font-bold">Omforent forslag</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Felles forslag utarbeides her av administratorer og gruppeledere.
            </p>
          </div>

          <button className="w-fit rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
            Eksporter kapittel
          </button>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-dashed border-slate-300 p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Eksport
        </p>
        <h2 className="mt-2 text-xl font-bold">Eksportmuligheter</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Her legger vi senere inn eksport til politisk notat, forhandlingsark
          og samlet dokument for hele saken.
        </p>
      </section>
    </div>
  );
}

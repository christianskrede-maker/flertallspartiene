import Link from "next/link";
import { kpaKapitler } from "../../../data/kpaKapitler";
import { kpaInnhold } from "../../../data/kpaInnhold";

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
    kpaKapitler.find((item) => item.nummer === kapittel) ?? null;

  const tittel = valgtKapittel
    ? `${valgtKapittel.nummer}. ${valgtKapittel.tittel}`
    : `Kapittel ${kapittel}`;

  const innhold =
    kpaInnhold[kapittel as keyof typeof kpaInnhold] ?? null;

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
          {tittel}
        </h1>

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
              <p className="mt-1 text-sm text-slate-500">
                {lenke.tekst}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Nytt utkast
          </p>

          <h2 className="mt-2 text-xl font-bold">
            Ny bestemmelse
          </h2>

          <div className="mt-4 whitespace-pre-wrap text-sm leading-7">
            {innhold?.bestemmelse ??
              "Bestemmelse er ikke lagt inn ennå."}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Forklaring og intensjon
          </p>

          <h2 className="mt-2 text-xl font-bold">
            Spesialmerknad
          </h2>

          <div className="mt-4 whitespace-pre-wrap text-sm leading-7">
            {innhold?.spesialmerknad ??
              "Spesialmerknad er ikke lagt inn ennå."}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Manuell kobling
        </p>

        <h2 className="mt-2 text-xl font-bold">
          Gjeldende bestemmelse
        </h2>

        <div className="mt-4 whitespace-pre-wrap text-sm leading-7">
          {innhold?.gjeldendeBestemmelse ||
            "Gjeldende bestemmelse legges inn senere."}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-xl font-bold">
          Partienes vurderinger
        </h2>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {partier.map((parti) => (
            <div
              key={parti}
              className="rounded-xl border bg-slate-50 p-5"
            >
              <h3 className="font-bold">{parti}</h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Partiets vurdering legges inn her senere.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <h2 className="text-xl font-bold">
          Omforent forslag
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Felles forslag utarbeides her av administratorer og
          gruppeledere.
        </p>
      </section>
    </div>
  );
}

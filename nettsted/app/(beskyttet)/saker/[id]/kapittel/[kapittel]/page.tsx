import Link from "next/link";
import { kpaKapitler } from "../../../data/kpaKapitler";
import { kpaInnhold } from "../../../data/kpaInnhold";
import { leggTilKommentar } from "../../../../../actions/kommentarer";

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

  const innhold = kpaInnhold[kapittel as keyof typeof kpaInnhold] ?? null;

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
          kommentarer, oppsummering og omforent forslag.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
            Ikke behandlet
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            Med kommentarlagring
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

      <section className="mt-8">
        {innhold?.deler ? (
          <div className="space-y-8">
            {innhold.deler.map((del) => (
              <article
                key={del.nummer}
                className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Delpunkt
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">
                      {del.nummer} {del.tittel}
                    </h2>
                  </div>

                  <button className="w-fit rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
                    Eksporter delpunkt
                  </button>
                </div>

                <div className="mt-6 space-y-3">
                  <details className="rounded-xl border border-slate-200 bg-white p-4">
                    <summary className="cursor-pointer text-sm font-bold uppercase tracking-wide text-slate-600">
                      Ny bestemmelse
                    </summary>

                    <div className="mt-4 whitespace-pre-wrap text-sm leading-7">
                      {del.bestemmelse}
                    </div>
                  </details>

                  <details className="rounded-xl border border-slate-200 bg-white p-4">
                    <summary className="cursor-pointer text-sm font-bold uppercase tracking-wide text-slate-600">
                      Spesialmerknad
                    </summary>

                    <div className="mt-4 whitespace-pre-wrap text-sm leading-7">
                      {del.spesialmerknad}
                    </div>
                  </details>

                  <details className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <summary className="cursor-pointer text-sm font-bold uppercase tracking-wide text-slate-600">
                      Gjeldende bestemmelse
                    </summary>

                    <div className="mt-4 whitespace-pre-wrap text-sm leading-7">
                      {innhold.gjeldendeBestemmelse ??
                        "Gjeldende bestemmelse legges inn senere."}
                    </div>
                  </details>

                  <details className="rounded-xl border border-slate-200 bg-white p-4">
                    <summary className="cursor-pointer text-sm font-bold uppercase tracking-wide text-slate-600">
                      Kommentarer og vurderinger
                    </summary>

                    <div className="mt-5 grid gap-5 lg:grid-cols-2">
                      <div>
                        <h3 className="text-lg font-bold">
                          Partienes innspill til {del.nummer}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          Skriv kommentar til ny bestemmelse og
                          spesialmerknad for dette delpunktet.
                        </p>
                      </div>

                      <form action={leggTilKommentar} className="rounded-xl border bg-slate-50 p-4">
                        <input type="hidden" name="sak_id" value={id} />
                        <input type="hidden" name="kapittel" value={kapittel} />
                        <input type="hidden" name="delpunkt" value={del.nummer} />
                        <input
                          type="hidden"
                          name="tekstutdrag"
                          value={del.bestemmelse ?? ""}
                        />

                        <label className="text-sm font-bold text-slate-700">
                          Ny kommentar
                        </label>

                        <textarea
                          name="kommentar"
                          required
                          rows={5}
                          placeholder={`Skriv kommentar til ${del.nummer}...`}
                          className="mt-2 w-full rounded-xl border border-slate-300 p-3 text-sm"
                        />

                        <button className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
                          Lagre kommentar
                        </button>
                      </form>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {partier.map((parti) => (
                        <div
                          key={parti}
                          className="rounded-xl border bg-slate-50 p-4"
                        >
                          <h4 className="font-bold">{parti}</h4>
                          <p className="mt-2 text-sm leading-6 text-slate-500">
                            Lagrede kommentarer vises her i neste steg.
                          </p>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <p className="text-sm leading-6 text-slate-500">
              Innhold er ikke lagt inn ennå.
            </p>
          </div>
        )}
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <details>
          <summary className="cursor-pointer">
            <div className="inline-flex flex-col">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Kapitteloppsummering
              </p>
              <h2 className="mt-2 text-xl font-bold">
                Oppsummering av partienes innspill
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Her samles hovedpunktene fra kommentarene i delpunktene over.
              </p>
            </div>
          </summary>

          <div className="mt-6 flex justify-end">
            <button className="w-fit rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
              Eksporter kapittel
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {partier.map((parti) => (
              <div key={parti} className="rounded-xl border bg-slate-50 p-5">
                <h3 className="font-bold">{parti}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Oppsummering av {parti}s innspill til hele kapittelet legges
                  inn her senere.
                </p>
              </div>
            ))}
          </div>
        </details>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <details>
          <summary className="cursor-pointer">
            <div className="inline-flex flex-col">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Felles politisk tekst
              </p>
              <h2 className="mt-2 text-xl font-bold">Omforent forslag</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Felles forslag utarbeides her av administratorer og
                gruppeledere.
              </p>
            </div>
          </summary>

          <div className="mt-6">
            <button className="w-fit rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
              Eksporter omforent forslag
            </button>
          </div>
        </details>
      </section>
    </div>
  );
}

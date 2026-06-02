import Link from "next/link";
import KommunekartKommentarer from "./KommunekartKommentarer";

type KommunekartProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Kommunekart({ params }: KommunekartProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href={`/saker/${id}`}
        className="inline-flex text-sm text-slate-500 hover:text-slate-900"
      >
        ← Tilbake til saken
      </Link>

      <section className="mt-6">
        <p className="text-sm font-medium text-slate-500">Kommunekart</p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Kartkommentarer
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          Bruk denne siden til å samle politiske kommentarer til arealkartet.
          Klikk i kartet for å finne OBJECTID, arealformål og forklaring, og
          legg inn vurdering eller forslag til politisk avklaring.
        </p>
      </section>

      <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold">K.dir kart</h2>
            <p className="text-sm text-slate-500">
              Bruk kartet til å finne område og kopiere OBJECTID.
            </p>
          </div>

          <a
            href="https://www.arcgis.com/apps/dashboards/f2d273a638a9420992b7bad2bd7cb81f"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-blue-700 underline"
          >
            Åpne i ny fane
          </a>
        </div>

        <iframe
          src="https://www.arcgis.com/apps/dashboards/f2d273a638a9420992b7bad2bd7cb81f"
          className="h-[650px] w-full"
          title="K.dir kart"
        />
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <a
          href="https://kart.asker.kommune.no/geoinnsyn/?project=Askerkart&application=geoinnsyn&zoom=8&lat=6619195.00&lon=581710.00"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-slate-200 bg-white p-5 hover:bg-slate-50"
        >
          <h2 className="font-bold">Askerkart</h2>
          <p className="mt-2 text-sm text-slate-500">
            Åpne kommunens ordinære kartløsning.
          </p>
        </a>

        <a
          href="/bestemmelser-utkast-22-mai-26.pdf"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-slate-200 bg-white p-5 hover:bg-slate-50"
        >
          <h2 className="font-bold">Bestemmelser PDF</h2>
          <p className="mt-2 text-sm text-slate-500">
            Åpne originalt utkast til bestemmelser.
          </p>
        </a>

        <a
          href="/spesialmerknader-til-bestemmelsene-utkast-22-mai-26.pdf"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-slate-200 bg-white p-5 hover:bg-slate-50"
        >
          <h2 className="font-bold">Spesialmerknader PDF</h2>
          <p className="mt-2 text-sm text-slate-500">
            Åpne originalt utkast til spesialmerknader.
          </p>
        </a>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 sm:p-6">
        <h2 className="font-bold text-amber-900">Midlertidig lagring</h2>
        <p className="mt-2 text-sm leading-6 text-amber-800">
          Kommentarene lagres foreløpig lokalt i nettleseren på maskinen som
          brukes. Neste steg blir felles lagring for alle partiene.
        </p>
      </section>

      <KommunekartKommentarer />
    </div>
  );
}

import Link from "next/link";

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
          Åpne kartet, finn området du vil kommentere, og legg inn kommentar
          med område, koordinat eller kartlenke.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <a
          href="https://www.arcgis.com/apps/dashboards/f2d273a638a9420992b7bad2bd7cb81f"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-slate-200 bg-white p-5 hover:bg-slate-50"
        >
          <h2 className="font-bold">K.dir kart</h2>
          <p className="mt-2 text-sm text-slate-500">
            Åpne kartgrunnlaget fra kommunedirektørens forslag.
          </p>
        </a>

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
      </section>

      <section className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 sm:p-6">
        <h2 className="font-bold text-amber-900">
          Midlertidig arbeidsmetode
        </h2>
        <p className="mt-2 text-sm leading-6 text-amber-800">
          Inntil kartkommentarer lagres automatisk, brukes kommentarfeltet
          under som arbeidsmal. Kopier inn kommentarene i felles dokument eller
          saksliste etter møtet.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-2xl font-bold">Ny kartkommentar</h2>

        <div className="mt-5 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Tittel / område
            </span>
            <input
              type="text"
              placeholder="F.eks. Dikemark, felt X eller gbnr."
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Koordinat eller kartlenke
            </span>
            <input
              type="text"
              placeholder="Lim inn koordinat, gbnr. eller lenke fra kartet"
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Kommentar
            </span>
            <textarea
              rows={6}
              placeholder="Skriv vurdering, spørsmål eller forslag til politisk avklaring."
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />
          </label>

          <button
            type="button"
            className="w-fit rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Lagre kommentar kommer senere
          </button>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-2xl font-bold">Kommentarer til gjennomgang</h2>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Her kommer samlede kartkommentarer når lagring er koblet på. Målet er
          at alle partiene kan legge inn punkter fortløpende, og at gruppen kan
          gå gjennom dem punkt for punkt.
        </p>

        <div className="mt-5 rounded-xl border border-dashed border-slate-300 p-5 text-sm text-slate-500">
          Ingen kommentarer registrert ennå.
        </div>
      </section>
    </div>
  );
}

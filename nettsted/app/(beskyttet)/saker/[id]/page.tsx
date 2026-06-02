import Link from "next/link";
import { arkitekturKapitler } from "@/lib/kpa/arkitektur";
import { kpaKapitler } from "../data/kpaKapitler";

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
  {
    tittel: "Bestemmelser PDF",
    tekst: "Originalt utkast 22. mai 2026",
    href: "/bestemmelser-utkast-22-mai-26.pdf",
  },
  {
    tittel: "Spesialmerknader PDF",
    tekst: "Originalt utkast 22. mai 2026",
    href: "/spesialmerknader-til-bestemmelsene-utkast-22-mai-26.pdf",
  },
  {
    tittel: "Innspill PDF",
    tekst: "Originale innspill",
    href: "/innspill.pdf",
  },
];

const innspillOmrader = [
  { navn: "Heggedal", slug: "heggedal", antall: 10 },
  { navn: "Dikemark", slug: "dikemark", antall: 2 },
  { navn: "Holmen", slug: "holmen", antall: 10 },
  { navn: "Nesøya", slug: "nesoya", antall: 3 },
  { navn: "Røyken", slug: "royken", antall: 20 },
  { navn: "Sætre", slug: "satre", antall: 24 },
  { navn: "Asker", slug: "asker", antall: 23 },
  { navn: "Slemmestad", slug: "slemmestad", antall: 14 },
  { navn: "Spikkestad", slug: "spikkestad", antall: 4 },
  { navn: "Tofte", slug: "tofte", antall: 8 },
  { navn: "Vollen", slug: "vollen", antall: 22 },
  { navn: "Generelle innspill", slug: "generelle", antall: 31 },
];

type SakProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Sak({ params }: SakProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href="/dashboard"
        className="inline-flex text-sm text-slate-500 hover:text-slate-900"
      >
        ← Tilbake til saker
      </Link>

      <section className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-5 sm:p-6">
        <h2 className="font-bold text-amber-900">Viktig informasjon</h2>
        <p className="mt-2 text-sm leading-6 text-amber-800">
          Denne plattformen skal kun brukes til koordinering mellom
          flertallspartiene. Intern partikommunikasjon, partistrategi og
          opplysninger som kun gjelder eget parti skal ikke legges inn her.
        </p>
      </section>

      <section className="mt-8">
        <p className="text-sm font-medium text-slate-500">Saksnr 25/1234</p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl md:text-5xl">
          Kommuneplanens arealdel
        </h1>

        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
          Arbeidsrom for behandling av bestemmelser, spesialmerknader,
          arkitekturstrategi, kart og innspill.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium">
            Kommunestyret
          </span>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium">
            Formannskapet
          </span>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium">
            Plan og bygg
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

      <details
        className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
      >
        <summary className="cursor-pointer text-2xl font-bold">
          Bestemmelser og spesialmerknader
        </summary>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Strukturen følger nytt utkast til kommuneplanens bestemmelser.
          Gjeldende bestemmelser kobles manuelt der de passer. Bestemmelse og
          spesialmerknad behandles alltid sammen.
        </p>

        <div className="mt-6 grid gap-3">
          {kpaKapitler.map((kapittel) => (
            <Link
              key={kapittel.nummer}
              href={`/saker/${id}/kapittel/${kapittel.nummer}`}
              className="block rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-bold">
                    {kapittel.nummer}. {kapittel.tittel}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Ny bestemmelse · Spesialmerknad · Gjeldende bestemmelse ·
                    Politisk vurdering
                  </p>
                </div>

                <span className="w-fit rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                  Ikke behandlet
                </span>
              </div>
            </Link>
          ))}
        </div>
      </details>

      <details className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <summary className="cursor-pointer text-2xl font-bold">Innspill</summary>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Innspillene behandles etter lokalområde. Velg lokalområde for å se og
          behandle innspillene.
        </p>

        <div className="mt-6 grid gap-3">
          {innspillOmrader.map((omrade) => (
            <Link
              key={omrade.slug}
              href={`/saker/${id}/innspill/${omrade.slug}`}
              className="block rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-bold">{omrade.navn}</h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {omrade.antall} innspill
                  </p>
                </div>

                <span className="w-fit rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                  Ikke behandlet
                </span>
              </div>
            </Link>
          ))}
        </div>
      </details>

      <details className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <summary className="cursor-pointer text-2xl font-bold">
          Arkitektur Asker
        </summary>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Arkitektur Asker behandles tematisk etter kapitlene i
          arkitekturdokumentet.
        </p>

        <div className="mt-6 grid gap-3">
          {Object.values(arkitekturKapitler).map((kapittel) => (
            <Link
              key={kapittel.slug}
              href={`/saker/${id}/arkitektur/${kapittel.slug}`}
              className="block rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-bold">{kapittel.tittel}</h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {kapittel.ingress}
                  </p>
                </div>

                <span className="w-fit rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                  Ikke behandlet
                </span>
              </div>
            </Link>
          ))}
        </div>
      </details>

      <details className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <summary className="cursor-pointer text-2xl font-bold">
          Kommunekart
        </summary>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Kartgrunnlag, originaldokumenter og politiske kartkommentarer.
        </p>

        <div className="mt-6 grid gap-3">
          <Link
            href={`/saker/${id}/kommunekart`}
            className="block rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-bold">Kartkommentarer</h3>

                <p className="mt-1 text-sm text-slate-500">
                  Samle kommentarer til arealkartet punkt for punkt
                </p>
              </div>

              <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                Nytt verktøy
              </span>
            </div>
          </Link>

          <a
            href="https://www.arcgis.com/apps/dashboards/f2d273a638a9420992b7bad2bd7cb81f"
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
          >
            <h3 className="font-bold">K.dir kart</h3>
            <p className="mt-1 text-sm text-slate-500">
              Kommunedirektørens kartforslag
            </p>
          </a>

          <a
            href="https://kart.asker.kommune.no/geoinnsyn/?project=Askerkart&application=geoinnsyn&zoom=8&lat=6619195.00&lon=581710.00"
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
          >
            <h3 className="font-bold">Askerkart</h3>
            <p className="mt-1 text-sm text-slate-500">
              Kommunens ordinære kartløsning
            </p>
          </a>

          <a
            href="/bestemmelser-utkast-22-mai-26.pdf"
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
          >
            <h3 className="font-bold">Bestemmelser PDF</h3>
            <p className="mt-1 text-sm text-slate-500">
              Originalt utkast 22. mai 2026
            </p>
          </a>

          <a
            href="/spesialmerknader-til-bestemmelsene-utkast-22-mai-26.pdf"
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
          >
            <h3 className="font-bold">Spesialmerknader PDF</h3>
            <p className="mt-1 text-sm text-slate-500">
              Originalt utkast 22. mai 2026
            </p>
          </a>

          <a
            href="/innspill.pdf"
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
          >
            <h3 className="font-bold">Innspill PDF</h3>
            <p className="mt-1 text-sm text-slate-500">
              Originale innspill
            </p>
          </a>
        </div>
      </details>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">Omforente dokumenter</h2>
      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">Omforente dokumenter</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href={`/saker/${id}/omforent-bestemmelser`}
            className="rounded-2xl border border-slate-200 p-5 transition hover:bg-slate-50 sm:p-6"
          >
            <h3 className="font-bold">Omforente bestemmelser</h3>

            <p className="mt-2 text-sm text-slate-500">
              Egen eksport av omforente bestemmelser.
            </p>
          </Link>

          <Link
            href={`/saker/${id}/omforent-spesialmerknader`}
            className="rounded-2xl border border-slate-200 p-5 transition hover:bg-slate-50 sm:p-6"
          >
            <h3 className="font-bold">Omforente spesialmerknader</h3>

            <p className="mt-2 text-sm text-slate-500">
              Egen eksport av omforente spesialmerknader.
            </p>
          </Link>

          <Link
            href={`/saker/${id}/omforent-innspill`}
            className="rounded-2xl border border-slate-200 p-5 transition hover:bg-slate-50 sm:p-6"
          >
            <h3 className="font-bold">Omforente innspill</h3>

            <p className="mt-2 text-sm text-slate-500">
              Egen eksport av omforente innspill.
            </p>
          </Link>

          <Link
            href={`/saker/${id}/omforent-arkitektur`}
            className="rounded-2xl border border-slate-200 p-5 transition hover:bg-slate-50 sm:p-6"
          >
            <h3 className="font-bold">Omforent arkitektur</h3>

            <p className="mt-2 text-sm text-slate-500">
              Egen eksport av omforent arkitektur.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}

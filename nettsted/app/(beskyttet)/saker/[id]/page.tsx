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
  { nummer: 1, tittel: "Eldre arealplaner som skal gjelde uendret" },
  { nummer: 2, tittel: "Krav om reguleringsplan" },
  { nummer: 3, tittel: "Rekkefølgekrav" },
  { nummer: 4, tittel: "Overvann, vannforsyning og avløp" },
  { nummer: 5, tittel: "Funksjonskrav til utbyggingsområder" },
  { nummer: 6, tittel: "Byggegrenser" },
  {
    nummer: 7,
    tittel: "Miljøkvalitet, natur, estetikk og landskapstilpasning",
  },
  { nummer: 8, tittel: "Kulturminner og kulturmiljø" },
  { nummer: 9, tittel: "Nærmere angitte tiltak" },
  { nummer: 10, tittel: "Forhold som skal avklares i reguleringsplan" },
  { nummer: 11, tittel: "Småhusbebyggelse" },
  { nummer: 12, tittel: "Spesielle småhusområder" },
  { nummer: 13, tittel: "Fritidsbebyggelse" },
  { nummer: 14, tittel: "Næringsformål" },
  { nummer: 15, tittel: "Andre arealformål under bebyggelse og anlegg" },
  { nummer: 16, tittel: "Grønnstruktur" },
  { nummer: 17, tittel: "LNFR" },
  { nummer: 18, tittel: "Sjø og vassdrag" },
  {
    nummer: 19,
    tittel: "Hensynssoner landskap, naturmiljø og kulturmiljø",
  },
  { nummer: 20, tittel: "Hensynssoner fare og sikring" },
  { nummer: 21, tittel: "Infrastruktur og flomveier" },
  { nummer: 22, tittel: "Felles planlegging" },
  { nummer: 23, tittel: "Båndleggingssoner" },
  { nummer: 24, tittel: "Reguleringsplaner som skal gjelde uendret" },
  { nummer: 25, tittel: "Bestemmelsesområder" },
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

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-2xl font-bold">Bestemmelser og spesialmerknader</h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Strukturen følger nytt utkast til kommuneplanens bestemmelser.
          Gjeldende bestemmelser kobles manuelt der de passer. Bestemmelse og
          spesialmerknad behandles alltid sammen.
        </p>

        <div className="mt-6 grid gap-3">
          {kapitler.map((kapittel) => (
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
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        {[
          "Innspill",
          "Arkitektur Asker",
          "Dokumentbibliotek",
          "Forhandlingslogg",
        ].map((title) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-200 p-5 sm:p-6"
          >
            <h3 className="font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Innhold og kommentarer legges inn her i neste fase.
            </p>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 p-5 sm:p-6">
        <h3 className="text-xl font-bold">Partienes vurderinger</h3>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {["Høyre", "FrP", "Venstre", "KrF"].map((parti) => (
            <div key={parti} className="rounded-xl border bg-slate-50 p-5">
              <h4 className="font-bold">{parti}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Kun brukere fra {parti} kan skrive her. Alle kan lese.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <h3 className="text-xl font-bold">Omforent forslag</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Felles forslag utarbeides her av administratorer og gruppeledere.
        </p>
      </section>
    </div>
  );
}

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
  "1. Eldre arealplaner som skal gjelde uendret",
  "2. Krav om reguleringsplan",
  "3. Rekkefølgekrav",
  "4. Overvann, vannforsyning og avløp",
  "5. Funksjonskrav til utbyggingsområder",
  "6. Byggegrenser",
  "7. Miljøkvalitet, natur, estetikk og landskapstilpasning",
  "8. Kulturminner og kulturmiljø",
  "9. Nærmere angitte tiltak",
  "10. Forhold som skal avklares i reguleringsplan",
  "11. Småhusbebyggelse",
  "12. Spesielle småhusområder",
  "13. Fritidsbebyggelse",
  "14. Næringsformål",
  "15. Andre arealformål under bebyggelse og anlegg",
  "16. Grønnstruktur",
  "17. LNFR",
  "18. Sjø og vassdrag",
  "19. Hensynssoner landskap, naturmiljø og kulturmiljø",
  "20. Hensynssoner fare og sikring",
  "21. Infrastruktur og flomveier",
  "22. Felles planlegging",
  "23. Båndleggingssoner",
  "24. Reguleringsplaner som skal gjelde uendret",
  "25. Bestemmelsesområder",
];

export default function Sak() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <a
        href="/dashboard"
        className="inline-flex text-sm text-slate-500 hover:text-slate-900"
      >
        ← Tilbake til saker
      </a>

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
          Strukturen følger kommuneplanens bestemmelser. Hvert punkt skal etter
          hvert vise gjeldende bestemmelse, forslag til ny bestemmelse,
          spesialmerknad, partienes vurderinger og omforent forslag.
        </p>

        <div className="mt-6 grid gap-3">
          {kapitler.map((kapittel) => (
            <div
              key={kapittel}
              className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-bold">{kapittel}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Gjeldende bestemmelse · Ny bestemmelse · Spesialmerknad
                  </p>
                </div>

                <span className="w-fit rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                  Ikke behandlet
                </span>
              </div>
            </div>
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

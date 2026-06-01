export type InnspillStatus =
  | "Anbefales"
  | "Anbefales delvis"
  | "Anbefales ikke"
  | "Må avklares ved regulering"
  | "Tas til orientering";

export type Innspill = {
  nummer: number;
  saksnummer: string;
  innsender: string;
  paVegneAv: string;
  kategori: string;
  omrade: string;
  gbnr: string;
  dato: string;
  tittel: string;
  innspillstekst: string;
  vurdering: string;
  konklusjon: string;
  status: InnspillStatus;
};

export type InnspillOmrade = {
  slug: string;
  navn: string;
  innspill: Innspill[];
};

export const innspillOmrader: Record<string, InnspillOmrade> = {
  heggedal: {
    slug: "heggedal",
    navn: "Heggedal",
    innspill: [
      {
        nummer: 1,
        saksnummer: "2024/2278-58",
        innsender: "Hannah Larsen",
        paVegneAv: "Maxwell Consulting Norway AS",
        kategori: "Næringsaktør",
        omrade: "Heggedal",
        gbnr: "78/160",
        dato: "19.8.2025",
        tittel: "Etablere fire nye eneboliger på eksisterende boligtomt",
        innspillstekst:
          "Dette forslaget beskriver etablering av fire nye eneboliger på eiendommen Røykenveien 306. Tomten har et totalt areal på 2 602 m², og de foreslåtte bygningene vil dekke totalt 519 m², som gir et bebygd areal (BYA) på 20%. Hver enebolig får et bruksareal fordelt på tre etasjer, inkludert innredet kjeller, dobbelgarasje og bodareal.",
        vurdering:
          "Eiendommen er uregulert og ligger utenfor prioritert vekstområde. Eiendommen ligger i et område med småhusbebyggelse.\n\nI henhold til bestemmelsene i kommuneplanens arealdel kan det i et slikt område kun skje fortetting med maksimalt to boenheter.\n\nKommuneplanen endres ikke, men et fortettingsprosjekt med flere boenheter kan eventuelt avklares gjennom en regulering.",
        konklusjon: "Må avklares ved regulering, KPA endres ikke",
        status: "Må avklares ved regulering",
      },
      {
        nummer: 2,
        saksnummer: "2024/2278-91",
        innsender: "Espen Andberg-Moum",
        paVegneAv: "MinBy Eiendom AS",
        kategori: "Næringsaktør",
        omrade: "Heggedal",
        gbnr: "77/6",
        dato: "27.8.2025",
        tittel:
          "Røykenveien 263 – endre arealformål fra frittliggende småhusbebyggelse til konsentrert bebyggelse",
        innspillstekst:
          "Ønsker å endre formål på eiendom med adresse Røykenveien 263 fra frittliggende småhusbebyggelse til formål for konsentrert bebyggelse. Hensikten er å gjennomføre et boligsosialt prosjekt.\n\nDet lokale boligområdet Løvhaugen/Trollstein består utelukkende av eneboliger og tomannsboliger. Området tilbyr ikke innstegsleiligheter for yngre mennesker eller leiligheter for eldre. Dette kan Røykenveien 263-prosjektet tilføre slik det uttrykkes viktigheten av i “Temaplan for bærekraftig utvikling”.",
        vurdering:
          "Eiendommen er regulert ned formål frittliggende småhusbebyggelse.\n\nOmrådet er støyutsatt og ligger utenfor prioritert vekstområde. Innspillet vurderes til å ikke bygge opp under eller styrke eksisterende senterstruktur. Dette er ikke en godt egnet boligtomt for tett boligutbygging.\n\nInnspillet kan på grunn av ovennevnte ikke imøtekommes.",
        konklusjon: "Anbefales ikke, KPA endres ikke",
        status: "Anbefales ikke",
      },
      {
        nummer: 3,
        saksnummer: "2024/2278-199",
        innsender: "Boxs Arkitektstudio",
        paVegneAv: "Skogveien Invest AS",
        kategori: "Næringsaktør",
        omrade: "Heggedal",
        gbnr: "78/187",
        dato: "1.9.2025",
        tittel:
          "Øvre Gjellum 30 – endre arealformål fra nåværende boligbebyggelse til framtidig boligbebyggelse",
        innspillstekst:
          "Eiendommene med gbnr. 78/89 og 78/187, med felles adkomst gbnr. 78/180, ønskes avsatt som fremtidig boligområde – mørk gul.\n\nPå hver av de to eiendommene er det i dag en enebolig, og disse ønskes erstattet med 8 kjedede eneboliger. To rekker med sammenhengende småhus. Eiendommene har i dag en eldre reguleringsplan.",
        vurdering:
          "Eiendommen ligger ikke i et prioritert vekstområde, eller på et område avsatt til framtidig boligbebyggelse.\n\nInnspillet vurderes til å ikke bygge opp under eller styrke eksisterende senterstruktur. Området anbefales ikke lagt inn som et nytt felt gjennom kommuneplan.\n\nFortetting tillates kun med to boenheter. Et fortettingsprosjekt med sammenhengende småhus, tilpasset terreng og naboskap, kan eventuelt avklares gjennom en regulering.",
        konklusjon: "Må avklares ved regulering, KPA endres ikke",
        status: "Må avklares ved regulering",
      },
      {
        nummer: 4,
        saksnummer: "2024/2278-142",
        innsender: "Hartmann Arkitekter AS",
        paVegneAv: "Sagen Eiendomsutvikling AS",
        kategori: "Næringsaktør",
        omrade: "Heggedal",
        gbnr: "78/15",
        dato: "1.9.2025",
        tittel:
          "Heggedalsveien 45 – endre fra LNFR-formål til boligformål, 40–50 boliger",
        innspillstekst:
          "Ønsker å endre arealformål for Gamle Heggedalsvei 45 fra LNFR til boligformål KSHB, tilpasset en moderat utvikling av 40–50 boliger.\n\nTomten ligger sentralt i Heggedal, 100 meter fra togstasjonen og 200 meter fra sentrum. Asfaltert gang- og sykkelvei går langs tomten og ned til togstasjonen. Dette er en stor eneboligtomt på 6,5 mål.\n\nDet anmodes om at Gamle Heggedalsvei 45 tas inn i boligbyggeprogrammet med boligformål KSHB og 40–50 enheter.",
        vurdering:
          "Ved en inkurie ligger grensen for prioritert vekstområde rundt eiendommen, slik at det kan se ut som denne eiendommen ligger innenfor et prioritert vekstområde.\n\nDenne inkurien er rettet opp i denne rulleringen av kommuneplanen.\n\nI forrige rullering ble formålet endret fra bolig til LNFR-spredt.\n\nEn omdisponering av et LNFR-spredt areal vil medføre tap av naturtyper og verdifulle skogsarealer. I tillegg er det kulturminneregistreringer på eiendommen.\n\nKommunedirektøren er av den oppfatning at innspillet er i strid med arealstrategien og de øvrige prinsipielle føringene som er lagt til grunn for kommuneplanarbeidet.",
        konklusjon: "Anbefales ikke, KPA endres ikke",
        status: "Anbefales ikke",
      },
      {
        nummer: 5,
        saksnummer: "2024/2278-149",
        innsender: "Kristoffer Rein",
        paVegneAv: "Skanska, Vimas, Hæhre og GHG",
        kategori: "Næringsaktør",
        omrade: "Heggedal",
        gbnr: "70/3",
        dato: "1.9.2025",
        tittel:
          "Endre arealformål fra andre typer bebyggelse og anlegg til massemottak",
        innspillstekst:
          "Hovedandelen av arealene som planlegges regulert til Asker Miljøparks massehåndteringsvirksomhet er i gjeldende kommuneplan avsatt til arealformål «Andre typer bebyggelse og anlegg».\n\nAsker Miljøpark har ingen ting imot at dette arealformålet også benyttes videre i den nye kommuneplanen.\n\nAsker Miljøpark ber likevel kommunen vurdere om det nye arealformålet massemottak er et mer dekkende arealformål enn andre typer anlegg for området der selve vaskeanlegget skal etableres.",
        vurdering:
          "Det pågår for tiden et reguleringsarbeid for området, som vil angi formålene for fremtidig bruk. En eventuell endring av formål i kommuneplanen vil bli gjort når formål er fastsatt gjennom reguleringsplan.",
        konklusjon: "Må avklares ved regulering, KPA endres ikke",
        status: "Må avklares ved regulering",
      },
      {
        nummer: 6,
        saksnummer: "2024/2278-38",
        innsender: "Hans M. Kleppa",
        paVegneAv: "Hans M. Kleppa",
        kategori: "Privatpersoner",
        omrade: "Heggedal",
        gbnr: "81/155",
        dato: "21.6.2025",
        tittel:
          "Skjellestadhagen – endre hensynssone 560_1 og tilsvarende andre steder der hensynssonen ikke stemmer med regulering",
        innspillstekst:
          "Innspillet gjelder hensynssone 560_1 i Skjellestadhagen, som ble lagt inn i forrige plan uten konkret vurdering. Sonen overlapper både hage og eksisterende bygg, og det foreligger ikke konsekvensutredning.\n\nAvsender fremmer innspill med krav til ny vurdering, i tråd med planprogrammet og gjeldende lovverk.",
        vurdering:
          "Hensynssone 560_1 Bevaring naturmiljø-vassdrag er lagt inn med en standard bredde i gjeldende arealplankart.\n\nFor prioriterte vekstområder er det gjort en gjennomgang av hensynssonen 560_1 slik at den stemmer bedre med dagens behov. For Skjellestadhagen er hensynssonen justert.",
        konklusjon: "Anbefales, KPA endres",
        status: "Anbefales",
      },
      {
        nummer: 7,
        saksnummer: "2024/2278-53",
        innsender: "Kristian Sandland",
        paVegneAv: "Kristian Sandland",
        kategori: "Privatpersoner",
        omrade: "Heggedal",
        gbnr: "77/2",
        dato: "8.8.2025",
        tittel: "Løvhaugen – endre fra LNFR-formål til boligformål",
        innspillstekst:
          "Ønsker endring av arealformål fra LNFR til boligformål. Tomten er på ca. 8 dekar, ligger brakk, og grenser direkte til eksisterende boligområde på Løvhaugen.\n\nForeslår 7–8 eneboligtomter med adkomstvei, grøntareal og støyskjerming, men er åpen for dialog om annen arealutforming.",
        vurdering:
          "Eiendommen ligger utenfor prioritert vekstområde og er avsatt til LNFR-formål i kommuneplanen. Ifølge NIBIO har hele eiendommen svært god jordkvalitet, med dyrkbar jord.\n\nSom følge av dette er innspillet i strid med prinsipielle føringer som er lagt til grunn for kommuneplanarbeidet, og innspillet imøtekommes ikke.",
        konklusjon: "Anbefales ikke, KPA endres ikke",
        status: "Anbefales ikke",
      },
      {
        nummer: 8,
        saksnummer: "2024/2278-150",
        innsender: "Boxs Arkitektstudio",
        paVegneAv: "Grunneier",
        kategori: "Privatpersoner",
        omrade: "Heggedal",
        gbnr: "80/3",
        dato: "31.8.2025",
        tittel: "Heggedalsveien 38 – endre fra LNFR-formål til boligformål",
        innspillstekst:
          "Eiendommen ønskes avsatt som fremtidig boligområde, mørk gul, tilsvarende som dette ble gjort for Askers eiendom HV2, med inntil 10 boenheter i småhusbebyggelse i boligprogrammet.\n\nInnsender mener at kommunens utbyggingsområde HV2 bør få justerte avgrensninger, slik at området ikke lenger inkluderer deler av de private naboeiendommene med gbnr. 80/15 og 80/84, samt at regulert adkomst fra gbnr. 80/99 bør inkluderes i HV2.",
        vurdering:
          "Eiendommen ligger i et større sammenhengende LNFR-område med viktige natur- og kulturverdier.\n\nBoligbygging her er ikke i tråd med arealstrategien, som legger opp til fortetting i prioriterte vekstområder. Av hensyn til grønnstruktur og kulturlandskap bør området derfor bevares.\n\nKommunens utbyggingsområde HV2 justeres slik at avgrensningen følger hensynssonen.\n\nEiendommen anbefales endret fra LNFR til LNFR-spredt.\n\nEndringen er konsekvensutredet.",
        konklusjon: "Anbefales delvis, KPA endres",
        status: "Anbefales delvis",
      },
      {
        nummer: 9,
        saksnummer: "2024/2278-166",
        innsender: "Ing. E. Sønsterød AS",
        paVegneAv: "Knut Vethe",
        kategori: "Privatpersoner",
        omrade: "Heggedal",
        gbnr: "77/1",
        dato: "1.9.2025",
        tittel: "Eidveien 11 – endre fra LNFR-formål til boligformål, 1,8 daa",
        innspillstekst:
          "Det foreligger i dag en reguleringsplan for Trollstein som omfatter bebyggelse på begge sider av Løvhaugens nordre del. I tillegg til dette er det tillatt fradelt to eiendommer på vestsiden av Løvhaugen, nord for reguleringsplanens begrensning.\n\nMellom eiendommene på vestsiden av Løvhaugen og tomtene som er fradelt nord for disse, ligger det et areal av eiendommen 77/1. Arealet er uregulert og angitt som LNFR i kommuneplanen.\n\nFor å styrke næringsgrunnlaget for gården ønsker eieren at 1,8 daa av gbnr. 77/1 omdisponeres fra LNFR til boligformål.",
        vurdering:
          "Eiendommen ligger utenfor prioritert vekstområde, er ubebygd og avsatt til LNFR-formål i kommuneplanen.\n\nInnspillet er derfor i strid med føringene som er lagt til grunn for kommuneplanarbeidet.\n\nInnspillet imøtekommes ikke.",
        konklusjon: "Anbefales ikke, KPA endres ikke",
        status: "Anbefales ikke",
      },
      {
        nummer: 10,
        saksnummer: "2024/2278-203",
        innsender: "Fox Property",
        paVegneAv: "Grunneier",
        kategori: "Privatpersoner",
        omrade: "Heggedal",
        gbnr: "69/14",
        dato: "10.9.2025",
        tittel:
          "Rustadveien 111 – endre fra LNFR-formål til boligformål / subsidiært offentlig og privat tjenesteyting",
        innspillstekst:
          "Ønsker at gbnr. 69/14 sin grunneiendom på ca. 3300 m², ekskludert seksjon 1 og 2, får endret formål fra LNFR med bebygde hus til boligformål.\n\nDette for å tilrettelegge for mikrohus og subsidiært til offentlig og privat tjenesteyting, for eksempel barnehage.",
        vurdering:
          "Eiendommen ligger utenfor prioritert vekstområde og er avsatt til LNFR-formål i kommuneplanen.\n\nInnspillet er derfor i strid med føringene som er lagt til grunn for kommuneplanarbeidet.\n\nInnspillet imøtekommes ikke.",
        konklusjon: "Anbefales ikke, KPA endres ikke",
        status: "Anbefales ikke",
      },
    ],
  },
};

export function hentInnspillOmrade(slug: string) {
  return innspillOmrader[slug] ?? null;
}

export function hentInnspill(slug: string, nummer: string | number) {
  const omrade = hentInnspillOmrade(slug);

  if (!omrade) {
    return null;
  }

  const innspillnummer = Number(nummer);

  if (!Number.isInteger(innspillnummer)) {
    return null;
  }

  return (
    omrade.innspill.find((innspill) => innspill.nummer === innspillnummer) ??
    null
  );
}

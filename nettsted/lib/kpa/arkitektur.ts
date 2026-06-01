export type ArkitekturKapittel = {
  slug: string;
  tittel: string;
  ingress: string;
  tekst: string;
};

export const arkitekturKapitler: Record<string, ArkitekturKapittel> = {
  "en-ambisios-kommune": {
    slug: "en-ambisios-kommune",
    tittel: "En ambisiøs kommune",
    ingress:
      "Arkitektur er samfunnsutvikling og et verktøy for å utvikle gode steder.",
    tekst: `Arkitektur og stedsutvikling handler om å gi form til omgivelsene, til bygg, uterom, tettsteder, anlegg og landskap, og samspillet mellom disse. Hvordan vi opplever og bruker stedene rundt oss påvirker livskvalitet, samhandlingen mellom mennesker og følelsen av å høre til.

Utviklingen av det fysiske miljøet skal bidra til gode hverdagsliv og robuste lokalsamfunn, ikke bare løse umiddelbare funksjonsbehov. Arkitektur er derfor ikke bare et spørsmål om fasader og estetikk, men om hvordan bidra til livskvalitet for Askers innbyggere i dag, og for framtidige generasjoner.

Asker kommune har høye forventninger til at arkitektur og stedsutvikling brukes aktivt for å utvikle askersamfunnet. Med en egen strategi for arkitektur og stedsutvikling ønsker kommunen å tydeliggjøre ambisjonene for vårt felles bygde miljø.

Det som planlegges og bygges i Asker skal gi merverdi og bidra til å skape gode steder å leve og arbeide, både i dag og i fremtiden.`,
  },

  attraktiv: {
    slug: "attraktiv",
    tittel: "Attraktiv",
    ingress:
      "Helhetlig utvikling med merverdi og vakker arkitektur med særpreg.",
    tekst: `Asker kommune skal ha bygg, uterom og steder som er vakre og godt utformet, med god balanse mellom utvikling, fortetting og stedenes særegne kvaliteter, slik at innovasjon, felles historie, identitet og tilhørighet styrkes og gir økt verdi til innbyggere og lokalsamfunn.

Kvaliteten på omgivelsene betyr mye for hvordan vi opplever, bruker og knytter oss til bygninger og steder over tid. Når mennesker opplever steder som gode å være i, styrkes tilhørigheten til lokalsamfunnet.

Arkitektonisk kvalitet appellerer til sansene, og oppstår i samspillet mellom estetikk, funksjon og tekniske løsninger. Arkitekturen har høy estetisk kvalitet når den er gjennomarbeidet, tiltalende og meningsfull i sin sammenheng.

Dette får vi til ved:
1. Helhetlig utvikling med merverdi
2. Vakker arkitektur med særpreg`,
  },

  ansvarlig: {
    slug: "ansvarlig",
    tittel: "Ansvarlig",
    ingress:
      "Omtanke for natur, blågrønne verdier, kvalitet og varige valg.",
    tekst: `Asker bruker blågrønne kvaliteter og løsninger aktivt i arkitektur og stedsforming, og viser omtanke for natur, klima, miljø og naturens ressurser i et bærekraftig og langsiktig perspektiv.

Ansvarlig arkitektur og stedsutvikling betyr at vi forvalter det fysiske miljøet med respekt, og med omtanke for framtidige generasjoner. Vi skal minske presset på ressurser og arealer, håndtere klimaendringene og sikre de opplevelseskvalitetene og mulighetene for aktivitet som natur og grønne lunger gir.

Vi må bygge mindre nytt, transformere og gjenbruke mer, og utforske hvordan eksisterende ressurser kan brukes bedre. Terskelen for å rive må være høy. De kvadratmeterne som ikke bygges har minst fotavtrykk.

Dette får vi til med:
1. Kvalitet og varige valg
2. Omtanke for blågrønne verdier`,
  },

  "for-alle": {
    slug: "for-alle",
    tittel: "For alle",
    ingress: "Gode boliger, nabolag og aktive liv i fellesskap.",
    tekst: `Asker har bygg, uterom og steder som styrker livskvalitet og tilhørighet. Arkitekturen stimulerer til sambruk og fysisk aktivitet, og gir alle mulighet til å være aktive deltagere i fellesskapet.

Ambisjonen om attraktiv og ansvarlig arkitektur og stedsutvikling skal komme alle til gode. Asker skal ha omgivelser der alle føler seg velkomne. Innbyggernes behov, sanselige opplevelser og mulighet for deltakelse skal stå i sentrum.

Universell utforming, tilgjengelighet og sosial inkludering er grunnleggende premisser, ikke tilleggskvaliteter. Med riktige grep kan det bygde miljøet forebygge utenforskap, fremme folkehelse og være kriminalitetsforebyggende.

Dette får vi til med:
1. Gode boliger og nabolag
2. Aktive liv i fellesskap`,
  },

  "urbane-omrader": {
    slug: "urbane-omrader",
    tittel: "Urbane områder",
    ingress: "Prinsipper for utvikling av urbane områder.",
    tekst: `Urbane områder omfatter kommunens sentrumsområder, lokalsentre, nærsentre og transformasjonsområder.

I sentrumsområder bidrar bymessig tetthet og funksjonsblanding til attraktivitet. Sosiale møteplasser, grønn mobilitet og tjenestetilbud må tilpasses lokale behov i hvert enkelt tettsted.

Prinsipper:
A.1. Utvikle tydelige og levende sentrumsområder
A.2. Videreføre karakteristiske materialer og farger
A.3. Knytte byrom og nabolag sammen med trygge og effektive forbindelser
A.4. Motvirke harde flater ved å innpasse blå og grønne kvaliteter
A.5. Kombinere høyere arealutnyttelse med gode miljø- og bokvaliteter
A.6. Unngå lukkede førsteetasjer og boligprosjekter uten kontakt med bakkeplan`,
  },

  smahusomradene: {
    slug: "smahusomradene",
    tittel: "Småhusområdene",
    ingress: "Prinsipper for utvikling og tilpasning i småhusområdene.",
    tekst: `Asker kommune har store områder med eneboliger, tomannsboliger og annen konsentrert småhusbebyggelse. Lav til moderat utnyttelse og store felles eller private uteområder gir områdene et sammenhengende og grønt preg.

Private hager, eldre vegetasjon og grønne korridorer gir områdene identitet og sikrer biologisk mangfold.

Prinsipper:
B.1. Videreføre småhusområdenes grønne preg
B.2. Tilpasse nye tiltak til eksisterende bebyggelsesstruktur
B.3. Begrense terrenginngrep og bevare landskapstrekk
B.4. Sikre gode overganger mellom nytt og eksisterende
B.5. Ta vare på hager, trær og grønne kvaliteter`,
  },

  kulturmiljoer: {
    slug: "kulturmiljoer",
    tittel: "Kulturmiljøer",
    ingress: "Prinsipper for utvikling med hensyn til kulturmiljøer.",
    tekst: `Kulturmiljøer, kulturminner og historiske landskap er viktige deler av Askers identitet. De gir steder tidsdybde, særpreg og gjenkjennelighet.

Ny utvikling i eller nær kulturmiljøer må bygge på kunnskap om stedets historie, struktur, materialbruk, landskap og skala.

Prinsipper:
C.1. Bruke kulturhistoriske kvaliteter som ressurs
C.2. Tilpasse ny bebyggelse til historisk struktur og skala
C.3. Sikre lesbarhet mellom gammelt og nytt
C.4. Ta vare på viktige landskapstrekk og siktlinjer
C.5. Videreføre materialer, detaljer og stedlig karakter der det er relevant`,
  },

  kysten: {
    slug: "kysten",
    tittel: "Kysten",
    ingress: "Prinsipper for arkitektur og stedsforming langs kysten.",
    tekst: `Kysten er en av Askers viktigste landskaps- og identitetsbærere. Strandsonen, sjøen, øyene, bryggemiljøene og kystlandskapet har stor allmenn verdi.

Utvikling langs kysten må skje med særlig omtanke for landskap, natur, allmennhetens tilgang og eksisterende kulturmiljøer.

Prinsipper:
D.1. Tilpasse tiltak til kystlandskapet
D.2. Sikre allmennhetens tilgang og opplevelse av sjøen
D.3. Bevare kystens natur- og kulturmiljøverdier
D.4. Begrense terrenginngrep og dominerende fjernvirkning
D.5. Bruke materialer og farger som spiller sammen med kystmiljøet`,
  },

  landbruksomradene: {
    slug: "landbruksomradene",
    tittel: "Landbruksområdene",
    ingress: "Prinsipper for utvikling i landbruksområdene.",
    tekst: `Landbruksområdene er viktige for matproduksjon, kulturlandskap, naturmangfold og Askers identitet.

Utvikling i landbruksområdene må skje på landskapets premisser og med respekt for gårdsstrukturer, jordbruksarealer, vegetasjon, kulturminner og åpne landskapsrom.

Prinsipper:
E.1. Ta vare på jordbrukslandskapets åpne karakter
E.2. Tilpasse nye tiltak til gårdsstruktur og landskap
E.3. Begrense nedbygging av dyrka og dyrkbar mark
E.4. Ivareta vegetasjon, tun, alléer og landskapselementer
E.5. Sikre at nye bygg underordner seg landskap og eksisterende bygningsmiljø`,
  },
};

export function hentArkitekturKapittel(slug: string) {
  return arkitekturKapitler[slug] ?? null;
}

export const arkitekturKapittelListe = Object.values(arkitekturKapitler);

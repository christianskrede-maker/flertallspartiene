import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { kpaKapitler } from "../../../../data/kpaKapitler";
import { kpaInnhold } from "../../../../data/kpaInnhold";

export const runtime = "nodejs";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type KommentarMedBruker = {
  id: string;
  sak_id: string;
  kapittel: string;
  delpunkt: string;
  tekstutdrag: string | null;
  kommentar: string;
  telefon: string;
  forelder_id: string | null;
  opprettet: string;
  navn: string;
  parti: string;
  partiNavn: string;
};

type OmforentInnspill = {
  id: number;
  sak_id: string;
  kapittel: string;
  delpunkt: string;
  type: "bestemmelse" | "spesialmerknad";
  tekst: string | null;
  sist_endret: string | null;
};

function tekstTilAvsnitt(tekst: string | null | undefined) {
  if (!tekst || !tekst.trim()) {
    return [
      new Paragraph({
        children: [
          new TextRun({
            text: "Ikke lagt inn.",
            italics: true,
          }),
        ],
      }),
    ];
  }

  return tekst
    .trim()
    .split("\n")
    .map(
      (linje) =>
        new Paragraph({
          children: [
            new TextRun({
              text: linje.trim(),
            }),
          ],
        })
    );
}

function tomLinje() {
  return new Paragraph({
    children: [new TextRun({ text: "" })],
  });
}

function filnavnTrygt(tekst: string) {
  return tekst
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function visningsnavnMedParti(kommentar: KommentarMedBruker) {
  if (kommentar.parti) {
    return `${kommentar.navn} (${kommentar.parti})`;
  }

  if (kommentar.partiNavn) {
    return `${kommentar.navn} (${kommentar.partiNavn})`;
  }

  return kommentar.navn;
}

function hentOmforentTekst(
  omforenteInnspill: OmforentInnspill[],
  delpunkt: string,
  type: "bestemmelse" | "spesialmerknad",
  fallbackTekst: string
) {
  const lagret = omforenteInnspill.find(
    (innspill) => innspill.delpunkt === delpunkt && innspill.type === type
  );

  if (lagret?.tekst?.trim()) {
    return lagret.tekst;
  }

  return fallbackTekst;
}

async function hentKommentarerForKapittel(
  sakId: string,
  kapittel: string
): Promise<KommentarMedBruker[]> {
  const { data: kommentarer } = await supabaseAdmin
    .from("kommentarer")
    .select("*")
    .eq("sak_id", sakId)
    .eq("kapittel", kapittel)
    .order("opprettet", { ascending: true });

  if (!kommentarer || kommentarer.length === 0) {
    return [];
  }

  const telefoner = Array.from(
    new Set(
      kommentarer
        .map((kommentar) => kommentar.telefon)
        .filter((telefon): telefon is string => Boolean(telefon))
    )
  );

  const { data: brukere } = await supabaseAdmin
    .from("brukere")
    .select("navn, telefon, parti_id")
    .in("telefon", telefoner);

  const partiIder = Array.from(
    new Set(
      (brukere ?? [])
        .map((bruker) => bruker.parti_id)
        .filter((partiId): partiId is number => Boolean(partiId))
    )
  );

  const { data: partier } =
    partiIder.length > 0
      ? await supabaseAdmin.from("partier").select("*").in("id", partiIder)
      : { data: [] };

  return kommentarer.map((kommentar) => {
    const bruker = brukere?.find((item) => item.telefon === kommentar.telefon);
    const parti = partier?.find((item) => item.id === bruker?.parti_id);

    return {
      ...kommentar,
      navn: bruker?.navn ?? kommentar.telefon,
      parti: parti?.forkortelse ?? "",
      partiNavn: parti?.navn ?? "",
    };
  });
}

async function hentOmforenteInnspillForKapittel(
  sakId: string,
  kapittel: string
): Promise<OmforentInnspill[]> {
  const { data } = await supabaseAdmin
    .from("omforent_innspill")
    .select("*")
    .eq("sak_id", sakId)
    .eq("kapittel", kapittel);

  return (data ?? []) as OmforentInnspill[];
}

export async function GET(
  _request: Request,
  context: {
    params: Promise<{
      id: string;
      kapittel: string;
    }>;
  }
) {
  const { id, kapittel } = await context.params;

  const valgtKapittel =
    kpaKapitler.find((item) => item.nummer === kapittel) ?? null;

  const tittel = valgtKapittel
    ? `${valgtKapittel.nummer}. ${valgtKapittel.tittel}`
    : `Kapittel ${kapittel}`;

  const innhold = kpaInnhold[kapittel as keyof typeof kpaInnhold] ?? null;

  if (!innhold) {
    return NextResponse.json(
      { error: "Fant ikke innhold for dette kapittelet." },
      { status: 404 }
    );
  }

  const [alleKommentarer, omforenteInnspill] = await Promise.all([
    hentKommentarerForKapittel(id, kapittel),
    hentOmforenteInnspillForKapittel(id, kapittel),
  ]);

  const dokumentInnhold: Paragraph[] = [
    new Paragraph({
      text: tittel,
      heading: HeadingLevel.TITLE,
    }),
    tomLinje(),
    new Paragraph({
      children: [
        new TextRun({
          text: "Kommuneplanens arealdel",
          bold: true,
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Eksportert: ${new Date().toLocaleDateString("nb-NO")}`,
        }),
      ],
    }),
    tomLinje(),
  ];

  for (const del of innhold.deler) {
    const omforentBestemmelse = hentOmforentTekst(
      omforenteInnspill,
      del.nummer,
      "bestemmelse",
      del.bestemmelse
    );

    const omforentSpesialmerknad = hentOmforentTekst(
      omforenteInnspill,
      del.nummer,
      "spesialmerknad",
      del.spesialmerknad
    );

    const kommentarerForDelpunkt = alleKommentarer.filter(
      (kommentar) => kommentar.delpunkt === del.nummer
    );

    const hovedKommentarer = kommentarerForDelpunkt.filter(
      (kommentar) => !kommentar.forelder_id
    );

    dokumentInnhold.push(
      new Paragraph({
        text: `${del.nummer} ${del.tittel}`,
        heading: HeadingLevel.HEADING_1,
      }),
      tomLinje(),
      new Paragraph({
        text: "Omforent forslag – bestemmelse",
        heading: HeadingLevel.HEADING_2,
      }),
      ...tekstTilAvsnitt(omforentBestemmelse),
      tomLinje(),
      new Paragraph({
        text: "Omforent forslag – spesialmerknad",
        heading: HeadingLevel.HEADING_2,
      }),
      ...tekstTilAvsnitt(omforentSpesialmerknad),
      tomLinje(),
      new Paragraph({
        text: "Politiske merknader",
        heading: HeadingLevel.HEADING_2,
      })
    );

    if (hovedKommentarer.length === 0) {
      dokumentInnhold.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Ingen merknader er lagret for dette delpunktet.",
              italics: true,
            }),
          ],
        })
      );
    }

    hovedKommentarer.forEach((kommentar, index) => {
      const svarTilMerknad = kommentarerForDelpunkt.filter(
        (svar) => svar.forelder_id === kommentar.id
      );

      dokumentInnhold.push(
        tomLinje(),
        new Paragraph({
          text: `Merknad ${index + 1}`,
          heading: HeadingLevel.HEADING_3,
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Parti: ",
              bold: true,
            }),
            new TextRun({
              text:
                kommentar.partiNavn ||
                kommentar.parti ||
                "Ikke oppgitt parti",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Navn: ",
              bold: true,
            }),
            new TextRun({
              text: kommentar.navn,
            }),
          ],
        })
      );

      if (kommentar.tekstutdrag?.trim()) {
        dokumentInnhold.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "Tekstutdrag: ",
                bold: true,
              }),
              new TextRun({
                text: kommentar.tekstutdrag.trim(),
                italics: true,
              }),
            ],
          })
        );
      }

      dokumentInnhold.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Merknad:",
              bold: true,
            }),
          ],
        }),
        ...tekstTilAvsnitt(kommentar.kommentar)
      );

      if (svarTilMerknad.length > 0) {
        dokumentInnhold.push(
          tomLinje(),
          new Paragraph({
            children: [
              new TextRun({
                text: "Kommentarer til merknaden:",
                bold: true,
              }),
            ],
          })
        );

        svarTilMerknad.forEach((svar) => {
          dokumentInnhold.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `- ${visningsnavnMedParti(svar)}: `,
                  bold: true,
                }),
                new TextRun({
                  text: svar.kommentar,
                }),
              ],
            })
          );
        });
      }
    });

    dokumentInnhold.push(tomLinje());
  }

  const document = new Document({
    sections: [
      {
        children: dokumentInnhold,
      },
    ],
  });

  const buffer = await Packer.toBuffer(document);
  const body = new Uint8Array(buffer);

  const filename = `${filnavnTrygt(tittel)}.docx`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { kpaKapitler } from "../../data/kpaKapitler";
import { kpaInnhold } from "../../data/kpaInnhold";

export const runtime = "nodejs";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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

function hentOmforentTekst(
  omforenteInnspill: OmforentInnspill[],
  kapittel: string,
  delpunkt: string,
  type: "bestemmelse" | "spesialmerknad",
  fallbackTekst: string
) {
  const lagret = omforenteInnspill.find(
    (innspill) =>
      innspill.kapittel === kapittel &&
      innspill.delpunkt === delpunkt &&
      innspill.type === type
  );

  if (lagret?.tekst?.trim()) {
    return lagret.tekst;
  }

  return fallbackTekst;
}

async function hentOmforenteInnspillForSak(
  sakId: string
): Promise<OmforentInnspill[]> {
  const { data } = await supabaseAdmin
    .from("omforent_innspill")
    .select("*")
    .eq("sak_id", sakId);

  return (data ?? []) as OmforentInnspill[];
}

export async function GET(
  _request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await context.params;

  const omforenteInnspill = await hentOmforenteInnspillForSak(id);

  const dokumentInnhold: Paragraph[] = [
    new Paragraph({
      text: "Kommuneplanens arealdel",
      heading: HeadingLevel.TITLE,
    }),
    tomLinje(),
    new Paragraph({
      children: [
        new TextRun({
          text: "Flertallspartiene Asker",
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

  for (const kapittelInfo of kpaKapitler) {
    const kapittelnummer = kapittelInfo.nummer;
    const innhold =
      kpaInnhold[kapittelnummer as keyof typeof kpaInnhold] ?? null;

    if (!innhold) {
      continue;
    }

    dokumentInnhold.push(
      new Paragraph({
        text: `${kapittelInfo.nummer}. ${kapittelInfo.tittel}`,
        heading: HeadingLevel.HEADING_1,
      }),
      tomLinje()
    );

    for (const del of innhold.deler) {
      const omforentBestemmelse = hentOmforentTekst(
        omforenteInnspill,
        kapittelnummer,
        del.nummer,
        "bestemmelse",
        del.bestemmelse
      );

      const omforentSpesialmerknad = hentOmforentTekst(
        omforenteInnspill,
        kapittelnummer,
        del.nummer,
        "spesialmerknad",
        del.spesialmerknad
      );

      dokumentInnhold.push(
        new Paragraph({
          text: `${del.nummer} ${del.tittel}`,
          heading: HeadingLevel.HEADING_2,
        }),
        tomLinje(),
        new Paragraph({
          text: "Omforent forslag – bestemmelse",
          heading: HeadingLevel.HEADING_3,
        }),
        ...tekstTilAvsnitt(omforentBestemmelse),
        tomLinje(),
        new Paragraph({
          text: "Omforent forslag – spesialmerknad",
          heading: HeadingLevel.HEADING_3,
        }),
        ...tekstTilAvsnitt(omforentSpesialmerknad),
        tomLinje()
      );
    }

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

  const filename = `${filnavnTrygt("kommuneplanens-arealdel-omforent-forslag")}.docx`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

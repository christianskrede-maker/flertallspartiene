import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import { kpaKapitler } from "../../../data/kpaKapitler";
import { kpaInnhold } from "../../../data/kpaInnhold";

export const runtime = "nodejs";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type OmforentRad = {
  id: string;
  sak_id: string;
  kapittel: string;
  delpunkt: string;
  type: string;
  tekst: string | null;
  sist_endret: string | null;
};

function tekstTilAvsnitt(tekst: string | null | undefined) {
  if (!tekst || !tekst.trim()) {
    return [
      new Paragraph({
        children: [new TextRun({ text: "Ikke lagt inn.", italics: true })],
      }),
    ];
  }

  return tekst
    .trim()
    .split("\n")
    .map(
      (linje) =>
        new Paragraph({
          children: [new TextRun({ text: linje.trim() })],
        })
    );
}

function tomLinje() {
  return new Paragraph({
    children: [new TextRun({ text: "" })],
  });
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

  const { data } = await supabaseAdmin
    .from("omforent_innspill")
    .select("*")
    .eq("sak_id", id)
    .eq("type", "spesialmerknad");

  const lagrede = (data ?? []) as OmforentRad[];

  const alleSpesialmerknader = kpaKapitler.flatMap((kapittel) => {
    const innhold = kpaInnhold[kapittel.nummer as keyof typeof kpaInnhold];

    return (innhold?.deler ?? []).map((del) => {
      const lagret =
        lagrede.find(
          (rad) =>
            rad.kapittel === kapittel.nummer && rad.delpunkt === del.nummer
        ) ?? null;

      return {
        kapittel,
        del,
        tekst: lagret?.tekst?.trim() || del.spesialmerknad?.trim() || "",
        erLagret: Boolean(lagret?.tekst?.trim()),
      };
    });
  });

  const dokumentInnhold: Paragraph[] = [
    new Paragraph({
      text: "Omforente spesialmerknader",
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

  for (const item of alleSpesialmerknader) {
    dokumentInnhold.push(
      new Paragraph({
        text: `${item.del.nummer} ${item.del.tittel}`,
        heading: HeadingLevel.HEADING_1,
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: `Kapittel ${item.kapittel.nummer}: ${item.kapittel.tittel}`,
            bold: true,
          }),
        ],
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: item.erLagret
              ? "Omforent tekst"
              : "Kommunedirektørens forslag brukt som base",
            bold: true,
          }),
        ],
      }),

      ...tekstTilAvsnitt(item.tekst),

      tomLinje()
    );
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

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition":
        'attachment; filename="omforente-spesialmerknader.docx"',
    },
  });
}

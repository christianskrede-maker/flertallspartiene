import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import { hentInnspill } from "@/lib/kpa/innspill";

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

function hentOmradeFraKapittel(kapittel: string) {
  if (!kapittel.startsWith("innspill-")) return "";
  return kapittel.replace("innspill-", "");
}

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
  return new Paragraph({ children: [new TextRun({ text: "" })] });
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
    .eq("type", "innspill")
    .order("kapittel", { ascending: true })
    .order("delpunkt", { ascending: true });

  const rader = (data ?? []) as OmforentRad[];

  const dokumentInnhold: Paragraph[] = [
    new Paragraph({
      text: "Omforente innspill",
      heading: HeadingLevel.TITLE,
    }),
    tomLinje(),
    new Paragraph({
      children: [new TextRun({ text: "Kommuneplanens arealdel", bold: true })],
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

  if (rader.length === 0) {
    dokumentInnhold.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "Ingen omforente innspill er lagret ennå.",
            italics: true,
          }),
        ],
      })
    );
  }

  for (const rad of rader) {
    const omrade = hentOmradeFraKapittel(rad.kapittel);
    const innspill = hentInnspill(omrade, rad.delpunkt);

    dokumentInnhold.push(
      new Paragraph({
        text: innspill
          ? `${innspill.omrade} – innspill ${innspill.nummer}`
          : `${rad.kapittel} / ${rad.delpunkt}`,
        heading: HeadingLevel.HEADING_1,
      }),
      new Paragraph({
        text: innspill?.tittel ?? "Omforent innspill",
        heading: HeadingLevel.HEADING_2,
      }),
      ...tekstTilAvsnitt(rad.tekst),
      tomLinje()
    );
  }

  const document = new Document({
    sections: [{ children: dokumentInnhold }],
  });

  const buffer = await Packer.toBuffer(document);
  const body = new Uint8Array(buffer);

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="omforente-innspill.docx"`,
    },
  });
}

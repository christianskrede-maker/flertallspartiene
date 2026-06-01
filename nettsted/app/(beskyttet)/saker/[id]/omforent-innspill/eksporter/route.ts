import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import { innspillOmrader } from "@/lib/kpa/innspill";

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
    .eq("type", "innspill");

  const lagrede = (data ?? []) as OmforentRad[];

  const alleInnspill = Object.values(innspillOmrader).flatMap((omrade) =>
    omrade.innspill.map((innspill) => {
      const kapittel = `innspill-${omrade.slug}`;
      const delpunkt = String(innspill.nummer);

      const lagret =
        lagrede.find(
          (rad) => rad.kapittel === kapittel && rad.delpunkt === delpunkt
        ) ?? null;

      return {
        omrade,
        innspill,
        tekst:
          lagret?.tekst?.trim() ||
          innspill.konklusjon?.trim() ||
          innspill.vurdering?.trim() ||
          "",
        erLagret: Boolean(lagret?.tekst?.trim()),
      };
    })
  );

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

  for (const item of alleInnspill) {
    dokumentInnhold.push(
      new Paragraph({
        text: `${item.innspill.omrade} – innspill ${item.innspill.nummer}`,
        heading: HeadingLevel.HEADING_1,
      }),
      new Paragraph({
        text: item.innspill.tittel,
        heading: HeadingLevel.HEADING_2,
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: item.erLagret
              ? "Omforent tekst"
              : "Kommunedirektørens forslag som base",
            bold: true,
          }),
        ],
      }),
      ...tekstTilAvsnitt(item.tekst),
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

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import { arkitekturKapittelListe } from "@/lib/kpa/arkitektur";

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

type KommentarRad = {
  id: string;
  sak_id: string;
  kapittel: string;
  delpunkt: string;
  tekstutdrag: string | null;
  kommentar: string | null;
  telefon: string | null;
  forelder_id: string | null;
  opprettet: string | null;
};

function tekstTilAvsnitt(tekst: string | null | undefined) {
  if (!tekst || !tekst.trim()) {
    return [
      new Paragraph({
        children: [new TextRun({ text: "Ikke skrevet ennå.", italics: true })],
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
  const dbSakId = id === "kpa" ? "1" : id;

  const { data: omforentData } = await supabaseAdmin
    .from("omforent_innspill")
    .select("*")
    .eq("sak_id", dbSakId)
    .eq("kapittel", "arkitektur")
    .eq("type", "arkitektur");

  const { data: kommentarerData } = await supabaseAdmin
    .from("kommentarer")
    .select("*")
    .eq("sak_id", id)
    .eq("kapittel", "arkitektur")
    .order("opprettet", { ascending: true });

  const lagrede = (omforentData ?? []) as OmforentRad[];
  const kommentarer = (kommentarerData ?? []) as KommentarRad[];

  const telefoner = Array.from(
    new Set(
      kommentarer
        .map((kommentar) => kommentar.telefon)
        .filter((telefon): telefon is string => Boolean(telefon))
    )
  );

  const { data: brukereData } =
    telefoner.length > 0
      ? await supabaseAdmin
          .from("brukere")
          .select("navn, telefon, parti_id")
          .in("telefon", telefoner)
      : { data: [] };

  const partiIder = Array.from(
    new Set((brukereData ?? []).map((bruker) => bruker.parti_id))
  );

  const { data: partierData } =
    partiIder.length > 0
      ? await supabaseAdmin
          .from("partier")
          .select("id, navn, forkortelse")
          .in("id", partiIder)
      : { data: [] };

  const alleKapitler = arkitekturKapittelListe.map((kapittel) => {
    const lagret =
      lagrede.find((rad) => rad.delpunkt === kapittel.slug) ?? null;

    const kapittelKommentarer = kommentarer.filter(
      (kommentar) => kommentar.delpunkt === kapittel.slug
    );

    return {
      kapittel,
      tekst: lagret?.tekst?.trim() ?? "",
      erLagret: Boolean(lagret?.tekst?.trim()),
      kommentarer: kapittelKommentarer,
    };
  });

  const dokumentInnhold: Paragraph[] = [
    new Paragraph({
      text: "Omforent arkitektur med kommentarer",
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

  for (const item of alleKapitler) {
    dokumentInnhold.push(
      new Paragraph({
        text: item.kapittel.tittel,
        heading: HeadingLevel.HEADING_1,
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: item.erLagret
              ? "Omforent tekst / arbeidsutkast"
              : "Ingen omforent tekst lagret",
            bold: true,
          }),
        ],
      }),
      ...tekstTilAvsnitt(item.tekst),
      tomLinje(),
      new Paragraph({
        children: [new TextRun({ text: "Kommentarer", bold: true })],
      })
    );

    if (item.kommentarer.length === 0) {
      dokumentInnhold.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Ingen kommentarer registrert.",
              italics: true,
            }),
          ],
        }),
        tomLinje()
      );
    } else {
      for (const kommentar of item.kommentarer) {
        const bruker = (brukereData ?? []).find(
          (b) => b.telefon === kommentar.telefon
        );

        const parti = (partierData ?? []).find(
          (p) => p.id === bruker?.parti_id
        );

        dokumentInnhold.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${parti?.forkortelse ?? "Parti"} – ${
                  bruker?.navn ?? kommentar.telefon ?? "Ukjent"
                }`,
                bold: true,
              }),
            ],
          })
        );

        if (kommentar.tekstutdrag?.trim()) {
          dokumentInnhold.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `Tekstutdrag: ${kommentar.tekstutdrag.trim()}`,
                  italics: true,
                }),
              ],
            })
          );
        }

        dokumentInnhold.push(
          ...tekstTilAvsnitt(kommentar.kommentar),
          tomLinje()
        );
      }
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

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition":
        'attachment; filename="omforent-arkitektur-med-kommentarer.docx"',
    },
  });
}

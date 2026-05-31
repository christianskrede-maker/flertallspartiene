"use client";

import { useState } from "react";
import { leggTilKommentar } from "../../../../../actions/kommentarer";

type KommenterTekstProps = {
  sakId: string;
  kapittel: string;
  delpunkt: string;
  tekst: string;
  label: string;
  markeringer?: string[];
};

function normaliserTekst(tekst: string) {
  return tekst.replace(/\s+/g, " ").trim();
}

function lagIdFraTekst(tekst: string) {
  return normaliserTekst(tekst)
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function finnMarkeringMedFleksibleMellomrom(tekst: string, markering: string) {
  const normalisertMarkering = normaliserTekst(markering);

  if (!normalisertMarkering) {
    return null;
  }

  const ord = normalisertMarkering
    .split(" ")
    .map((ord) => ord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  const regex = new RegExp(ord.join("\\s+"), "i");
  const match = tekst.match(regex);

  if (!match || match.index === undefined) {
    return null;
  }

  return {
    start: match.index,
    slutt: match.index + match[0].length,
    tekst: match[0],
    originalMarkering: markering,
  };
}

function delOppTekst(tekst: string, markeringer: string[]) {
  const funn = markeringer
    .map((markering) => finnMarkeringMedFleksibleMellomrom(tekst, markering))
    .filter(
      (
        markering
      ): markering is {
        start: number;
        slutt: number;
        tekst: string;
        originalMarkering: string;
      } => Boolean(markering)
    )
    .sort((a, b) => a.start - b.start || b.tekst.length - a.tekst.length);

  const utenOverlapp = funn.reduce<
    {
      start: number;
      slutt: number;
      tekst: string;
      originalMarkering: string;
    }[]
  >((liste, markering) => {
    const overlapper = liste.some(
      (eksisterende) =>
        markering.start < eksisterende.slutt &&
        markering.slutt > eksisterende.start
    );

    if (!overlapper) {
      liste.push(markering);
    }

    return liste;
  }, []);

  if (utenOverlapp.length === 0) {
    return [{ tekst, markert: false, originalMarkering: "" }];
  }

  const deler: {
    tekst: string;
    markert: boolean;
    originalMarkering: string;
  }[] = [];

  let posisjon = 0;

  for (const markering of utenOverlapp) {
    if (markering.start > posisjon) {
      deler.push({
        tekst: tekst.slice(posisjon, markering.start),
        markert: false,
        originalMarkering: "",
      });
    }

    deler.push({
      tekst: tekst.slice(markering.start, markering.slutt),
      markert: true,
      originalMarkering: markering.originalMarkering,
    });

    posisjon = markering.slutt;
  }

  if (posisjon < tekst.length) {
    deler.push({
      tekst: tekst.slice(posisjon),
      markert: false,
      originalMarkering: "",
    });
  }

  return deler;
}

export default function KommenterTekst({
  sakId,
  kapittel,
  delpunkt,
  tekst,
  label,
  markeringer = [],
}: KommenterTekstProps) {
  const [valgtTekst, setValgtTekst] = useState("");

  function hentMarkertTekst() {
    const selection = window.getSelection();
    const valgt = selection?.toString().trim() ?? "";

    if (valgt.length > 0) {
      setValgtTekst(valgt);
    }
  }

  function gaTilKommentar(tekstutdrag: string) {
    const id = lagIdFraTekst(tekstutdrag);
    const element = document.getElementById(`kommentar-${id}`);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      element.classList.add("ring-4", "ring-yellow-300");

      window.setTimeout(() => {
        element.classList.remove("ring-4", "ring-yellow-300");
      }, 2200);
    }
  }

  const tekstDeler = delOppTekst(tekst, markeringer);

  return (
    <div>
      <div
        onMouseUp={hentMarkertTekst}
        onTouchEnd={hentMarkertTekst}
        className="mt-4 whitespace-pre-wrap text-sm leading-7"
      >
        {tekstDeler.map((del, index) =>
          del.markert ? (
            <button
              key={`${del.tekst}-${index}`}
              type="button"
              onClick={() => gaTilKommentar(del.originalMarkering)}
              className="rounded bg-yellow-200 px-1 text-left hover:bg-yellow-300"
              title="Klikk for å gå til kommentar"
            >
              {del.tekst}
            </button>
          ) : (
            <span key={`${del.tekst}-${index}`}>{del.tekst}</span>
          )
        )}
      </div>

      {valgtTekst ? (
        <form
          action={leggTilKommentar}
          className="mt-4 rounded-xl border border-slate-300 bg-slate-50 p-4"
        >
          <input type="hidden" name="sak_id" value={sakId} />
          <input type="hidden" name="kapittel" value={kapittel} />
          <input type="hidden" name="delpunkt" value={delpunkt} />
          <input type="hidden" name="tekstutdrag" value={valgtTekst} />

          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Kommenter valgt tekst fra {label}
          </p>

          <div className="mt-2 rounded-lg border-l-4 border-slate-300 bg-white p-3">
            <p className="whitespace-pre-wrap text-sm italic text-slate-700">
              {valgtTekst}
            </p>
          </div>

          <textarea
            name="kommentar"
            required
            rows={4}
            placeholder="Skriv kommentar til valgt tekst..."
            className="mt-3 w-full rounded-xl border border-slate-300 p-3 text-sm"
          />

          <div className="mt-3 flex gap-2">
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
              Lagre kommentar
            </button>

            <button
              type="button"
              onClick={() => setValgtTekst("")}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Avbryt
            </button>
          </div>
        </form>
      ) : (
        <p className="mt-3 text-xs text-slate-500">
          Marker tekst for å kommentere akkurat den delen. Gule markeringer kan
          klikkes for å gå til kommentaren.
        </p>
      )}
    </div>
  );
}

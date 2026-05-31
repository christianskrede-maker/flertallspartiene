"use client";

import { useState } from "react";
import { leggTilKommentar } from "../../../../../actions/kommentarer";

type KommenterTekstProps = {
  sakId: string;
  kapittel: string;
  delpunkt: string;
  tekst: string;
  label: string;
};

export default function KommenterTekst({
  sakId,
  kapittel,
  delpunkt,
  tekst,
  label,
}: KommenterTekstProps) {
  const [valgtTekst, setValgtTekst] = useState("");

  function hentMarkertTekst() {
    const selection = window.getSelection();
    const tekst = selection?.toString().trim() ?? "";

    if (tekst.length > 0) {
      setValgtTekst(tekst);
    }
  }

  return (
    <div>
      <div
        onMouseUp={hentMarkertTekst}
        onTouchEnd={hentMarkertTekst}
        className="mt-4 whitespace-pre-wrap text-sm leading-7"
      >
        {tekst}
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
          Marker tekst for å kommentere akkurat den delen.
        </p>
      )}
    </div>
  );
}

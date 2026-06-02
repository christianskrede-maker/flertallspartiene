"use client";

import { useEffect, useState } from "react";

type KartKommentar = {
  id: string;
  tittel: string;
  objectId: string;
  arealformal: string;
  forklaring: string;
  koordinat: string;
  kommentar: string;
  parti: string;
  status: "Ny" | "Diskuteres" | "Avklart";
  opprettet: string;
};

const STORAGE_KEY = "kpa-kommunekart-kommentarer";

export default function KommunekartKommentarer() {
  const [kommentarer, setKommentarer] = useState<KartKommentar[]>([]);

  const [tittel, setTittel] = useState("");
  const [objectId, setObjectId] = useState("");
  const [arealformal, setArealformal] = useState("");
  const [forklaring, setForklaring] = useState("");
  const [koordinat, setKoordinat] = useState("");
  const [kommentar, setKommentar] = useState("");
  const [parti, setParti] = useState("");
  const [status, setStatus] = useState<KartKommentar["status"]>("Ny");

  useEffect(() => {
    const lagret = window.localStorage.getItem(STORAGE_KEY);

    if (lagret) {
      setKommentarer(JSON.parse(lagret));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(kommentarer));
  }, [kommentarer]);

  function lagreKommentar() {
    if (!tittel.trim() || !kommentar.trim()) return;

    const nyKommentar: KartKommentar = {
      id: crypto.randomUUID(),
      tittel,
      objectId,
      arealformal,
      forklaring,
      koordinat,
      kommentar,
      parti,
      status,
      opprettet: new Date().toLocaleString("nb-NO"),
    };

    setKommentarer([nyKommentar, ...kommentarer]);

    setTittel("");
    setObjectId("");
    setArealformal("");
    setForklaring("");
    setKoordinat("");
    setKommentar("");
    setParti("");
    setStatus("Ny");
  }

  function slettKommentar(id: string) {
    setKommentarer(kommentarer.filter((kommentar) => kommentar.id !== id));
  }

  function erLenke(verdi: string) {
    return verdi.startsWith("http://") || verdi.startsWith("https://");
  }

  return (
    <>
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-2xl font-bold">Ny kartkommentar</h2>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Klikk på et område i ArcGIS-kartet og kopier inn OBJECTID,
          KPAREALFORMÅL og forklaring dersom feltet er relevant.
        </p>

        <div className="mt-5 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Tittel / område
            </span>
            <input
              type="text"
              value={tittel}
              onChange={(event) => setTittel(event.target.value)}
              placeholder="F.eks. Dikemark, felt X eller gbnr."
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                OBJECTID
              </span>
              <input
                type="text"
                value={objectId}
                onChange={(event) => setObjectId(event.target.value)}
                placeholder="F.eks. 4114"
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Arealformål
              </span>
              <input
                type="text"
                value={arealformal}
                onChange={(event) => setArealformal(event.target.value)}
                placeholder="F.eks. 5100"
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Parti / person
              </span>
              <input
                type="text"
                value={parti}
                onChange={(event) => setParti(event.target.value)}
                placeholder="F.eks. Høyre, Venstre, FrP, KrF eller navn"
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Forklaring fra kartet
            </span>
            <textarea
              rows={3}
              value={forklaring}
              onChange={(event) => setForklaring(event.target.value)}
              placeholder="F.eks. LNFR-areal for nødvendige tiltak ..."
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Koordinat eller kartlenke
            </span>
            <input
              type="text"
              value={koordinat}
              onChange={(event) => setKoordinat(event.target.value)}
              placeholder="Lim inn koordinat, gbnr. eller lenke fra kartet"
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Status
            </span>
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as KartKommentar["status"])
              }
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
            >
              <option>Ny</option>
              <option>Diskuteres</option>
              <option>Avklart</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Kommentar
            </span>
            <textarea
              rows={6}
              value={kommentar}
              onChange={(event) => setKommentar(event.target.value)}
              placeholder="Skriv vurdering, spørsmål eller forslag til politisk avklaring."
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />
          </label>

          <button
            type="button"
            onClick={lagreKommentar}
            className="w-fit rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Lagre kommentar
          </button>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-2xl font-bold">Kommentarer til gjennomgang</h2>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Kommentarene vises med nyeste øverst.
        </p>

        {kommentarer.length === 0 ? (
          <div className="mt-5 rounded-xl border border-dashed border-slate-300 p-5 text-sm text-slate-500">
            Ingen kommentarer registrert ennå.
          </div>
        ) : (
          <div className="mt-5 grid gap-4">
            {kommentarer.map((kommentar) => (
              <article
                key={kommentar.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-bold">{kommentar.tittel}</h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {kommentar.opprettet}
                      {kommentar.parti ? ` · ${kommentar.parti}` : ""}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-700">
                      {kommentar.objectId && (
                        <span className="rounded bg-slate-100 px-2 py-1">
                          OBJECTID: {kommentar.objectId}
                        </span>
                      )}

                      {kommentar.arealformal && (
                        <span className="rounded bg-slate-100 px-2 py-1">
                          Arealformål: {kommentar.arealformal}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="w-fit rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                    {kommentar.status}
                  </span>
                </div>

                {kommentar.forklaring && (
                  <div className="mt-3 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                    <span className="font-semibold">Forklaring:</span>{" "}
                    {kommentar.forklaring}
                  </div>
                )}

                {kommentar.koordinat && (
                  <div className="mt-3 text-sm text-slate-600">
                    <span className="font-semibold">Koordinat/kartlenke:</span>{" "}
                    {erLenke(kommentar.koordinat) ? (
                      <a
                        href={kommentar.koordinat}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-blue-700 underline"
                      >
                        Åpne kartpunkt
                      </a>
                    ) : (
                      kommentar.koordinat
                    )}
                  </div>
                )}

                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {kommentar.kommentar}
                </p>

                <button
                  type="button"
                  onClick={() => slettKommentar(kommentar.id)}
                  className="mt-4 text-xs font-semibold text-red-600 hover:text-red-800"
                >
                  Slett kommentar
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

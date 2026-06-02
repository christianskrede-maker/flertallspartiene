import Link from "next/link";
import { hentArkitekturKapittel } from "@/lib/kpa/arkitektur";
import {
  leggTilKommentar,
  hentKommentarer,
  redigerKommentar,
  slettKommentar,
  hentOmforentInnspill,
  lagreOmforentInnspill,
} from "@/app/actions/kommentarer";

type ArkitekturKapittelProps = {
  params: Promise<{
    id: string;
    kapittel: string;
  }>;
  searchParams?: Promise<{
    zoom?: string;
  }>;
};

function partiFarge(parti: string) {
  if (parti === "H") return "border-blue-300 bg-blue-50";
  if (parti === "FrP") return "border-sky-300 bg-sky-50";
  if (parti === "V") return "border-green-300 bg-green-50";
  if (parti === "KrF") return "border-yellow-300 bg-yellow-50";

  return "border-slate-200 bg-slate-50";
}

function kommentarIdFraTekst(tekst?: string | null) {
  if (!tekst) return "";

  return tekst
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function Tekstutdrag({ tekst }: { tekst?: string | null }) {
  if (!tekst) return null;

  return (
    <details className="mb-3 rounded-lg border-l-4 border-slate-300 bg-white/70 p-3">
      <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-slate-500">
        Tekstutdrag
      </summary>

      <p className="mt-2 whitespace-pre-wrap text-sm italic leading-6 text-slate-700">
        {tekst}
      </p>
    </details>
  );
}

function RedigerKommentar({
  kommentarId,
  kommentar,
}: {
  kommentarId: string;
  kommentar: string;
}) {
  return (
    <details className="mt-3 rounded-lg border border-dashed border-slate-300 bg-white/70 p-3">
      <summary className="cursor-pointer text-xs font-bold uppercase tracking-wide text-slate-500">
        Rediger kommentar
      </summary>

      <form action={redigerKommentar} className="mt-3">
        <input type="hidden" name="kommentar_id" value={kommentarId} />

        <textarea
          name="kommentar"
          required
          rows={4}
          defaultValue={kommentar}
          className="w-full rounded-xl border border-slate-300 p-3 text-sm"
        />

        <button className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
          Lagre endring
        </button>
      </form>
    </details>
  );
}

function SlettKommentar({ kommentarId }: { kommentarId: string }) {
  return (
    <form action={slettKommentar} className="mt-3">
      <input type="hidden" name="kommentar_id" value={kommentarId} />

      <button className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-100">
        Slett kommentar
      </button>
    </form>
  );
}

function SistLagret({ sistEndret }: { sistEndret?: string | null }) {
  if (!sistEndret) {
    return <p className="text-xs text-emerald-900">Ikke lagret ennå.</p>;
  }

  return (
    <p className="text-xs text-emerald-900">
      Sist lagret: {new Date(sistEndret).toLocaleString("nb-NO")}
    </p>
  );
}

function pdfSideFraDokumentside(dokumentside: number) {
  return Math.floor(dokumentside / 2) + 1;
}

function tryggZoom(verdi?: string) {
  const zoom = Number(verdi);

  if (!Number.isFinite(zoom)) return 100;
  if (zoom < 50) return 50;
  if (zoom > 200) return 200;

  return zoom;
}

export default async function ArkitekturKapittel({
  params,
  searchParams,
}: ArkitekturKapittelProps) {
  const { id, kapittel } = await params;
  const query = searchParams ? await searchParams : {};
  const zoom = tryggZoom(query.zoom);

  const valgtKapittel = hentArkitekturKapittel(kapittel);

  if (!valgtKapittel) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <Link
          href={`/saker/${id}/arkitektur`}
          className="inline-flex text-sm text-slate-500 hover:text-slate-900"
        >
          ← Tilbake til Arkitektur Asker
        </Link>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Ukjent arkitekturkapittel
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            Dette kapittelet finnes ikke i arkitekturstrukturen.
          </p>
        </section>
      </div>
    );
  }

  const kommentarKapittel = "arkitektur";
  const kommentarDelpunkt = kapittel;

  const pdfSide = pdfSideFraDokumentside(valgtKapittel.pdfFra);
  const pdfUrl = `/arkitektur-asker.pdf#page=${pdfSide}&zoom=${zoom}`;

  const zoomUt = Math.max(50, zoom - 25);
  const zoomInn = Math.min(200, zoom + 25);

  const alleKommentarer = await hentKommentarer(
    id,
    kommentarKapittel,
    kommentarDelpunkt
  );

  const omforentArkitektur = await hentOmforentInnspill(
    id,
    kommentarKapittel,
    kommentarDelpunkt,
    "arkitektur"
  );

  const hovedKommentarer = alleKommentarer.filter(
    (kommentar) => !kommentar.forelder_id
  );

  return (
    <div className="mx-auto max-w-[1900px] px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href={`/saker/${id}/arkitektur`}
        className="inline-flex text-sm text-slate-500 hover:text-slate-900"
      >
        ← Tilbake til Arkitektur Asker
      </Link>

      <section className="mt-8">
        <p className="text-sm font-medium text-slate-500">
          Kommuneplanens arealdel / Arkitektur Asker
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          {valgtKapittel.tittel}
        </h1>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          {valgtKapittel.ingress}
        </p>
      </section>

      <section className="mt-8 grid gap-4 xl:grid-cols-[minmax(0,70fr)_minmax(360px,30fr)]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Original PDF
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {valgtKapittel.tittel}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Viser dokumentside {valgtKapittel.pdfFra}
                {valgtKapittel.pdfTil !== valgtKapittel.pdfFra
                  ? `–${valgtKapittel.pdfTil}`
                  : ""}
                .
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href={`/saker/${id}/arkitektur/${kapittel}?zoom=${zoomUt}`}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50"
              >
                Zoom ut
              </Link>

              <Link
                href={`/saker/${id}/arkitektur/${kapittel}?zoom=100`}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50"
              >
                100%
              </Link>

              <Link
                href={`/saker/${id}/arkitektur/${kapittel}?zoom=${zoomInn}`}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50"
              >
                Zoom inn
              </Link>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
              >
                Åpne PDF
              </a>
            </div>
          </div>

          <div className="mt-4 h-[78vh] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <iframe
              title={`Arkitektur Asker – ${valgtKapittel.tittel}`}
              src={pdfUrl}
              className="h-full w-full"
            />
          </div>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-6 xl:max-h-[calc(100vh-3rem)] xl:overflow-y-auto">
          <details
            open
            className="rounded-2xl border border-slate-200 bg-white p-4"
          >
            <summary className="cursor-pointer text-sm font-bold uppercase tracking-wide text-slate-600">
              Kommentarer og vurderinger
            </summary>

            <div className="mt-5 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Partienes innspill til {valgtKapittel.tittel}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Skriv kommentarer til denne PDF-siden/oppslaget.
                </p>
              </div>

              <form
                action={leggTilKommentar}
                className="rounded-xl border bg-slate-50 p-4"
              >
                <input type="hidden" name="sak_id" value={id} />
                <input
                  type="hidden"
                  name="kapittel"
                  value={kommentarKapittel}
                />
                <input
                  type="hidden"
                  name="delpunkt"
                  value={kommentarDelpunkt}
                />
                <input
                  type="hidden"
                  name="tekstutdrag"
                  value={`PDF side ${valgtKapittel.pdfFra}${
                    valgtKapittel.pdfTil !== valgtKapittel.pdfFra
                      ? `–${valgtKapittel.pdfTil}`
                      : ""
                  }`}
                />

                <label className="text-sm font-bold text-slate-700">
                  Ny hovedkommentar
                </label>

                <textarea
                  name="kommentar"
                  required
                  rows={5}
                  placeholder={`Skriv kommentar til ${valgtKapittel.tittel}...`}
                  className="mt-2 w-full rounded-xl border border-slate-300 p-3 text-sm"
                />

                <button className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
                  Lagre kommentar
                </button>
              </form>

              <div className="space-y-4">
                {hovedKommentarer.length > 0 ? (
                  hovedKommentarer.map((kommentar) => {
                    const svar = alleKommentarer.filter(
                      (item) => item.forelder_id === kommentar.id
                    );

                    const kommentarAnchorId = kommentarIdFraTekst(
                      kommentar.tekstutdrag
                    );

                    return (
                      <div key={kommentar.id} className="space-y-3">
                        <div
                          id={
                            kommentarAnchorId
                              ? `kommentar-${kommentarAnchorId}`
                              : undefined
                          }
                          className={`scroll-mt-24 rounded-xl border p-4 transition-all duration-300 ${partiFarge(
                            kommentar.parti
                          )}`}
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-white px-2 py-1 text-xs font-bold shadow-sm">
                              {kommentar.parti || "Parti"}
                            </span>

                            <span className="text-sm font-semibold">
                              {kommentar.navn}
                            </span>

                            {kommentar.partiNavn ? (
                              <span className="text-xs text-slate-500">
                                {kommentar.partiNavn}
                              </span>
                            ) : null}
                          </div>

                          <div className="mt-3">
                            <Tekstutdrag tekst={kommentar.tekstutdrag} />

                            <p className="whitespace-pre-wrap text-sm leading-6">
                              {kommentar.kommentar}
                            </p>

                            {kommentar.kanRedigere ? (
                              <>
                                <RedigerKommentar
                                  kommentarId={kommentar.id}
                                  kommentar={kommentar.kommentar}
                                />

                                <SlettKommentar kommentarId={kommentar.id} />
                              </>
                            ) : null}
                          </div>
                        </div>

                        {svar.length > 0 ? (
                          <div className="ml-4 space-y-3 border-l-2 border-slate-200 pl-4">
                            {svar.map((svarKommentar) => (
                              <div
                                key={svarKommentar.id}
                                className={`scroll-mt-24 rounded-xl border p-4 transition-all duration-300 ${partiFarge(
                                  svarKommentar.parti
                                )}`}
                              >
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="rounded-full bg-white px-2 py-1 text-xs font-bold shadow-sm">
                                    {svarKommentar.parti || "Parti"}
                                  </span>

                                  <span className="text-sm font-semibold">
                                    {svarKommentar.navn}
                                  </span>

                                  {svarKommentar.partiNavn ? (
                                    <span className="text-xs text-slate-500">
                                      {svarKommentar.partiNavn}
                                    </span>
                                  ) : null}
                                </div>

                                <div className="mt-3">
                                  <Tekstutdrag
                                    tekst={svarKommentar.tekstutdrag}
                                  />

                                  <p className="whitespace-pre-wrap text-sm leading-6">
                                    {svarKommentar.kommentar}
                                  </p>

                                  {svarKommentar.kanRedigere ? (
                                    <>
                                      <RedigerKommentar
                                        kommentarId={svarKommentar.id}
                                        kommentar={svarKommentar.kommentar}
                                      />

                                      <SlettKommentar
                                        kommentarId={svarKommentar.id}
                                      />
                                    </>
                                  ) : null}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}

                        <form
                          action={leggTilKommentar}
                          className="ml-4 rounded-xl border border-dashed border-slate-300 bg-white p-4"
                        >
                          <input type="hidden" name="sak_id" value={id} />
                          <input
                            type="hidden"
                            name="kapittel"
                            value={kommentarKapittel}
                          />
                          <input
                            type="hidden"
                            name="delpunkt"
                            value={kommentarDelpunkt}
                          />
                          <input
                            type="hidden"
                            name="tekstutdrag"
                            value={kommentar.tekstutdrag ?? ""}
                          />
                          <input
                            type="hidden"
                            name="forelder_id"
                            value={kommentar.id}
                          />

                          <label className="text-sm font-bold text-slate-700">
                            Svar på kommentaren
                          </label>

                          <textarea
                            name="kommentar"
                            required
                            rows={3}
                            placeholder="Skriv svar..."
                            className="mt-2 w-full rounded-xl border border-slate-300 p-3 text-sm"
                          />

                          <button className="mt-3 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
                            Lagre svar
                          </button>
                        </form>
                      </div>
                    );
                  })
                ) : (
                  <p className="rounded-xl border bg-slate-50 p-4 text-sm text-slate-500">
                    Ingen kommentarer er lagret for dette kapittelet ennå.
                  </p>
                )}
              </div>
            </div>
          </details>

          <details
            open
            className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4"
          >
            <summary className="cursor-pointer text-sm font-bold uppercase tracking-wide text-emerald-800">
              Omforent arkitektur
            </summary>

            <form action={lagreOmforentInnspill} className="mt-4">
              <input type="hidden" name="sak_id" value={id} />
              <input type="hidden" name="kapittel" value={kommentarKapittel} />
              <input type="hidden" name="delpunkt" value={kommentarDelpunkt} />
              <input type="hidden" name="type" value="arkitektur" />

              <h3 className="text-base font-bold text-emerald-950">
                Omforent forslag – arkitektur
              </h3>

              <p className="mt-1 text-sm leading-6 text-emerald-900">
                Dette blir masterteksten for flertallspartienes omforente
                arkitekturinnspill.
              </p>

              <textarea
                name="tekst"
                rows={12}
                defaultValue={omforentArkitektur?.tekst ?? ""}
                placeholder="Skriv omforent arkitektur her..."
                className="mt-3 w-full rounded-xl border border-emerald-300 bg-white p-4 text-sm leading-7 text-slate-900"
              />

              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <button className="w-fit rounded-lg bg-emerald-800 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
                  Lagre omforent arkitektur
                </button>

                <SistLagret sistEndret={omforentArkitektur?.sist_endret} />
              </div>
            </form>
          </details>
        </aside>
      </section>
    </div>
  );
}

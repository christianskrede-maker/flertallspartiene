import Link from "next/link";
import KommenterTekst from "./KommenterTekst";
import { kpaKapitler } from "../../../data/kpaKapitler";
import { kpaInnhold } from "../../../data/kpaInnhold";
import {
  leggTilKommentar,
  hentKommentarer,
  redigerKommentar,
  slettKommentar,
  hentOmforentInnspill,
  lagreOmforentInnspill,
} from "../../../../../actions/kommentarer";

const kartLenker = [
  {
    tittel: "K.dir kart",
    tekst: "Kommunedirektørens forslag",
    href: "https://www.arcgis.com/apps/dashboards/f2d273a638a9420992b7bad2bd7cb81f",
  },
  {
    tittel: "Askerkart",
    tekst: "Kommunens kartløsning",
    href: "https://kart.asker.kommune.no/geoinnsyn/?project=Askerkart&application=geoinnsyn&zoom=8&lat=6619195.00&lon=581710.00",
  },
  {
    tittel: "Innspillskart",
    tekst: "Alle innspill i kart",
    href: "https://www.arcgis.com/apps/dashboards/f2d273a638a9420992b7bad2bd7cb81f",
  },
  {
    tittel: "Bestemmelser, datert 4.6.2026",
    tekst: "Nye bestemmelser til behandling",
    href: "/bestemmelser__datert_4_6_2026%20(3).pdf",
  },
  {
    tittel: "Planbeskrivelse, datert 4.6.2026",
    tekst: "Inneholder spesialmerknader fra side 28",
    href: "/planbeskrivelse__datert_4_6_2026%20(3).pdf",
  },
  {
    tittel: "Gjeldende bestemmelser",
    tekst: "Vedtatte bestemmelser som gjelder i dag",
    href: "/gjeldende-bestemmelser.pdf",
  },
];

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

type KapittelProps = {
  params: Promise<{
    id: string;
    kapittel: string;
  }>;
};

export default async function Kapittel({ params }: KapittelProps) {
  const { id, kapittel } = await params;

  const valgtKapittel =
    kpaKapitler.find((item) => item.nummer === kapittel) ?? null;

  const tittel = valgtKapittel
    ? `${valgtKapittel.nummer}. ${valgtKapittel.tittel}`
    : `Kapittel ${kapittel}`;

  const innhold = kpaInnhold[kapittel as keyof typeof kpaInnhold] ?? null;

  const dataPerDelpunkt = await Promise.all(
    (innhold?.deler ?? []).map(async (del) => ({
      delpunkt: del.nummer,
      kommentarer: await hentKommentarer(id, kapittel, del.nummer),
      omforentBestemmelse: await hentOmforentInnspill(
        id,
        kapittel,
        del.nummer,
        "bestemmelse"
      ),
      omforentSpesialmerknad: await hentOmforentInnspill(
        id,
        kapittel,
        del.nummer,
        "spesialmerknad"
      ),
    }))
  );

  return (
    <div className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href={`/saker/${id}`}
        className="inline-flex text-sm text-slate-500 hover:text-slate-900"
      >
        ← Tilbake til saken
      </Link>

      <section className="mt-8">
        <p className="text-sm font-medium text-slate-500">
          Kommuneplanens arealdel
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{tittel}</h1>
      </section>

      <section className="sticky top-0 z-10 mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
          Kart og arbeidsverktøy
        </h2>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {kartLenker.map((lenke) => (
            <a
              key={lenke.tittel}
              href={lenke.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <p className="font-bold">{lenke.tittel}</p>
              <p className="mt-1 text-sm text-slate-500">{lenke.tekst}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-8">
        {innhold?.deler ? (
          <div className="space-y-8">
            {innhold.deler.map((del) => {
              const dataForDelpunkt = dataPerDelpunkt.find(
                (item) => item.delpunkt === del.nummer
              );

              const alleKommentarer = dataForDelpunkt?.kommentarer ?? [];
              const omforentBestemmelse =
                dataForDelpunkt?.omforentBestemmelse ?? null;
              const omforentSpesialmerknad =
                dataForDelpunkt?.omforentSpesialmerknad ?? null;

              const hovedKommentarer = alleKommentarer.filter(
                (kommentar) => !kommentar.forelder_id
              );

              const partierMedKommentarer = [
                ...new Set(
                  alleKommentarer
                    .map((kommentar) => kommentar.parti)
                    .filter((parti): parti is string => Boolean(parti))
                ),
              ];

              const markeringer = alleKommentarer
                .map((kommentar) => ({
                  tekstutdrag: kommentar.tekstutdrag ?? "",
                  parti: kommentar.parti ?? "",
                }))
                .filter((markering) => Boolean(markering.tekstutdrag.trim()));

              return (
                <article
                  key={del.nummer}
                  className={`rounded-2xl border bg-white p-5 sm:p-6 ${
                    alleKommentarer.length > 0
                      ? "border-amber-300 shadow-sm"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        Delpunkt
                      </p>

                      <h2 className="mt-2 flex flex-wrap items-center gap-3 text-2xl font-bold">
                        <span>
                          {del.nummer} {del.tittel}
                        </span>

                        {alleKommentarer.length > 0 ? (
                          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
                            {alleKommentarer.length} kommentarer
                          </span>
                        ) : null}
                      </h2>

                      {partierMedKommentarer.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {partierMedKommentarer.map((parti) => (
                            <span
                              key={parti}
                              className="rounded-full border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-bold text-slate-700"
                            >
                              {parti}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <a
                      href={`/saker/${id}/kapittel/${kapittel}/eksporter`}
                      className="w-fit rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
                    >
                      Eksporter delpunkt
                    </a>
                  </div>

                  <div className="mt-6 grid gap-4 xl:grid-cols-[33fr_33fr_34fr]">
                    <details className="rounded-xl border border-slate-200 bg-white p-4">
                      <summary className="cursor-pointer text-sm font-bold uppercase tracking-wide text-slate-600">
                        Ny bestemmelse
                      </summary>

                      <KommenterTekst
                        sakId={id}
                        kapittel={kapittel}
                        delpunkt={del.nummer}
                        tekst={del.bestemmelse}
                        label="Ny bestemmelse"
                        markeringer={markeringer}
                      />
                    </details>

                    <details className="rounded-xl border border-slate-200 bg-white p-4">
                      <summary className="cursor-pointer text-sm font-bold uppercase tracking-wide text-slate-600">
                        Spesialmerknad
                      </summary>

                      <KommenterTekst
                        sakId={id}
                        kapittel={kapittel}
                        delpunkt={del.nummer}
                        tekst={del.spesialmerknad}
                        label="Spesialmerknad"
                        markeringer={markeringer}
                      />
                    </details>

                    <details className="rounded-xl border border-slate-200 bg-white p-4">
                      <summary className="cursor-pointer text-sm font-bold uppercase tracking-wide text-slate-600">
                        Kommentarer og vurderinger
                      </summary>

                      <div className="mt-5 space-y-5">
                        <div>
                          <h3 className="text-lg font-bold">
                            Partienes innspill til {del.nummer}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            Skriv kommentar til ny bestemmelse og
                            spesialmerknad, eller marker tekst direkte i
                            bestemmelsen over.
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
                            value={kapittel}
                          />
                          <input
                            type="hidden"
                            name="delpunkt"
                            value={del.nummer}
                          />
                          <input type="hidden" name="tekstutdrag" value="" />

                          <label className="text-sm font-bold text-slate-700">
                            Ny hovedkommentar uten tekstmarkering
                          </label>

                          <textarea
                            name="kommentar"
                            required
                            rows={5}
                            placeholder={`Skriv generell kommentar til ${del.nummer}...`}
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
                                      <Tekstutdrag
                                        tekst={kommentar.tekstutdrag}
                                      />

                                      <p className="whitespace-pre-wrap text-sm leading-6">
                                        {kommentar.kommentar}
                                      </p>

                                      {kommentar.kanRedigere ? (
                                        <>
                                          <RedigerKommentar
                                            kommentarId={kommentar.id}
                                            kommentar={kommentar.kommentar}
                                          />

                                          <SlettKommentar
                                            kommentarId={kommentar.id}
                                          />
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
                                              tekst={
                                                svarKommentar.tekstutdrag
                                              }
                                            />

                                            <p className="whitespace-pre-wrap text-sm leading-6">
                                              {svarKommentar.kommentar}
                                            </p>

                                            {svarKommentar.kanRedigere ? (
                                              <>
                                                <RedigerKommentar
                                                  kommentarId={
                                                    svarKommentar.id
                                                  }
                                                  kommentar={
                                                    svarKommentar.kommentar
                                                  }
                                                />

                                                <SlettKommentar
                                                  kommentarId={
                                                    svarKommentar.id
                                                  }
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
                                    <input
                                      type="hidden"
                                      name="sak_id"
                                      value={id}
                                    />
                                    <input
                                      type="hidden"
                                      name="kapittel"
                                      value={kapittel}
                                    />
                                    <input
                                      type="hidden"
                                      name="delpunkt"
                                      value={del.nummer}
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
                              Ingen kommentarer er lagret for dette delpunktet
                              ennå.
                            </p>
                          )}
                        </div>
                      </div>
                    </details>
                  </div>

                  <details className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <summary className="cursor-pointer text-sm font-bold uppercase tracking-wide text-emerald-800">
                      Omforent forslag
                    </summary>

                    <div className="mt-4 grid gap-4 lg:grid-cols-2">
                      <form action={lagreOmforentInnspill}>
                        <input type="hidden" name="sak_id" value={id} />
                        <input
                          type="hidden"
                          name="kapittel"
                          value={kapittel}
                        />
                        <input
                          type="hidden"
                          name="delpunkt"
                          value={del.nummer}
                        />
                        <input
                          type="hidden"
                          name="type"
                          value="bestemmelse"
                        />

                        <h3 className="text-base font-bold text-emerald-950">
                          Omforent forslag – bestemmelse
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-emerald-900">
                          Dette er masterteksten for ny bestemmelse.
                        </p>

                        <textarea
                          name="tekst"
                          rows={14}
                          defaultValue={
                            omforentBestemmelse?.tekst?.trim()
                              ? omforentBestemmelse.tekst
                              : del.bestemmelse.trim()
                          }
                          className="mt-3 w-full rounded-xl border border-emerald-300 bg-white p-4 text-sm leading-7 text-slate-900"
                        />

                        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <button className="w-fit rounded-lg bg-emerald-800 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
                            Lagre bestemmelse
                          </button>

                          <SistLagret
                            sistEndret={omforentBestemmelse?.sist_endret}
                          />
                        </div>
                      </form>

                      <form action={lagreOmforentInnspill}>
                        <input type="hidden" name="sak_id" value={id} />
                        <input
                          type="hidden"
                          name="kapittel"
                          value={kapittel}
                        />
                        <input
                          type="hidden"
                          name="delpunkt"
                          value={del.nummer}
                        />
                        <input
                          type="hidden"
                          name="type"
                          value="spesialmerknad"
                        />

                        <h3 className="text-base font-bold text-emerald-950">
                          Omforent forslag – spesialmerknad
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-emerald-900">
                          Dette er masterteksten for spesialmerknaden.
                        </p>

                        <textarea
                          name="tekst"
                          rows={14}
                          defaultValue={
                            omforentSpesialmerknad?.tekst?.trim()
                              ? omforentSpesialmerknad.tekst
                              : del.spesialmerknad.trim()
                          }
                          className="mt-3 w-full rounded-xl border border-emerald-300 bg-white p-4 text-sm leading-7 text-slate-900"
                        />

                        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <button className="w-fit rounded-lg bg-emerald-800 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
                            Lagre spesialmerknad
                          </button>

                          <SistLagret
                            sistEndret={omforentSpesialmerknad?.sist_endret}
                          />
                        </div>
                      </form>
                    </div>
                  </details>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <p className="text-sm leading-6 text-slate-500">
              Innhold er ikke lagt inn ennå.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { hentInnspill } from "@/lib/kpa/innspill";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type OmforentInnspillProps = {
  params: Promise<{
    id: string;
  }>;
};

type OmforentRad = {
  id: string;
  sak_id: string;
  kapittel: string;
  delpunkt: string;
  type: string;
  tekst: string;
  sist_endret: string | null;
};

function hentOmradeFraKapittel(kapittel: string) {
  if (!kapittel.startsWith("innspill-")) {
    return "";
  }

  return kapittel.replace("innspill-", "");
}

export default async function OmforentInnspill({
  params,
}: OmforentInnspillProps) {
  const { id } = await params;

  const { data } = await supabaseAdmin
    .from("omforent_innspill")
    .select("*")
    .eq("sak_id", id)
    .eq("type", "innspill")
    .order("kapittel", { ascending: true })
    .order("delpunkt", { ascending: true });

  const omforenteInnspill = (data ?? []) as OmforentRad[];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href={`/saker/${id}`}
        className="inline-flex text-sm text-slate-500 hover:text-slate-900"
      >
        ← Tilbake til saken
      </Link>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Kommuneplanens arealdel
            </p>

            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Omforente innspill
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Her samles de omforente innspillene som skal inngå i samlet
              oversendelse til kommunedirektøren.
            </p>
          </div>

          <a
            href={`/saker/${id}/omforent-innspill/eksporter`}
            className="w-fit rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Eksporter Word
          </a>
        </div>

        <div className="mt-6 space-y-4">
          {omforenteInnspill.length > 0 ? (
            omforenteInnspill.map((rad) => {
              const omrade = hentOmradeFraKapittel(rad.kapittel);
              const innspill = hentInnspill(omrade, rad.delpunkt);

              return (
                <article
                  key={rad.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        {innspill
                          ? `${innspill.omrade} – innspill ${innspill.nummer}`
                          : `${rad.kapittel} / ${rad.delpunkt}`}
                      </p>

                      <h2 className="mt-2 text-xl font-bold">
                        {innspill?.tittel ?? "Omforent innspill"}
                      </h2>
                    </div>

                    <Link
                      href={`/saker/${id}/innspill/${omrade}/${rad.delpunkt}`}
                      className="w-fit rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100"
                    >
                      Åpne behandling
                    </Link>
                  </div>

                  <div className="mt-4 whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-800">
                    {rad.tekst}
                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    Sist lagret:{" "}
                    {rad.sist_endret
                      ? new Date(rad.sist_endret).toLocaleString("nb-NO")
                      : "Ukjent"}
                  </p>
                </article>
              );
            })
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-600">
                Ingen omforente innspill er lagret ennå.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

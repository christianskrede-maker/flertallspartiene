import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { innspillOmrader } from "@/lib/kpa/innspill";

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
  tekst: string | null;
  sist_endret: string | null;
};

export default async function OmforentInnspill({
  params,
}: OmforentInnspillProps) {
  const { id } = await params;

  const { data } = await supabaseAdmin
    .from("omforent_innspill")
    .select("*")
    .eq("sak_id", id === "kpa" ? "1" : id)
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
        kapittel,
        delpunkt,
        tekst:
          lagret?.tekst?.trim() ||
          innspill.konklusjon?.trim() ||
          innspill.vurdering?.trim() ||
          "",
        sist_endret: lagret?.sist_endret ?? null,
        erLagret: Boolean(lagret?.tekst?.trim()),
      };
    })
  );

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
              Her samles omforente innspill. Der flertallet ikke har lagret en
              egen omforent tekst, vises kommunedirektørens forslag som base.
            </p>
          </div>

        <div className="flex flex-wrap gap-2">
  <a
    href={`/saker/${id}/omforent-innspill/eksporter`}
    className="w-fit rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
  >
    Eksporter Word
  </a>

  <a
    href={`/saker/${id}/omforent-innspill/eksporter-med-kommentarer`}
    className="w-fit rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100"
  >
    Eksporter med kommentarer
  </a>
</div>
        </div>

        <div className="mt-6 space-y-4">
          {alleInnspill.map(({ omrade, innspill, delpunkt, tekst, sist_endret, erLagret }) => (
            <article
              key={`${omrade.slug}-${innspill.nummer}`}
              className="rounded-xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    {innspill.omrade} – innspill {innspill.nummer}
                  </p>

                  <h2 className="mt-2 text-xl font-bold">{innspill.tittel}</h2>

                  <p className="mt-2 text-sm text-slate-500">
                    {erLagret
                      ? "Omforent tekst er lagret."
                      : "Bruker kommunedirektørens forslag som base."}
                  </p>
                </div>

                <Link
                  href={`/saker/${id}/innspill/${omrade.slug}/${delpunkt}`}
                  className="w-fit rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100"
                >
                  Åpne behandling
                </Link>
              </div>

              <div className="mt-4 whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-800">
                {tekst || "Ikke lagt inn."}
              </div>

              <p className="mt-3 text-xs text-slate-500">
                {erLagret
                  ? `Sist lagret: ${
                      sist_endret
                        ? new Date(sist_endret).toLocaleString("nb-NO")
                        : "Ukjent"
                    }`
                  : "Ikke korrigert av flertallet ennå."}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

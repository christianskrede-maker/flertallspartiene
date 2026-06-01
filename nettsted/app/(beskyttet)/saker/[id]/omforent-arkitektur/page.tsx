import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import {
  arkitekturKapittelListe,
  hentArkitekturKapittel,
} from "@/lib/kpa/arkitektur";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type OmforentArkitekturProps = {
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

export default async function OmforentArkitektur({
  params,
}: OmforentArkitekturProps) {
  const { id } = await params;

  const { data } = await supabaseAdmin
    .from("omforent_innspill")
    .select("*")
    .eq("sak_id", id)
    .eq("kapittel", "arkitektur")
    .eq("type", "arkitektur");

  const lagrede = (data ?? []) as OmforentRad[];

  const alleKapitler = arkitekturKapittelListe.map((kapittel) => {
    const lagret =
      lagrede.find((rad) => rad.delpunkt === kapittel.slug) ?? null;

    return {
      kapittel,
      tekst: lagret?.tekst?.trim() || kapittel.tekst?.trim() || "",
      sist_endret: lagret?.sist_endret ?? null,
      erLagret: Boolean(lagret?.tekst?.trim()),
    };
  });

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
              Omforent arkitektur
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Her samles omforent arkitektur. Der flertallet ikke har lagret en
              egen omforent tekst, vises Arkitektur Asker-teksten som base.
            </p>
          </div>

          <a
            href={`/saker/${id}/omforent-arkitektur/eksporter`}
            className="w-fit rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Eksporter Word
          </a>
        </div>

        <div className="mt-6 space-y-4">
          {alleKapitler.map(({ kapittel, tekst, sist_endret, erLagret }) => {
            const kapittelInfo = hentArkitekturKapittel(kapittel.slug);

            return (
              <article
                key={kapittel.slug}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Arkitektur Asker
                    </p>

                    <h2 className="mt-2 text-xl font-bold">
                      {kapittelInfo?.tittel ?? kapittel.tittel}
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {kapittelInfo?.ingress ?? kapittel.ingress}
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      {erLagret
                        ? "Omforent tekst er lagret."
                        : "Bruker Arkitektur Asker-teksten som base."}
                    </p>
                  </div>

                  <Link
                    href={`/saker/${id}/arkitektur/${kapittel.slug}`}
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
            );
          })}
        </div>
      </section>
    </div>
  );
}

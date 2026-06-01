import Link from "next/link";

const omrader = {
  heggedal: "Heggedal",
  dikemark: "Dikemark",
  holmen: "Holmen",
  nesoya: "Nesøya",
  royken: "Røyken",
  satre: "Sætre",
  asker: "Asker",
  slemmestad: "Slemmestad",
  spikkestad: "Spikkestad",
  tofte: "Tofte",
  vollen: "Vollen",
  generelle: "Generelle innspill",
};

type OmradeSlug = keyof typeof omrader;

type InnspillDetaljProps = {
  params: Promise<{
    id: string;
    omrade: string;
    innspill: string;
  }>;
};

export default async function InnspillDetalj({
  params,
}: InnspillDetaljProps) {
  const { id, omrade, innspill } = await params;

  const omradeNavn = omrader[omrade as OmradeSlug] ?? "Ukjent lokalområde";

  return (
    <div className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href={`/saker/${id}/innspill/${omrade}`}
        className="inline-flex text-sm text-slate-500 hover:text-slate-900"
      >
        ← Tilbake til {omradeNavn}
      </Link>

      <section className="mt-8">
        <p className="text-sm font-medium text-slate-500">
          Kommuneplanens arealdel / Innspill / {omradeNavn}
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Innspill {innspill}
        </h1>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Dette er behandlingssiden for ett enkelt innspill. Her skal partiene
          kunne lese innspillet, vurdere kommunedirektørens anbefaling, skrive
          kommentarer og utarbeide omforent innspill.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Innspill
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {omradeNavn} – innspill {innspill}
            </h2>
          </div>

          <button className="w-fit rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
            Eksporter innspill
          </button>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[33fr_33fr_34fr]">
          <details
            open
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <summary className="cursor-pointer text-sm font-bold uppercase tracking-wide text-slate-600">
              Innspillstekst
            </summary>

            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-700">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Saksnummer
                </p>
                <p className="mt-1">Kommer i neste fase</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Innsender
                </p>
                <p className="mt-1">Kommer i neste fase</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  På vegne av
                </p>
                <p className="mt-1">Kommer i neste fase</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Hva innspillet handler om
                </p>
                <p className="mt-1 whitespace-pre-wrap">
                  Innspillsteksten kobles inn her når datafilen for innspill er
                  på plass.
                </p>
              </div>
            </div>
          </details>

          <details
            open
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <summary className="cursor-pointer text-sm font-bold uppercase tracking-wide text-slate-600">
              Kommunedirektørens vurdering
            </summary>

            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-700">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Vurdering
                </p>
                <p className="mt-1 whitespace-pre-wrap">
                  Kommunedirektørens vurdering kobles inn her når datafilen for
                  innspill er på plass.
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Konklusjon / anbefaling
                </p>
                <p className="mt-1">Kommer i neste fase</p>
              </div>
            </div>
          </details>

          <details
            open
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <summary className="cursor-pointer text-sm font-bold uppercase tracking-wide text-slate-600">
              Kommentarer og vurderinger
            </summary>

            <div className="mt-5 space-y-5">
              <div>
                <h3 className="text-lg font-bold">
                  Partienes innspill til innspill {innspill}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Her kommer kommentarfelt, svartråder og partifarger etter
                  samme modell som på bestemmelsessidene.
                </p>
              </div>

              <form className="rounded-xl border bg-slate-50 p-4">
                <label className="text-sm font-bold text-slate-700">
                  Ny hovedkommentar
                </label>

                <textarea
                  name="kommentar"
                  rows={5}
                  placeholder={`Skriv generell kommentar til innspill ${innspill}...`}
                  className="mt-2 w-full rounded-xl border border-slate-300 p-3 text-sm"
                />

                <button
                  type="button"
                  className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
                >
                  Lagre kommentar
                </button>
              </form>

              <p className="rounded-xl border bg-slate-50 p-4 text-sm text-slate-500">
                Ingen kommentarer er lagret for dette innspillet ennå.
              </p>
            </div>
          </details>
        </div>

        <details
          open
          className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4"
        >
          <summary className="cursor-pointer text-sm font-bold uppercase tracking-wide text-emerald-800">
            Omforent innspill
          </summary>

          <div className="mt-4">
            <h3 className="text-base font-bold text-emerald-950">
              Omforent forslag – innspill
            </h3>

            <p className="mt-1 text-sm leading-6 text-emerald-900">
              Dette blir masterteksten for flertallspartienes omforente innspill.
            </p>

            <textarea
              name="tekst"
              rows={14}
              placeholder="Skriv omforent innspill her..."
              className="mt-3 w-full rounded-xl border border-emerald-300 bg-white p-4 text-sm leading-7 text-slate-900"
            />

            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                className="w-fit rounded-lg bg-emerald-800 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Lagre omforent innspill
              </button>

              <p className="text-xs text-emerald-900">Ikke lagret ennå.</p>
            </div>
          </div>
        </details>
      </section>
    </div>
  );
}

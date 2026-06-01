import Link from "next/link";
import { hentInnspill } from "@/lib/kpa/innspill";

type InnspillDetaljProps = {
  params: Promise<{
    id: string;
    omrade: string;
    innspill: string;
  }>;
};

function statusKlasse(status: string) {
  if (status === "Anbefales") {
    return "bg-green-100 text-green-800";
  }

  if (status === "Anbefales delvis") {
    return "bg-blue-100 text-blue-800";
  }

  if (status === "Må avklares ved regulering") {
    return "bg-yellow-100 text-yellow-800";
  }

  if (status === "Tas til orientering") {
    return "bg-slate-100 text-slate-800";
  }

  return "bg-red-100 text-red-800";
}

export default async function InnspillDetalj({
  params,
}: InnspillDetaljProps) {
  const { id, omrade, innspill } = await params;

  const valgtInnspill = hentInnspill(omrade, innspill);

  if (!valgtInnspill) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <Link
          href={`/saker/${id}/innspill/${omrade}`}
          className="inline-flex text-sm text-slate-500 hover:text-slate-900"
        >
          ← Tilbake til området
        </Link>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Ukjent innspill
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            Dette innspillet finnes ikke i innspillsstrukturen.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href={`/saker/${id}/innspill/${omrade}`}
        className="inline-flex text-sm text-slate-500 hover:text-slate-900"
      >
        ← Tilbake til {valgtInnspill.omrade}
      </Link>

      <section className="mt-8">
        <p className="text-sm font-medium text-slate-500">
          Kommuneplanens arealdel / Innspill / {valgtInnspill.omrade}
        </p>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Innspill {valgtInnspill.nummer}
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              {valgtInnspill.tittel}
            </p>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusKlasse(
              valgtInnspill.status,
            )}`}
          >
            {valgtInnspill.status}
          </span>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Innspill
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {valgtInnspill.omrade} – innspill {valgtInnspill.nummer}
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
                <p className="mt-1">{valgtInnspill.saksnummer}</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Innsender
                </p>
                <p className="mt-1">{valgtInnspill.innsender}</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  På vegne av
                </p>
                <p className="mt-1">{valgtInnspill.paVegneAv}</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Kategori
                </p>
                <p className="mt-1">{valgtInnspill.kategori}</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Gbnr.
                </p>
                <p className="mt-1">{valgtInnspill.gbnr}</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Dato
                </p>
                <p className="mt-1">{valgtInnspill.dato}</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Hva innspillet handler om
                </p>
                <p className="mt-1 whitespace-pre-wrap">
                  {valgtInnspill.innspillstekst}
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
                  {valgtInnspill.vurdering}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Konklusjon / anbefaling
                </p>
                <p className="mt-1">{valgtInnspill.konklusjon}</p>
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
                  Partienes innspill til innspill {valgtInnspill.nummer}
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
                  placeholder={`Skriv generell kommentar til innspill ${valgtInnspill.nummer}...`}
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

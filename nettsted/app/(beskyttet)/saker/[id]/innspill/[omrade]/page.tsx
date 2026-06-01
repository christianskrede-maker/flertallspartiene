import Link from "next/link";
import { hentInnspillOmrade } from "@/lib/kpa/innspill";

type InnspillOmradeProps = {
  params: Promise<{
    id: string;
    omrade: string;
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

export default async function InnspillOmrade({
  params,
}: InnspillOmradeProps) {
  const { id, omrade } = await params;

  const valgtOmrade = hentInnspillOmrade(omrade);

  if (!valgtOmrade) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <Link
          href={`/saker/${id}`}
          className="inline-flex text-sm text-slate-500 hover:text-slate-900"
        >
          ← Tilbake til saken
        </Link>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Ukjent lokalområde
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            Dette lokalområdet finnes ikke i innspillsstrukturen.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href={`/saker/${id}`}
        className="inline-flex text-sm text-slate-500 hover:text-slate-900"
      >
        ← Tilbake til saken
      </Link>

      <section className="mt-8">
        <p className="text-sm font-medium text-slate-500">
          Kommuneplanens arealdel / Innspill
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          {valgtOmrade.navn}
        </h1>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Her behandles innspillene for {valgtOmrade.navn}. Hvert innspill har
          egen behandlingsside med innspillstekst, kommunedirektørens vurdering,
          partienes kommentarer og omforent innspill.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Innspill i {valgtOmrade.navn}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {valgtOmrade.innspill.length} innspill
            </p>
          </div>

          <button className="w-fit rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
            Eksporter område
          </button>
        </div>

        <div className="mt-6 grid gap-3">
          {valgtOmrade.innspill.map((sak) => (
            <Link
              key={sak.nummer}
              href={`/saker/${id}/innspill/${omrade}/${sak.nummer}`}
              className="block rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Innspill {sak.nummer} · {sak.saksnummer}
                  </p>

                  <h3 className="mt-1 font-bold">{sak.tittel}</h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {sak.innsender}
                    {sak.paVegneAv ? ` / ${sak.paVegneAv}` : ""}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusKlasse(
                    sak.status,
                  )}`}
                >
                  {sak.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

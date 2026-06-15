import Link from "next/link";
import { hentInnspillOmrade } from "@/lib/kpa/innspill";
import { hentKommentarer } from "@/app/actions/kommentarer";

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

  const kommentarKapittel = `innspill-${omrade}`;

  const kommentarerPerInnspill = await Promise.all(
    valgtOmrade.innspill.map(async (sak) => {
      const kommentarer = await hentKommentarer(
        id,
        kommentarKapittel,
        String(sak.nummer)
      );

      const partier = [
        ...new Set(
          kommentarer
            .map((kommentar) => kommentar.parti)
            .filter((parti): parti is string => Boolean(parti))
        ),
      ];

      return {
        nummer: sak.nummer,
        kommentarer,
        partier,
      };
    })
  );

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
          {valgtOmrade.innspill.map((sak) => {
            const kommentarData = kommentarerPerInnspill.find(
              (item) => item.nummer === sak.nummer
            );

            const antallKommentarer =
              kommentarData?.kommentarer.length ?? 0;

            const partierMedKommentarer = kommentarData?.partier ?? [];

            return (
              <Link
                key={sak.nummer}
                href={`/saker/${id}/innspill/${omrade}/${sak.nummer}`}
                className={`block rounded-xl border p-4 hover:bg-slate-50 ${
                  antallKommentarer > 0
                    ? "border-amber-300"
                    : "border-slate-200"
                }`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Innspill {sak.nummer} · {sak.saksnummer}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-3">
                      <h3 className="font-bold">{sak.tittel}</h3>

                      {antallKommentarer > 0 ? (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                          {antallKommentarer} kommentarer
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      {sak.innsender}
                      {sak.paVegneAv ? ` / ${sak.paVegneAv}` : ""}
                    </p>

                    {partierMedKommentarer.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-2">
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

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusKlasse(
                      sak.status
                    )}`}
                  >
                    {sak.status}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

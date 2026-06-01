import Link from "next/link";

type OmforentInnspillProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OmforentInnspill({
  params,
}: OmforentInnspillProps) {
  const { id } = await params;

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

          <button className="w-fit rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
            Eksporter Word
          </button>
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
          <p className="text-sm font-medium text-slate-600">
            Kommer i neste fase.
          </p>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";

type InnspillProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Innspill({ params }: InnspillProps) {
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
        <p className="text-sm font-medium text-slate-500">
          Kommuneplanens arealdel
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Innspill</h1>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Her kommer behandlingsstruktur for innspillene til kommuneplanens
          arealdel.
        </p>

        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
          <p className="text-sm font-medium text-slate-600">
            Kommer i neste fase.
          </p>
        </div>
      </section>
    </div>
  );
}

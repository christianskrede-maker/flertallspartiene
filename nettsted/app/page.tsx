import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">

        <Image
          src="/asker-kommune.png"
          alt="Asker kommune"
          width={120}
          height={120}
          priority
        />

        <h1 className="mt-6 text-4xl font-bold md:text-5xl">
          Flertallspartiene i Asker
        </h1>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
          <Image src="/hoyre.png" alt="Høyre" width={90} height={90} />
          <Image src="/frp.png" alt="FrP" width={90} height={90} />
          <Image src="/venstre.png" alt="Venstre" width={90} height={90} />
          <Image src="/krf.png" alt="KrF" width={90} height={90} />
        </div>

        <p className="mt-10 max-w-xl text-slate-300">
          Lukket koordineringsportal for flertallspartiene i Asker.
        </p>

        <button className="mt-10 rounded-xl bg-white px-8 py-4 font-semibold text-slate-950 shadow-lg">
          Logg inn med mobil
        </button>

        <p className="mt-6 text-xs text-slate-500">
          Tilgang gis kun til forhåndsgodkjente telefonnumre.
        </p>

      </section>
    </main>
  );
}

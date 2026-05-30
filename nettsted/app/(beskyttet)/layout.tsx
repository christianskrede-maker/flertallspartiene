import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function BeskyttetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const telefon = cookieStore.get("telefon");

  if (!telefon) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <Image src="/asker-kommune.png" alt="Asker kommune" width={48} height={48} />
            <div>
              <h1 className="text-xl font-bold">Flertallsportalen Asker</h1>
              <p className="text-sm text-slate-500">Sikker innlogging aktiv</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Image src="/hoyre.png" alt="Høyre" width={40} height={40} />
            <Image src="/frp.png" alt="FrP" width={40} height={40} />
            <Image src="/venstre.png" alt="Venstre" width={40} height={40} />
            <Image src="/krf.png" alt="KrF" width={40} height={40} />
          </div>
        </div>
      </header>

      {children}
    </main>
  );
}

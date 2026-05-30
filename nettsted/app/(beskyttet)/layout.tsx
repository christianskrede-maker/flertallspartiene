import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { logout } from "../actions/logout";

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
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/asker-kommune.png"
                alt="Asker kommune"
                width={48}
                height={48}
              />

              <div>
                <h1 className="text-xl font-bold">
                  Flertallsportalen Asker
                </h1>

                <p className="text-sm text-slate-500">
                  Sikker innlogging aktiv
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Image src="/hoyre.png" alt="Høyre" width={36} height={36} />
              <Image src="/frp.png" alt="FrP" width={36} height={36} />
              <Image src="/venstre.png" alt="Venstre" width={36} height={36} />
              <Image src="/krf.png" alt="KrF" width={36} height={36} />
            </div>
          </div>

          <nav className="mt-4 flex flex-wrap items-center gap-2 border-t pt-4">
            <Link
              href="/dashboard"
              className="rounded-lg px-3 py-2 text-sm hover:bg-slate-100"
            >
              Dashboard
            </Link>

            <Link
              href="/saker"
              className="rounded-lg px-3 py-2 text-sm hover:bg-slate-100"
            >
              Saker
            </Link>

            <Link
              href="/admin"
              className="rounded-lg px-3 py-2 text-sm hover:bg-slate-100"
            >
              Admin
            </Link>

            <form action={logout} className="ml-auto">
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Logg ut
              </button>
            </form>
          </nav>
        </div>
      </header>

      {children}
    </main>
  );
}

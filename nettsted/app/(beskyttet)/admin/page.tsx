import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function skjulTelefon(telefon: string) {
  return telefon.slice(0, 3) + " *****" + telefon.slice(-2);
}

async function leggTilBruker(formData: FormData) {
  "use server";

  const navn = String(formData.get("navn") ?? "").trim();
  const telefon = String(formData.get("telefon") ?? "").replace(/\s/g, "");
  const parti_id = Number(formData.get("parti_id"));
  const rolle = String(formData.get("rolle") ?? "bruker");

  if (!navn || !telefon || !parti_id) {
    return;
  }

  await supabase.from("brukere").insert({
    navn,
    telefon,
    parti_id,
    rolle,
    aktiv: true,
  });

  revalidatePath("/admin");
}

async function oppdaterBruker(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));
  const parti_id = Number(formData.get("parti_id"));
  const rolle = String(formData.get("rolle") ?? "bruker");
  const aktiv = String(formData.get("aktiv") ?? "true") === "true";

  if (!id || !parti_id) {
    return;
  }

  const { error } = await supabase
    .from("brukere")
    .update({
      parti_id,
      rolle,
      aktiv,
    })
    .eq("id", id);

  if (error) {
    console.error("Kunne ikke oppdatere bruker:", error.message);
    return;
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const telefon = cookieStore.get("telefon")?.value;

  if (!telefon) {
    redirect("/login");
  }

  const { data: innloggetBruker } = await supabase
    .from("brukere")
    .select("rolle")
    .eq("telefon", telefon)
    .single();

  if (!innloggetBruker || innloggetBruker.rolle !== "admin") {
    redirect("/dashboard");
  }

  const { data: brukere } = await supabase
    .from("brukere")
    .select("id, navn, telefon, rolle, aktiv, parti_id")
    .order("id", { ascending: true });

  const { data: partier } = await supabase
    .from("partier")
    .select("id, navn")
    .order("id", { ascending: true });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <h2 className="text-2xl font-bold sm:text-3xl">Administrasjon</h2>

      <p className="mt-2 text-slate-600">
        Kun administratorer har tilgang til denne siden.
      </p>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <h3 className="text-xl font-bold">Legg til bruker</h3>

        <form action={leggTilBruker} className="mt-5 grid gap-4 lg:grid-cols-5">
          <input
            name="navn"
            required
            placeholder="Navn"
            className="rounded-xl border p-3"
          />

          <input
            name="telefon"
            required
            placeholder="+47..."
            className="rounded-xl border p-3"
          />

          <select name="parti_id" required className="rounded-xl border p-3">
            {partier?.map((parti) => (
              <option key={parti.id} value={parti.id}>
                {parti.navn}
              </option>
            ))}
          </select>

          <select name="rolle" required className="rounded-xl border p-3">
            <option value="bruker">Bruker</option>
            <option value="gruppeleder">Gruppeleder</option>
            <option value="admin">Admin</option>
          </select>

          <button className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white">
            Legg til
          </button>
        </form>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b px-6 py-5">
          <h3 className="text-xl font-bold">Godkjente brukere</h3>
          <p className="mt-1 text-sm text-slate-500">
            Brukere kan deaktiveres uten å slette historikk.
          </p>
        </div>

        <div className="space-y-4 p-4">
          {brukere?.map((bruker) => (
            <form
              key={bruker.id}
              action={oppdaterBruker}
              className="grid gap-4 rounded-xl border p-4 lg:grid-cols-6 lg:items-center"
            >
              <input type="hidden" name="id" value={bruker.id} />

              <div>
                <p className="text-xs text-slate-500">Navn</p>
                <p className="font-semibold">{bruker.navn}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Telefon</p>
                <p>{skjulTelefon(bruker.telefon)}</p>
              </div>

              <select
                name="parti_id"
                defaultValue={String(bruker.parti_id)}
                className="rounded-lg border p-2 text-sm"
              >
                {partier?.map((parti) => (
                  <option key={parti.id} value={String(parti.id)}>
                    {parti.navn}
                  </option>
                ))}
              </select>

              <select
                name="rolle"
                defaultValue={bruker.rolle}
                className="rounded-lg border p-2 text-sm"
              >
                <option value="bruker">Bruker</option>
                <option value="gruppeleder">Gruppeleder</option>
                <option value="admin">Admin</option>
              </select>

              <select
                name="aktiv"
                defaultValue={String(bruker.aktiv)}
                className="rounded-lg border p-2 text-sm"
              >
                <option value="true">Aktiv</option>
                <option value="false">Inaktiv</option>
              </select>

              <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                Oppdater
              </button>
            </form>
          ))}
        </div>
      </section>
    </div>
  );
}

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function skjulTelefon(telefon: string) {
return telefon.slice(0, 3) + " *****" + telefon.slice(-2);
}

async function leggTilBruker(formData: FormData) {
"use server";

const navn = String(formData.get("navn"));
const telefon = String(formData.get("telefon")).replace(/\s/g, "");
const parti_id = Number(formData.get("parti_id"));
const rolle = String(formData.get("rolle"));

await supabase.from("brukere").insert({
navn,
telefon,
parti_id,
rolle,
aktiv: true,
});

revalidatePath("/admin");
}

export default async function AdminPage() {
const { data: brukere } = await supabase
.from("brukere")
.select("id, navn, telefon, rolle, aktiv, partier(navn)")
.order("id", { ascending: true });

const { data: partier } = await supabase
.from("partier")
.select("id, navn")
.order("id", { ascending: true });

return ( <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10"> <h2 className="text-2xl font-bold sm:text-3xl">
Administrasjon </h2>

```
  <p className="mt-2 text-slate-600">
    Kun administratorer har tilgang til denne siden.
  </p>

  <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
    <h3 className="text-xl font-bold">Legg til bruker</h3>

    <form
      action={leggTilBruker}
      className="mt-5 grid gap-4 lg:grid-cols-5"
    >
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

      <select
        name="parti_id"
        required
        className="rounded-xl border p-3"
      >
        {partier?.map((parti) => (
          <option key={parti.id} value={parti.id}>
            {parti.navn}
          </option>
        ))}
      </select>

      <select
        name="rolle"
        required
        className="rounded-xl border p-3"
      >
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
      <h3 className="text-xl font-bold">
        Godkjente brukere
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Kun telefonnumre som er lagt inn her skal kunne få tilgang.
      </p>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4">Navn</th>
            <th className="p-4">Telefon</th>
            <th className="p-4">Parti</th>
            <th className="p-4">Rolle</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {brukere?.map((bruker: any) => (
            <tr
              key={bruker.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="p-4 font-semibold">
                {bruker.navn}
              </td>

              <td className="p-4">
                {skjulTelefon(bruker.telefon)}
              </td>

              <td className="p-4">
                {bruker.partier?.navn}
              </td>

              <td className="p-4 capitalize">
                {bruker.rolle}
              </td>

              <td className="p-4">
                {bruker.aktiv ? "Aktiv" : "Inaktiv"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
</div>

);
}

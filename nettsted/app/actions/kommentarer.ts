"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function leggTilKommentar(formData: FormData) {
  const cookieStore = await cookies();
  const telefon = cookieStore.get("telefon")?.value;

  if (!telefon) {
    redirect("/login");
  }

  const sak_id = String(formData.get("sak_id") ?? "");
  const kapittel = String(formData.get("kapittel") ?? "");
  const delpunkt = String(formData.get("delpunkt") ?? "");
  const tekstutdrag = String(formData.get("tekstutdrag") ?? "");
  const kommentar = String(formData.get("kommentar") ?? "").trim();

  if (!sak_id || !kapittel || !delpunkt || !kommentar) {
    return;
  }

  await supabaseAdmin.from("kommentarer").insert({
    sak_id,
    kapittel,
    delpunkt,
    tekstutdrag,
    kommentar,
    telefon,
  });

  revalidatePath(`/saker/${sak_id}/kapittel/${kapittel}`);
}

export async function hentKommentarer(
  sak_id: string,
  kapittel: string,
  delpunkt: string
) {
  const { data: kommentarer } = await supabaseAdmin
    .from("kommentarer")
    .select("*")
    .eq("sak_id", sak_id)
    .eq("kapittel", kapittel)
    .eq("delpunkt", delpunkt)
    .order("opprettet", { ascending: true });

  if (!kommentarer || kommentarer.length === 0) {
    return [];
  }

  const telefoner = kommentarer.map((kommentar) => kommentar.telefon);

  const { data: brukere } = await supabaseAdmin
    .from("brukere")
    .select("navn, telefon")
    .in("telefon", telefoner);

  return kommentarer.map((kommentar) => {
    const bruker = brukere?.find(
      (item) => item.telefon === kommentar.telefon
    );

    return {
      ...kommentar,
      navn: bruker?.navn ?? kommentar.telefon,
    };
  });
}

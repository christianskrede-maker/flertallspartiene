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
  const forelder_id_raw = String(formData.get("forelder_id") ?? "").trim();
  const forelder_id = forelder_id_raw ? forelder_id_raw : null;

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
    forelder_id,
  });

  revalidatePath(`/saker/${sak_id}/kapittel/${kapittel}`);
}

export async function hentKommentarer(
  sak_id: string,
  kapittel: string,
  delpunkt: string
) {
  const cookieStore = await cookies();
  const innloggetTelefon = cookieStore.get("telefon")?.value ?? "";

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

  const telefoner = kommentarer.map((k) => k.telefon);

  const { data: brukere } = await supabaseAdmin
    .from("brukere")
    .select("navn, telefon, parti_id")
    .in("telefon", telefoner);

  const partiIder = brukere?.map((b) => b.parti_id) ?? [];

  const { data: partier } = await supabaseAdmin
    .from("partier")
    .select("*")
    .in("id", partiIder);

  return kommentarer.map((kommentar) => {
    const bruker = brukere?.find((b) => b.telefon === kommentar.telefon);

    const parti = partier?.find((p) => p.id === bruker?.parti_id);

    return {
      ...kommentar,
      navn: bruker?.navn ?? kommentar.telefon,
      parti: parti?.forkortelse ?? "",
      partiNavn: parti?.navn ?? "",
      kanRedigere: kommentar.telefon === innloggetTelefon,
    };
  });
}

export async function redigerKommentar(formData: FormData) {
  const cookieStore = await cookies();
  const telefon = cookieStore.get("telefon")?.value;

  if (!telefon) {
    redirect("/login");
  }

  const kommentarId = String(formData.get("kommentar_id") ?? "");
  const nyKommentar = String(formData.get("kommentar") ?? "").trim();

  if (!kommentarId || !nyKommentar) {
    return;
  }

  const { data: eksisterende } = await supabaseAdmin
    .from("kommentarer")
    .select("*")
    .eq("id", kommentarId)
    .single();

  if (!eksisterende) {
    return;
  }

  if (eksisterende.telefon !== telefon) {
    return;
  }

  await supabaseAdmin
    .from("kommentarer")
    .update({
      kommentar: nyKommentar,
    })
    .eq("id", kommentarId);

  revalidatePath(
    `/saker/${eksisterende.sak_id}/kapittel/${eksisterende.kapittel}`
  );
}

export async function slettKommentar(formData: FormData) {
  const cookieStore = await cookies();
  const telefon = cookieStore.get("telefon")?.value;

  if (!telefon) {
    redirect("/login");
  }

  const kommentarId = String(formData.get("kommentar_id") ?? "");

  if (!kommentarId) {
    return;
  }

  const { data: eksisterende } = await supabaseAdmin
    .from("kommentarer")
    .select("*")
    .eq("id", kommentarId)
    .single();

  if (!eksisterende) {
    return;
  }

  if (eksisterende.telefon !== telefon) {
    return;
  }

  await supabaseAdmin
    .from("kommentarer")
    .delete()
    .or(`id.eq.${kommentarId},forelder_id.eq.${kommentarId}`);

  revalidatePath(
    `/saker/${eksisterende.sak_id}/kapittel/${eksisterende.kapittel}`
  );
}

export async function hentOmforentInnspill(
  sak_id: string,
  kapittel: string,
  delpunkt: string,
  type: "bestemmelse" | "spesialmerknad"
) {
  const { data } = await supabaseAdmin
    .from("omforent_innspill")
    .select("*")
    .eq("sak_id", sak_id)
    .eq("kapittel", kapittel)
    .eq("delpunkt", delpunkt)
    .eq("type", type)
    .maybeSingle();

  return data;
}

export async function lagreOmforentInnspill(formData: FormData) {
  const cookieStore = await cookies();
  const telefon = cookieStore.get("telefon")?.value;

  if (!telefon) {
    redirect("/login");
  }

  const sak_id = String(formData.get("sak_id") ?? "");
  const kapittel = String(formData.get("kapittel") ?? "");
  const delpunkt = String(formData.get("delpunkt") ?? "");
  const type = String(formData.get("type") ?? "");
  const tekst = String(formData.get("tekst") ?? "").trim();

  if (
    !sak_id ||
    !kapittel ||
    !delpunkt ||
    (type !== "bestemmelse" && type !== "spesialmerknad")
  ) {
    return;
  }

  const { data: eksisterende } = await supabaseAdmin
    .from("omforent_innspill")
    .select("*")
    .eq("sak_id", sak_id)
    .eq("kapittel", kapittel)
    .eq("delpunkt", delpunkt)
    .eq("type", type)
    .maybeSingle();

  if (eksisterende) {
    await supabaseAdmin
      .from("omforent_innspill")
      .update({
        tekst,
        sist_endret: new Date().toISOString(),
      })
      .eq("id", eksisterende.id);
  } else {
    await supabaseAdmin.from("omforent_innspill").insert({
      sak_id,
      kapittel,
      delpunkt,
      type,
      tekst,
      sist_endret: new Date().toISOString(),
    });
  }

  revalidatePath(`/saker/${sak_id}/kapittel/${kapittel}`);
}

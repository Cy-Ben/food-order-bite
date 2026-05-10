import supabase from "./supabaseClient";

// ================= ADD =================
export const addPlat = async (form) => {
  const { data, error } = await supabase
    .from("plat")
    .insert([form])
    .select();

  if (error) {
    console.log("ADD ERROR :", error.message);
    return null;
  }

  return data;
};

// ================= DELETE =================
export const deletePlat = async (id) => {
  const { data, error } = await supabase
    .from("plat")
    .delete()
    .eq("idplat", id)
    .select();

  if (error) {
    console.log("DELETE ERROR :", error.message);
    return null;
  }

  return data;
};

// ================= UPDATE =================
export const updatePlat = async (id, form) => {
  const { data, error } = await supabase
    .from("plat")
    .update(form)
    .eq("idplat", id)
    .select();

  if (error) {
    console.log("UPDATE ERROR :", error.message);
    return null;
  }

  return data;
};
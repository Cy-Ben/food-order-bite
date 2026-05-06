import React, { useEffect, useState } from "react";
import supabase from "../../api/supabaseClient";
import { deletePlat, updatePlat } from "../../api/platApi";
import AddPlatForm from "../AddPlatForm/AddPlatForm";

const categories = [
  "Burger",
  "Pizza",
  "Pasta",
  "Grillades",
  "Salade",
  "Végétarien",
  "Traditionnel",
  "Dessert",
  "Boissons"
];

const PlatsPage = () => {

  const [activeCat, setActiveCat] = useState("Burger");
  const [plats, setPlats] = useState([]);

  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});

  const fetchPlats = async (cat) => {
    const { data } = await supabase
      .from("plat")
      .select("*")
      .eq("categorie", cat);

    setPlats(data || []);
  };

  useEffect(() => {
    fetchPlats(activeCat);
  }, [activeCat]);

  const handleDelete = async (id) => {
    await deletePlat(id);
    fetchPlats(activeCat);
  };

  const startEdit = (p) => {
    setEditId(p.idplat);
    setForm({
      ...p,
      disponibilite: Boolean(p.disponibilite)
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "prix"
          ? Number(value)
          : name === "disponibilite"
          ? value === "true"
          : value
    });
  };

  const handleUpdate = async () => {
    await updatePlat(editId, form);
    setEditId(null);
    fetchPlats(activeCat);
  };

  return (
    <div>

      <h2>Gestion des plats</h2>

      <AddPlatForm onSuccess={() => fetchPlats(activeCat)} />

      {/* CATEGORIES */}
      <div>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            style={{
              margin: 5,
              background: activeCat === cat ? "black" : "#eee",
              color: activeCat === cat ? "white" : "black"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LISTE */}
      {plats.map(p => (
        <div key={p.idplat} style={{ borderBottom: "1px solid #ddd", padding: 10 }}>

          <p><b>{p.nomplat}</b> - {p.prix} DA</p>

          {!p.disponibilite && (
            <p style={{ color: "red" }}>
              ❌ Plat non disponible
            </p>
          )}

          <button onClick={() => startEdit(p)}>Modifier</button>
          <button onClick={() => handleDelete(p.idplat)}>Supprimer</button>

          {editId === p.idplat && (
            <div>

              <input name="nomplat" value={form.nomplat || ""} onChange={handleChange} />
              <input name="description" value={form.description || ""} onChange={handleChange} />
              <input name="prix" value={form.prix || ""} onChange={handleChange} />

              <select
                name="disponibilite"
                value={String(form.disponibilite)}
                onChange={handleChange}
              >
                <option value="true">Disponible</option>
                <option value="false">Non disponible</option>
              </select>

              <button onClick={handleUpdate}>Save</button>

            </div>
          )}

        </div>
      ))}

    </div>
  );
};

export default PlatsPage;
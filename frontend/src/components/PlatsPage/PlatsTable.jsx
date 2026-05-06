import React, { useEffect, useState } from "react";
import supabase from "../../api/supabaseClient";
import { deletePlat, updatePlat } from "../../api/platApi";

const PlatsTable = () => {

  const [plats, setPlats] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});

  const fetchPlats = async () => {
    const { data } = await supabase.from("plat").select("*");
    setPlats(data || []);
  };

  useEffect(() => {
    fetchPlats();
  }, []);

  const handleDelete = async (id) => {
    await deletePlat(id);
    fetchPlats();
  };

  const startEdit = (p) => {
    setEditId(p.idplat);
    setForm(p);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await updatePlat(editId, form);
    setEditId(null);
    fetchPlats();
  };

  return (
    <div>

      {plats.map((p) => (
        <div key={p.idplat} style={{
          border: "1px solid #ddd",
          padding: 10,
          marginTop: 10
        }}>

          <img
            src={p.image_name}
            width="100"
            height="80"
            style={{ objectFit: "cover" }}
          />

          <h3>{p.nomplat}</h3>
          <p>{p.categorie}</p>
          <p>{p.prix} DA</p>

          <button onClick={() => startEdit(p)}>✏️ Modifier</button>
          <button onClick={() => handleDelete(p.idplat)}>❌ Supprimer</button>

          {editId === p.idplat && (
            <div>

              <input name="nomplat" value={form.nomplat} onChange={handleChange} />
              <input name="description" value={form.description} onChange={handleChange} />
              <input name="prix" value={form.prix} onChange={handleChange} />
              <input name="categorie" value={form.categorie} onChange={handleChange} />
              <input name="image_name" value={form.image_name} onChange={handleChange} />

              <button onClick={handleUpdate}>💾 Save</button>

            </div>
          )}

        </div>
      ))}

    </div>
  );
};

export default PlatsTable;
import React, { useState } from "react";
import { addPlat } from "../../api/platApi";

const AddPlatForm = ({ onSuccess }) => {

  const [form, setForm] = useState({
    nomplat: "",
    description: "",
    prix: "",
    categorie: "Burger",
    image_name: "",
    disponibilite: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "disponibilite"
          ? value === "true"
          : value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // 🔴 VALIDATION
  if (
    !form.nomplat ||
    !form.description ||
    !form.prix ||
    !form.categorie ||
    !form.image_name
  ) {
    alert("⚠️ Veuillez remplir tous les champs");
    return;
  }

  const dataToSend = {
    ...form,
    prix: Number(form.prix)
  };

  const result = await addPlat(dataToSend);

  if (result) {
    alert("Ajout réussi ✅");

    setForm({
      nomplat: "",
      description: "",
      prix: "",
      categorie: "Burger",
      image_name: "",
      disponibilite: true
    });

    if (onSuccess) onSuccess();
  } else {
    alert("Erreur ❌");
  }
};

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>

      <input name="nomplat" value={form.nomplat} onChange={handleChange} placeholder="Nom" />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <input name="prix" value={form.prix} onChange={handleChange} placeholder="Prix" />

      <select name="categorie" value={form.categorie} onChange={handleChange}>
        <option value="Burger">Burger</option>
        <option value="Pizza">Pizza</option>
        <option value="Pasta">Pasta</option>
        <option value="Grillades">Grillades</option>
        <option value="Salade">Salade</option>
        <option value="Végétarien">Végétarien</option>
        <option value="Traditionnel">Traditionnel</option>
        <option value="Dessert">Dessert</option>
        <option value="Boissons">Boissons</option>
      </select>

      <input name="image_name" value={form.image_name} onChange={handleChange} placeholder="Image URL" />

      <select name="disponibilite" value={String(form.disponibilite)} onChange={handleChange}>
        <option value="true">Disponible</option>
        <option value="false">Non disponible</option>
      </select>

      <button type="submit">
        Ajouter
      </button>

    </form>
  );
};

export default AddPlatForm;
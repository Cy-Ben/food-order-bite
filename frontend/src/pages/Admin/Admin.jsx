import React, { useState, useEffect } from "react";
import "./Admin.css";

import PlatsPage from "../../components/PlatsPage/PlatsPage";
import CategoryList from "../../components/CategoryList/CategoryList";

import {
    FaStore, FaChartBar, FaBox, FaHamburger, FaUsers,
    FaTruck, FaGift, FaStar, FaCalendar, FaCreditCard,
    FaBars
} from "react-icons/fa";

import { supabase } from "../../api/supabaseClient";

const Admin = () => {

    const [page, setPage] = useState("profil");
    const [open, setOpen] = useState(false);

    // PROMOTIONS STATES
    const [plats, setPlats] = useState([]);
    const [selectedPlats, setSelectedPlats] = useState([]);
    const [taux, setTaux] = useState(20);
    const [debut, setDebut] = useState("");
    const [fin, setFin] = useState("");
    const [promotions, setPromotions] = useState([]);

    // CATEGORY STATE
    const [category, setCategory] = useState("Tout");

    const menu = [
        { key: "profil", label: "Profil", icon: <FaStore /> },
        { key: "dashboard", label: "Dashboard", icon: <FaChartBar /> },
        { key: "commandes", label: "Commandes", icon: <FaBox /> },
        { key: "plats", label: "Plats", icon: <FaHamburger /> },
        { key: "clients", label: "Clients", icon: <FaUsers /> },
        { key: "livreurs", label: "Livreurs", icon: <FaTruck /> },
        { key: "promotions", label: "Promotions", icon: <FaGift /> },
        { key: "fidelite", label: "Fidélité", icon: <FaStar /> },
        { key: "reservations", label: "Réservations", icon: <FaCalendar /> },
        { key: "paiements", label: "Paiements", icon: <FaCreditCard /> },
    ];

    // CHARGER PLATS
    useEffect(() => {
        const fetchPlats = async () => {
            const { data } = await supabase.from("plat").select("*");
            setPlats(data || []);
        };
        fetchPlats();
    }, []);

    // CHARGER PROMOTIONS
    useEffect(() => {
        const fetchPromotions = async () => {
            const { data } = await supabase
                .from("promotionplat")
                .select(`*, plat(nomplat)`);
            setPromotions(data || []);
        };
        fetchPromotions();
    }, []);

    // RESET SELECTION SI CATEGORY CHANGE
    useEffect(() => {
        setSelectedPlats([]);
    }, [category]);

    // SELECT PLATS
    const togglePlat = (id) => {
        setSelectedPlats((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    // SUPPRIMER PROMOTION
    const supprimerPromo = async (idpromoplat) => {
        await supabase
            .from("promotionplat")
            .delete()
            .eq("idpromoplat", idpromoplat);

        setPromotions(prev => prev.filter(p => p.idpromoplat !== idpromoplat));
    };

    // CREATE PROMO
    const appliquerPromo = async () => {

        if (!debut || !fin) return alert("Remplir les dates !");
        if (new Date(debut) >= new Date(fin)) return alert("Dates invalides !");
        if (selectedPlats.length === 0) return alert("Sélectionner des plats !");

        for (let idplat of selectedPlats) {
            const { data } = await supabase
                .from("promotionplat")
                .insert([{
                    idplat,
                    tauxreduction: taux,
                    datedebutpromo: debut,
                    datefinpromo: fin
                }])
                .select(`*, plat(nomplat)`)
                .single();

            if (data) {
                setPromotions(prev => [...prev, data]);
            }
        }

        alert("Promotion ajoutée !");
        setSelectedPlats([]);
    };

    // FILTRAGE PLATS
    const platsFiltres =
        category === "Tout"
            ? plats
            : plats.filter(p => p.categorie === category); // ⚠️ adapte si besoin

    return (
        <div className="admin-page">

            {/* HERO */}
            <div className="admin-hero">
                <div className="admin-hero-overlay">
                    <h1>Admin Dashboard</h1>
                    <p>Gestion complète du restaurant</p>
                </div>
            </div>

            <div className="admin-container">

                {/* SIDEBAR */}
                <div className={`sidebar ${open ? "open" : ""}`}>
                    <button className="toggle-btn" onClick={() => setOpen(!open)}>
                        <FaBars />
                    </button>

                    <h2>Admin</h2>

                    {menu.map(item => (
                        <button
                            key={item.key}
                            className={page === item.key ? "active" : ""}
                            onClick={() => {
                                setPage(item.key);
                                setOpen(false);
                            }}
                        >
                            {item.icon} {item.label}
                        </button>
                    ))}
                </div>

                {/* CONTENT */}
                <div className="content">

                    {page === "profil" && (
                        <div className="profil-container">
                            <div className="profil-overlay">
                                <h2>Order & Bite Dashboard</h2>
                            </div>
                        </div>
                    )}

                    {page === "dashboard" && (
                        <div className="stats">
                            <div className="card">CA : 120000 DA</div>
                            <div className="card">Commandes : 320</div>
                            <div className="card">Clients : 150</div>
                            <div className="card">Livreurs actifs : 5</div>
                        </div>
                    )}

                    {page === "commandes" && <h2>Commandes</h2>}
                    {page === "plats" && <PlatsPage />}
                    {page === "clients" && <h2>Clients</h2>}
                    {page === "livreurs" && <h2>Livreurs</h2>}

                    {/* PROMOTIONS */}
                    {page === "promotions" && (
                        <div className="promotions-container">

                            <h2>Gestion des promotions</h2>

                            {/* FORMULAIRE */}
                            <div className="promo-form">

                                <div className="promo-form-row">
                                    <label>Taux de réduction</label>
                                    <select
                                        value={taux}
                                        onChange={(e) => setTaux(Number(e.target.value))}
                                    >
                                        <option value={10}>10%</option>
                                        <option value={15}>15%</option>
                                        <option value={20}>20%</option>
                                        <option value={50}>50%</option>
                                        <option value={75}>75%</option>
                                    </select>
                                </div>

                                <div className="promo-form-row">
                                    <label>Date début</label>
                                    <input
                                        type="date"
                                        value={debut}
                                        onChange={(e) => setDebut(e.target.value)}
                                    />
                                </div>

                                <div className="promo-form-row">
                                    <label>Date fin</label>
                                    <input
                                        type="date"
                                        value={fin}
                                        onChange={(e) => setFin(e.target.value)}
                                    />
                                </div>

                                <button className="promo-btn" onClick={appliquerPromo}>
                                    Créer promotion
                                </button>
                            </div>

                            <hr />

                            {/* CATEGORIES */}
                            <CategoryList
                                category={category}
                                setCategory={setCategory}
                            />

                            <h3>Choisir les plats</h3>

                            {/* PLATS FILTRÉS */}
                            <div className="promo-plats-grid">
                                {platsFiltres.map((p) => (
                                    <div
                                        key={p.idplat}
                                        onClick={() => togglePlat(p.idplat)}
                                        className={`promo-plat-card ${selectedPlats.includes(p.idplat) ? "selected" : ""}`}
                                    >
                                        {p.nomplat}
                                    </div>
                                ))}
                            </div>

                            <hr />

                            {/* PROMOTIONS */}
                            <h3>Promotions actives</h3>

                            <div className="promo-list">
                                {promotions.length === 0 && <p>Aucune promotion</p>}

                                {promotions.map((promo) => (
                                    <div key={promo.idpromoplat} className="promo-item">
                                        <span>{promo.plat?.nomplat}</span>
                                        <span>{promo.tauxreduction}%</span>
                                        <span>{promo.datedebutpromo} → {promo.datefinpromo}</span>

                                        <button
                                            className="promo-delete-btn"
                                            onClick={() => supprimerPromo(promo.idpromoplat)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                ))}
                            </div>

                        </div>
                    )}

                    {page === "fidelite" && <h2>Fidélité</h2>}
                    {page === "reservations" && <h2>Réservations</h2>}
                    {page === "paiements" && <h2>Paiements</h2>}

                </div>
            </div>
        </div>
    );
};

export default Admin;
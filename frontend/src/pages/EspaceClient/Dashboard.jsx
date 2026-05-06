import React, { useState } from "react";
import "./Dashboard.css";
import {
    FaMapMarkerAlt,
    FaHeart,
    FaHistory,
    FaPlus,
    FaTrash,
    FaUser,
    FaBars,
    FaEnvelope,
    FaPhone,
    FaIdBadge
} from "react-icons/fa";

const Dashboard = ({ user }) => {

    const [page, setPage] = useState("adresses");
    const [open, setOpen] = useState(false);

    const menu = [
        { key: "profil", label: "Profil", icon: <FaUser /> },
        { key: "adresses", label: "Adresses", icon: <FaMapMarkerAlt /> },
        { key: "favoris", label: "Favoris", icon: <FaHeart /> },
        { key: "activite", label: "Activité", icon: <FaHistory /> },
    ];

    const [addresses, setAddresses] = useState([]);
    const [input, setInput] = useState("");

    const addAddress = () => {
        if (input.trim() === "") return;
        setAddresses([...addresses, input]);
        setInput("");
    };

    const deleteAddress = (i) => {
        setAddresses(addresses.filter((_, index) => index !== i));
    };

    return (
        <div className="client-container">

            {/* SIDEBAR */}
            <div className={`sidebar ${open ? "open" : ""}`}>

                <button className="toggle-btn" onClick={() => setOpen(!open)}>
                    <FaBars />
                </button>

                <h2>Client</h2>

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

                {/* PROFIL */}
                {page === "profil" && (
                    <div className="page">

                        <h2>Mon profil</h2>

                        <div className="profile-card">

                            <div className="profile-header">

                                <div className="avatar-icon">
                                    <FaUser />
                                </div>

                                <div>
                                    <h3>{user?.prenom} {user?.nom}</h3>
                                    <p className="role">
                                        <FaIdBadge /> Compte utilisateur
                                    </p>
                                </div>

                            </div>

                            <div className="profile-info">

                                <div className="info-row">
                                    <span><FaUser /> Prénom</span>
                                    <strong>{user?.prenom}</strong>
                                </div>

                                <div className="info-row">
                                    <span><FaUser /> Nom</span>
                                    <strong>{user?.nom}</strong>
                                </div>

                                <div className="info-row">
                                    <span><FaEnvelope /> Email</span>
                                    <strong>{user?.email}</strong>
                                </div>

                                <div className="info-row">
                                    <span><FaPhone /> Téléphone</span>
                                    <strong>{user?.telephone}</strong>
                                </div>

                            </div>

                        </div>

                    </div>
                )}

                {/* ADRESSES */}
                {page === "adresses" && (
                    <div className="page">

                        <h2>Mes adresses</h2>

                        <div className="add-box">
                            <input
                                type="text"
                                placeholder="Ajouter une adresse..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button onClick={addAddress}>
                                <FaPlus />
                            </button>
                        </div>

                        <div className="address-list">
                            {addresses.map((addr, i) => (
                                <div key={i} className="card">

                                    <div className="left">
                                        <FaMapMarkerAlt />
                                        <span>{addr}</span>
                                    </div>

                                    <FaTrash
                                        className="delete"
                                        onClick={() => deleteAddress(i)}
                                    />

                                </div>
                            ))}
                        </div>

                    </div>
                )}

                {page === "favoris" && <h2>Favoris</h2>}
                {page === "activite" && <h2>Activité récente</h2>}

            </div>

        </div>
    );
};

export default Dashboard;
import React, { useState } from "react";
import "./EspaceClient.css";
import Dashboard from "./Dashboard";
import { FaHandPaper } from "react-icons/fa";

const EspaceClient = ({ user }) => {
    const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard" ou "adresses"

    return (
        <div className="espace-client">
            <div className="client-hero">
                <div className="client-hero-overlay">
                    <h1>
                        Bienvenue {user?.prenom} <FaHandPaper />
                    </h1>
                    <p>Gérez vos commandes et réservations</p>
                </div>
            </div>

            <div className="client-dashboard">
                {/* MENU DES ONGLETS */}
                <div className="client-tabs">
                    <button 
                        className={activeTab === "dashboard" ? "active" : ""} 
                        onClick={() => setActiveTab("dashboard")}
                    >
                        📊 Tableau de bord
                    </button>
                    <button 
                        className={activeTab === "adresses" ? "active" : ""} 
                        onClick={() => setActiveTab("adresses")}
                    >
                        📍 Mes adresses
                    </button>
                </div>

                {/* CONTENU SELON L'ONGLET */}
                {activeTab === "dashboard" && <Dashboard user={user} />}
                
                {activeTab === "adresses" && (
                    <AdressesClient userId={user?.idutilisateur || user?.id} />
                )}
            </div>
        </div>
    );
};

export default EspaceClient;
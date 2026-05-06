import React from "react";
import "./EspaceClient.css";
import Dashboard from "./Dashboard";
import { FaHandPaper } from "react-icons/fa";
const EspaceClient = ({ user }) => {
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

                <Dashboard user={user} />
            </div>
        </div>
    );
};

export default EspaceClient;
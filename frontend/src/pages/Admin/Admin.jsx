import React, { useState } from "react";
import "./Admin.css";

import PlatsPage from "../../components/PlatsPage/PlatsPage";

import {
  FaStore, FaChartBar, FaBox, FaHamburger, FaUsers,
  FaTruck, FaGift, FaStar, FaCalendar, FaCreditCard,
  FaBars
} from "react-icons/fa";

const Admin = () => {

  const [page, setPage] = useState("profil");
  const [open, setOpen] = useState(false);

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

  return (
    <div className="admin-page">

      <div className="admin-container">

        <div className={`sidebar ${open ? "open" : ""}`}>
          <button onClick={() => setOpen(!open)}>
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

        <div className="content">

          {page === "profil" && <h2>Profil</h2>}
          {page === "dashboard" && <h2>Dashboard</h2>}
          {page === "commandes" && <h2>Commandes</h2>}

          {page === "plats" && <PlatsPage />}

        </div>

      </div>
    </div>
  );
};

export default Admin;
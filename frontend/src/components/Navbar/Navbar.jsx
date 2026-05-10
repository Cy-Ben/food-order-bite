import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext"

const Navbar = ({ setShowLogin, setRole, setRoleFixed, setAuthMode }) => {

    const [menu, setMenu] = useState("Accueil")
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const { user, logout } = useAuth()

    // 🎯 redirection logo intelligente
    const handleLogo = () => {
        if (!user) return navigate("/")

        if (user.role === "client") return navigate("/client")
        if (user.role === "admin") return navigate("/admin")
        if (user.role === "livreur") return navigate("/livreur")

        navigate("/")
    }

    const handleLogout = () => {
        const confirm = window.confirm("Se déconnecter ?")
        if (!confirm) return

        logout()
        navigate("/")
    }

    return (
        <div className='navbar'>

            {/* LOGO */}
            <img
                src={assets.logo}
                alt=""
                className="logo"
                onClick={handleLogo}
                style={{ cursor: "pointer" }}
            />

            {/* MENU */}
            <ul className={isOpen ? "navbar-menu active-menu" : "navbar-menu"}>

                <Link to='/'>
                    <li
                        onClick={() => {
                            setMenu("Accueil")
                            setIsOpen(false)
                        }}
                        className={menu === "Accueil" ? "active" : ""}
                    >
                        Accueil
                    </li>
                </Link>

                <li
                    onClick={() => setMenu("Nos services")}
                    className={menu === "Nos services" ? "active" : ""}
                >
                    Nos services
                </li>

                <li
                    onClick={() => setMenu("A propos")}
                    className={menu === "A propos" ? "active" : ""}
                >
                    A propos
                </li>

            </ul>

            {/* RIGHT */}
            <div className="navbar-right">

                {/* si NON connecté */}
                {!user && (
                    <button
                        onClick={() => {
                            setRole("client")
                            setRoleFixed(false)
                            setAuthMode("S'inscrire")
                            setShowLogin(true)
                        }}
                        className="navbar-button"
                    >
                        S'inscrire
                    </button>
                )}

                {/* si CONNECTÉ */}
                {user && (
                    <>
                        <button
                            onClick={() => {
                                if (user.role === "client") navigate("/client")
                                if (user.role === "admin") navigate("/admin")
                                if (user.role === "livreur") navigate("/livreur")
                            }}
                            className="navbar-button"
                        >
                            Mon espace
                        </button>

                        <button
                            onClick={handleLogout}
                            className="navbar-button logout"
                        >
                            Déconnexion
                        </button>
                    </>
                )}

                <div className="burger" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "✕" : "☰"}
                </div>

            </div>

        </div>
    )
}

export default Navbar
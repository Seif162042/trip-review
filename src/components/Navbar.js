import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.link}>🏠 Home</Link>
            <Link to="/feed" style={styles.link}>🌍 Feed</Link>

            {user ? (
                <>
                    <Link to={`/user/${user.id}`} style={styles.link}>👤 My Profile</Link>
                    <button onClick={handleLogout} style={styles.button}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login" style={styles.link}>Login</Link>
                    <Link to="/register" style={styles.link}>Register</Link>
                </>
            )}
        </nav>
    );
}

const styles = {
    nav: {
        padding: "10px",
        backgroundColor: "#f2f2f2",
        display: "flex",
        gap: "15px",
        alignItems: "center"
    },
    link: {
        textDecoration: "none",
        color: "#333",
        fontWeight: "bold"
    },
    button: {
        marginLeft: "auto",
        background: "none",
        border: "none",
        color: "#c00",
        cursor: "pointer",
        fontWeight: "bold"
    }
};

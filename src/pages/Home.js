import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Home() {
    const { user, logout } = useAuth();

    return (
        <div>
            <h1>Welcome {user} 👋</h1>
            <p>This is your Trip Review Dashboard.</p>

            <Link to="/feed">📌 Go to Trip Feed</Link>
            <br /><br />
            <button onClick={logout}>Logout</button>
        </div>
    );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/api";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", { username, password });
            login(res.data.token, username);
            navigate("/");
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

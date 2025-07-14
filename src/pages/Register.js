import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", form);
            alert("Registered!");
            navigate("/login");
        } catch (err) {
            alert("Registration failed");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
                <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

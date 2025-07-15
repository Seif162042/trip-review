import React, { useEffect, useState } from "react";
import API from "../api/api";
import CommentForm from "../components/CommentForm";
import { useContext } from "react";
import { useAuth } from "../context/AuthContext";




export default function TripFeed() {
    const { user } = useAuth();
    const [trips, setTrips] = useState([]);
    const [form, setForm] = useState({
        title: "",
        destination: "",
        description: "",
        image: "", // 👈 added
    });

    const fetchTrips = async () => {
        const res = await API.get("/trips");
        setTrips(res.data);
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/trips", form);
            setForm({ title: "", destination: "", description: "", image: "" }); // reset form
            fetchTrips();
        } catch (err) {
            alert("Failed to post trip.");
        }
    };

    const toggleLike = async (tripId) => {
        try {
            await API.post(`/trips/${tripId}/like`);
            fetchTrips();
        } catch {
            alert("Failed to like trip.");
        }
    };

    return (
        <div>
            <h2>🌍 Trip Feed</h2>

            {/* 📥 Trip Form */}
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <input
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                /><br />
                <input
                    placeholder="Destination"
                    value={form.destination}
                    onChange={(e) => setForm({ ...form, destination: e.target.value })}
                /><br />
                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                /><br />
                <input
                    placeholder="Image URL (optional)"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                /><br />
                <button type="submit">Post Trip</button>
            </form>

            {/* 📄 Trip List */}
            {trips.length === 0 ? (
                <p>No trips yet.</p>
            ) : (
                trips.map((trip) => {
                    const hasLiked = trip.likes?.some((like) => like._id === user?.id);

                    return (
                        <div key={trip._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "20px" }}>
                            <h3>{trip.title}</h3>
                            <p><b>Destination:</b> {trip.destination}</p>
                            <p><b>Posted by:</b>
                                <a href={`/user/${trip.user?._id}`}>
                                    {trip.user?.username || "Unknown"}
                                </a>
                            </p>
                            <p>{trip.description}</p>

                            {trip.image && (
                                <img
                                    src={trip.image}
                                    alt="Trip"
                                    style={{ width: "100%", maxHeight: "300px", objectFit: "cover", marginTop: "10px" }}
                                />
                            )}
                            {/* ❤️ Like Button */}
                            <div style={{ marginTop: "10px" }}>
                                <button onClick={() => toggleLike(trip._id)}>
                                    ❤️ Like ({trip.likes?.length || 0})
                                </button>
                            </div>

                            {/* 💬 Comments */}
                            <div style={{ marginTop: "10px" }}>
                                <b>Comments:</b>
                                <ul>
                                    {trip.comments?.length > 0 ? (
                                        trip.comments.map((comment, i) => (
                                            <li key={i}>
                                                {comment.text} — <i>{comment.user?.username || "User"}</i>
                                            </li>
                                        ))
                                    ) : (
                                        <li>No comments yet.</li>
                                    )}
                                </ul>


                                {/* ✍️ Comment Form */}
                                <CommentForm tripId={trip._id} refresh={fetchTrips} />
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

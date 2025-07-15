import React, { useState } from "react";
import API from "../api/api";

export default function CommentForm({ tripId, refresh }) {
    const [text, setText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        try {
            await API.post(`/trips/${tripId}/comments`, { text });
            setText("");
            refresh(); // reload updated trip list
        } catch {
            alert("Failed to post comment");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: "5px" }}>
            <input
                type="text"
                placeholder="Write a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Post</button>
        </form>
    );
}

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';

export default function UserProfile() {
    const { userId } = useParams();
    const [trips, setTrips] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const tripRes = await API.get(`/users/${userId}/trips`);
                setTrips(tripRes.data);
                if (tripRes.data.length > 0) {
                    setUsername(tripRes.data[0].user?.username || 'User');
                }
            } catch {
                alert('Could not fetch user profile.');
            }
        }
        fetchData();
    }, [userId]);

    return (
        <div>
            <h2>{username}'s Profile</h2>
            <h3>{username} has posted {trips.length} trip{trips.length !== 1 ? 's' : ''}:</h3>
            <h3>Trips:</h3>
            {trips.length === 0 ? <p>No trips yet.</p> : trips.map(trip => (
                <div key={trip._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <h4>{trip.title}</h4>
                    <p><strong>Destination:</strong> {trip.destination}</p>
                    <p>{trip.description}</p>
                </div>
            ))}
        </div>
    );
}

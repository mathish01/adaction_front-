'use client'
import { useState, useEffect } from "react"; 

export default function VolunteersList() {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    // URL de ton API 
    const API_URL = 'http://localhost:3001/api/volunteers';

    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`Erreur: ${response.status}`); 
                }
                const data = await response.json();
                setVolunteers(data);
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false);
            }
        };

        fetchVolunteers(); 
    }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur serveur: {error}</div>;

   return (
        <div className="volunteers-container">
            {/* Volunteers List */}
            <div className="volunteers-list">
                {volunteers.length === 0 ? (
                    <p style={{textAlign: 'center', padding: '20px', color: '#666'}}>
                        Aucun bénévole trouvé
                    </p>
                ) : (
                    volunteers.map((volunteer) => (
                        <div key={volunteer.id} className="volunteer-card">
                            <div className="volunteer-info">
                                <h3>{volunteer.firstname} {volunteer.lastname}</h3>
                                <p>{volunteer.mail}</p>
                                {volunteer.location && <p>{volunteer.location}</p>}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
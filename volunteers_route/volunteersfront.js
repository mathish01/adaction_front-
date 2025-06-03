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
        <div style={{ padding: '20px' }}>
            <h1>Liste des Bénévoles ({volunteers.length})</h1>
            
            {volunteers.length === 0 ? (
                <p>Aucun bénévole trouvé</p>
            ) : (
                <div>
                    {volunteers.map((volunteer) => (
                        <div key={volunteer.id} style={{ 
                            border: '1px solid #ccc', 
                            margin: '10px 0', 
                            padding: '15px',
                            borderRadius: '5px'
                        }}>
                            <h3>{volunteer.firstname} {volunteer.lastname}</h3>
                            <p><strong>Email:</strong> {volunteer.mail}</p>
                            <p><strong>Localisation:</strong> {volunteer.location}</p>
                            <p><strong>Créé le:</strong> {new Date(volunteer.created_at).toLocaleDateString('fr-FR')}</p>
                            <p><strong>Mis à jour:</strong> {new Date(volunteer.updated_at).toLocaleDateString('fr-FR')}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
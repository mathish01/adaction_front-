'use client'
import { useState, useEffect, use } from "react"; 
import styles from "./manage-users.module.css"; 

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


//////////////////////////////////////////////////////////////////////////////////////


export function AddVolunteers() {
const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    mail: '',
    password: '',
    location: ''
});

const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);
const [error, setError] = useState(null); 

const API_URL = 'http://localhost:3001/api/volunteers';


 const wasteTypes = [
        { value: 'cigarette', label: 'Cigarette' },
        { value: 'electronic', label: 'Électronique' },
        { value: 'glass', label: 'Verre' },
        { value: 'metal', label: 'Métal' },
        { value: 'other', label: 'Autres' },
        { value: 'plastic', label: 'Plastiques' },
    ];


const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false); 

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(formData)
        }); 

        if (!response.ok) {
            throw new Error(`Erreur: ${response.status}`);
        }

        const result = await response.json();
        console.log('Bénévole ajouté', result);

        setSuccess(true);

        setFormData({
            firstname: '',
            lastname: '',
            mail: '',
            password: '',
            location: ''
        });
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false); 
    }
};

const handleCancel = () => {
    console.log('Annulation du formulaire');
}

if (loading) return <div>Chargement...</div>; 

 return (
        <div>
            <button className={styles.buttonGreen}>
                👥 Ajouter un bénévole
            </button>

            <div className={styles.searchContainer}>
                <input 
                    type="text" 
                    placeholder="Rechercher un bénévolé"
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.cityFilter}>
                <button className={styles.cityButton}>
                    📍 Toutes les villes ▼
                </button>
            </div>

            {success && <div className={styles.successMsg}>Bénévole ajouté avec succès !</div>}
            {error && <div className={styles.errorMsg}>Erreur: {error}</div>}

            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstname"
                        placeholder="Prénom"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        required
                        className={styles.inputField}
                    />

                    <input
                        type="text"
                        name="lastname"
                        placeholder="Nom"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        required
                        className={styles.inputField}
                    />

                    <input
                        type="email"
                        name="mail"
                        placeholder="Email"
                        value={formData.mail}
                        onChange={handleInputChange}
                        required
                        className={styles.inputField}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className={styles.inputField}
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Localisation"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={styles.inputField}
                    />

                    <input
                        type="number"
                        name="city_id"
                        placeholder="ID Ville"
                        value={formData.city_id}
                        onChange={handleInputChange}
                        className={styles.inputField}
                    />

                    <select
                        name="waste_type"
                        value={formData.waste_type}
                        onChange={handleInputChange}
                        className={styles.inputField}
                    >
                        <option value="">Sélectionner un type de déchet</option>
                        {wasteTypes.map(type => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={styles.submitButton}
                        style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                    >
                        {loading ? 'Ajout en cours...' : 'Confirmer l\'ajout'}
                    </button>

                    <button 
                        type="button" 
                        onClick={handleCancel}
                        className={styles.cancelButton}
                    >
                        Annuler
                    </button>
                </form>
            </div>
        </div>
    )
}



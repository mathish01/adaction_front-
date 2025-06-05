'use client'
import { useState, useEffect, use } from "react"; 
import styles from "./manage-users.module.css"; 
import { lastDayOfDecade } from "date-fns";


export async function searchVolunteers(query) {

    const API_URL = 'http://localhost:3001/api/volunteers';
    const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
        throw new Error(`Erreur lors de la recherche: ${response.status}`);
    } 
    return await response.json()
};


export async function deleteVolunteers(id) {

    const API_URL = 'http://localhost:3001/api/volunteers';

    const response = await fetch(`${API_URL}/${id}`, {
        method:'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Erreur de supression: ${response.status}`);
    }

    return await response.json(); 
}



export async function updateVolunteer(id, updateData) {
    const API_URL = 'http://localhost:3001/api/volunteers'; 

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    });

    if (!response.ok) {
          throw new Error(`Erreur lors de la mise à jour: ${response.status}`);
    }

    return await response.json()
}



// Function pour l'ensemble de la liste des volontaires dans l'API. 
export default function VolunteersList() {
    const [volunteers, setVolunteers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [selectedCity, setSelectedCity] = useState('Toutes les villes');
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false); 
    const [success, setSuccess] = useState(false); 

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        mail: '',
        password: '',
        location: ''
    });

const cities = ['Toutes les villes',  'Paris', 'Lyon', 'Marseille', 'Nice', 'Toulouse', 'Bordeaux']; 

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

const handleSearchSubmit = async (e) => {
    e.preventDefault(); //Empêche le rechargement de la page
    if (searchTerm.trim() === "") {
        setLoading(true); 
        try {
            const response = await fetch(API_URL);
            const data = await response.json()
            setVolunteers(data);
            setError(null)
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); 
        }
        return; 
    }
    try {
        setLoading(true);
        const results = await searchVolunteers(searchTerm);
        setVolunteers(results);
        setError(null);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false); 
    }
};


    const handleUpdate = async (id, updatedData) => {
        try {
            const updatedVolunteer = await updateVolunteer(id, updatedData);
            setVolunteers((prev) =>
            prev.map((vol) => (vol.id === id ? updatedVolunteer : vol))
        );
        alert("Bénévole mis à jour avec succès !");   
        } catch (err) {
            alert("Erreur lors de la mise à jour :" + err.message);
        }
    };



    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Voulez-vous supprimer ce bénévole ?");

        if (!confirmDelete) return; 

        try {
            await deleteVolunteers(id);
            setVolunteers((prev) => prev.filter((vol) => vol.id !== id)); 
        } catch (err) {
            alert("Erreur lors de la suppression: " + err.message); 
        }
    }

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
            setVolunteers(prev => [...prev, result]);

            setFormData({
                firstname: '',
                lastname: '',
                mail: '',
                password: '',
                location: ''
            });
            setShowAddForm(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); 
        }
    };

    const filteredVolunteers = volunteers.filter(volunteer => {
        const matchesCity = selectedCity === 'Toutes les villes' || volunteer.location === selectedCity;
        return matchesCity;
    });

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur serveur: {error}</div>;

   return (
          <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerTitle}>
                    <span style={{ fontSize: '24px' }}>♻️</span>
                    <h1 style={styles.headerTitleText}>Adaction</h1>
                </div>
                <p style={styles.headerSubtitle}>
                    Agir pour un environnement plus propre
                </p>
            </div>

            {/* Navigation Tabs */}
            <div style={styles.navigation}>
                <div style={styles.navItemActive}>
                    <span style={styles.navIcon}>👥</span>
                    <span style={styles.navTextActive}>
                        Gestion des bénévoles
                    </span>
                </div>
                <div style={styles.navItem}>
                    <span style={styles.navIconInactive}>🏆</span>
                    <span style={styles.navTextInactive}>
                        Leaderboard
                    </span>
                </div>
            </div>

            <div style={styles.mainContainer}>
                {/* Add Volunteer Button */}
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    style={styles.addButton}
                >
                    <span>👥</span>
                    Ajouter un.e bénévole
                </button>

                {/* Add Volunteer Form */}
                {showAddForm && (
                    <div style={styles.formContainer}>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="Prénom"
                            value={formData.firstname}
                            onChange={handleInputChange}
                            required
                            style={styles.inputField}
                        />

                        <input
                            type="text"
                            name="lastname"
                            placeholder="Nom"
                            value={formData.lastname}
                            onChange={handleInputChange}
                            required
                            style={styles.inputField}
                        />

                        <input
                            type="email"
                            name="mail"
                            placeholder="Email"
                            value={formData.mail}
                            onChange={handleInputChange}
                            required
                            style={styles.inputField}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            style={styles.inputField}
                        />

                        <input
                            type="text"
                            name="location"
                            placeholder="Localisation"
                            value={formData.location}
                            onChange={handleInputChange}
                            style={styles.inputField}
                        />

                        <div style={styles.buttonContainer}>
                            <button 
                                onClick={handleSubmit}
                                disabled={loading}
                                style={styles.submitButton}
                            >
                                {loading ? 'Ajout en cours...' : 'Confirmer l\'ajout'}
                            </button>

                            <button 
                                onClick={() => setShowAddForm(false)}
                                style={styles.cancelButton}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                )}

                {success && <div style={styles.success}>Bénévole ajouté avec succès !</div>}

                {/* Barre de recherche */}
                <input
                    type="text"
                    placeholder="🔍 Rechercher un.e bénévole"
                    style={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearchSubmit(e);
                        }
                    }}
                />

                {/* City Filter */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setShowCityDropdown(!showCityDropdown)}
                        style={styles.cityButton}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>📍</span>
                            {selectedCity}
                        </span>
                        <span>▼</span>
                    </button>
                    
                    {showCityDropdown && (
                        <div style={styles.cityDropdown}>
                            {cities.map(city => (
                                <div
                                    key={city}
                                    onClick={() => {
                                        setSelectedCity(city);
                                        setShowCityDropdown(false);
                                    }}
                                    style={{
                                        ...styles.cityOption,
                                        backgroundColor: selectedCity === city ? '#f0f8ff' : 'white'
                                    }}
                                >
                                    {city}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Volunteers List */}
                <div>
                    {filteredVolunteers.length === 0 ? (
                        <p style={styles.noResults}>
                            Aucun bénévole trouvé
                        </p>
                    ) : (
                        filteredVolunteers.map((volunteer) => (
                            <div key={volunteer.id} style={styles.volunteerCard}>
                                <div style={styles.volunteerInfo}>
                                    <h3 style={styles.volunteerName}>
                                        {volunteer.firstname} {volunteer.lastname}
                                    </h3>
                                    <p style={styles.volunteerEmail}>{volunteer.mail}</p>
                                    {volunteer.location && (
                                        <p style={styles.volunteerLocation}>
                                            📍 {volunteer.location}
                                        </p>
                                    )}
                                </div>

                                <div style={styles.actionButtons}>
                                    <button 
                                        onClick={() => handleUpdate(volunteer.id)}
                                        style={styles.updateButton}
                                    >
                                        ✏️ 
                                    </button>

                                    <button 
                                        onClick={() => handleDelete(volunteer.id)}
                                        style={styles.deleteButton} 
                                    >
                                        🗑️ 
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

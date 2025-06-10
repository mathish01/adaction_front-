'use client';
import { useState, useEffect } from "react";
import { CircleAlert, Minus, Plus } from 'lucide-react';
import '../collecte/waste.css'

function CollectePage() {
  return (
    <div className="take-collect">
      <h2><CircleAlert className="icon-collect" /> Enregistrer une collecte</h2> 
    </div>
  );
}

export default function WasteList() {
  const [waste, setWaste] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [date, setDate] = useState(""); // <-- état pour la date
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:3001/api/waste";

  useEffect(() => {
    const fetchWaste = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Erreur: ${response.status}`);
        const data = await response.json();
        setWaste(data);

        // Initialise les quantités à 0
        const initialQuantities = {};
        data.forEach((w) => {
          initialQuantities[w.id] = 0;
        });
        setQuantities(initialQuantities);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWaste();
  }, []);

  const increment = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrement = (id) => {
    setQuantities((prev) => {
      const newQty = (prev[id] || 0) - 1;
      return { ...prev, [id]: newQty < 0 ? 0 : newQty };
    });
  };

  const sendCollecte = async () => {
    if (!date) {
      alert("Veuillez choisir une date pour la collecte.");
      return;
    }

    const collecteData = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([waste_type, quantity]) => ({
        waste_type: parseInt(waste_type),
        quantity,
      }));

    if (collecteData.length === 0) {
      alert("Veuillez saisir au moins une quantité de déchet.");
      return;
    }

    // Exemple de volunteer_id et city_id (à remplacer selon ta logique)
    const payload = {
      date,
      volunteer_id: 1,
      city_id: 2,
      collecte: collecteData,
    };

    try {
      const res = await fetch("http://localhost:3001/api/collecte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erreur lors de l’enregistrement");
      alert("Collecte enregistrée !");
      // reset formulaire
      setDate("");
      const resetQuantities = {};
      waste.forEach((w) => {
        resetQuantities[w.id] = 0;
      });
      setQuantities(resetQuantities);
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur serveur: {error}</div>;

  return (
    <div>
      <h2>
        <CircleAlert /> Enregistrer une collecte
      </h2>

      <label htmlFor="date" style={{ display: "block", margin: "1rem 0" }}>
        Date de la collecte :
      </label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{
          padding: "0.5rem",
          borderRadius: "0.5rem",
          border: "2px solid #e5e7eb",
          width: "20rem",
        }}
      />

      {waste.length === 0 ? (
        <p>Pas de déchets à afficher</p>
      ) : (
        waste.map((item) => (
          <div key={item.id} className="waste-item">
            <div className="label-box">{item.label}</div>
            <button className="icon-minus" onClick={() => decrement(item.id)}>
              <Minus size={20} />
            </button>
            <div className="quantity-box">{quantities[item.id] || 0}</div>
            <button className="icon-plus" onClick={() => increment(item.id)}>
              <Plus size={20} />
            </button>
          </div>
        ))
      )}

      <button
        onClick={sendCollecte}
        style={{
          marginTop: "2rem",
          padding: "0.75rem 2rem",
          borderRadius: "0.5rem",
          border: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Envoyer la collecte
      </button>
    </div>
  );
}
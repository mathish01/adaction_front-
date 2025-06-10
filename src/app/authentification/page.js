'use client';
import Link from "next/link"
import { useState } from 'react';
import { Sprout, PackagePlus, Heart, UserRound } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email,password}),
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Bienvenue ${data.volunteers.firstname} !`);
      } else {
        setMessage(data.message || 'Erreur lors de la connexion.');
      }
    } catch (error) {
      setMessage('Erreur serveur.');
      console.error(error);
    }
  };

 return (
    <main className="form-container">
      <form onSubmit={handleLogin} className="login-form" aria-labelledby="login-title">
        <h1 id="login-title">Connexion</h1>

        <label htmlFor="email">Adresse email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-required="true"
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-required="true"
        />

        <button type="submit">Se connecter</button>
    
     <Link href="/manage-users" className="navbar-link"> <UserRound className="icon" style={{ marginLeft: '0.5rem' }} />  
              Gestion des profils
            </Link>
        <p role="status" aria-live="polite">
          {message}
        </p>
      </form>
     
    </main>
  );
}

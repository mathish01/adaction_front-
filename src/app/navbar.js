// src/app/Navbar.js (ou un autre dossier que tu préfères)
"use client"; // pour utiliser les hooks si besoin plus tard

import Link from "next/link";
import { Sprout, PackagePlus, Heart, UserRound } from 'lucide-react';
// import { PackagePlus } from 'lucide-react';
// import { Heart } from 'lucide-react';
// import { UserRound } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar">
        <div className="nav-container">
      <Link href="/" className="navbar-link">   <Sprout className="icon" style={{ marginLeft: '0.5rem' }} />  
        Dashboard
      </Link>
      <Link href="/collecte" className="navbar-link"> <PackagePlus className="icon" style={{ marginLeft: '0.5rem' }} />  
        Collectes
      </Link>
      <Link href="/don" className="navbar-link"> <Heart className="icon" style={{ marginLeft: '0.5rem' }} />  
        Dons
      </Link>
      <Link href="/authentification" className="navbar-link"> <UserRound className="icon" style={{ marginLeft: '0.5rem' }} />  
        Profil
      </Link>
      </div>
    </nav>
  );
}
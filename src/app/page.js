import Image from "next/image";
import styles from "./style.css";

export default function Home() {
  return (
    <div>
       <main class="dashboard">
    
        <section class="dashboard-card">
            <div class="dashboard-header">
                <h2 id="welcome">Bonjour !</h2>
                <div class="month-selector">
                    <button>&lt;</button>
                    <span id="current-month">juin 2025</span>
                    <button>&gt;</button>
                </div>
            </div>

            <div class="categories">
                <div class="category">
                    <span class="emoji">🚬</span>
                    <div class="waste-info">
                        <h3>Mégots de cigarette</h3><br/>
                        <p class="waste-count">0 collecte</p>
                    </div>
                </div>
                <div class="category">
                    <span class="emoji">♳</span>
                    <div class="waste-info">
                        <h3>Plastique</h3><br/>
                        <p class="waste-count">0 collecte</p>
                    </div>
                </div>

                <div class="category">
                    <span class="emoji">🥂</span>
                    <div class="waste-info">
                        <h3>Verre</h3><br/>
                        <p class="waste-count">0 collecte</p>
                    </div>
                </div>


               <div class="category">
                    <span class="emoji">🚮</span>
                    <div class="waste-info">
                        <h3>Métal</h3><br/>
                        <p class="waste-count">0 collecte</p>
                    </div>
                </div>


              <div class="category">
                    <span class="emoji">⚡️</span>
                    <div class="waste-info">
                        <h3>Électronique</h3><br/>
                        <p class="waste-count">0 collecte</p>
                    </div>
                </div>

                <div class="category">
                    <span class="emoji">❓</span>
                    <div class="waste-info">
                        <h3>Autre</h3><br/>
                        <p class="waste-count">0 collecte</p>
                    </div>
                </div>
            </div>
        </section>

        <footer>
            <p>🌱 Merci d'agir pour la planète. Vous faites partie du changement.</p>
        </footer>
    </main>
      
    </div>
  );
}

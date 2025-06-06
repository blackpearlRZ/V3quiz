import { Link } from "react-router-dom";
import logo from "../assets/logo3.png"

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <h3 className="footer-title">
              <span><img src={logo} alt="" style={{width : "4rem"}} /></span>
            </h3>
            <p className="footer-description">
              Testez vos connaissances en langages informatiques avec notre plateforme de quiz interactifs.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Liens rapides</h4>
            <ul className="footer-links">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/quiz">Quiz</Link></li>
              <li><Link to="/dashboard">Tableau de bord</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Compte</h4>
            <ul className="footer-account">
              <li><Link to="/auth/login">Connexion</Link></li>
              <li><Link to="/auth/register">Inscription</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} V3 Quiz. Tous droits réservés.</p>
          <div>
            <Link to="/privacy">Confidentialité</Link>
            <Link to="/terms">Conditions d'utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

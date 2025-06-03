import { Link } from "react-router-dom";
import logo from "../assets/logo3.png";

export default function Navbar() {
  return (
    <nav className="Nav_bar_container">
      <img src={logo} alt="V3Quiz" className="w-30" />

      <div className="Nav_bar_container2">
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/quiz">Quiz</Link></li>
          <li><Link to="/dashboard">Tableau de bord</Link></li>
          <li>
            <Link to="/auth/login">
              <button>Connexion</button>
            </Link>
          </li>
          <li>
            <Link to="/auth/register">
              <button style={{ backgroundColor: "#9B7EBD" }}>S'inscrire</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

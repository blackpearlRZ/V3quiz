import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo3.png";
import { getCurrentUser, logout } from "./service/AuthService";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/auth/login");
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
    }
  };

  return (
    <nav className="Nav_bar_container">
      <img src={logo} alt="V3Quiz" className="w-30" />

      <div className="Nav_bar_container2">
        <ul>
          <li className="nav-item-accueil"><Link to="/">Accueil</Link></li>
          <li className="nav-item-quiz"><Link to="/quiz">Quiz</Link></li>
          <li className="nav-item-dashboard"><Link to="/dashboard">Tableau de bord</Link></li>

          {!user ? (
            <>
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
            </>
          ) : (
            <li>
              <button onClick={handleLogout} style={{ backgroundColor: "#E57373" }}>
                Déconnexion
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
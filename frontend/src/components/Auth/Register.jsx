import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../service/AuthService"; // adapte le chemin si besoin

export default function Register() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await register({ nom, prenom, email, motDePasse });
      setIsLoading(false);
      navigate("/auth/login"); 
    } catch (err) {
      setIsLoading(false);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Erreur lors de l’inscription.");
      }
    }
  };

  return (
    <div className="register-card">
      <div className="register-header">
        <h2>Créer un compte</h2>
        <p>Remplissez le formulaire ci-dessous pour commencer</p>
      </div>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">Prénom</label>
            <input
              id="firstName"
              placeholder="Jean"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Nom</label>
            <input
              id="lastName"
              placeholder="Dupont"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="exemple@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
          <p className="form-note">
            Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule et un chiffre.
          </p>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Inscription en cours..." : "S'inscrire"}
        </button>
      </form>

      <div className="register-footer">
        <p>
          Vous avez déjà un compte ?{" "}
          <Link to="/auth/login" className="login-link">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName] = useState("");
  const [email,     setEmail] = useState("");
  const [password,  setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // simulate registration
    setTimeout(() => {
      setIsLoading(false);
      alert("Inscription réussie !");
    }, 1000);
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Nom</label>
            <input
              id="lastName"
              placeholder="Dupont"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="form-note">
            Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule et un chiffre.
          </p>
        </div>

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

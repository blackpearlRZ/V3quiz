import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simule une requête de connexion
    setTimeout(() => {
      setIsLoading(false);
      alert("Connexion réussie !");
    }, 1000);
  };

  return (
    <div className="login-card">
      <div className="login-header">
        <h2>Connexion</h2>
        <p>Connectez-vous à votre compte</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
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
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <div className="login-footer">
        <p>
          Vous n'avez pas encore de compte ?{" "}
          <Link to="/auth/register" className="register-link">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}

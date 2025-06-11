import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../service/AuthService"; // <-- adapter le chemin selon ton projet

export default function Login() {
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
      await login({ email, motDePasse });
      setIsLoading(false);
      navigate("/"); // redirection après login
    } catch (err) {
      setIsLoading(false);
      if (err.response && err.response.status === 401) {
        setError("Email ou mot de passe incorrect.");
      } else {
        setError("Une erreur est survenue.");
      }
    }
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
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

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

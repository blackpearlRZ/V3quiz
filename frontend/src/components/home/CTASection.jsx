import { Link } from "react-router-dom";
export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">Prêt à relever le défi ?</h2>
        <p className="cta-text">
          Rejoignez notre communauté de développeurs et testez vos connaissances dès maintenant.
        </p>
        <div className="cta-buttons">
          <Link to="/quiz" className="cta-btn cta-btn-secondary">
            Commencer un quiz
          </Link>
          <Link to="/auth/register" className="cta-btn cta-btn-outline">
            S'inscrire gratuitement
          </Link>
        </div>
      </div>
    </section>
  );
}

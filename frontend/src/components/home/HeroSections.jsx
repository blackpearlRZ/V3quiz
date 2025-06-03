import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-grid">
          <div className="hero-text-content">
            <div>
              <h1 className="hero-title">
                Veni, Vidi, <span className="highlight">Vici</span>
              </h1>
              <p className="hero-subtitle">
                Venez apprendre, découvrez les langages informatiques, et maîtrisez-les grâce à nos quiz interactifs.
              </p>
            </div>
            <div className="hero-buttons">
              <Link to="/quiz">
                <button className="custom-primary-btn">Commencer un quiz</button>
              </Link>
              <Link to="/auth/register">
                <button className="custom-primary-btn">S'inscrire gratuitement</button>
              </Link>
            </div>
          </div>
          <div className="hero-illustration">
            <div className="illustration-wrapper">
              <div className="card">
                <div className="bar"></div>
                <div className="button-row">
                  <div className="btn btn-primary"></div>
                  <div className="btn btn-gray"></div>
                </div>
              </div>
              <div className="card">
                <div className="bar bar-medium"></div>
                <div className="button-row">
                  <div className="btn btn-gray"></div>
                  <div className="btn btn-primary"></div>
                </div>
              </div>
              <div className="card">
                <div className="bar bar-small"></div>
                <div className="button-row">
                  <div className="btn btn-gray"></div>
                  <div className="btn btn-gray"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

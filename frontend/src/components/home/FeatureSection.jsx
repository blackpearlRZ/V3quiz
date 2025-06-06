
const features = [
  {
    icon: "🏆",
    title: "Progressez à votre rythme",
    description:
      "Suivez votre évolution avec des statistiques détaillées et des graphiques de progression.",
  },
  {
    icon: "🧠",
    title: "Apprenez en vous amusant",
    description:
      "Des quiz variés pour tester vos connaissances de manière ludique et interactive.",
  },
  {
    icon: "📊",
    title: "Analysez vos performances",
    description:
      "Identifiez vos points forts et vos axes d'amélioration grâce à des résultats détaillés.",
  },
];

export default function FeatureSection() {
  return (
    <section className="feature-section">
      <div className="feature-container">
        <div className="feature-header">
          <h2>Pourquoi choisir V3 Quiz ?</h2>
          <p>
            Notre plateforme vous offre une expérience d'apprentissage unique pour maîtriser les langages de programmation.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

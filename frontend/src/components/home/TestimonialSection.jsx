const testimonials = [
  {
    quote: "Les quiz de V3 m'ont permis de consolider mes connaissances en JavaScript en seulement quelques semaines.",
    author: "Sophie L.",
    role: "Développeuse Front-End",
    avatar: "👩‍💻",
  },
  {
    quote: "J'utilise V3 Quiz quotidiennement pour préparer mon diplôme en informatique. Un outil indispensable !",
    author: "Thomas M.",
    role: "Étudiant en informatique",
    avatar: "👨‍🎓",
  },
  {
    quote: "La progression par niveau m'a permis de passer du débutant à l'expert en Python en quelques mois.",
    author: "Julie D.",
    role: "Data Analyst",
    avatar: "👩‍🔬",
  },
];

export default function TestimonialSection() {
  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <div className="testimonial-header">
          <h2>Ils ont progressé avec V3 Quiz</h2>
          <p>Découvrez les témoignages de notre communauté d'apprenants.</p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-quote-mark">"</div>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <div>
                  <p className="testimonial-name">{testimonial.author}</p>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

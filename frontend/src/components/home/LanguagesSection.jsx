import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosClient } from "../../api/axios";

const languages = [
  {
    id: "html",
    name: "HTML",
    icon: "🌐",
    description: "Maîtrisez la structure des pages web avec nos quiz HTML.",
    colorClass: "html",
  },
  {
    id: "css",
    name: "CSS",
    icon: "🎨",
    description: "Testez vos connaissances en design et mise en page CSS.",
    colorClass: "css",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "⚡",
    description: "Devenez expert en JavaScript, le langage du web interactif.",
    colorClass: "javascript",
  },
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    description: "Développez vos compétences en Python, un langage polyvalent.",
    colorClass: "python",
  },
  {
    id: "react",
    name: "React",
    icon: "⚛️",
    description: "Devenez un expert des composants et du state management.",
    colorClass: "react",
  },
  {
    id: "php",
    name: "PHP",
    icon: "🐘",
    description: "Maîtrisez le développement back-end avec nos quiz PHP.",
    colorClass: "php",
  },
];

export default function LanguageSection() {
  const [quizzes,setQuizzes] =useState([])
 useEffect(() => {
    axiosClient.get('/api/quizzes') 
      .then(res => {
        setQuizzes(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <section className="language-section">
      <div className="container">
        <div className="header-text">
          <h2>Explorez les langages</h2>
          <p>Testez vos connaissances dans différents langages informatiques.</p>
        </div>

        <div className="grid">
          {languages.map((language) => (
            <Link
              key={language.id}
              to={`/quiz/language/${language.id}`}
              className="language-link"
            >
              <div className={`card ${language.colorClass}`}>
                <div className="icon-circle">
                  <span className="icon">{language.icon}</span>
                </div>
                <h3>{language.name}</h3>
                <p>{language.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

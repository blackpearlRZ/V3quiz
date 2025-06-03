import logo from '../assets/logo3.png'

export default function Footer() {
  return (
    <div className='footer_container'>
        <div className='footer_container2'>
            <div className="footer_items">
                <img src={logo} alt="V3Quiz_logo" />
                <p>Testez vos connaissances en langages informatiques avec notre plateforme de quiz interactifs.</p>
            </div>
            <div className="footer_items">
                <h6>Liens rapides</h6>
                <ul>
                    <li><a href="">Accueil</a></li>
                    <li><a href="">Quiz</a></li>
                    <li><a href="">Tableau de bord</a></li>
                </ul>
            </div>
            <div className="footer_items">
                <h6>Compte</h6>
                <ul>
                    <li><a href="">Connexion</a></li>
                    <li><a href="">Inscription</a></li>
                </ul>
            </div>
        </div>
        <div>
            <p> 2025 ,V3 Quiz. Tous droits reserves</p>
            <div>
                <a href="">Confidentialite</a>
                <a href="">Conditions d'utilisation</a>
            </div>
        </div>
    </div>
  )
}

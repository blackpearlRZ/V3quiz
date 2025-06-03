import logo from "../assets/logo3.png"
export default function Navbar() {
  return (
    <nav className="Nav_bar_container">

        <img src={logo} alt="V3Quiz"  className="w-30"/>
        <div className="Nav_bar_container2">
           <ul>
                <li><a href="">Accueil</a></li>
                <li><a href="">Quiz</a></li>
                <li><a href="">Tableau de board</a></li>
                <li><button>Connexion</button></li>
                <li><button style={{backgroundColor : '#9B7EBD'}}>S'inscrire</button></li>
           </ul>
        </div>
    </nav>
  )
}

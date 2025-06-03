

export default function Login() {
  return (
    <div className='authentification_container'>
        <div className="authentification_container2">
          <div>
            <h1>Connexion</h1>
            <p>Entrez vos identifiants pour accéder à votre compte</p>
          </div>
          <form action="">
            <div>
              <label htmlFor="email">Email</label>
              <input type="email"  placeholder="exemple.email.com"/>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password"/>
            </div>
          </form>
          <button type="submit">Se connecter</button>
        </div>
    </div>
  )
}

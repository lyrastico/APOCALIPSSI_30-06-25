import React from 'react';
import './Login.scss';

function Login() {
  return (
    <div className="login">
      <h2>Connexion</h2>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mot de passe" />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;

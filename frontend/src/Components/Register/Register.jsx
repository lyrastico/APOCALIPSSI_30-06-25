import React from 'react';
import './Register.scss';

function Register() {
  return (
    <div className="register">
      <h2>Inscription</h2>
      <form>
        <input type="text" placeholder="Nom" />
        <input type="text" placeholder="Prénom" />
        <input type="text" placeholder="Pseudo" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mot de passe" />
        <button type="submit">Créer un compte</button>
      </form>
    </div>
  );
}

export default Register;

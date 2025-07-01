import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    motDePasse: '',
    pseudo: '',
    nom: '',
    prenom: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const { data } = await axios.post(endpoint, formData);
      if (data.token) {
        localStorage.setItem('token', data.token);
        onLogin();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur d\'authentification');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input name="prenom" placeholder="Prénom" onChange={handleChange} required />
            <input name="nom" placeholder="Nom" onChange={handleChange} required />
            <input name="pseudo" placeholder="Pseudo" onChange={handleChange} required />
          </>
        )}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="motDePasse" placeholder="Mot de passe" onChange={handleChange} required />
        <button type="submit">{isLogin ? 'Se connecter' : 'S\'inscrire'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Créer un compte' : 'Déjà un compte? Se connecter'}
      </button>
    </div>
  );
};

export default Auth;
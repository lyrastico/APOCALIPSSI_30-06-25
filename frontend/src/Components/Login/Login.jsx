import React, { useState } from 'react';
import './Login.scss';
import { login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // pour rediriger après connexion

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, motDePasse });
      localStorage.setItem('token', res.data.token);
      setError('');
      window.location.href = '/';
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    }
  };


  return (
    <div className="login">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import './Register.scss';
import { register } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    pseudo: '',
    email: '',
    motDePasse: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      setError('');
      navigate('/login'); // redirige vers la page de connexion
    } catch (err) {
      setError(err.response?.data?.error || 'Une erreur est survenue');
    }
  };

  return (
    <div className="register">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={form.prenom}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pseudo"
          placeholder="Pseudo"
          value={form.pseudo}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="motDePasse"
          placeholder="Mot de passe"
          value={form.motDePasse}
          onChange={handleChange}
          required
        />
        <button type="submit">Créer un compte</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Register;

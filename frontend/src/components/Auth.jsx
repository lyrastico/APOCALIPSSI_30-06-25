import React, { useState } from "react";
import axios from "axios";

// Configuration de l'URL de base pour axios
const api = axios.create({
  baseURL: "http://localhost:5000",
});

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    motDePasse: "",
    pseudo: "",
    nom: "",
    prenom: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await api.post(endpoint, formData);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        onLogin();
      }
    } catch (error) {
      console.error("Erreur d'authentification:", error);
      const message =
        error.response?.data?.message || "Erreur de connexion au serveur";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Reset du formulaire quand on change de mode
    setFormData({
      email: "",
      motDePasse: "",
      pseudo: "",
      nom: "",
      prenom: "",
    });
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        {isLogin ? "Connexion" : "Inscription"}
      </h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleChange}
              required
              style={{ width: "100%", margin: "5px 0", padding: "8px" }}
            />
            <input
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              required
              style={{ width: "100%", margin: "5px 0", padding: "8px" }}
            />
            <input
              name="pseudo"
              placeholder="Pseudo"
              value={formData.pseudo}
              onChange={handleChange}
              required
              style={{ width: "100%", margin: "5px 0", padding: "8px" }}
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", margin: "5px 0", padding: "8px" }}
        />
        <input
          type="password"
          name="motDePasse"
          placeholder="Mot de passe"
          value={formData.motDePasse}
          onChange={handleChange}
          required
          style={{ width: "100%", margin: "5px 0", padding: "8px" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Chargement..." : isLogin ? "Se connecter" : "S'inscrire"}
        </button>
      </form>
      <button
        onClick={toggleMode}
        style={{
          width: "100%",
          padding: "8px",
          backgroundColor: "transparent",
          border: "1px solid #007bff",
          color: "#007bff",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {isLogin ? "Créer un compte" : "Déjà un compte ? Se connecter"}
      </button>
    </div>
  );
};

export default Auth;

// import React, { useState } from 'react';
// import axios from 'axios';

// const Auth = ({ onLogin }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     email: '',
//     motDePasse: '',
//     pseudo: '',
//     nom: '',
//     prenom: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const endpoint = isLogin ? 'localhost:5000/api/auth/login' : 'localhost:5000/api/auth/register';
//       const { data } = await axios.post(endpoint, formData);
//       if (data.token) {
//         localStorage.setItem('token', data.token);
//         onLogin();
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || 'Erreur d\'authentification');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '0 auto' }}>
//       <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
//       <form onSubmit={handleSubmit}>
//         {!isLogin && (
//           <>
//             <input name="prenom" placeholder="Prénom" onChange={handleChange} required />
//             <input name="nom" placeholder="Nom" onChange={handleChange} required />
//             <input name="pseudo" placeholder="Pseudo" onChange={handleChange} required />
//           </>
//         )}
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="motDePasse" placeholder="Mot de passe" onChange={handleChange} required />
//         <button type="submit">{isLogin ? 'Se connecter' : 'S\'inscrire'}</button>
//       </form>
//       <button onClick={() => setIsLogin(!isLogin)}>
//         {isLogin ? 'Créer un compte' : 'Déjà un compte? Se connecter'}
//       </button>
//     </div>
//   );
// };

// export default Auth;

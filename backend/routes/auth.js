const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Secret JWT
const SECRET = process.env.JWT_SECRET || 'dev_secret_123';

// ✅ Inscription
router.post('/register', async (req, res) => {
  const { nom, prenom, email, pseudo, motDePasse } = req.body;
  try {
    const user = new User({ nom, prenom, email, pseudo, motDePasse });
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Connexion
router.post('/login', async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(motDePasse))) {
      return res.status(401).json({ message: 'Email ou mot de passe invalide' });
    }
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Déconnexion (frontend supprime le token côté client)
router.post('/logout', (req, res) => {
  res.json({ message: 'Déconnecté avec succès (à gérer côté client)' });
});

module.exports = router;

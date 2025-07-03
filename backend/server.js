const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect('mongodb://mongo:27017/complysummarize', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connecté'))
.catch(err => console.error('❌ Erreur MongoDB :', err));

// Routes
app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});
app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes);

// Lancement du serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});

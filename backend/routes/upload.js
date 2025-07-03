const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const axios = require('axios');

const router = express.Router();

// Config multer pour recevoir les fichiers PDF
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier PDF reçu.' });
    }

    // Extraction du texte PDF
    const data = await pdfParse(req.file.buffer);
    const text = data.text.slice(0, 3000); // limite de sécurité

    // Construction du prompt
    const messages = [
      {
        role: 'system',
        content: "Tu es un assistant expert en synthèse de documents. Réponds en français de manière structurée.",
      },
      {
        role: 'user',
        content: `
Voici un texte extrait d’un PDF :

"""${text}"""

Ta mission :
- Résume le contenu de façon claire
- Donne une liste de points clés
- Propose des actions concrètes
        `,
      },
    ];

    // Appel à l'API HTTP de ton collègue
    const apiResponse = await axios.post('http://176.144.45.42:1234/v1/chat/completions', {
      model: 'mistralai/mistral-7b-instruct-v0.3',
      messages,
      temperature: 0.7,
      max_tokens: -1,
      stream: false,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const summary = apiResponse.data.choices[0].message.content;
    res.json({ summary });

  } catch (error) {
    console.error('❌ Erreur dans /upload :', error.message);
    res.status(500).json({ error: 'Erreur de traitement IA ou PDF.' });
  }
});

module.exports = router;

const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Free LLM API (using Hugging Face as example)
const LLM_API_URL = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';
const LLM_API_KEY = process.env.HUGGINGFACE_API_KEY; // Get this from Hugging Face

// Upload and process PDF
router.post('/upload', authMiddleware, upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read the uploaded file
    const filePath = path.join(__dirname, '../', req.file.path);
    const fileBuffer = fs.readFileSync(filePath);

    // Call LLM API (using Hugging Face in this example)
    const response = await axios.post(
      LLM_API_URL,
      { inputs: fileBuffer.toString('base64') },
      {
        headers: {
          'Authorization': `Bearer ${LLM_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Process the response
    const summary = response.data[0]?.summary_text || 'No summary generated';

    // Return the results
    res.json({
      originalFilename: req.file.originalname,
      summary,
      keyPoints: extractKeyPoints(summary), // Helper function
      actionItems: extractActionItems(summary) // Helper function
    });

    // Clean up the file
    fs.unlinkSync(filePath);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Document processing failed' });
  }
});

// Helper function to extract key points
function extractKeyPoints(summary) {
  // This is a simple implementation - you might want to use more sophisticated NLP
  const sentences = summary.split('. ');
  return sentences.slice(0, Math.min(3, sentences.length)); // Return first 3 sentences as key points
}

// Helper function to extract action items
function extractActionItems(summary) {
  // Simple regex to find action-oriented sentences
  const actionWords = ['should', 'must', 'need to', 'recommend', 'suggest'];
  return summary.split('. ')
    .filter(sentence => actionWords.some(word => sentence.toLowerCase().includes(word)))
    .slice(0, 3); // Return up to 3 action items
}

module.exports = router;
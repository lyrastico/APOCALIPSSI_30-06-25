import React, { useState } from 'react';
import axios from 'axios';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('document', file);

      const token = localStorage.getItem('token');
      const { data } = await axios.post('/api/documents/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setResult(data);
    } catch (err) {
      console.error(err);
      alert('Erreur lors du traitement du document');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Analyse de Document</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleFileChange} required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Traitement en cours...' : 'Analyser'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <h3>Résultats pour: {result.originalFilename}</h3>
          <div>
            <h4>Résumé Structuré:</h4>
            <p>{result.summary}</p>
          </div>
          <div>
            <h4>Points Clés:</h4>
            <ul>
              {result.keyPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Suggestions d'Actions:</h4>
            <ul>
              {result.actionItems.map((action, i) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
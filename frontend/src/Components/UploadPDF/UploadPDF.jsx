import React, { useState } from 'react';
import './UploadPDF.scss';

function UploadPDF() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      setSelectedFile(file);
      setSummary(null); // reset summary on new upload
    } else {
      alert('Veuillez sélectionner un fichier PDF.');
    }
  };

  const handleRemove = () => {
    setPdfUrl(null);
    setSelectedFile(null);
    setSummary(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Aucun fichier sélectionné.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSummary(data.summary);
      } else {
        alert(data.error || 'Erreur lors du traitement du fichier.');
      }
    } catch (error) {
      console.error('Erreur lors de l’envoi :', error);
      alert('Erreur serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-pdf">
      <h2>Importer un PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />

      {pdfUrl && (
        <>
          <iframe
            src={pdfUrl}
            width="100%"
            height="600px"
            title="PDF Viewer"
          ></iframe>
          <div className="button-group">
            <button onClick={handleRemove}>Retirer le PDF</button>
            <button onClick={handleUpload} disabled={loading}>
              {loading ? 'Analyse en cours...' : 'Analyser avec l’IA'}
            </button>
          </div>
        </>
      )}

      {summary && (
        <div className="summary-result">
          <h3>Résumé généré par l’IA :</h3>
          <pre>{summary}</pre>
        </div>
      )}
    </div>
  );
}

export default UploadPDF;

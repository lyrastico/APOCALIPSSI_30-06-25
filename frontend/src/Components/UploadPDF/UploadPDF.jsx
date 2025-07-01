import React, { useState } from 'react';
import './UploadPDF.scss';

function UploadPDF() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    } else {
      alert('Veuillez sélectionner un fichier PDF.');
    }
  };

  const handleRemove = () => {
    setPdfUrl(null);
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
          <button onClick={handleRemove}>Retirer le PDF</button>
        </>
      )}
    </div>
  );
}

export default UploadPDF;

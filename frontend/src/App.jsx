import React, { useState } from 'react';
import Auth from './components/Auth';
import DocumentUpload from './components/DocumentUpload';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>APOCAL'IPSSI</h1>
      <p style={{ textAlign: 'center' }}>POC ComplySummarize</p>
      
      {!isAuthenticated ? (
        <Auth onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <>
          <button 
            onClick={handleLogout}
            style={{ position: 'absolute', top: '20px', right: '20px' }}
          >
            Déconnexion
          </button>
          <DocumentUpload />
        </>
      )}
    </div>
  );
}

export default App;

// import React from 'react';

// function App() {
//   return (
//     <div style={{ textAlign: 'center', marginTop: '100px' }}>
//       <h1>APOCAL’IPSSI</h1>
//       <p>Bienvenue sur le POC ComplySummarize</p>
//     </div>
//   );
// }

// export default App;
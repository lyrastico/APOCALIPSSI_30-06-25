const jwt = require('jsonwebtoken');
const SECRET = 'votre_clé_secrète';

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // format: Bearer <token>
  if (!token) return res.status(401).json({ message: 'Accès refusé' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' });
  }
}

module.exports = authMiddleware;

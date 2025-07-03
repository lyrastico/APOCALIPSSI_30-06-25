const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  prenom: { type: String, required: true },
  nom: { type: String, required: true },
  pseudo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('motDePasse')) return next();
  const salt = await bcrypt.genSalt(10);
  this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
  next();
});

userSchema.methods.comparePassword = function (mdp) {
  return bcrypt.compare(mdp, this.motDePasse);
};

module.exports = mongoose.model('User', userSchema);

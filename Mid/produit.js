const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prix: { type: Number, required: true },
    // autres champs...
});

module.exports = mongoose.model('Produit', produitSchema);

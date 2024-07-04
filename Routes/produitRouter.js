const express = require('express');
const router = express.Router();
const produit = require('../Controller/ProduitController');

// Ajouter un produit avec validation
router.post('/add', produit.produitValidationRules(), produit.validate, produit.add);

// Afficher tous les produits
router.get('/afficher', produit.afficher);

// Afficher un produit par ID
router.get('/aff/:id', produit.afficherid);

// Modifier un produit avec validation
router.put('/modifier/:id', produit.produitValidationRules(), produit.validate, produit.modifier);

// Supprimer un produit
router.delete('/supprimer/:id', produit.supprimer);

// Recherche avancée des produits
router.post('/recherche', produit.rechercheAvancee);

// Calculer le nombre de recherches de produit par nom
router.post('/calculer-nombre-recherches', produit.calculerNombreRecherchesParNom);

// Obtenir d'autres produits de la même catégorie
router.get('/:id/autres-produits', produit.autresProduitsMemeCategorie);

module.exports = router;

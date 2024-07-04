const express = require("express");
const router = express.Router();
const annonceOffre = require("../Controller/AnnonceOffre.js");

const { annonceOffreValidationRules, validate } = annonceOffre;

// CRUD ajout
router.post('/add', annonceOffreValidationRules(), validate, annonceOffre.add);
// CRUD afficher
router.get('/afficher', annonceOffre.afficher);
// CRUD afficher by id
router.get('/aff/:id', annonceOffre.afficherid);
// CRUD update
router.put('/modifier/:id', annonceOffreValidationRules(), validate, annonceOffre.modifier);
// CRUD delete
router.delete('/supprimer/:id', annonceOffre.supprimer);
// API
router.post('/generateimage', annonceOffre.generateImage);

router.get('/getproduct/:id', annonceOffre.getProduitByAnnounce);
router.put('/incrementviews/:id', annonceOffre.incrementumberOfViews);
router.put('/incrementlikes/:id', annonceOffre.incrementumberOfLikes);
router.put('/decrementlikes/:id', annonceOffre.decrementumberOfLikes);

router.put('/updatestatus/:id', annonceOffre.updateStatus);
router.put('/updateAnounceImage/:id', annonceOffre.updateAnounceImage);

module.exports = router;

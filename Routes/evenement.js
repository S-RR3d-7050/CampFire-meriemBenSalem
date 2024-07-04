const express =require("express");
const router = express.Router();
const evenement = require ("../Controller/evenement.js")

//crud ajout
router.post('/add',evenement.add);
//crud afficher
router.get('/afficher',evenement.afficher);
//crud afficher by id
router.get('/aff/:id',evenement.afficherid);
//crud update
router.put('/modifier/:id',evenement.modifier);
//crud delete
router.delete('/supprimer/:id',evenement.supprimer);

module.exports=router;
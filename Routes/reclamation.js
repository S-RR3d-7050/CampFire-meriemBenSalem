const express =require("express");
const router = express.Router();
const reclamation = require ("../Controller/Reclamation.js")

//crud ajout
router.post('/add',reclamation.add);
//crud afficher
router.get('/afficher',reclamation.afficher);
//crud afficher by id
router.get('/aff/:id',reclamation.afficherid);
//crud update
router.put('/modifier/:id',reclamation.modifier);
//crud delete
router.delete('/supprimer/:id',reclamation.supprimer);

module.exports=router;
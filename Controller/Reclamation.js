var Reclamation = require("../Model/Reclamation")


async function add(req, res, next) {
  try{
  const reclamation= new Reclamation(req.body);
  await reclamation.save();
  res.status(200).send('add reclamation sucess');
    }catch(err){
  console.log(err);
    }
  
  }
  async function afficher(req, res, next) {
    try {
      const reclamation = await Reclamation.find();
      res.status(200).json(reclamation);
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération des reclamation');
    }
  }

  async function afficherid(req, res, next) {
    try {
      const reclamation = await Reclamation.findById(req.params.id);
      if (!reclamation) {
        return res.status(404).send('reclamation non trouvé');
      }
      res.status(200).json(reclamation);
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération de reclamation');
    }
  }

  

  async function modifier(req, res, next) {
    try {
      const reclamation = await Reclamation.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!reclamation) {
        return res.status(404).send('reclamation non trouvé');
      }
      res.status(200).json(reclamation);
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la mise à jour de l\'reclamation');
    }
  }

  async function supprimer(req, res, next) {
    try {
      const reclamation = await Reclamation.findByIdAndDelete(req.params.id);
      if (!reclamation) {
        return res.status(404).send('reclamation non trouvé');
      }
      res.status(200).send('reclamation supprimé avec succès');
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la suppression de reclamation');
    }
  }

  module.exports = {add,afficher,afficherid,modifier,supprimer}
var Evenement = require("../Model/evenement")


async function add(req, res, next) {
  try{
  const evenement= new Evenement(req.body);
  await evenement.save();
  res.status(200).send('add evenement sucess');
    }catch(err){
  console.log(err);
    }
  
  }
  async function afficher(req, res, next) {
    try {
      const evenement = await Evenement.find();
      res.status(200).json(evenement);
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération des evenement');
    }
  }

  async function afficherid(req, res, next) {
    try {
      const evenement = await Evenement.findById(req.params.id);
      if (!evenement) {
        return res.status(404).send('evenement non trouvé');
      }
      res.status(200).json(evenement);
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération de evenement');
    }
  }

  

  async function modifier(req, res, next) {
    try {
      const evenement = await Evenement.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!evenement) {
        return res.status(404).send('evenement non trouvé');
      }
      res.status(200).json(evenement);
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la mise à jour de l\'evenement');
    }
  }

  async function supprimer(req, res, next) {
    try {
      const evenement = await Evenement.findByIdAndDelete(req.params.id);
      if (!evenement) {
        return res.status(404).send('evenement non trouvé');
      }
      res.status(200).send('evenement supprimé avec succès');
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la suppression de evenement');
    }
  }

  module.exports = {add,afficher,afficherid,modifier,supprimer}
const { check, validationResult } = require('express-validator');
const AnnonceOffre = require("../Model/AnnonceOffre");
const Produit = require("../Model/produit");
const axios = require('axios');

// Validation middleware
const annonceOffreValidationRules = () => [
  
 
  check('description').not().isEmpty().withMessage('La description est requise'),
  check('prix').isNumeric().withMessage('Le prix doit être un nombre'),
    
  check('dateDebutAnnonce').isISO8601().withMessage('La dateDebutAnnonce doit être une date valide'),
  check('dateFinAnnonce').isISO8601().withMessage('La dateFinAnnonce doit être une date valide'),
  //dateFin > dateDebut
  check('dateDebutAnnonce').isDate().withMessage('La dateDebutAnnonce doit être une date valide'),
  check('dateFinAnnonce')
    .isDate().withMessage('La dateFinAnnonce doit être une date valide')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.dateDebutAnnonce)) {
        throw new Error('La date de fin doit être ultérieure à la date de début');
      }
      return true;
    }),
  check('description').not().isEmpty().withMessage('La description est requise'),
  check('prix').isNumeric().withMessage('Le prix doit être un nombre'),
];

// Middleware pour gérer les erreurs de validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

async function add(req, res, next) {
  try {
    const { idAnnonce, dateDebutAnnonce, dateFinAnnonce, description, prix, idProduit, image } = req.body;

    // Valider que dateFinAnnonce > dateDebutAnnonce
    if (new Date(dateFinAnnonce) <= new Date(dateDebutAnnonce)) {
      return res.status(400).send('dateFinAnnonce doit être supérieure à dateDebutAnnonce');
    }

    // Créer l'instance AnnonceOffre
    const annonceOffre = new AnnonceOffre({
      idAnnonce,
      dateDebutAnnonce,
      dateFinAnnonce,
      description,
      prix,
      idProduits: idProduit, // Assigner le tableau idProduit à idProduits
      image
    });

    // Enregistrer l'instance AnnonceOffre dans la base de données
    await annonceOffre.save();

    res.status(200).send('AnnonceOffre ajoutée avec succès');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur lors de l\'ajout de l\'AnnonceOffre');
  }
}

async function afficher(req, res, next) {
  try {
    const annonceOffre = await AnnonceOffre.find();
    res.status(200).json(annonceOffre);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur lors de la récupération des AnnonceOffre');
  }
}

async function afficherid(req, res, next) {
  try {
    const annonceOffre = await AnnonceOffre.findById(req.params.id);
    if (!annonceOffre) {
      return res.status(404).send('AnnonceOffre non trouvée');
    }
    res.status(200).json(annonceOffre);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur lors de la récupération de l\'AnnonceOffre');
  }
}

async function modifier(req, res, next) {
  try {
    const annonceOffre = await AnnonceOffre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!annonceOffre) {
      return res.status(404).send('AnnonceOffre non trouvée');
    }
    res.status(200).json(annonceOffre);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur lors de la mise à jour de l\'AnnonceOffre');
  }
}

async function supprimer(req, res, next) {
  try {
    const annonceOffre = await AnnonceOffre.findByIdAndDelete(req.params.id);
    if (!annonceOffre) {
      return res.status(404).send('AnnonceOffre non trouvée');
    }
    res.status(200).send('AnnonceOffre supprimée avec succès');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur lors de la suppression de l\'AnnonceOffre');
  }
}

// Ajouter une fonction IA pour générer une image à partir d'un prompt
async function generateImage(req, res, next) {
  try {
    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt est requis' });
    }

    const response = await axios.post('https://api.openai.com/v1/images/generations', {
      prompt: prompt,
      n: 1,
      size: '1024x1024'
    }, {
      headers: {
        'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
        'Content-Type': 'application/json'
      }
    });

    // Le résultat de l'image générée par l'IA est stocké dans imageUrl et retourné dans la réponse
    return res.status(200).json({ imageUrl: response.data.data[0].url });
  } catch (error) {
    console.error('Erreur lors de la génération de l\'image:', error.response ? error.response.data : error.message);
    return res.status(500).json({ message: 'Erreur lors de la génération de l\'image', error: error.response ? error.response.data : error.message });
  }
}

// Obtenir les produits par ID d'annonce
async function getProduitByAnnounce(req, res, next) {
  try {
    const annonceOffre = await AnnonceOffre.findById(req.params.id);
    if (!annonceOffre) {
      return res.status(404).send('AnnonceOffre non trouvée');
    }
    const produits = await Produit.find({ _id: { $in: annonceOffre.idProduits } });
    if (!produits || produits.length === 0) {
      return res.status(404).send('Aucun produit trouvé pour cette annonce');
    }
    res.status(200).json(produits);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur lors de la récupération des produits');
  }
}

// Incrémenter le nombre de vues
async function incrementumberOfViews(req, res, next) {
  try {
    const annonceOffre = await AnnonceOffre.findByIdAndUpdate(req.params.id, { $inc: { numberOfViews: 1 } }, { new: true });
    if (!annonceOffre) {
      return res.status(404).send('AnnonceOffre non trouvée');
    }
    res.status(200).json(annonceOffre);
  } catch (e) {
    console.log(err);
  }
}

// Incrémenter le nombre de likes
async function incrementumberOfLikes(req, res, next) {
  try {
    const annonceOffre = await AnnonceOffre.findByIdAndUpdate(req.params.id, { $inc: { numberOfLikes: 1 } }, { new: true });
    if (!annonceOffre) {
      return res.status(404).send('AnnonceOffre non trouvée');
    }
    res.status(200).json(annonceOffre);
  } catch (e) {
    console.log(err);
  }
}

// Décrémenter le nombre de likes
async function decrementumberOfLikes(req, res, next) {
  try {
    const annonceOffre = await AnnonceOffre.findByIdAndUpdate(req.params.id, { $inc: { numberOfLikes: -1 } }, { new: true });
    if (!annonceOffre) {
      return res.status(404).send('AnnonceOffre non trouvée');
    }
    res.status(200).json(annonceOffre);
  } catch (e) {
    console.log(err);
  }
}

// Si annonce inactive, donc annonce auto cachée
async function updateStatus(req, res, next) {
  try {
    const annonceOffre = await AnnonceOffre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!annonceOffre) {
      return res.status(404).send('AnnonceOffre non trouvée');
    }
    res.status(200).json(annonceOffre);
  } catch (e) {
    console.log(err);
  }
}

async function updateAnounceImage(req, res, next) {
  try {
    const annonceOffre = await AnnonceOffre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!annonceOffre) {
      return res.status(404).send('AnnonceOffre non trouvée');
    }
    res.status(200).json(annonceOffre);
  } catch (e) {
    console.log(err);
  }
}

module.exports = {
  add,
  afficher,
  afficherid,
  modifier,
  supprimer,

  generateImage,

  incrementumberOfViews,
  incrementumberOfLikes,
  decrementumberOfLikes,

  updateStatus,

  getProduitByAnnounce,
  updateAnounceImage,

  annonceOffreValidationRules,
  validate
};

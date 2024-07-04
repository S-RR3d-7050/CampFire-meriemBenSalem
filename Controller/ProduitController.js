const { check, validationResult } = require('express-validator');
const Produit = require('../Model/produit');

// Validation middleware
const produitValidationRules = () => [
  check('nomProduit').not().isEmpty().withMessage('Le nom est requis'),
  check('prixProduit').isNumeric().withMessage('Le prix doit être un nombre'),
  check('categorieProduit').not().isEmpty().withMessage('categorieProduit est requis'),
  check('descriptionProduit').optional().isString().withMessage('La description doit être une chaîne de caractères')
];

// Middleware pour gérer les erreurs de validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Ajouter un produit
async function add(req, res, next) {
  try {
    const produit = new Produit(req.body);
    await produit.save();
    res.status(200).send('Produit ajouté avec succès');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur lors de l\'ajout du produit');
  }
}

// Afficher tous les produits
async function afficher(req, res, next) {
  try {
    const produits = await Produit.find();
    res.status(200).json(produits);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur lors de la récupération des produits');
  }
}

// Afficher un produit par ID
async function afficherid(req, res, next) {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) {
      return res.status(404).send('Produit non trouvé');
    }
    res.status(200).json(produit);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur lors de la récupération du produit');
  }
}

// Modifier un produit
async function modifier(req, res, next) {
  try {
    const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!produit) {
      return res.status(404).send('Produit non trouvé');
    }
    res.status(200).json(produit);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur lors de la modification du produit');
  }
}

// Supprimer un produit
async function supprimer(req, res, next) {
  try {
    const produit = await Produit.findByIdAndDelete(req.params.id);
    if (!produit) {
      return res.status(404).send('Produit non trouvé');
    }
    res.status(200).send('Produit supprimé avec succès');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur lors de la suppression du produit');
  }
}


///*****M1 */ Recherche avancée des produits
async function rechercheAvancee(req, res, next) {
  try {
    // Récupérer les critères de recherche depuis la requête
    const { nomProduit, prixMin, prixMax } = req.body;

    // Construire le filtre de recherche
    const filter = {};
    if (nomProduit) {
      filter.nomProduit = { $regex: nomProduit, $options: 'i' }; // Recherche insensible à la casse
    }
    if (prixMin !== undefined && prixMax !== undefined) {
      filter.prixProduit = { $gte: prixMin, $lte: prixMax }; // Recherche de prix dans une plage
    } else if (prixMin !== undefined) {
      filter.prixProduit = { $gte: prixMin }; // Recherche de prix minimum
    } else if (prixMax !== undefined) {
      filter.prixProduit = { $lte: prixMax }; // Recherche de prix maximum
    }

    // Exécuter la recherche
    const produits = await Produit.find(filter);

    // Envoyer les résultats de la recherche
    res.status(200).json(produits);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur lors de la recherche avancée des produits');
  }
}


//*****M2 */ Calculer le nombre de recherches de produit par nom
async function calculerNombreRecherchesParNom(req, res, next) {
  try {
    const { nomProduit } = req.body;

    // Vérifier si le nom du produit est fourni
    if (!nomProduit) {
      return res.status(400).json({ message: 'Le nom du produit est requis pour effectuer cette recherche.' });
    }

    // Compter le nombre de produits correspondant au nom fourni
    const count = await Produit.countDocuments({ nomProduit });

    // Envoyer le nombre de résultats de recherche
    res.status(200).json({ count });
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur lors du calcul du nombre de recherches de produit par nom');
  }
}

//**********Api 

// Obtenir d'autres produits de la même catégorie que le produit sélectionné
async function autresProduitsMemeCategorie(req, res, next) {
  try {
    const produitSelectionne = await Produit.findById(req.params.id);
    if (!produitSelectionne) {
      return res.status(404).send('Produit non trouvé');
    }

    // Récupérer d'autres produits de la même catégorie que le produit sélectionné
    const autresProduits = await Produit.find({ categorieProduit: produitSelectionne.categorieProduit, _id: { $ne: produitSelectionne._id } }).limit(5);

    res.status(200).json(autresProduits);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur lors de la récupération des autres produits de la même catégorie');
  }
}


module.exports = { 
  add, 
  afficher, 
  afficherid, 
  modifier, 
  supprimer, 
  produitValidationRules, 
  validate, 
  rechercheAvancee, 
  calculerNombreRecherchesParNom,
  autresProduitsMemeCategorie 
};


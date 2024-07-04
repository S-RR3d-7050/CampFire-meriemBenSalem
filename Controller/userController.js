var User = require("../Model/user")

// async function add(req, res, next) {
//   try{
//   const user= new User(req.body);
//   await user.save();
//   res.status(200).send('add user sucess');
//     }catch(err){
//   console.log(err);
//     }
  
//   }
//   async function afficher(req, res, next) {
//     try {
//       const user = await User.find();
//       res.status(200).json(user);
//     } catch (err) {
//       console.log(err);
//       res.status(500).send('Erreur lors de la récupération des users');
//     }
//   }

//   async function afficherid(req, res, next) {
//     try {
//       const user = await User.findById(req.params.id);
//       if (!user) {
//         return res.status(404).send('user non trouvé');
//       }
//       res.status(200).json(user);
//     } catch (err) {
//       console.log(err);
//       res.status(500).send('Erreur lors de la récupération de user');
//     }
//   }

  

//   async function modifier(req, res, next) {
//     try {
//       const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//       if (!user) {
//         return res.status(404).send('user non trouvé');
//       }
//       res.status(200).json(user);
//     } catch (err) {
//       console.log(err);
//       res.status(500).send('Erreur lors de la mise à jour du user');
//     }
//   }

//   async function supprimer(req, res, next) {
//     try {
//       const user = await User.findByIdAndDelete(req.params.id);
//       if (!user) {
//         return res.status(404).send('user non trouvé');
//       }
//       res.status(200).send('user supprimé avec succès');
//     } catch (err) {
//       console.log(err);
//       res.status(500).send('Erreur lors de la suppression de user');
//     }
//   }

//   module.exports = {add,afficher,afficherid,modifier,supprimer}

  exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

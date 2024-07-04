var mongo=require("mongoose");
const schema= mongo.Schema;

const produit =new schema({
    idProduit :Number,
    nomProduit :String,
    descriptionProduit :String,
    prixProduit :Number,
    imageProduit :String,
    categorieProduit:String
   
    });
module.exports= mongo.model("produit",produit);
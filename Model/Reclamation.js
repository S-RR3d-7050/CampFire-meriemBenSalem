var mongo=require("mongoose");
const schema= mongo.Schema;

const Reclamation =new schema({
    idReclamation:Number,
    date:Date,
    description:String,
    idUtilisateur:Number,
    nbreCommande:Number
});
module.exports= mongo.model("reclamation",Reclamation); 





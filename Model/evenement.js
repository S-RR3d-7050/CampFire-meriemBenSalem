var mongo=require("mongoose");
const schema= mongo.Schema;

const Evenement =new schema({
    idEvent:Number,
    lieu:String,
    date:Date,
    idUtilisateur:Number,
    nbrePrticipants:Number
});
module.exports= mongo.model("evenement",Evenement); 





var mongo=require("mongoose");
const schema= mongo.Schema;

const AnnonceOffre =new schema({

dateDebutAnnonce : {
    type: Date,
    default: Date.now,
    required: true
},
dateFinAnnonce : {
    type: Date,
    required: true
},
description : {
    type: String,
    required: true

},
    idProduits: [{
        type: schema.Types.ObjectId,
        ref: "produits"
    }],

prix : {
    type: Number,
    required: true
},
image :{
    type: String,
    required: false
},
numberOfViews: {
    type: Number,
    default: 0

},
numberOfLikes: {
    type: Number,
    default: 0
},
status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
},


});

AnnonceOffre.pre('save', function(next) {
    if (this.isModified('dateFinAnnonce')) {
        const currentDate = new Date();
        if (this.dateFinAnnonce < currentDate) {
            this.status = 'inactive';
        } else {
            this.status = 'active';
        }
    }
    next();
});

module.exports= mongo.model("annonceOffre",AnnonceOffre); 





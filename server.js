const http = require("http");
const express = require("express");
const path = require("path")

const cors = require("cors");



const evenement = require("./Routes/evenement.js");
const{add1} = require("./Controller/evenement.js");

const user = require("./Routes/userRoute.js");
const auth = require("./Routes/auth.routes.js");

const{add2} = require("./Controller/userController.js");


const annonceOffre = require("./Routes/annonceOffre.js");
const produit = require("./Routes/produitRouter.js");
const{add3} = require("./Controller/AnnonceOffre.js");

const reclamation = require("./Routes/reclamation.js");
const{add4} = require("./Controller/Reclamation.js");

var mongo=require('mongoose');  //création data base mongodb
var mongoconnect=require("./config/dbConnection.json");   //l'emplacement de fichiers
const bodyParser = require("body-parser");
const db = require("./Model");
const Role = db.role;


const cartRoutes = require('./Routes/cartRoutes');


mongo.connect(mongoconnect.url,{
  useNewUrlParser:true,     //affichage a partir de BD (parser URl)
  useUnifiedTopology:true      //acceder a la BD a partir de topologie exacte
})
.then(()=>console.log('mongo connected'))
.catch((err)=>console.log(err));



// db.mongoose
//   .connect(mongoconnect.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Successfully connect to MongoDB.");
//     initial();
//   })
//   .catch(err => {
//     console.error("Connection error", err);
//     process.exit();
//   });

var app = express();
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use("/annonceOffre",annonceOffre);

app.use("/evenement",evenement);
app.use("/reclamation",reclamation);
app.use("/user",user);
app.use("/produit",produit);
app.use("/cart", cartRoutes);
const server = http.createServer(app);


server.listen(3000, console.log("server run"));



function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "acheteur"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'acheteur' to roles collection");
      });

      new Role({
        name: "vendeur"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'vendeur' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}


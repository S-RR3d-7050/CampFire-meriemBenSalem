const mongoose = require("mongoose");
const schema= mongoose.Schema;

const User =new schema({
    id:Number,
    email:String,
    password:Date,
    username:String,
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ]
});
module.exports= mongoose.model("user",User); 




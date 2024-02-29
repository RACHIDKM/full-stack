

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const UserSchema = new Schema({
  name: String,
  age: Number,
  email: String
});

// Create a model based on that schema
const UserModel = mongoose.model("user", UserSchema);

// export the model
module.exports = UserModel;
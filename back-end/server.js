// Create the server
const express = require("express");
const app = express();
const port = 3002;
const cors = require('cors')
app.use(cors())
app.use(express.json())
// Import Mongoose
const mongoose = require("mongoose");

// Import dotenv to use MONGODB_PASSWORD
require('dotenv').config()

// Import UserModel
const UserModel = require('./models/Users');

// Add GET Method to server
app.get('/', async (req, res) => {

     // Get users from mongodb
  const users = await UserModel.find()
  // Send response from server to "/"
  res.json(users)
})
app.post('/', (req, res) => {
    const newUser = new UserModel(req.body);
    newUser
      .save()
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  })
  app.put("/:id",async(req,res)=>{
  const user =await UserModel.findById(req.params.id);
  user.name = req.body.name;
  user.age = req.body.age;
  user.email = req.body.email;

  user.save();
  res.json(user);


  })
mongoose
    .connect(
        `mongodb+srv://rkarym7:${process.env.MONGODB_PASSWORD}@backend.hmf7ygu.mongodb.net/fullstack?retryWrites=true&w=majority&appName=backend`
    )
    .then(() => {
        app.listen(port, () => {
            console.log(`http://localhost:${port}`);
        });
    })
    .catch((err) => console.log(err));
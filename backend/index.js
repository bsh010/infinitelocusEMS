const express = require("express")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express()

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "bsbsfbrnsftentwnnwnwn";
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);


app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
 
    try {
       const userDoc = await UserModel.create({
          name,
          email,
          password: bcrypt.hashSync(password, bcryptSalt),
       });
       res.json(userDoc);
    } catch (e) {
       res.status(422).json(e);
    }
 });
 
 app.post("/login", async (req, res) => {
    const { email, password } = req.body;
 
    const userDoc = await UserModel.findOne({ email });
 
    if (!userDoc) {
       return res.status(404).json({ error: "User not found" });
    }
 
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
       return res.status(401).json({ error: "Invalid password" });
    }
})
 
const PORT = process.env.PORT;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
})
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const user = require("../models/User");
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
 const jwtSecret = 'mynameismanishsharmaiamawebdeveloperandiamlookingjob'

router.post(
  "/CreateUser",
  [
    body("email").isEmail(),
    body("password", "incorrect password").isLength({ min: 6 }),
    body("name", "incorrect Name").isLength({ min: 6 }),
  ],

  async (req, res) => {
    console.log(
      req.body.name,
      req.body.password,
      req.body.email,
      req.body.location
    );
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
     const salt = await bcrypt.genSalt(10);
     let secPassword = await  bcrypt.hash(req.body.password, salt)


    try {
      await user
        .create({
          name: req.body.name,
          password: secPassword,
          email: req.body.email,
          location: req.body.location,
        })

        .then(res.json({ success: true }));
    } catch (error) {
      console.log(error, "error");
      res.json({ success: false });
    }
  }
);

router.post(
  "/Loginuser",
  [
    body("email").isEmail(),
    body("password", "incorrect password").isLength({ min: 6 }),
  ],

  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    let email = req.body.email;


    try {
      let userData = await user.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ error: "try login with currect crediential" });
      }


      const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ error: "try login with currect crediential" });
      }

      const data = {
        user:{
          id:userData.id
        }
      }
     const authToken = jwt.sign(data,jwtSecret)
      return res.json({ success: true , authToken:authToken});
    } catch (error) {
      console.log(error, "error");
      res.json({ success: false });
    }
  }
);
module.exports = router;

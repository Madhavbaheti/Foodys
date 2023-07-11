

const express = require('express');

const router = express.Router();
const Orders = require("../models/Orders");
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtsecret = "MynameisMadhavBaheti"

router.post("/createuser", body('email').isEmail(),body('password','incorrect password').isLength({ min: 5 }),body('name').isLength({ min: 5 }), async (req,res)=> {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const salt = await bcrypt.genSalt(10);
  const secpassword = await bcrypt.hash(req.body.password,salt)
      try {
       await User.create({
        "name": req.body.name,
        "location": req.body.location,
        "email": req.body.email,
        "password": secpassword
        })
    
        res.json({success:true});
      }
      catch(err) {
        console.log(err);
        res.json({success:false});

      }
});


router.post("/login", body('email').isEmail(),body('password','incorrect password').isLength({ min: 5 }) ,async (req,res)=> {
  
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  let email = req.body.email;
      try {
       let userData = await User.findOne({email})
       if(!userData) {
        return res.status(400).json({errors: "Wrong Credetials"});
       }
       const comparepassword = await bcrypt.compare(req.body.password,userData.password);
       if(!comparepassword) {
        return res.status(400).json({errors: "Wrong Credetials"});
       }
       const data = {
        user:{
          id:userData.id
        }
       }
      const authToken = jwt.sign(data,jwtsecret);
       return res.json({success:true,authToken:authToken});
       
      }

      catch(err) {
        console.log(err);
        res.json({success:false});

      }
});





module.exports= router;
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../config/authMiddleware');
const User = require('../models/User');
const bcrypt = require("bcryptjs");

const jwtSecret = "secret";
//Load connected user
router.get('/', authMiddleware,(req,res) => {
User.findById(req.userId)
.select("-password")
.then (user => {
    if (!user) {
        return res.status(404).json({msg:'User not found!'})
    }
    res.status(200).json(user)
})
.catch((err) => {
    console.error(err.message);
    res.status(500).send({msg:"Server error"});
});
});
//Login User
router.post("/", [ 
    body("email",'please enter a valid email').isEmail(),
    body("password",'please write your password').notEmpty(),
  ], (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } 
      User.find({email:req.body.email})
      .then (user => {
          if (!user.length)  {
              return res.status(404).json({ errors:[{msg:"Please register before"}]})
             
          }
          bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
               if (err) {
                   throw err
               } else if(!isMatch) {
                   return res.json({errors:[{msg:"wrong password!"}]})
               } else {
                let payload = {
                    userId:user._id,
                };
                jwt.sign(payload, jwtSecret, (err, token) => {
                    if (err) {
                        throw err ;
                    }
                    res.send({ token });
                   
                });
               }
          })
      })
  });

module.exports = router
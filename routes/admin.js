const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
// const User = require("../models/User");
const User = require("../models/Admin");
const genToken = require("../config/genToken");
const authMiddleware = require("../config/authMiddleware");
// ADD NEW ADMIN
router.post(
  "/register",
    [
      body("first_name", "Please enter your first name!").notEmpty(),
      body("last_name", "Please enter your last name!").notEmpty(),
      body("phone", "Please enter your phone number!").notEmpty(),
      body("email", "Please enter a valid email!").isEmail(),
      body("password", "Password must be at least 6 characters!").isLength({
        min: 6,
      }),
    ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    let newUser = new User(req.body);
    bcrypt.genSalt(10, function (err, salt) {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hashedPassword) => {
        if (err) throw err;
        newUser.password = hashedPassword;
        newUser.save();
        let payload = {
            userId: newUser.id
        }
        genToken(payload, res);
      });
    });
  }
);
// LOAD ADMIN
router.get("/", authMiddleware, (req, res) => {
    User.findById(req.userId)
      .select("-password")
      .then((user) => {
        if (!user) {
          return res.status(404).send({ msg: "No admin found!" });
        }
        res.status(200).send(user);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).send({ msg: "Server Error" });
      });
});
// LOGIN User
router.post(
  "/login",
  [
    body("email", "Please input your email!").isEmail(),
    body("password", "Please input your password!").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            msg: [
              {
                msg:
                  "Please register before",
              },
            ],
          });
        } else {
          bcrypt.compare(req.body.password, user.password, (err, match) => {
            if (err) {
              throw err;
            } else if (!match) {
              return res
                .status(401)
                .json({ msg: [{ msg: "Wrong Password!" }] });
            } else {
                let payload = {
                    userId: user.id
                }
              genToken(payload, res);
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.send("Server Error");
      });
  }
);
// router.put("/", authMiddleware, (req, res) => {
//   Admin.findById(req.userId).then((user) => {
//     if (!user) {
//       return res.status(404).json({ msg: "Utilisateur non trouvé!" });
//     }
// ​
//     Admin.findByIdAndUpdate(req.userId, { $set: req.body }, { new: true })
//       .then((user) => res.status(200).json(user))
//       .catch((err) => {
//         console.log(err);
//         res.status(500).send({ msg: [{ msg: "Server Error!" }] });
//       });
//   });
// });
module.exports = router;
const express = require("express");
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');
const Wishlist = require("../models/Wishlist");

//add wishlist
router.post("/newwishlist", (req, res) => {
  let newWishlist = new Wishlist(req.body);
  newWishlist.save((err, data) => {
    err ? console.log(err) : res.send("wishlist was added");
  });
});

// get wishlist
router.get("/",authMiddleware, (req, res) => {
  Wishlist.find()
    .then((wishlists) => res.send(wishlists))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server error" });
    });
});

module.exports = router;

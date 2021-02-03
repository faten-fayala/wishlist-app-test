const express = require("express");
const router = express.Router();
const authMiddleware = require("../config/authMiddleware");
const Product = require("../models/Products");
const User = require("../models/User");
const upload = require("../config/multerStorage");

//add product

router.post(
  "/newproduct",
  [upload.single("image"), authMiddleware],
  (req, res) => {
    let img = req.file.filename;
    // let data = JSON.stringify(req.body.data)
    let newProduct = new Product({
      ...req.body,
      owner: req.userId,
      image: img,
    });
    newProduct
      .save()
      .then((product) => res.status(201).send(product))
      .catch((err) => {
        console.error(err.message);
        res.status(500).send({ msg: "Server error" });
      });
  }
);
//Get all products
router.get("/", authMiddleware, (req, res) => {
  Product.find()
    .then((products) => res.send(products))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server error" });
    });
});
//Get user products
router.get("/myproducts", authMiddleware, (req, res) => {
  User.find({ owner: req.userId })
    .then((products) => res.send(products))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server error" });
    });
});

// Delete product
router.delete('/:id', authMiddleware,(req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            if(!product){
                return res.status(404).json({msg: 'Product not found'})
            }else{
                Product.findByIdAndDelete(req.params.id, (err, data) => {
                    res.json({msg: "Product Deleted!"})
                })
            }
        })
        .catch(err => {
            console.error(err.message)
            res.status(500).send('Server error')
        })
})

// else if(product.user.toString() !== req.user.id){
//     res.status(401).json({msg: "Not authorized"})
// }

module.exports = router;

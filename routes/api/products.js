const express = require("express");
let router = express.Router();
const validateProduct = require("../../middlewares/validateProduct");
var  {Product}  = require("../../models/product");


//get products
router.get("/", async (req, res) => {
    let product = await Product.find(req.body);

});


//get single products
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res.status(400).send("Product With given ID is not present"); //when id is not present id db
    return res.send(product); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});


//update a record
router.patch("/:id", async (req, res) => {
  let product = await Product.findById(req.params.id)
  product.name = req.body.name;
  product.productType = req.body.productType;
  product.price = req.body.price
  product.available = req.body.available;
  await product.save();
  return res.send(product);
});

//delete a record
router.delete("/:id", async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  return res.send(product);
});


//Insert a record
router.post("/", validateProduct, async (req, res) => {
  let product = new Product();
  product.name = req.body.name;
  product.productType = req.body.productType;
  product.price = req.body.price
  product.available = req.body.available;
  await product.save();
  return res.send(product);
});
module.exports = router;
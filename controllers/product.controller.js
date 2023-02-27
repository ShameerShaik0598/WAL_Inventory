const connection = require("../database/db.config");
const expressAsyncHandler = require("express-async-handler");
const { Products } = require("../database/models/products.model");

const product = expressAsyncHandler(async (req, res) => {
  res.send({ message: "product from controller" });
});

const createProduct = expressAsyncHandler(async (req, res) => {
  await Products.create(req.body);
  res.send({ message: "new product created" });
});

const getAllProducts = expressAsyncHandler(async (req, res) => {
  let products = await Products.findAll();
  res.send({ message: "Details of All Products", payload: products });
});

module.exports = { product, createProduct, getAllProducts };

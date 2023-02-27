const exp = require("express");
const productApp = exp.Router();

const {
  product,
  createProduct,
  getAllProducts,
} = require("../controllers/product.controller");

productApp.get("/product", product);

productApp.post("/create-product", createProduct);

productApp.get("/get-products", getAllProducts);

module.exports = productApp;

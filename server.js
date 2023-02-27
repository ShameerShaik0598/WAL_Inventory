//import express
const exp = require("express");
const app = exp();
//configure dotenv
require("dotenv").config();
const sequelize = require("./database/db.config");
const expressAsyncHandler = require("express-async-handler");

//assigning port number
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is on port ${PORT}...`));

//Test DB connection
sequelize
  .authenticate() //authenticate method used to test connection
  .then(() => console.log("DB connection sucessful"))
  .catch((err) => console.log("err in DB connection", err));

//get models  from database(they are named exports)
const { Customer } = require("./database/models/customer.model");
const { Orders } = require("./database/models/orders.model");
const { Products } = require("./database/models/products.model");
const { Reviews } = require("./database/models/reviews.model");
const { Address } = require("./database/models/address.mode");

// //mapping between tables using association
// Customer.Products = Customer.belongsToMany(Products, {
//   through: Reviews,
//   foreignKey: "customer_id",
//   timestamps: false,nodemon server

// });
// Products.Customer = Products.belongsToMany(Customer, {
//   through: Reviews,
//   foreignKey: "product_id",
//   timestamps: false,
// });
// Customer.Products = Customer.belongsToMany(Products, {
//   through: Orders,
//   foreignKey: "customer_id",
//   timestamps: false,
// });
// Products.Customer = Products.belongsToMany(Customer, {
//   through: Orders,
//   foreignKey: "product_id",
//   timestamps: false,
// });
// Customer.Address = Customer.hasOne(Address, { foreignKey: "customer_id" });

//create tables for all models
sequelize.sync({ force: true });

//body parser
app.use(exp.json());

//import routes
const customerApp = require("./routes/cutomer.route");
const productApp = require("./routes/product.route");
app.use("/customer-api", customerApp);
app.use("/product-api", productApp);

//invalid path
app.use("*", (req, res) => {
  res.send({ message: "invalid path" });
});

//error handler
app.use((err, re, res, next) => {
  console.log(err);
  res.send({ message: "error occured at", error: err.message });
});

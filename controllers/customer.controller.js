//import connection from db
const connection = require("../database/db.config");
//import express-async-handler
const expressAsyncHandler = require("express-async-handler");
//import customer model
const { Customer } = require("../database/models/customer.model");
const { Products } = require("../database/models/products.model");
const { Reviews } = require("../database/models/reviews.model");
const { Orders } = require("../database/models/orders.model");
const { Address } = require("../database/models/address.mode");
const { Model } = require("sequelize");
//mapping between tables using association
//Associations for Reviews
Customer.Products = Customer.belongsToMany(Products, {
  through: Reviews,
  foreignKey: "customer_id",
  timestamps: false,
});
Products.Customer = Products.belongsToMany(Customer, {
  through: Reviews,
  foreignKey: "product_id",
  timestamps: false,
});
//Associations for Orders
Customer.Products = Customer.belongsToMany(Products, {
  through: Orders,
  foreignKey: "customer_id",
  timestamps: false,
});
Products.Customer = Products.belongsToMany(Customer, {
  through: Orders,
  foreignKey: "product_id",
  timestamps: false,
});
//Association between customer and address
Customer.Address = Customer.hasOne(Address, { foreignKey: "customer_id" });

//create customer
const createCustomer = expressAsyncHandler(async (req, res) => {
  //check customers info in data
  let result = await Customer.findOne({
    where: {
      customer_email: req.body.customer_email,
    },
  });
  //if customer not found
  if (result == undefined) {
    await Customer.create(req.body, {
      include: [
        {
          association: Customer.Address,
        },
      ],
    });
    res.send({ message: "customer created succesfully" });
  }
  //if customer exists
  else {
    let address_info = await result.getAddress();
    //check if address is available or not
    if (address_info[0] != null)
      res.send({ message: "customer address already available" });
    else {
      let customer_address = await Address.create(req.body.address);
      result.setAddress(customer_address);
      res.send({ message: "Address Updated Successfully" });
    }
  }
});

//get all customers
const getAllCustomers = expressAsyncHandler(async (req, res) => {
  let customers = await Customer.findAll();
  res.send({ message: "Details of All Customers", payload: customers });
});

// write review
const writeReview = expressAsyncHandler(async (req, res) => {
  await Reviews.create(req.body);
  res.send({ message: "review sent succesfully" });
});

//get customers reviews
const customerReview = expressAsyncHandler(async (req, res) => {
  //eager loading
  let customer = await Customer.findAll({
    include: [
      {
        association: Customer.Products,
      },
    ],
  });
  res.send({ message: "customer details are: ", payload: customer });
});

//get reviews by customer_id
const allReviewsByCustomer = expressAsyncHandler(async (req, res) => {
  let reviewsByCustomer = await Reviews.findAll({
    attributes: { exclude: ["customer_id"] },
    where: {
      customer_id: req.params.customer_id,
    },
  });
  res.send({
    message: "Reviews by customer",
    payload: {
      customer_id: req.params.customer_id,
      reviews: reviewsByCustomer,
    },
  });
});

//create order
const createOrder = expressAsyncHandler(async (req, res) => {
  await Orders.create(req.body);
  res.send({ message: "order created" });
});

//get all orders by all customers
const ordersByCustomers = expressAsyncHandler(async (req, res) => {
  //eager loading
  let orders = await Customer.findAll({
    include: [
      {
        association: Customer.Products,
      },
    ],
  });
  res.send({ message: "customer details are: ", payload: orders });
});

//get orders  placed by a single customer by using customer_id
const allOrdersByaCustomer = expressAsyncHandler(async (req, res) => {
  let ordersByCustomer = await Orders.findAll({
    attributes: { exclude: ["customer_id"] },
    where: {
      customer_id: req.params.customer_id,
    },
  });
  res.send({
    message: "Orders by customer",
    payload: {
      customer_id: req.params.customer_id,
      orders: ordersByCustomer,
    },
  });
});

module.exports = {
  customerReview,
  createCustomer,
  getAllCustomers,
  writeReview,
  allOrdersByaCustomer,
  ordersByCustomers,
  createOrder,
  allReviewsByCustomer,
};

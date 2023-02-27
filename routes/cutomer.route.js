const exp = require("express");
const customerApp = exp.Router();

const {
  customerReview,
  createCustomer,
  writeReview,
  allReviewsByCustomer,
  ordersByCustomers,
  getAllCustomers,
  createOrder,
  allOrdersByaCustomer,
} = require("../controllers/customer.controller");

customerApp.get("/get-customers", getAllCustomers);

customerApp.post("/create-customer", createCustomer);

customerApp.get("/customers-reviews", customerReview);

customerApp.get("/reviews-by-customer/:customer_id", allReviewsByCustomer);

customerApp.post("/write-review", writeReview);

customerApp.post("/create-order", createOrder);

customerApp.get("/orders-customers", ordersByCustomers);

customerApp.get("/orders-by-customer/:customer_id", allOrdersByaCustomer);

module.exports = customerApp;

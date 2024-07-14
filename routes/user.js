import express from "express";
import {
  customerRegistration,
  editCustomer,
  deleteCustomer,
  getCustomerById,
  loginCustomer,
} from "../controller/customer.js";
const route = express.Router();

route.post("/register", customerRegistration);
route.post("/login", loginCustomer);
route.get("/:id", getCustomerById);
route.delete("/:id", deleteCustomer);
route.put("/:id", editCustomer);

export default route;

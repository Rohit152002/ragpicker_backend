import expressAsyncHandler from "express-async-handler";
import addharValidator from "aadhaar-validator";
import Customer from "../models/customer.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/token.js";

const customerRegistration = expressAsyncHandler(async (req, res) => {
  try {
    const { custname, email, phoneNumber, location, password } = req.body;
    if (!custname || !email || !phoneNumber || !location) {
      res.status(404);
      throw "Add Details";
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const data = await Customer.create({
      custname,
      email,
      phoneNumber,
      location,
      password: hashedPassword,
    });
    const token = createToken(data._id);

    return res.status(201).json({
      success: true,
      data,
      token,
    });
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

const editCustomer = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { custname, email, phoneNumber, location } = req.body;
    if (!custname || !email || !phoneNumber || !location) {
      res.status(404);
      throw "Add Details";
    }
    const data = await Customer.findById(id);
    if (!data) {
      res.status(404);
      throw "No user found";
    }

    const updated = await Customer.findByIdAndUpdate(id, {
      custname,
      email,
      phoneNumber,
      location,
    });
    return res
      .status(200)
      .json({ success: true, message: "updated successfully" });
  } catch (e) {
    res.status(500);
    throw e;
  }
});

const getCustomerById = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Customer.findById(id);
    if (!data) {
      res.status(404);
      throw "No user data found";
    }
    return res.status(200).json({ success: true, message: data });
  } catch (err) {
    res.status(500);
    throw err;
  }
});

const deleteCustomer = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Customer.findByIdAndDelete(id);
    if (!data) {
      res.status(404);
      throw "No user data found";
    }
    return res.status(200).json({ success: true, message: data });
  } catch (err) {
    res.status(500);
    throw err;
  }
});

const loginCustomer = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const customerData = await Customer.findOne({
      email,
    });
    if (!customerData) {
      res.status(401);
      throw "Unauthorized";
    }

    const isMatch = await bcrypt.compare(password, customerData.password);
    if (!isMatch) {
      res.status(401);
      throw "Password Incorrect";
    }
    const token = createToken(customerData._id);

    return res
      .status(200)
      .json({ success: true, message: "Login Verified", token });
  } catch (e) {
    res.status(500);
    throw e;
  }
});

export {
  customerRegistration,
  editCustomer,
  getCustomerById,
  deleteCustomer,
  loginCustomer,
};

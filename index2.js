import express from "express";
import flash from "connect-flash";
// Database connection code
import mongoose from "mongoose";
import Customer from "./models/customer.js";
import User from "./models/user.js";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true })); // convert data from url when post request come
app.use(express.json());
app.use(flash());

main()
  .then(() => console.log("connection is successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/Ragpicker_DataBase");
}

app.get("/", (req, res) => {
  res.send("Working on login and registration");
});

app.get("/user/register", (req, res) => {
  res.render("user/register.ejs");
});
app.post("/user/register", async (req, res) => {
  const { username, email, phoneNumber, adharNumber, city, state } = req.body;
  const user = await User.findOne({ phoneNumber });
  if (user) {
    return res.render("user/register.ejs", { error: "User already exists" });
  } else {
    const user = new User({
      username,
      phoneNumber,
      adharNumber,
      location: { city, state },
      join: new Date(),
    });
    saveDetails(user);

    res.redirect("/user/login");
  }
});

app.get("/user/login", (req, res) => {
  res.render("user/login.ejs");
});
app.post("/user/login", async (req, res) => {
  const { number } = req.body;
  console.log(number);
  let user = await User.findOne({ phoneNumber: number });
  if (user) {
    res.send(`User found! City: ${user}`);
  } else {
    console.log("User not found");
    return res.status(404).send("User not found");
  }
});

app.get("/customer/register", (req, res) => {
  res.render("customer/register.ejs");
});
app.post("/customer/register", async (req, res) => {
  const { custname, email, phoneNumber, adddress, city, state } = req.body;
  const customer = await Customer.findOne({ phoneNumber });
  if (customer) {
    res.send("Customer already exists");
  } else {
    const cust = new Customer({
      custname,
      email,
      phoneNumber,
      location: { city, state, adddress },
    });
    saveDetails(cust);
    res.redirect("/customer/login");
  }
});

app.get("/customer/login", (req, res) => {
  res.render("customer/login.ejs");
});
app.post("/customer/login", async (req, res) => {
  const { number } = req.body;
  console.log(number);
  let customer = await Customer.findOne({ phoneNumber: number });
  if (customer) {
    res.send(`customer found! City: ${customer}`);
  } else {
    console.log("customer not found");
    res.status(404).send("customer not found");
  }
});

function saveDetails(value) {
  value
    .save()
    .then(() => console.log("data saved"))
    .catch((err) => console.log(err));
}

app.listen(8000, () => {
  console.log("running at port 8000");
});

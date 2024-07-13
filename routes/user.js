import express from "express";
import { registration } from "../controller/user.js";
const route = express.Router();

route.post("/", registration);

export default route;

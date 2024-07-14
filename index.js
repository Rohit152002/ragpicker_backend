import express from "express";
import userRouter from "./routes/user.js";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";
import mongodb from "./config/db.js";
const app = express();

app.use(express.json());
app.use(cors());
mongodb();

app.use("/api/user", userRouter);

app.use("/", (req, res) => {
  res.send("server running");
});
app.use(errorHandler);
app.listen(8000, () => {
  console.log("running at port 8000");
});

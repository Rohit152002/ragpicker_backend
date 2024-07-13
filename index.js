import express from "express";
import userRouter from "./routes/user.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);

app.use("/", (req, res) => {
  res.send("server running");
});
app.use(errorHandler);
app.listen(8000, () => {
  console.log("running at port 8000");
});

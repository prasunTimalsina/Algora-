import express from "express";
import dotenv from "dotenv";

import authRouter from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const port = 8080 || process.env.PORT;

app.use(express.json());

app.use("api/v1/auth", authRouter);

app.listen(port, () => {
  console.log(`Sever is listening on port ${port}`);
});

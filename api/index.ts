import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import post_seed_questions from "./Routes/post_seed_questions";
import get_questions from "./Routes/get_questions";
import path from "path";

const app = express();
const prisma = new PrismaClient();
const port = 5000

app.use(
  cors({
    origin: "*", 
    methods: "GET,POST,PUT,DELETE",
  })
);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use(express.json());
app.use("/seed-questions", post_seed_questions);
app.use("/questions", get_questions);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});


app.listen(port, () => {
  console.log(`API of ${process.env.NODE_ENV} listening at http://localhost:${port}`);
});
export default app;

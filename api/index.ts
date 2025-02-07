import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import post_seed_questions from "./Routes/post_seed_questions.ts";
import get_questions from "./Routes/get_questions.ts";

const app = express();
const prisma = new PrismaClient();

app.use(cors());

app.use(
    cors({
      origin: "http://localhost:3000", 
      methods: "GET,POST,PUT,DELETE",
    })
  );

app.use(express.json());

app.use("/seed-questions", post_seed_questions);
app.use("/questions", get_questions);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

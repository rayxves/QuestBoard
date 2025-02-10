import express from "express";
import { PrismaClient } from "@prisma/client";
import he from "he";

const app = express();
const prisma = new PrismaClient();

app.get("/", async (req, res) => {
  try {
    const { difficulty, type } = req.query;

    const filters: any = {};
    if (difficulty && difficulty !== "whatever")
      filters.difficulty = difficulty;
    if (type) filters.type = type;

    const questions = await prisma.question.findMany({
      where: filters,
    });

    const decodedQuestions = questions.map((question) => {
      return {
        ...question,
        question: he.decode(question.question),
      };
    });

    const shuffledQuestions = decodedQuestions.sort(() => Math.random() - 0.5);

    res.json(shuffledQuestions.slice(0, 10));
  } catch (error) {
    console.error("Erro ao buscar questões:", error);
    res.status(500).json({ message: "Erro ao buscar questões" });
  }
});

export default app;

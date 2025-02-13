import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res):Promise<any> => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions)) {
      return res.status(400).json({ error: "Invalid data format. Expected array" });
    }


    const createdQuestions = await prisma.question.createMany({ data: questions });
    res.json({
      message: "Questions seeded successfully!",
      count: createdQuestions.count,
    });
  } catch (err) {
    console.error("Error seeding questions:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

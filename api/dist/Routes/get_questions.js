import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import he from "he";
import { v2 as Translate } from "@google-cloud/translate";
const router = Router();
const prisma = new PrismaClient();
const translate = new Translate.Translate({ key: process.env.GOOGLE_API_KEY });
router.get("/", async (req, res) => {
    try {
        const { difficulty, type, targetLanguage } = req.query;
        if (!targetLanguage) {
            return res.json({ error: "Target language not specified" });
        }
        const filters = {};
        if (difficulty && difficulty !== "whatever")
            filters.difficulty = difficulty;
        if (type)
            filters.type = type;
        const questions = await prisma.question.findMany({ where: filters });
        const decodedQuestions = questions.map((question) => ({
            ...question,
            question: he.decode(question.question),
            correct_answer: he.decode(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map((answer) => he.decode(answer)),
        }));
        const translatedQuestions = await Promise.all(decodedQuestions.map(async (question) => {
            try {
                const [translatedQuestion] = await translate.translate(question.question, targetLanguage);
                const [translatedCorrectAnswer] = await translate.translate(question.correct_answer, targetLanguage);
                const translatedIncorrectAnswers = await Promise.all(question.incorrect_answers.map(async (answer) => {
                    const [translatedAnswer] = await translate.translate(answer, targetLanguage);
                    return translatedAnswer;
                }));
                return {
                    ...question,
                    question: translatedQuestion,
                    correct_answer: translatedCorrectAnswer,
                    incorrect_answers: translatedIncorrectAnswers,
                };
            }
            catch (error) {
                console.error("Erro ao traduzir questão:", error);
                return question;
            }
        }));
        res.json(translatedQuestions.sort(() => Math.random() - 0.5).slice(0, 10));
    }
    catch (error) {
        console.error("Erro ao buscar questões:", error);
        res.status(500).json({ message: `Erro ao buscar questões: ${error}` });
    }
});
export default router;

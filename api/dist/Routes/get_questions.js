"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const he_1 = __importDefault(require("he"));
const translate_1 = require("@google-cloud/translate");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const translate = new translate_1.v2.Translate({ key: process.env.GOOGLE_API_KEY });
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { difficulty, type, targetLanguage } = req.query;
        if (!targetLanguage)
            return res.json({ error: "Target language not specified" });
        const filters = {};
        if (difficulty && difficulty !== "whatever")
            filters.difficulty = difficulty;
        if (type)
            filters.type = type;
        const questions = yield prisma.question.findMany({
            where: filters,
        });
        const decodedQuestions = questions.map((question) => {
            return Object.assign(Object.assign({}, question), { question: he_1.default.decode(question.question), correct_answer: he_1.default.decode(question.correct_answer), incorrect_answers: question.incorrect_answers.map((answer) => he_1.default.decode(answer)) });
        });
        const translatedQuestions = yield Promise.all(decodedQuestions.map((question) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const [translatedQuestion] = yield translate.translate(question.question, targetLanguage);
                const [translatedCorrectAnswer] = yield translate.translate(question.correct_answer, targetLanguage);
                const translatedIncorrectAnswers = yield Promise.all(question.incorrect_answers.map((answer) => __awaiter(void 0, void 0, void 0, function* () {
                    const [translatedAnswer] = yield translate.translate(answer, targetLanguage);
                    return translatedAnswer;
                })));
                return Object.assign(Object.assign({}, question), { question: translatedQuestion, correct_answer: translatedCorrectAnswer, incorrect_answers: translatedIncorrectAnswers });
            }
            catch (error) {
                console.error("Erro ao traduzir questão:", error);
                return question;
            }
        })));
        const shuffledQuestions = translatedQuestions.sort(() => Math.random() - 0.5);
        res.json(shuffledQuestions.slice(0, 10));
    }
    catch (error) {
        console.error("Erro ao buscar questões:", error);
        res.status(500).json({ message: "Erro ao buscar questões" });
    }
}));
exports.default = router;

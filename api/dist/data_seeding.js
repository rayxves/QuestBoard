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
const axios_1 = __importDefault(require("axios"));
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get("https://opentdb.com/api.php?amount=50");
            const questions = response.data.results.map((q) => ({
                type: q.type,
                category: q.category,
                difficulty: q.difficulty,
                question: q.question,
                correct_answer: q.correct_answer,
                incorrect_answers: q.incorrect_answers,
            }));
            const result = yield axios_1.default.post("http://localhost:5000/seed-questions", questions);
            console.log(result.data);
        }
        catch (error) {
            console.log("Error seeding database: ", error);
        }
    });
}
seedDatabase();

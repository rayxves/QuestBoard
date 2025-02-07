import axios from "axios";

async function seedDatabase() {
  try {
    const response = await axios.get("https://opentdb.com/api.php?amount=50");
    const questions = response.data.results.map((q) => ({
      type: q.type,
      category: q.category,
      difficulty: q.difficulty,
      question: q.question,
      correct_answer: q.correct_answer,
      incorrect_answers: q.incorrect_answers,
    }));
    const result = await axios.post(
      "http://localhost:5000/seed-questions",
      questions
    );
    console.log(result.data);
  } catch (error: any) {
    console.log("Error seeding database: ", error);
  }
}

seedDatabase();

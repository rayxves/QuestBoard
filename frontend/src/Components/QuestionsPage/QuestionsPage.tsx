import { useState, useEffect } from "react";
import Answers from "./Answers/Answers";
import "./question-page.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

async function getAnswers(difficulty: string, type: string) {
  let url = "http://localhost:5000/questions";
  const queryParams: string[] = [];

  if (difficulty !== "" && difficulty !== "whatever")
    queryParams.push(`difficulty=${difficulty}`);
  if (type !== "" && type !== "any") queryParams.push(`type=${type}`);

  if (queryParams.length) {
    url += `?${queryParams.join("&")}`;
  }
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error fetching questions: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching questions: ${error}`);
  }
}

const shuffleArray = (array: string[]) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

export default function QuestionsPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resetAnswers, setResetAnswers] = useState(false);
  const [countCorrectAnswer, setCountCorrectAnswer] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null); // Variável de estado para armazenar a resposta correta

  const location = useLocation();
  const navigate = useNavigate();

  const { difficulty, type } = location.state || {};

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAnswers(difficulty, type);
        setQuestions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [resetAnswers]);

  useEffect(() => {
    if (resetAnswers) {
      setResetAnswers(false);
    }

    if (questions.length > 0 && questions[currentQuestion]) {
      const correct = questions[currentQuestion].correct_answer;
      const answers = [
        correct,
        ...questions[currentQuestion].incorrect_answers,
      ];
      setCorrectAnswer(correct); 
      setShuffledAnswers(shuffleArray(answers));
    }
  }, [currentQuestion, resetAnswers, questions]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const setDashboardPage = () => {
    navigate("/dashboard");
  };

  const setNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setResetAnswers(true);
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const setLastQuestion = () => {
    if (currentQuestion === 0) {
      setDashboardPage();
    } else {
      setResetAnswers(true);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinishQuiz = () => {
    navigate("/finish", {
      state: { score: countCorrectAnswer, questions: questions.length },
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column w-100 h-100 body ">
      <div className="d-flex flex-column gap-3 p-3 rounded question_container">
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={setDashboardPage}
        ></button>
        <span className="pb-3 question">
          {questions[currentQuestion].question}
        </span>
        {/* Passando a variável correctAnswer como prop para o componente Answers */}
        {correctAnswer && (
          <Answers
            model={questions[currentQuestion].type}
            answers={shuffledAnswers}
            correct_answer={correctAnswer}
            reset={resetAnswers}
            onAnswerCorrect={() => setCountCorrectAnswer(countCorrectAnswer + 1)}
          />
        )}
        <div className="w-100 px-4 py-2 d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-primary"
            onClick={setLastQuestion}
          >
            <i className="bi bi-arrow-left"></i> Voltar
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={
              currentQuestion === questions.length - 1
                ? handleFinishQuiz
                : setNextQuestion
            }
          >
            {currentQuestion === questions.length - 1 ? "Finalizar" : "Próximo"}{" "}
            <i
              className={`bi ${
                currentQuestion === questions.length - 1
                  ? "bi-check"
                  : "bi-arrow-right"
              }`}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}

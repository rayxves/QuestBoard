import { useEffect, useState } from "react";
import "./answers.css";

interface Props {
  answers: string[];
  model: string;
  correct_answer: string;
  reset: boolean;
  onAnswerCorrect: () => void;
}

export default function Answers({
  model,
  answers,
  correct_answer,
  reset,
  onAnswerCorrect,
}: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  useEffect(() => {
    if (reset) {
      setSelectedAnswer(null);
      setShowCorrectAnswer(false);
    }
  }, [reset]);

  function handleResponseAnswer(answer: string) {
    setSelectedAnswer(answer);
    setShowCorrectAnswer(true);
    if (answer === correct_answer) {
      onAnswerCorrect();
    }
  }

  return (
    <div className="d-flex my-2 justify-content-center">
      {model === "multiple" ? (
        <div className="d-flex flex-column gap-3 answer_container">
          {answers.map((answer, index) => (
            <div
              key={index}
              className={`-flex flex-column align-items-center justify-content-center button-container 
                ${
                  showCorrectAnswer
                    ? answer === correct_answer
                      ? "correct"
                      : answer === selectedAnswer
                      ? "incorrect"
                      : ""
                    : ""
                }`}
            >
              <button
                className="w-100 btn p-2 m-0 button"
                onClick={() => handleResponseAnswer(answer)}
                disabled={showCorrectAnswer}
              >
                {answer}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className=" d-flex align-items-center gap-3 answer_container">
          {answers.map((answer, index) => (
            <div
              key={index}
              className={`w-50 d-flex justify-content-center button-container 
                ${
                  showCorrectAnswer
                    ? answer === correct_answer
                      ? "correct"
                      : answer === selectedAnswer
                      ? "incorrect"
                      : ""
                    : ""
                }`}
            >
              <button
                className="w-100 btn p-2 m-0 button"
                onClick={() => handleResponseAnswer(answer)}
                disabled={showCorrectAnswer}
              >
                {answer}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

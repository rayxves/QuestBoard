import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./dashboard.css";
import ListItem from "./ListItem/ListItem";

export default function Dashboard() {
  const [difficulty, setDifficulty] = useState("");
  const [languages, setLanguages] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!languages) {
      alert("Por favor, selecione um idioma antes de começar.");
      return;
    }
    navigate("/question-page", { state: { difficulty, type, languages } });
  };

  return (
    <div className="d-flex justify-content-center align-items-center text-center flex-column gap-3 body_home">
      <div className="w-50 h-60 p-5 rounded d-flex justify-content-center align-items-center text-center flex-column gap-2 dificultyContainer">
        <h1>Nível de dificuldade:</h1>
        <div className="w-100 d-flex justify-content-center align-items-center text-center flex-column">
          <ul className="list-group dificulty-list">
            {["Hard", "Medium", "Easy", "Whatever"].map((level) => (
              <ListItem
                key={level}
                text={level}
                isSelected={difficulty === level.toLowerCase()}
                onClick={() => setDifficulty(level.toLowerCase())}
              />
            ))}
          </ul>
        </div>

        <div className="btn-group dropend">
          <button
            className="btn btn-primary p-2 language-button-select"
            type="button"
            data-bs-toggle="dropdown"
          >
            Selecione um Idioma
          </button>
          <ul className="dropdown-menu">
            {[
              { code: "pt", label: "🇧🇷 Português (BR)" },
              { code: "en", label: "🇺🇸 English" },
              { code: "es", label: "🇪🇸 Español" },
              { code: "fr", label: "🇫🇷 Français" },
              { code: "de", label: "🇩🇪 Deutsch" },
              { code: "it", label: "🇮🇹 Italiano" },
              { code: "ja", label: "🇯🇵 日本語 (Japonês)" },
              { code: "zh", label: "🇨🇳 中文 (Chinês)" },
              { code: "ru", label: "🇷🇺 Русский (Russo)" },
            ].map(({ code, label }) => (
              <li key={code}>
                <button
                  className="dropdown-item"
                  onClick={() => setLanguages(code)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="btn-group dropdown">
          <button
            className="btn btn-secondary p-2 type-button-select-secondary"
            type="button"
            data-bs-toggle="dropdown"
          >
            Selecione o tipo
          </button>
          <ul className="dropdown-menu">
            {[
              { value: "any", label: "Any Type" },
              { value: "multiple", label: "Multiple Choice" },
              { value: "boolean", label: "True / False" },
            ].map(({ value, label }) => (
              <li key={value}>
                <button
                  className="dropdown-item"
                  onClick={() => setType(value)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {languages && (
          <p className="language-paragraph p-0 m-0 mt-1">
            Language: {languages}{" "}
            {type && (
              <span>
                and type:{" "}
                {type === "boolean"
                  ? "true-false"
                  : type === "multiple"
                  ? "multiple"
                  : "any"}
              </span>
            )}
          </p>
        )}
      </div>

      <button onClick={handleStart} className="btn btn-primary custom-button">
        Press Start
      </button>
    </div>
  );
}

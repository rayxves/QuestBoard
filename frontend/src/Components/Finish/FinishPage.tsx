import { useLocation, useNavigate } from "react-router-dom";
import "./finish.css";
export default function FinishPage() {
  const location = useLocation();
  const score = location.state?.score;
  const questions = location.state?.questions;
  const percent = (score / questions) * 100;
  const navigate = useNavigate();

  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center finish-body">
      <div className="p-3 w-75 h-50 d-flex align-items-center justify-content-between rounded flex-column finish-container">
        {" "}
        <h1 className="w-100 text-center py-3 h1">Quiz Finalizado</h1>
        <div className="w-100 d-flex align-items-center justify-content-center flex-column">
          <p className="p">Você acertou {score} questões!</p>
          <div className="progress w-50" style={{ height: "1.5rem" }}>
            <div className="progress-bar" style={{ width: `${percent}%` }}>
              {percent}%
            </div>
          </div>
        </div>
        <button
          className="btn custom-button"
          onClick={() => navigate("/dashboard")}
        >
          Try again
        </button>
      </div>
    </div>
  );
}

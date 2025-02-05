import { Link } from "react-router-dom";
import "./home.css";
export default function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center text-center body">
      <header>
        <div className="p-3 titulo-container">
          <h1 className="m-3 p-2 titulo">
            Desafio QuestBoard: Teste seus conhecimentos!
          </h1>
          <Link to="/dashboard" className="btn btn-primary custom-button">
            Press Start
          </Link>
        </div>
      </header>
    </div>
  );
}

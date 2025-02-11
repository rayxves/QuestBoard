import { OrbitProgress } from "react-loading-indicators";
import "../Home/home.css";
export default function LoadingPage() {
  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center body_home">
      <div className="p-4 d-flex align-items-center justify-content-center flex-column rounded titulo-container">
        <h1 className="titulo">Loading</h1>
        <OrbitProgress variant="track-disc" size="small" color="darkblue" speedPlus={0} easing="linear" />
      </div>
    </div>
  );
}

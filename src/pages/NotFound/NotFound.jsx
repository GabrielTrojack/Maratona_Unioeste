import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <h1 className="notfound-code">404</h1>

        <h2 className="notfound-title">
          Página não encontrada
        </h2>

        <p className="notfound-text">
          O endereço que você tentou acessar não existe ou foi removido.
        </p>

        <button
          className="notfound-button"
          onClick={() => navigate("/")}
        >
          Voltar ao início
        </button>
      </div>
    </div>
  );
};

export default NotFound;
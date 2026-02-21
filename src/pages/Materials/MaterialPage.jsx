import React from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

import "./MaterialPage.css";
import menu from "../../assets/menu.svg";

import FullScreenLoader from "../../components/FullScreenLoader/FullScreenLoader";

import { getModules } from "../../services/moduleService"
import { useAuth } from "../../context/AuthContext";

const Material = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [module, setModule] = useState([])
  const [loading, setLoading] = useState(true);

  
  
  async function loadModules() {
    try {
      const data = await getModules();
      setModule(data.content);
    } catch (error) {
      console.error("Erro ao carregar módulos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadModules();
  }, []);

  if (loading) return <FullScreenLoader />;


  return (
    <div className="material-page">
      <div className="material-content">
        <div className="material-header">
          <h2>Materiais de estudo</h2>
          {isAuthenticated && (
            <button onClick={() => navigate("/lessons/new")}>
              + Criar aula
            </button>
          )}
        </div>
        <div className="aulas">
          {module.map((mod) => (
            <div
              key={mod.id}
              onClick={() => navigate(`/materials/lesson/${mod.id}`)}
              className="aula"
            >
              <img className="icon-main" src={menu} alt="" />

              <h1>{mod.title}</h1>

              <div className="actions-container">
                <Pencil
                  className="icon-action edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("edita aula", mod.id);
                  }}
                />

                <Trash2
                  className="icon-action delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("exclui aula", mod.id);
                  }}
                />
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Material;

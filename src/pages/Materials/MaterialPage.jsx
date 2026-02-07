import React from "react";
import "./MaterialPage.css";
import menu from "../../assets/menu.svg";
import excluir from "../../assets/Excluir.svg";
import editar from "../../assets/Editar.svg";


const Material = () => {
  return (
    <div className="material-page">
      <div className="material-content">
        <div className="material-header">
          <h2>Materiais de estudo</h2>
          <button>+ Criar aula</button>
        </div>
        <div className="aulas">

          <div onClick={()=>console.log("vai pra aula")} className="aula">
            <div className="cnt">
              <img src={menu} alt="" />
              <h1>Aula 1 - Sobre a maratona de programação</h1>
            </div>
            <div className="buttons">
              <img src={editar} onClick={()=>console.log("edita aula")} />
              <img src={excluir} onClick={()=>console.log("exclui aula")} />
            </div>
          </div>

          <div onClick={()=>console.log("vai pra aula")} className="aula">
            <div className="cnt">
              <img src={menu} alt="" />
              <h1>Aula 1 - Sobre a maratona de programação</h1>
            </div>
            <div className="buttons">
              <img src={editar} onClick={()=>console.log("edita aula")} />
              <img src={excluir} onClick={()=>console.log("exclui aula")} />
            </div>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <div className="cnt">
              <img src={menu} alt="" />
              <h1>Aula 1 - Sobre a maratona de programação</h1>
            </div>
            <div className="buttons">
              <img src={editar} onClick={()=>console.log("edita aula")} />
              <img src={excluir} onClick={()=>console.log("exclui aula")} />
            </div>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <div className="cnt">
              <img src={menu} alt="" />
              <h1>Aula 1 - Sobre a maratona de programação</h1>
            </div>
            <div className="buttons">
              <img src={editar} onClick={()=>console.log("edita aula")} />
              <img src={excluir} onClick={()=>console.log("exclui aula")} />
            </div>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <div className="cnt">
              <img src={menu} alt="" />
              <h1>Aula 1 - Sobre a maratona de programação</h1>
            </div>
            <div className="buttons">
              <img src={editar} onClick={()=>console.log("edita aula")} />
              <img src={excluir} onClick={()=>console.log("exclui aula")} />
            </div>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <div className="cnt">
              <img src={menu} alt="" />
              <h1>Aula 1 - Sobre a maratona de programação</h1>
            </div>
            <div className="buttons">
              <img src={editar} onClick={()=>console.log("edita aula")} />
              <img src={excluir} onClick={()=>console.log("exclui aula")} />
            </div>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <div className="cnt">
              <img src={menu} alt="" />
              <h1>Aula 1 - Sobre a maratona de programação</h1>
            </div>
            <div className="buttons">
              <img src={editar} onClick={()=>console.log("edita aula")} />
              <img src={excluir} onClick={()=>console.log("exclui aula")} />
            </div>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <div className="cnt">
              <img src={menu} alt="" />
              <h1>Aula 1 - Sobre a maratona de programação</h1>
            </div>
            <div className="buttons">
              <img src={editar} onClick={()=>console.log("edita aula")} />
              <img src={excluir} onClick={()=>console.log("exclui aula")} />
            </div>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <div className="cnt">
              <img src={menu} alt="" />
              <h1>Aula 1 - Sobre a maratona de programação</h1>
            </div>
            <div className="buttons">
              <img src={editar} onClick={()=>console.log("edita aula")} />
              <img src={excluir} onClick={()=>console.log("exclui aula")} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Material;

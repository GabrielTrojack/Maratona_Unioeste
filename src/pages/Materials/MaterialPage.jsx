import React from "react";
import "./MaterialPage.css";
import menu from "../../assets/menu.svg";

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
            <img src={menu} alt="" />
            <h1>Aula 1 - Sobre a maratona de programação</h1>
          </div>
          
          <div onClick={()=>console.log("vai pra aula")} className="aula">
            <img src={menu} alt="" />
            <h1>Aula 1 - Sobre a maratona de programação</h1>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <img src={menu} alt="" />
            <h1>Aula 1 - Sobre a maratona de programação</h1>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <img src={menu} alt="" />
            <h1>Aula 1 - Sobre a maratona de programação</h1>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <img src={menu} alt="" />
            <h1>Aula 1 - Sobre a maratona de programação</h1>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <img src={menu} alt="" />
            <h1>Aula 1 - Sobre a maratona de programação</h1>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <img src={menu} alt="" />
            <h1>Aula 1 - Sobre a maratona de programação</h1>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <img src={menu} alt="" />
            <h1>Aula 1 - Sobre a maratona de programação</h1>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <img src={menu} alt="" />
            <h1>Aula 1 - Sobre a maratona de programação</h1>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <img src={menu} alt="" />
            <h1>Aula 1 - Sobre a maratona de programação</h1>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <img src={menu} alt="" />
            <h1>Aula 1 - Sobre a maratona de programação</h1>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <img src={menu} alt="" />
            <h1>Aula 1 - Sobre a maratona de programação</h1>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <img src={menu} alt="" />
            <h1>Aula 1 - Sobre a maratona de programação</h1>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <img src={menu} alt="" />
            <h1>Aula 1 - Sobre a maratona de programação</h1>
          </div><div onClick={()=>console.log("vai pra aula")} className="aula">
            <img src={menu} alt="" />
            <h1>Aula 1 - Sobre a maratona de programação</h1>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Material;

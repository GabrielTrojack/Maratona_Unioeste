import React from "react";
import "./MaterialForm.css";
import menu from "../../assets/menu.svg";

import excluir from "../../assets/Excluir.svg";
import editar from "../../assets/Editar.svg";


const Material = () => {
  return (
    <div className="material-form">
      <form className="form" action="">
        <input className="modulo" placeholder="Titulo do modulo" type="text" />
        <div className="formName">
          <p>aulas</p>
          <button>Criar aula</button>
        </div>
        <div className="linkAula">
          <input className="modulo" placeholder="Titulo da aula" type="text" />
          <input className="modulo" placeholder="Link da aula" type="text" />
          <img src={excluir} onClick={()=>console.log("exclui aula")} />
        </div>
      </form>
    </div>
  );
};

export default Material;

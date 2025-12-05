import React from "react";
import "./MaterialForm.css";
import menu from "../../assets/menu.svg";

import excluir from "../../assets/Excluir.svg";
import setasdir from "../../assets/setasdir.svg";


const Material = () => {
  return (
    <div className="material-form">
      <form className="form" action="">
        <div class="stepper">
          <div class="step active"></div>
          <div class="step"></div>
          <div class="step"></div>
        </div>

        <input className="modulo" placeholder="Titulo do modulo" type="text" />

        <div className="formName">
          <p>Aulas</p>
          <button>Criar aula</button>
        </div>

        <div className="aulas">
          <div className="linkAula">
            <input className="modulo" placeholder="Titulo da aula" type="text" />
            <input className="modulo" placeholder="Link da aula" type="text" />
            <img src={excluir} onClick={() => console.log("exclui aula")} />
          </div>
          
        </div>

        <div className="downButton">
          <button className="btn">
            <p>Proximo</p>
            <img src={setasdir} alt="" />
          </button>
        </div>

      </form>
    </div>
  );
};

export default Material;

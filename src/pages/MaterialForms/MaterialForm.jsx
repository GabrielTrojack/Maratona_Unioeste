import {useState} from "react";
import "./MaterialForm.css";
import menu from "../../assets/menu.svg";

import excluir from "../../assets/Excluir.svg";
import setasdir from "../../assets/setasdir.svg";
import setasesq from "../../assets/setasesq.svg";
import diffEdit from "../../assets/edit.svg";
import conclude from "../../assets/conclude.svg";


const Material = () => {
  const [step, setStep] = useState(2);
  const [difficulty, setDifficulty] = useState(null);
  const [open, setOpen] = useState(false);

  const colors = {
    facil: "#4CAF50",
    medio: "#FFC107",
    dificil: "#F44336",
  };

  return (
    <div className="material-form">
      <form className="form" action="">

        {step === 1 && (
          <>
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
              <div className="a"></div>

              <button className="btn">
                <p>Proximo</p>
                <img src={setasdir} alt="" />
              </button>
            </div>
          </>
        )}


        {step === 2 && (
          <>
            <div class="stepper">
              <div class="step"></div>
              <div class="step active"></div>
              <div class="step"></div>
            </div>

            <div className="formName">
              <p>Exercicios</p>
              <button>Adicionar Exercicio</button>
            </div>

            <div className="aulas">
              <div className="linkAula">
                <div className="dificultWrapper">
                  <div
                    className="dificulty"
                    onClick={() => setOpen(!open)}
                    style={{backgroundColor: difficulty ? colors[difficulty] : "transparent",}}
                  >
                    {!difficulty && <img src={diffEdit} alt="" />}
                  </div>
                  {open && (
                    <div
                      style={{
                        color: "#000",
                        top: "60px",
                        left: "0",
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "8px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                        zIndex: 10,
                      }}
                    >
                      <p onClick={() => { setDifficulty("facil"); setOpen(false); }} style={{ cursor: "pointer", margin: "6px 0" }}>
                        Fácil
                      </p>
                      <p onClick={() => { setDifficulty("medio"); setOpen(false); }} style={{ cursor: "pointer", margin: "6px 0" }}>
                        Médio
                      </p>
                      <p onClick={() => { setDifficulty("dificil"); setOpen(false); }} style={{ cursor: "pointer", margin: "6px 0" }}>
                        Difícil
                      </p>
                    </div>
                  )}
                </div>
                <input className="modulo" placeholder="Titulo do exercicio" type="text" />
                <input className="modulo" placeholder="Link do execrcicio" type="text" />
                <img src={excluir} onClick={() => console.log("exclui exercicio")} />
              </div>
            </div>

            <div className="downButton">
              <button className="btn">
                <img  src={setasesq} alt="" />
                <p>Anterior</p>
              </button>

              <button className="btn">
                <p>Proximo</p>
                <img src={setasdir} alt="" />
              </button>
            </div>
          </>
        )}


        {step === 3 && (
          <>
            <div class="stepper">
              <div class="step"></div>
              <div class="step"></div>
              <div class="step active"></div>
            </div>

            <div className="formName">
              <p>Notas e Materiais extras</p>
              <button>Adicionar material extra</button>
            </div>
            <textarea className="modulo" placeholder="Notas" name="" id=""></textarea>

            <div className="aulas">
              <div className="linkAula">
                <input className="modulo" placeholder="Titulo do material" type="text" />
                <input className="modulo" placeholder="Link do material" type="text" />
                <img src={excluir} onClick={() => console.log("exclui aula")} />
              </div>
            </div>

            <div className="downButton">

              <button className="btn">
                <img  src={setasesq} alt="" />
                <p>Anterior</p>
              </button>

              <button className="btnConcluir">
                <p>Concluir</p>
                <img src={conclude} alt="" />
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Material;

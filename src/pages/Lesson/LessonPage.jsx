import React from "react";
import "./LessonPage.css";


const Lesson = () => {

  const colors = {
    facil: "#4CAF50",
    medio: "#FFC107",
    dificil: "#F44336",
  };

  return (
    <div className="lesson-page">
      <h1>Aula 1 - Maratona de programação  e  c++ introdutório</h1>
      <div className="lesson-container">

        <div className="media">
          <iframe
            className="video"
            src="https://www.youtube.com/embed/BggrpKfqh1c?si=8Ud-6BT7W7mGMzOt"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen />

          <div className="more">

            <div className="link">
              <p>Aula 1 - Maratona de programação e  c++ introdutório</p>
            </div>
          </div>
        </div>

        <div className="exercicios">
          <p>Exercicios</p>
          <div className="moreExercicios">
            <div className="exercicio"
              style={{ "--marker-color": colors["dificil"] || "#5d0ebe" }}
            >
              <p>Exercicio de pneu</p>
            </div>
          </div>
        </div>

        <div className="extra">
          <p>Materiais e notas</p>
          <div className="moreExtra">
            <p>èos cararararararararararararararararararararararararararararararrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr</p>
            <p>mao banana</p>
            <p>mao banana</p>
            <p>mao banana</p>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Lesson;

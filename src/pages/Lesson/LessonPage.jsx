import React from "react";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import "./LessonPage.css";

import { getExtras, getLessons } from "../../services/moduleService"

import FullScreenLoader from "../../components/FullScreenLoader/FullScreenLoader";

const Lesson = () => {
  const { id } = useParams();
  const [extras, setExtras] = useState([])
  const [lessons, setLessons] = useState([])
  const [exercices, setExercices] = useState([])
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
  setExercices([
    {
      id: 1,
      title: "Soma Simples",
      difficulty: "EASY"
    },
    {
      id: 2,
      title: "Busca Binária",
      difficulty: "MEDIUM"
    },
    {
      id: 2,
      title: "Menino Banana",
      difficulty: "HARD"
    }
  ]);
}, []);

  const colors = {
    EASY: "#4CAF50",
    MEDIUM: "#FFC107",
    HARD: "#F44336",
  };

  async function loadData() {
    try {
      const [extrasData, lessonsData] = await Promise.all([
        getExtras(id),
        getLessons(id)
      ]);

      setExtras(extrasData);
      setLessons(lessonsData);      


    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [id]);


  useEffect(() => {
    if (lessons?.length > 0) {
      setSelectedLesson(lessons[0]);
    }
  }, [lessons]);

    const getEmbedUrl = (url) => {
    if (!url) return "";
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };


  if (loading) return <FullScreenLoader />;

  return (
    <div className="lesson-page">
      <h1>Aula 1 - Maratona de programação  e  c++ introdutório</h1>
      <div className="lesson-container">

        {lessons.length > 0 && (
        <div className="media">
          {selectedLesson && (
            <iframe
              className="video"
              src={getEmbedUrl(selectedLesson.videoUrl)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              title={selectedLesson.title}
            />
          )}
          <div className="more">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`link ${selectedLesson?.id === lesson.id ? "active" : ""}`}
                onClick={() => setSelectedLesson(lesson)}
              >
                  <p>{lesson.title}</p>
              </div>
            ))}
          </div>
        </div>
  )}

        {exercices.length > 0 && (
  <div className="exercicios">
    <p>Exercicios</p>
      <div className="moreExercicios">
        {exercices.map((exercice) => (
          <div
            key={exercice.id}
            onClick={() => console.log("exercicio")}
            className="exercicio"
            style={{ "--marker-color": colors[exercice.difficulty] || "#5d0ebe" }}
          >
            {exercice.title}
          </div>
        ))}
      </div>
    </div>
  )}
        {extras.length > 0 && (
        <div className="extra">
          <p>Materiais extras para estudo</p>
          <div className="moreExtra">
            {extras.map((extra) => (
              <a className="extraMaterial" key={extra.id} href={extra.url}>{extra.type}</a>
            ))}
          </div>
        </div>
        )}


      </div>
    </div>
  );
};

export default Lesson;

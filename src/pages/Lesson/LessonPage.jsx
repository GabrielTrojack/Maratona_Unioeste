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
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);



  const colors = {
    facil: "#4CAF50",
    medio: "#FFC107",
    dificil: "#F44336",
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

        <div className="media">
          {selectedLesson && (
            <iframe
              className="video"
              src={getEmbedUrl(selectedLesson.videoUrl)}
              frameBorder="0"
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
                className="link"
                onClick={() => setSelectedLesson(lesson)}
                style={{ cursor: "pointer" }}
              >
                <p>{lesson.title}</p>
              </div>
            ))}
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
            {extras.map((extra) => (
              <a key={extra.id} href={extra.url}></a>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
};

export default Lesson;

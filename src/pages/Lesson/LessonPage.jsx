import React from "react";
import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom";

import "./LessonPage.css";

import { getExtras, getLessons, getExercises, getModuleById } from "../../services/moduleService"

import FullScreenLoader from "../../components/FullScreenLoader/FullScreenLoader";

const Lesson = () => {
  const { id } = useParams();
  const [extras, setExtras] = useState([])
  const [lessons, setLessons] = useState([])
  const [exercises, setExercises] = useState([])
  const [module, setModule] = useState(null)
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const colors = {
    EASY: "#4CAF50",
    MEDIUM: "#FFC107",
    HARD: "#F44336",
  };

  async function loadData() {
    setLoading(true);

    try {
      const [
        exercisesResult,
        extrasResult,
        lessonsResult,
        moduleResult
      ] = await Promise.allSettled([
        getExercises(id),
        getExtras(id),
        getLessons(id),
        getModuleById(id)
      ]);

      if (exercisesResult.status === "fulfilled") {
        setExercises(exercisesResult.value);
      } else {
        console.error(exercisesResult.reason);
        toast.error("Erro ao carregar exercícios.");
      }

      if (extrasResult.status === "fulfilled") {
        setExtras(extrasResult.value);
      } else {
        console.error(extrasResult.reason);
        toast.error("Erro ao carregar materiais extras.");
      }

      if (lessonsResult.status === "fulfilled") {
        setLessons(lessonsResult.value);
      } else {
        console.error(lessonsResult.reason);
        toast.error("Erro ao carregar vídeo aulas.");
      }

      if (moduleResult.status === "fulfilled") {
        setModule(moduleResult.value);
      } else {
        console.error(moduleResult.reason);
        toast.error("Erro ao carregar módulo.");
      }

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

    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed${parsedUrl.pathname}`;
      }

      const videoId = parsedUrl.searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    } catch {
      return "";
    }
  };


  if (loading) return <FullScreenLoader />;

  return (
    <div className="lesson-page">
      <h1>{module?.title}</h1>
      <div className="lesson-container">
        {!loading &&
          lessons.length === 0 &&
          exercises.length === 0 &&
          extras.length === 0 && (
            <p>Nenhum conteúdo disponível para este módulo.</p>
          )}
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

        {exercises.length > 0 && (
          <div className="exercicios">
            <p className="tag">Exercicios</p>
            <div className="moreExercicios">
              {exercises.map((exercise) => (
                <a
                  key={exercise.id}
                  href={exercise.ojUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="exercicio"
                  style={{ "--marker-color": colors[exercise.difficulty] || "#5d0ebe" }}
                >
                  {exercise.title}
                </a>
              ))}
            </div>
          </div>
        )}
        {(extras.length > 0 || module?.notes) && (
          <div className="extra">
            <p className="tag">Materiais extras para estudo</p>
            <div className="moreExtra">
              <p className="extraMaterialNotes">{module?.notes}</p>
              <ul>
                {extras.map((extra) => (
                  <li key={extra.id} >
                    <a className="extraMaterial"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={extra.url}>{extra.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}


      </div>
    </div>
  );
};

export default Lesson;

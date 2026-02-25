import React from "react";
import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom";

import "./LessonPage.css";

import { getExtras, getLessons, getExercises } from "../../services/moduleService"

import FullScreenLoader from "../../components/FullScreenLoader/FullScreenLoader";

const Lesson = () => {
  const { id } = useParams();
  const location = useLocation();
  const title = location.state?.lessonTitle;
  const notes = location.state?.lessonNotes;
  const [extras, setExtras] = useState([])
  const [lessons, setLessons] = useState([])
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const colors = {
    EASY: "#4CAF50",
    MEDIUM: "#FFC107",
    HARD: "#F44336",
  };

  async function loadData() {
    try {
      const [exercisesData, extrasData, lessonsData] = await Promise.all([
        getExercises(id),
        getExtras(id),
        getLessons(id)
      ]);
      setExercises(exercisesData);
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

  const difficultyOrder = {
  EASY: 0,
  MEDIUM: 1,
  HARD: 2
};

const sortedExercises = [...exercises].sort(
  (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
);


  if (loading) return <FullScreenLoader />;

  return (
    <div className="lesson-page">
      <h1>{title}</h1>
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

        {exercises.length > 0 && (
          <div className="exercicios">
            <p className="tag">Exercicios</p>
            <div className="moreExercicios">
              {sortedExercises.map((exercise) => (
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
        {extras.length > 0 && notes && (
          <div className="extra">
            <p className="tag">Materiais extras para estudo</p>
            <div className="moreExtra">
              <p className="extraMaterialNotes">{notes}</p>
              <ul>
                {extras.map((extra) => (
                  <li>
                    <a className="extraMaterial"
                      target="_blank"
                      rel="noopener noreferrer"
                      key={extra.id}
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

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Trash2,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import {
  createFullModule,
  getModuleById,
  getExtras,
  getLessons,
  getExercises,
  updateFullModule
} from "../../services/moduleService";
import "./MaterialForm.css";

import FullScreenLoader from "../../components/FullScreenLoader/FullScreenLoader";


const Material = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEditMode) return;

    async function loadData() {
      setLoading(true);

      try {
        const [
          exercisesData,
          extrasData,
          lessonsData,
          moduleResponse
        ] = await Promise.all([
          getExercises(id),
          getExtras(id),
          getLessons(id),
          getModuleById(id)
        ]);

        setModuleData({
          title: moduleResponse.title || "",
          notes: moduleResponse.notes || "",
          published: moduleResponse.published ?? true,
          lessons: lessonsData || [],
          exercises: exercisesData || [],
          extraMaterials: extrasData || [],
        });

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, isEditMode]);

  const [moduleData, setModuleData] = useState({
    title: "",
    notes: "",
    published: true,
    lessons: [],
    exercises: [],
    extraMaterials: [],
  });

  const difficultyColors = {
    EASY: "#4CAF50",
    MEDIUM: "#FFC107",
    HARD: "#F44336",
  };

  function updateField(field, value) {
    setModuleData((prev) => ({ ...prev, [field]: value }));
  }

  function addItem(type) {
    const templates = {
      lessons: {
        title: "",
        videoUrl: "",
        orderIndex: moduleData.lessons.length + 1,
      },
      exercises: {
        title: "",
        ojUrl: "",
        difficulty: "EASY",
        tags: [],
      },
      extraMaterials: {
        title: "",
        url: "",
      },
    };

    setModuleData((prev) => ({
      ...prev,
      [type]: [...prev[type], templates[type]],
    }));
  }

  function updateItem(type, index, field, value) {
    setModuleData((prev) => {
      const updated = [...prev[type]];
      updated[index][field] = value;
      return { ...prev, [type]: updated };
    });
  }

  function removeItem(type, index) {
    setModuleData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit() {
    if (!moduleData.title.trim()) {
      toast.error("O título do módulo é obrigatório.");
      return;
    }
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      if (isEditMode) {
        await updateFullModule(id, moduleData);
        toast.success("Módulo atualizado com sucesso!");
      } else {
        await createFullModule(moduleData);
        toast.success("Módulo criado com sucesso!");
      }

      navigate("/materials");

    } catch (error) {
      console.error(error);

      if (error.status === 400) {
        toast.error(error.message);
      } else if (error.status === 403) {
        toast.error("Você não tem permissão.");
      } else {
        toast.error("Erro ao salvar módulo.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }
  if (loading) return <FullScreenLoader />;

  return (
    <div className="material-form">
      <h1>{isEditMode ? "Editar módulo" : "Criar novo módulo"}</h1>
      <div className="form">

        {step === 1 && (
          <>
            <input
              className="modulo"
              placeholder="Título do módulo"
              value={moduleData.title}
              onChange={(e) => updateField("title", e.target.value)}
            />

            <div className="formName">
              <p>Aulas</p>
              <button type="button" onClick={() => addItem("lessons")}>
                Criar aula
              </button>
            </div>

            {moduleData.lessons.map((lesson, index) => (
              <div key={index} className="linkAula">
                <input
                  value={lesson.title}
                  placeholder="Título da aula"
                  onChange={(e) =>
                    updateItem("lessons", index, "title", e.target.value)
                  }
                />

                <input
                  value={lesson.videoUrl}
                  placeholder="Link da aula"
                  onChange={(e) =>
                    updateItem("lessons", index, "videoUrl", e.target.value)
                  }
                />

                <Trash2
                  size={18}
                  className="icon-action delete"
                  onClick={() => removeItem("lessons", index)}
                />
              </div>
            ))}

            <div className="downButton">
              <div />
              <button
                type="button"
                className="btn"
                onClick={() => setStep(2)}
              >
                Próximo <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="formName">
              <p>Exercícios</p>
              <button type="button" onClick={() => addItem("exercises")}>
                Adicionar exercício
              </button>
            </div>

            {moduleData.exercises.map((exercise, index) => (
              <div key={index} className="linkAula">
                <input
                  value={exercise.title}
                  placeholder="Título do exercício"
                  onChange={(e) =>
                    updateItem("exercises", index, "title", e.target.value)
                  }
                />

                <input
                  value={exercise.ojUrl}
                  placeholder="Link do exercício"
                  onChange={(e) =>
                    updateItem("exercises", index, "ojUrl", e.target.value)
                  }
                />

                <select
                  className="difficulty-select"
                  data-difficulty={exercise.difficulty}
                  value={exercise.difficulty || "EASY"}
                  onChange={(e) =>
                    updateItem("exercises", index, "difficulty", e.target.value)
                  }
                >
                  <option value="EASY">Fácil</option>
                  <option value="MEDIUM">Médio</option>
                  <option value="HARD">Difícil</option>
                </select>

                <Trash2
                  size={18}
                  className="icon-action delete"
                  onClick={() => removeItem("exercises", index)}
                />
              </div>
            ))}

            <div className="downButton">
              <button
                type="button"
                className="btn"
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={18} /> Anterior
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => setStep(3)}
              >
                Próximo <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <textarea
              className="modulo"
              placeholder="Notas"
              value={moduleData.notes}
              onChange={(e) => updateField("notes", e.target.value)}
            />

            <div className="formName">
              <p>Materiais Extras</p>
              <button
                type="button"
                onClick={() => addItem("extraMaterials")}
              >
                Adicionar material
              </button>
            </div>

            {moduleData.extraMaterials.map((material, index) => (
              <div key={index} className="linkAula">
                <input
                  value={material.title}
                  placeholder="Titulo do material"
                  onChange={(e) =>
                    updateItem(
                      "extraMaterials",
                      index,
                      "title",
                      e.target.value
                    )
                  }
                />

                <input
                  value={material.url}
                  placeholder="Link do material"
                  onChange={(e) =>
                    updateItem(
                      "extraMaterials",
                      index,
                      "url",
                      e.target.value
                    )
                  }
                />

                <Trash2
                  size={18}
                  className="icon-action delete"
                  onClick={() =>
                    removeItem("extraMaterials", index)
                  }
                />
              </div>
            ))}

            <div className="downButton">
              <button
                type="button"
                className="btn"
                onClick={() => setStep(2)}
              >
                <ArrowLeft size={18} /> Anterior
              </button>

              <button
                type="button"
                className="btnConcluir"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Salvando..." : "Concluir"}
                <Check size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Material;
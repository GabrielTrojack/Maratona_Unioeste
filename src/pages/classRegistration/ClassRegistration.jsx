import React, { useEffect, useState } from "react";
import "./ClassRegistration.css";
import { getRegistrations } from "../../services/classService";

const ClassRegister = () => {
  const [cadastros, setCadastros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRegistrations() {
      try {
        const data = await getRegistrations();
        setCadastros(data.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadRegistrations();
  }, []);

  if (loading) return <p>Carregando cadastros...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="registrations-page">
  <div className="registrations-content">
    <h1>Cadastros</h1>

    {cadastros.map((cadastro) => (
      <div key={cadastro.id} className="registration-card">
        
        <div className="registration-header">
          <h2>{cadastro.name}</h2>
        </div>

        <div className="registration-info">
          <p><strong>Email:</strong> {cadastro.email}</p>
          <p><strong>WhatsApp:</strong> {cadastro.whatsapp}</p>
          <p><strong>Instituição:</strong> {cadastro.institution}</p>
        </div>

      </div>
    ))}
  </div>
</div>
  );
};

export default ClassRegister;
import React, { useState } from "react";
import "./ContestForm.css";

const ContestForm = () => {
  return (
    <div class="contest-container">
      <form class="contest-card">

        <header>
          <h1>Criar Contest</h1>
        </header>

        <section>
          <h2>Informações gerais</h2>

          <div class="grid">
            <div class="field">
              <label>Nome do contest</label>
              <input type="text" placeholder="Ex: Maratona Unioeste " />
            </div>

            <div class="field">
              <label>Duração</label>
              <div class="input-with-unit">
                <input type="number" />
                <span>h</span>
              </div>
            </div>

            <div class="field full">
              <label>Data e hora de início</label>
              <input type="datetime-local" />
            </div>
          </div>
        </section>

        <section>
          <h2>Configurações</h2>

          <div class="field">
            <label>Link do mirror</label>
            <input type="text" placeholder="https://..." />
          </div>

          <label class="checkbox">
            <input type="checkbox" />
            Contest individual
          </label>

        </section>

        <div class="actions">
          <button type="button" class="secondary">Cancelar</button>
          <button class="primary">Criar contest</button>
        </div>

      </form>
    </div>

  );
};

export default ContestForm;

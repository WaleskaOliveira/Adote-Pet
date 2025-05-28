import React from "react";

export default function ModalResponsavel({ responsavel, closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Informações do Responsável</h2>
        <p><strong>Nome:</strong> {responsavel.nome}</p>
        <p><strong>Telefone:</strong> {responsavel.telefone}</p>
      </div>
    </div>
  );
}


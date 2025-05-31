import React from "react";
import "../styles/styles.css";

export default function ModalDetalhesPet({ detalhes, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Mais Detalhes</h2>
        <p>{detalhes || "Nenhuma informação adicional disponível para este pet."}</p>
      </div>
    </div>
  );
}


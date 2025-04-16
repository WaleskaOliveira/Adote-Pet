import { useState } from "react";

export default function ModalCadastroAnimal({ closeModal }) {
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [sexo, setSexo] = useState("");
  const [idade, setIdade] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [contato, setContato] = useState("");

  const handleCadastrarAnimal = () => {
    console.log({ nome, especie, sexo, idade, estado, cidade, responsavel, contato });
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Cadastrar Animal</h2>
        <input type="text" placeholder="Nome do animal" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="text" placeholder="Espécie (ex.: Cachorro, Gato)" value={especie} onChange={(e) => setEspecie(e.target.value)} />
        <input type="text" placeholder="Sexo (Macho, Fêmea)" value={sexo} onChange={(e) => setSexo(e.target.value)} />
        <input type="text" placeholder="Idade (Filhote, Adulto)" value={idade} onChange={(e) => setIdade(e.target.value)} />
        <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
        <input type="text" placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
        <input type="text" placeholder="Responsável" value={responsavel} onChange={(e) => setResponsavel(e.target.value)} />
        <input type="text" placeholder="Contato (WhatsApp/Telefone)" value={contato} onChange={(e) => setContato(e.target.value)} />
        <button className="button-orange" onClick={handleCadastrarAnimal}>Cadastrar</button>
      </div>
    </div>
  );
}

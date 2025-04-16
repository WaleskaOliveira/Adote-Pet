import { useState, useEffect } from "react";
import '../styles/styles.css';
import ModalCadastroAnimal from "../components/ModalCadastroAnimal";

const especies = ["Cachorro", "Gato"];
const gêneros = ["Macho", "Fêmea"];
const idades = ["Filhote", "Adulto"];

const pets = [
  { nome: "Amora", gênero: "Fêmea", local: "São Paulo - SP", cidade: "São Paulo", idade: "Filhote", especie: "Cachorro", imagem: "/Imagens/amora.jpeg", responsavel: "Maria", contato: "(11) 99999-9999" },
  { nome: "Apollo", gênero: "Macho", local: "Araras - SP", cidade: "Araras", idade: "Adulto", especie: "Cachorro", imagem: "/Imagens/Apollo.jpeg", responsavel: "João", contato: "(19) 88888-8888" },
  { nome: "Drica", gênero: "Fêmea", local: "Florianópolis - SC", cidade: "Florianópolis", idade: "Adulto", especie: "Gato", imagem: "/Imagens/Drica.jpeg", responsavel: "Ana", contato: "(48) 77777-7777" },
  { nome: "Drica", gênero: "Fêmea", local: "Florianópolis - SC", cidade: "Florianópolis", idade: "Adulto", especie: "Gato", imagem: "/Imagens/Drica.jpeg", responsavel: "Ana", contato: "(48) 77777-7777" }
];

export default function Pets() {
  const [filtros, setFiltros] = useState({ estado: "", cidade: "", especie: "", gênero: "", idade: "" });
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [modalCadastroAnimalAberto, setModalCadastroAnimalAberto] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Ajuste aqui: true se o login for realizado, false por padrão
  const [petSelecionado, setPetSelecionado] = useState(null);

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then(res => res.json())
      .then(data => setEstados(data.map(estado => ({ id: estado.id, nome: estado.nome, sigla: estado.sigla }))));
  }, []);

  useEffect(() => {
    if (filtros.estado) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${filtros.estado}/municipios`)
        .then(res => res.json())
        .then(data => setCidades(data.map(cidade => cidade.nome)));
    } else {
      setCidades([]);
    }
  }, [filtros.estado]);

  const handleAdotar = (pet) => {
    setPetSelecionado(pet);
  };

  return (
    <div className="container">

      {/* Botão para cadastrar animal, exibido somente se estiver logado */}
      <div className="top-buttons">
        {isLoggedIn && (
          <button className="button-orange" onClick={() => setModalCadastroAnimalAberto(true)}>Cadastrar Animal</button>
        )}
      </div>

      <h1>Encontre seu novo melhor amigo 🐾</h1>
      <p>Eles não precisam de muito, só de um lar. Adote e mude uma vida para sempre.</p>

      <div className="content">
        <div className="filters">
          <h2>Filtros de Busca</h2>
          <label>Estado:
            <select value={filtros.estado} onChange={(e) => setFiltros({ ...filtros, estado: e.target.value, cidade: "" })}>
              <option value="">Selecione um estado</option>
              {estados.map((estado) => <option key={estado.id} value={estado.sigla}>{estado.nome}</option>)}
            </select>
          </label>
          <label>Cidade:
            <select value={filtros.cidade} onChange={(e) => setFiltros({ ...filtros, cidade: e.target.value })}>
              <option value="">Selecione uma cidade</option>
              {cidades.map((cidade, index) => <option key={index} value={cidade}>{cidade}</option>)}
            </select>
          </label>
          <label>Espécie:
            <select value={filtros.especie} onChange={(e) => setFiltros({ ...filtros, especie: e.target.value })}>
              <option value="">Selecione uma espécie</option>
              {especies.map((esp) => <option key={esp} value={esp}>{esp}</option>)}
            </select>
          </label>
          <label>Gênero:
            <select value={filtros.gênero} onChange={(e) => setFiltros({ ...filtros, gênero: e.target.value })}>
              <option value="">Selecione o gênero</option>
              {gêneros.map((sx) => <option key={sx} value={sx}>{sx}</option>)}
            </select>
          </label>
          <label>Idade:
            <select value={filtros.idade} onChange={(e) => setFiltros({ ...filtros, idade: e.target.value })}>
              <option value="">Selecione a idade</option>
              {idades.map((id) => <option key={id} value={id}>{id}</option>)}
            </select>
          </label>
        </div>

        <div className="cards">
          {pets.filter(pet =>
            (!filtros.estado || pet.local.includes(filtros.estado)) &&
            (!filtros.cidade || pet.cidade === filtros.cidade) &&
            (!filtros.especie || pet.especie === filtros.especie) &&
            (!filtros.gênero || pet.gênero === filtros.gênero) &&
            (!filtros.idade || pet.idade === filtros.idade)
          ).map((pet) => (
            <div key={pet.nome} className="card">
              <img src={pet.imagem} alt={pet.nome} />
              <h3>{pet.nome} - {pet.gênero}</h3>
              <p>{pet.local}</p>
              <p>{pet.especie} - {pet.idade}</p>
              <button className="button-orange" onClick={() => handleAdotar(pet)}>Quero Adotar</button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de dados do responsável */}
      {petSelecionado && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setPetSelecionado(null)}>&times;</span>
            <h2>Informações do Responsável</h2>
            <p><strong>Nome:</strong> {petSelecionado.responsavel}</p>
            <p><strong>Contato:</strong> {petSelecionado.contato}</p>
            <button className="button-orange" onClick={() => setPetSelecionado(null)}>Fechar</button>
          </div>
        </div>
      )}

      {/* Modal de cadastro de animal */}
      {modalCadastroAnimalAberto && <ModalCadastroAnimal closeModal={() => setModalCadastroAnimalAberto(false)} />}
    </div>
  );
}



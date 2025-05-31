import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FiltroPets from "../components/FiltroPets";
import { getTodosPets } from "../services/api";
import ModalResponsavel from "../components/ModalResponsavel";
import ModalCadastroAnimal from "../components/ModalCadastroAnimal";
import ModalDetalhesPet from "../components/ModalDetalhesPet";

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [filtros, setFiltros] = useState({
    estado: "",
    cidade: "",
    especie: "",
    genero: "",
    idade: "",
  });
  const [responsavel, setResponsavel] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
  const [detalhesSelecionado, setDetalhesSelecionado] = useState("");

  const navigate = useNavigate();

  const carregarPets = async () => {
    try {
      const todos = await getTodosPets();
      setPets(todos);
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
    }
  };

  useEffect(() => {
    carregarPets();
  }, []);

  const filtrarPets = () => {
    return pets.filter((pet) => {
      const { estado, cidade, especie, genero, idade } = filtros;
      return (
        (!estado || pet.estado === estado) &&
        (!cidade || pet.cidade === cidade) &&
        (!especie || pet.especie === especie) &&
        (!genero || pet.genero === genero) &&
        (!idade || pet.idade === idade)
      );
    });
  };

  const abrirModalResponsavel = (pet) => {
    setResponsavel({
      nome: pet.responsavel_nome,
      telefone: pet.responsavel_telefone
    });
    setModalAberto(true);
  };

  const abrirModalDetalhes = (detalhes) => {
    setDetalhesSelecionado(detalhes);
    setModalDetalhesAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setResponsavel(null);
  };

  const sairParaHome = () => {
    navigate("/");
  };

  return (
    <div
      className="container"
      style={{ minHeight: "100vh", padding: "16px" }}
    >
      <h1>Pets disponíveis para adoção 🐾</h1>
      <h3>Filtre e encontre seu novo melhor amigo!</h3>

      <div className="botoes-superiores">
        <button className="button-orange" onClick={sairParaHome}>
          Sair
        </button>
        <button className="button-orange" onClick={() => setModalCadastroAberto(true)}>
          Cadastrar Novo Animal
        </button>
      </div>

      <div className="content">
        <FiltroPets filtros={filtros} setFiltros={setFiltros} />

        <div className="cards">
          {filtrarPets().map((pet) => (
            <div key={pet.id} className="card">
              <img
                src={
                  pet.imagem
                    ? `http://localhost:3001/uploads/${pet.imagem}`
                    : "https://via.placeholder.com/150"
                }
                alt={pet.nome}
                style={{ objectFit: "cover", width: "100%", height: "200px" }}
              />
              <h3>{pet.nome}</h3>
              <p>Espécie: {pet.especie}</p>
              <p>Gênero: {pet.genero}</p>
              <p>Idade: {pet.idade}</p>
              <p>{pet.cidade}, {pet.estado}</p>

              <button className="button-orange" onClick={() => abrirModalResponsavel(pet)}>
                Quero Adotar
              </button>

              <button className="button-secondary" onClick={() => abrirModalDetalhes(pet.detalhes)}>
                Mais Detalhes
              </button>
            </div>
          ))}
        </div>
      </div>

      {modalAberto && responsavel && (
        <ModalResponsavel responsavel={responsavel} closeModal={fecharModal} />
      )}

      {modalCadastroAberto && (
        <ModalCadastroAnimal
          closeModal={() => setModalCadastroAberto(false)}
          atualizarLista={carregarPets}
        />
      )}

      {modalDetalhesAberto && (
        <ModalDetalhesPet
          detalhes={detalhesSelecionado}
          onClose={() => setModalDetalhesAberto(false)}
        />
      )}
    </div>
  );
}




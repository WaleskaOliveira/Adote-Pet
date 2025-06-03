import { useEffect, useState } from "react";

export default function FiltroPets({ filtros, setFiltros }) {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    // Buscar todos os estados ordenados por nome
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
      .then((res) => res.json())
      .then((data) => setEstados(data))
      .catch((err) => console.error("Erro ao buscar estados:", err));
  }, []);

  useEffect(() => {
    if (filtros.estado) {
      // Buscar cidades com base no estado selecionado
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${filtros.estado}/municipios`)
        .then((res) => res.json())
        .then((data) => setCidades(data))
        .catch((err) => console.error("Erro ao buscar cidades:", err));
    } else {
      setCidades([]);
    }
  }, [filtros.estado]);

  return (
    <div className="filters">
      <h2>Filtrar por:</h2>

      <label>
        Estado:
        <select
          value={filtros.estado}
          onChange={(e) =>
            setFiltros({ ...filtros, estado: e.target.value, cidade: "" })
          }
        >
          <option value="">Todos</option>
          {estados.map((estado) => (
            <option key={estado.id} value={estado.sigla}>
              {estado.nome}
            </option>
          ))}
        </select>
      </label>

      <label>
        Cidade:
        <select
          value={filtros.cidade}
          onChange={(e) =>
            setFiltros({ ...filtros, cidade: e.target.value })
          }
          disabled={!filtros.estado}
        >
          <option value="">Todas</option>
          {cidades.map((cidade) => (
            <option key={cidade.id} value={cidade.nome}>
              {cidade.nome}
            </option>
          ))}
        </select>
      </label>

      <label>
        Espécie:
        <select
          value={filtros.especie}
          onChange={(e) =>
            setFiltros({ ...filtros, especie: e.target.value })
          }
        >
          <option value="">Todas</option>
          <option value="Cachorro">Cachorro</option>
          <option value="Gato">Gato</option>
        </select>
      </label>

      <label>
        Genero:
        <select
          value={filtros.genero}
          onChange={(e) =>
            setFiltros({ ...filtros, genero: e.target.value })
          }
        >
          <option value="">Todos</option>
          <option value="Macho">Macho</option>
          <option value="Fêmea">Fêmea</option>
        </select>
      </label>

      <label>
        Idade:
        <select
          value={filtros.idade}
          onChange={(e) =>
            setFiltros({ ...filtros, idade: e.target.value })
          }
        >
          <option value="">Todas</option>
          <option value="Filhote">Filhote</option>
          <option value="Adulto">Adulto</option>
        </select>
      </label>
    </div>
  );
}

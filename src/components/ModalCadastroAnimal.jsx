import { useState, useEffect } from "react";

export default function ModalCadastroAnimal({ closeModal, atualizarLista }) {
  const [formData, setFormData] = useState({
    nomeAnimal: "",
    especie: "",
    genero: "",
    idade: "",
    estado: "",
    cidade: "",
    nomeResponsavel: "",
    telefoneResponsavel: "",
    detalhes: "", // campo de detalhes
  });
  const [imagem, setImagem] = useState(null);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
      .then((res) => res.json())
      .then((data) => setEstados(data));
  }, []);

  useEffect(() => {
    if (formData.estado) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${formData.estado}/municipios`)
        .then((res) => res.json())
        .then((data) => setCidades(data));
    } else {
      setCidades([]);
    }
  }, [formData.estado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Cadastrar o responsável
      const resp = await fetch("http://localhost:3001/responsaveis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nomeResponsavel,
          telefone: formData.telefoneResponsavel,
        }),
      });

      const responsavel = await resp.json();
      const id_responsavel = responsavel.id;

      // 2. Criar o formulário com imagem e dados do pet
      const form = new FormData();
      form.append("nome", formData.nomeAnimal);
      form.append("especie", formData.especie);
      form.append("genero", formData.genero);
      form.append("idade", formData.idade);
      form.append("estado", formData.estado);
      form.append("cidade", formData.cidade);
      form.append("detalhes", formData.detalhes); // incluído
      form.append("id_responsavel", id_responsavel);
      form.append("imagem", imagem);

      // 3. Cadastrar o pet
      await fetch("http://localhost:3001/pets", {
        method: "POST",
        body: form,
      });

      atualizarLista();
      closeModal();
    } catch (error) {
      console.error("Erro ao cadastrar pet:", error);
      alert("Erro ao cadastrar pet.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Cadastrar Novo Animal</h2>
        <form onSubmit={handleSubmit} className="form-cadastro">
          <input
            name="nomeAnimal"
            placeholder="Nome do Animal"
            value={formData.nomeAnimal}
            onChange={handleChange}
            required
          />

          <select
            name="especie"
            value={formData.especie}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a Espécie</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
          </select>

          <select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o Gênero</option>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>

          <select
            name="idade"
            value={formData.idade}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a Idade</option>
            <option value="Filhote">Filhote</option>
            <option value="Adulto">Adulto</option>
          </select>

          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o Estado</option>
            {estados.map((estado) => (
              <option key={estado.id} value={estado.sigla}>
                {estado.nome}
              </option>
            ))}
          </select>

          <select
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a Cidade</option>
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.nome}>
                {cidade.nome}
              </option>
            ))}
          </select>

          <textarea
          name="detalhes"
          placeholder="Detalhes sobre o pet (opcional)"
          value={formData.detalhes}
          onChange={handleChange}
          className="input" // garante que tenha o mesmo estilo dos inputs
          rows={4}
        />

          <input
            name="nomeResponsavel"
            placeholder="Nome do Responsável"
            value={formData.nomeResponsavel}
            onChange={handleChange}
            required
          />

          <input
            name="telefoneResponsavel"
            placeholder="Telefone (somente números)"
            value={formData.telefoneResponsavel}
            onChange={handleChange}
            inputMode="numeric"
            pattern="\d*"
            maxLength={11}
            required
          />

          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            required
          />

          <button type="submit" className="button-orange">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

const carregarPets = () => {
    fetch("http://localhost:3001/pets")
      .then((res) => res.json())
      .then((data) => {
        const petsFormatados = data.map(pet => ({
          nome: pet.nome,
          gênero: pet.sexo,
          cidade: pet.cidade,
          local: `${pet.cidade} - ${pet.estado}`,
          idade: pet.idade,
          especie: pet.especie,
          imagem: pet.imagem || "/Imagens/default.jpg",
          responsavel: pet.responsavel_nome || "Desconhecido",
          contato: pet.responsavel_contato || "(00) 00000-0000"
        }));
        setPets(petsFormatados);
      })
      .catch((err) => console.error("Erro ao buscar pets:", err));
  };
  
  
  useEffect(() => {
    carregarPets();
  }, []);
  

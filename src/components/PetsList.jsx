import React from 'react';

const PetsList = ({ pets, abrirModalResponsavel }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {pets.map((pet) => (
        <div
          key={pet.id}
          className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center transition-transform hover:scale-105"
        >
          <img
            src={pet.foto || 'https://via.placeholder.com/150'}
            alt={pet.nome}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <h2 className="text-xl font-semibold">{pet.nome}</h2>
          <p className="text-gray-600">{pet.especie} • {pet.idade}</p>
          <p className="text-gray-500 mb-4">{pet.cidade}, {pet.estado}</p>

          <button
            className="button-orange"
            onClick={() => abrirModalResponsavel(pet.responsavel_id)}
          >
            Quero Adotar
          </button>
        </div>
      ))}
    </div>
  );
};

export default PetsList;


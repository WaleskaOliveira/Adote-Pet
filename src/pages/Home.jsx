
import { useState } from 'react';
import '../styles/home.css'; 
import Modals from '../components/Modals';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
  const [modalLoginAberto, setModalLoginAberto] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setModalLoginAberto(false);
    navigate('/pets');
  };

  const handleCadastroSuccess = () => {
    setModalCadastroAberto(false);
    navigate('/pets');
  };

  return (
    <div className="home-container">
      <div className="background-wrapper">
        <img src="/Imagens/animais.png" alt="Adote Pet" className="background-image" />
      </div>

      <div className="overlay">
        <h1>ADOTE PET</h1>
        <div className="buttons">
          <button className="button-orange" onClick={() => setModalLoginAberto(true)}>Entrar</button>
          <button className="button-orange" onClick={() => setModalCadastroAberto(true)}>Cadastre-se</button>
        </div>
        <br />
        <h2>Adote com responsabilidade!</h2>
        <h3>
          Adotar um animal é um ato de amor e compromisso. Antes de tomar essa decisão, lembre-se que ele será parte da sua vida por muitos anos, e é sua responsabilidade oferecer carinho, cuidados e um lar seguro. Ao adotar, você assume um compromisso com o bem-estar do seu novo amigo, com visitas regulares ao veterinário, alimentação adequada e, acima de tudo, muito amor.
        </h3>
        <h2>Seja responsável. Adote com o coração e com a consciência.</h2>
      </div>

      {modalLoginAberto && (
        <Modals
          type="login"
          closeModal={() => setModalLoginAberto(false)}
          setIsLoggedIn={handleLoginSuccess}
        />
      )}

      {modalCadastroAberto && (
        <Modals
          type="cadastro"
          closeModal={() => setModalCadastroAberto(false)}
          setIsLoggedIn={handleCadastroSuccess}
        />
      )}
    </div>
  );
}

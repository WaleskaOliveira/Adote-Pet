// 📄 src/components/Modals.jsx
import { useState } from 'react';
import '../styles/styles.css';

export default function Modals({ type, closeModal, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  // Função para simular login
  const handleLogin = () => {
    console.log('Login realizado com sucesso!');
    // Aqui você pode adicionar a lógica real de login (ex.: chamada API)
    closeModal(); // Fecha o modal
    setIsLoggedIn(); // Faz o redirecionamento via Home.jsx
  };

  // Função para simular cadastro
  const handleCadastro = () => {
    console.log('Usuário cadastrado com sucesso!');
    // Aqui você pode adicionar a lógica real de cadastro (ex.: chamada API)
    closeModal(); // Fecha o modal
    setIsLoggedIn(); // Faz o redirecionamento via Home.jsx
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>

        {type === 'login' && (
          <>
            <h2>Login</h2>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
            />
            <label>Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
            />
            <button onClick={handleLogin} className="button-orange">
              Entrar
            </button>
          </>
        )}

        {type === 'cadastro' && (
          <>
            <h2>Cadastro</h2>
            <label>Nome Completo:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
            />
            <label>Telefone:</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Digite seu telefone"
            />
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
            />
            <label>Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
            />
            <button onClick={handleCadastro} className="button-orange">
              Cadastrar
            </button>
          </>
        )}
      </div>
    </div>
  );
}


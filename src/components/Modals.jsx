import { useState } from 'react';
import '../styles/styles.css';
import axios from 'axios';

export default function Modals({ type, closeModal, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const limparCampos = () => {
    setEmail('');
    setSenha('');
    setNome('');
    setTelefone('');
    setMensagemErro('');
  };

  const handleLogin = async () => {
    if (!email || !senha) {
      setMensagemErro('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/usuarios/login', {
        emailOuTelefone: email,
        senha
      });

      closeModal();
      setIsLoggedIn();
      limparCampos();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setMensagemErro('Usuário não cadastrado. Realize o cadastro.');
        } else if (error.response.status === 401) {
          setMensagemErro('Senha incorreta. Tente novamente.');
        } else {
          setMensagemErro('Erro no login. Tente novamente mais tarde.');
        }
      } else {
        setMensagemErro('Erro de conexão com o servidor.');
      }
    }
  };

  const handleCadastro = async () => {
    if (!nome || !telefone || !email || !senha) {
      setMensagemErro('Todos os campos são obrigatórios.');
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMensagemErro('Email inválido.');
      return;
    }
  
    if (senha.length < 6) {
      setMensagemErro('A senha precisa ter no mínimo 6 caracteres.');
      return;
    }
  
    try {
      await axios.post('http://localhost:3001/usuarios', {
        nome,
        telefone,
        email,
        senha
      });
  
      closeModal();
      setIsLoggedIn();
      limparCampos();
    } catch (error) {
      setMensagemErro('Erro ao cadastrar usuário. Tente novamente.');
    }
  };
  
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => { closeModal(); limparCampos(); }}>
          &times;
        </span>

        {mensagemErro && (
          <div className="mensagem-erro">
            {mensagemErro}
          </div>
        )}

        {type === 'login' && (
          <>
            <h2>Login</h2>
            <label>Email ou Telefone:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email ou telefone"
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





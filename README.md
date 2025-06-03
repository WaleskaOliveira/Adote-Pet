# 🐾 Adote Pet

O **Adote Pet** é uma plataforma desenvolvida com o objetivo de facilitar a adoção de animais. O sistema permite o cadastro de pets disponíveis para adoção, incluindo detalhes como espécie, idade, localização e responsável, tornando o processo mais organizado, acessível e eficiente.

## 🚀 Funcionalidades

- Listagem de pets disponíveis com filtros por:
  - Estado e cidade
  - Espécie (cachorro ou gato)
  - Gênero (macho ou fêmea)
  - Faixa etária (filhote ou adulto)
- Cadastro de novos animais com imagem real e informações do responsável
- Modal de login
- Exibição de detalhes do pet e seus responsáveis
- Backend integrado com banco de dados e API REST
- Upload de imagem para cada pet

## 🧪 Testes

Testes automatizados são implementados utilizando **Cypress**, permitindo validação de fluxos como:
- Cadastro de pet
- Aplicação de filtros
- Visualização de detalhes

## 🛠️ Tecnologias Utilizadas

### Frontend
- React
- TailwindCSS
- JavaScript
- API IBGE (para estados e cidades)

### Backend
- Node.js
- Express
- MySQL (via MySQL Workbench)
- Sequelize
- Multer (upload de imagens)

### Testes
- Cypress

## 📁 Estrutura de Banco de Dados

As principais tabelas utilizadas no projeto são:

- `pets`: informações do animal
- `responsaveis`: dados do responsável pelo animals
- `usuarios`: dados do usuário do site
- `imagens`: imagens dos animais (armazenadas via multer)

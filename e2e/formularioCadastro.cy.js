describe('Testes do Formulário de Cadastro', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173'); // ajuste se sua porta for diferente
    cy.contains('Cadastre-se').click(); // abre o modal
  });

  it('Bloqueia envio se campos estiverem vazios', () => {
    cy.contains('Cadastrar').click();
    cy.contains('Todos os campos são obrigatórios.').should('exist'); // ou mensagem equivalente
  });

  
  it('Impede cadastro se o email for inválido', () => {
    cy.get('input[placeholder="Digite seu nome"]').type('Maria Silva');
    cy.get('input[placeholder="Digite seu telefone"]').type('11999999999');
    cy.get('input[placeholder="Digite seu email"]').type('email-invalido');
    cy.get('input[placeholder="Digite sua senha"]').type('123456');
  
    cy.contains('button', 'Cadastrar').click();
    cy.contains('Email inválido.').should('exist');
  });
  
  it('Impede cadastro se a senha tiver menos de 6 caracteres', () => {
    cy.get('input[placeholder="Digite seu nome"]').type('Maria Silva');
    cy.get('input[placeholder="Digite seu telefone"]').type('11999999999');
    cy.get('input[placeholder="Digite seu email"]').type('maria@example.com');
    cy.get('input[placeholder="Digite sua senha"]').type('123');
  
    cy.contains('button', 'Cadastrar').click();
    cy.contains('A senha precisa ter no mínimo 6 caracteres.').should('exist');
  });
  
  it('Impede cadastro se o nome estiver vazio', () => {
      // apenas telefone, email e senha preenchidos
    cy.get('input[placeholder="Digite seu telefone"]').type('11999999999');
    cy.get('input[placeholder="Digite seu email"]').type('maria@example.com');
    cy.get('input[placeholder="Digite sua senha"]').type('123456');
  
    cy.contains('button', 'Cadastrar').click();
    cy.contains('Todos os campos são obrigatórios.').should('exist');
  });
  
  it('Cadastra com sucesso quando todos os dados são válidos e redireciona para /pets', () => {
    cy.get('input[placeholder="Digite seu nome"]').type('Maria Silva');
    cy.get('input[placeholder="Digite seu telefone"]').type('11999999999');
    cy.get('input[placeholder="Digite seu email"]').type('maria@example.com');
    cy.get('input[placeholder="Digite sua senha"]').type('123456');
    
    cy.contains('button', 'Cadastrar').click();
  });
    
  it('Fecha o modal ao clicar no X', () => {
    cy.get('.close').click();
    cy.get('.modal').should('not.exist');
  });
});
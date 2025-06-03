describe('Modal de Cadastro de Animal', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/pets'); 
      cy.contains('Cadastrar Novo Animal').click();
    });

    it('Bloqueia envio se campos estiverem vazios', () => {
        // Abre o modal
        cy.contains('Cadastrar Novo Animal').click();
    
        // Força o clique no botão Cadastrar
        cy.contains('Cadastrar', { matchCase: false }).click({ force: true });
    
        // Verifica que o modal ainda está presente (formulário não enviado)
        cy.get('.modal').should('exist');
      });
      
    it('preenche e envia o formulário com sucesso', () => {
        cy.get('input[name="nomeAnimal"]').type('Tobby');
        cy.get('select[name="especie"]').select('Cachorro');
        cy.get('select[name="genero"]').select('Macho');
        cy.get('select[name="idade"]').select('Adulto');
        cy.get('select[name="estado"]').select('SP');
      
        cy.wait(1000); 
        cy.get('select[name="cidade"]').select('São Paulo');
      
        cy.get('textarea[name="detalhes"]').type('Muito dócil e amigável');
        cy.get('input[name="nomeResponsavel"]').type('João Silva');
        cy.get('input[name="telefoneResponsavel"]').type('11999998888');
      
        const imagePath = 'images/dog.jpg';
        cy.get('input[type="file"]').selectFile(`cypress/fixtures/${imagePath}`, { force: true });
      
        cy.get('button[type="submit"]').click({ force: true });
      
      });
        
    it('carrega a lista de estados', () => {
      cy.get('select[name="estado"] option').should('have.length.greaterThan', 1);
    });
  
    it('carrega a lista de cidades após selecionar um estado', () => {
      cy.get('select[name="estado"]').select('SP');
      cy.wait(1000);
      cy.get('select[name="cidade"] option').should('have.length.greaterThan', 1);
    });
  
    it('bloqueia letras no campo de telefone', () => {
      cy.get('input[name="telefoneResponsavel"]').type('abc123');
      cy.get('input[name="telefoneResponsavel"]').should('have.value', '123');
    });
  
    it('fecha o modal ao clicar no botão X', () => {
      cy.get('.close').click();
    });
  });
  
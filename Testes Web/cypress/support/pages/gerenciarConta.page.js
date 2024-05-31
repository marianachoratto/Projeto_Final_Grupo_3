export default class AccountPage {
    URL = "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/account";
    
    inputNome = '[placeholder="Nome"]';
    inputEmail = '[placeholder="E-mail"]';
    inputSenha = '[placeholder="Senha"]';
    inputConfirmarSenha = '[placeholder="Confirmar senha"]';
    inputError = '.input-error';
    tipoUsuario = 'select.profile-input';
    userComum = '[value="0"]';
    userAdmin = '[value="1"]';
    userCritico = '[value="2"]';
    buttonSalvar = '.account-save-button';
    buttonAlterarSenha = '.account-password-button';
    buttonOk = '.modal-actions';
    modal = '.modal-content';
    modalTitulo = '.modal-content h3'
    modalMensagem = '.modal-content .error-message'
  
    typeNome(nome) {
        cy.get(this.inputNome).type(nome);
    }
  
    typeSenha(senha) {
        cy.get(this.inputSenha).type(senha);
    }
  
    typeConfirmarSenha(senha) {
        cy.get(this.inputConfirmarSenha).type(senha);
    }

    getNome() {
        return cy.get(this.inputNome);
    }

    getEmail() {
        return cy.get(this.inputEmail);
    }
  
    getTipoUsuario() {
        return cy.get(this.tipoUsuario);
    }

    getUserComum() {
        return cy.get(this.userComum);
    }

    getUserAdmin() {
        return cy.get(this.userAdmin);
    }

    getUserCritico() {
        return cy.get(this.userCritico);
    }

    getModal() {
        return cy.get(this.modal);
    }
  
    getInputError() {
        return cy.get(this.inputError);
    }

    clickButtonSalvar() {
        cy.get(this.buttonSalvar).click();
    }
  
    clickButtonAlterarSenha() {
        cy.get(this.buttonAlterarSenha).click();
    } 

    clickButtonOk() {
        cy.get(this.buttonOk).click();
    } 

    limparNome() {
        cy.get(this.inputNome).clear();
    }

    atualizar(nome, senha) {
        this.clickButtonAlterarSenha();
        this.limparNome();
        this.typeNome(nome);
        this.typeSenha(senha);
        this.typeConfirmarSenha(senha);
        this.clickButtonSalvar();
    }

    alerta(posição, text) {
        this.getInputError().should('be.visible');
        this.getInputError().eq(posição).invoke('text').should('contain', text);
    }
}
  
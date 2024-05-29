export default class CreateUser {
    inputName = 'input[placeholder="Nome"]';
    inputEmail = 'input[placeholder="E-mail"]';
    inputPassword = 'input[placeholder="Senha"]';
    inputConfirmPassword = 'input[placeholder="Confirmar senha"]'
    buttomSubmit = '.account-save-button'
    modalSucess = '.modal-body>h3'
    modalRegistration = '.modal-body>p'
    spanPassword = ':nth-child(3) > .input-error'
    spanConfirmPassword = ':nth-child(4) > .input-error'
    spanName = ':nth-child(1) > .input-error'
    spanEmail = ':nth-child(2) > .input-error'
    title = '.register-account-header > h3'
    span = '.register-account-header > span'
    labelName = ':nth-child(1) > label'
    labelEmail = ':nth-child(2) > label'
    labelPassword = ':nth-child(3) > label'
    labelConfirmPassword = ':nth-child(4) > label'

    paginaCriacao() {
        cy.get(this.title).should('have.text', "Cadastre-se").should('be.visible');
        cy.get(this.span).should('have.text', "Crie uma conta para poder acessar Raromdb.").should('be.visible');
        cy.get(this.labelName).should('have.text', "Nome:").should('be.visible');
        cy.get(this.inputName).should('be.enabled')
        cy.get(this.labelEmail).should('have.text', "E-mail:").should('be.visible');
        cy.get(this.inputEmail).should('be.enabled')
        cy.get(this.labelPassword).should('have.text', "Senha:").should('be.visible');
        cy.get(this.inputPassword).should('be.enabled')
        cy.get(this.labelConfirmPassword).should('have.text', "Confirmar senha:").should('be.visible');
        cy.get(this.inputConfirmPassword).should('be.enabled')
        cy.get(this.buttomSubmit).should('be.enabled').should('have.text', "Cadastrar")
    }
    typeName(name) {
        cy.get(this.inputName).type(name)
    }

    typeEmail(email) {
        cy.get(this.inputEmail).type(email)
    }
    typePassword(password) {
        cy.get(this.inputPassword).type(password)
    }
    typeConfirmPassword(password) {
        cy.get(this.inputConfirmPassword).type(password)
    }
    clickButtomSubmit() {
        cy.get(this.buttomSubmit).click()
    }
}
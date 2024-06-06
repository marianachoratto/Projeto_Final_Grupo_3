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
        cy.get(this.inputConfirmPassword).type(password,   { force: true })
    }
    clickButtomSubmit() {
        cy.get(this.buttomSubmit).click()
    }
    cadastrar(name, email, password) {
        this.typeName(name);
        this.typeEmail(email);
        this.typePassword(password);
        this.typeConfirmPassword(password);
        this.clickButtomSubmit();
    }
}
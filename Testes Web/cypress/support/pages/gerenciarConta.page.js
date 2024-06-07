export default class AccountPage {
  inputNome = '[placeholder="Nome"]';
  inputEmail = '[placeholder="E-mail"]';
  inputSenha = '[placeholder="Senha"]';
  inputConfirmarSenha = '[placeholder="Confirmar senha"]';
  inputError = ".input-error";
  tipoUsuario = "select.profile-input";
  userComum = '[value="0"]';
  userAdmin = '[value="1"]';
  userCritico = '[value="2"]';
  buttonSalvar = ".account-save-button";
  buttonAlterarSenha = ".account-password-button";
  buttonCancelar = ".account-password-button-cancel";
  buttonOk = ".modal-actions";
  modal = ".modal-content";
  modalTitulo = ".modal-content h3";
  modalMensagem = ".modal-content .error-message";

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

  getSenha() {
    return cy.get(this.inputSenha);
  }

  getConfirmarSenha() {
    return cy.get(this.inputConfirmarSenha);
  }

  getModal() {
    return cy.get(this.modal);
  }

  getModalTitulo() {
    return cy.get(this.modalTitulo);
  }

  getModalMensagem() {
    return cy.get(this.modalMensagem);
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

  clickButtonCancelar() {
    cy.get(this.buttonCancelar).click();
  }

  clickButtonOk() {
    cy.get(this.buttonOk).click();
  }

  limparNome() {
    cy.get(this.inputNome).clear();
  }

  atualizar(nome, senha) {
    this.limparNome();
    this.typeNome(nome);
    this.typeSenha(senha);
    this.typeConfirmarSenha(senha);
    this.clickButtonSalvar();
  }

  alerta(posição, text) {
    this.getInputError().should("be.visible");
    this.getInputError().eq(posição).invoke("text").should("contain", text);
  }
}

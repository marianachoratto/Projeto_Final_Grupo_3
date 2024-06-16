  export default class LoginPage{
    URL = "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login";
    inputEmail = ':nth-child(1) > input';
    inputSenha = '.login-form > :nth-child(2) > input';
    buttonLogin = '.login-button';
    msgErroEmail = ':nth-child(1) > .input-error';
    msgErroSenha = ':nth-child(2) > .input-error';
    caixaErro = '.modal-body';
    buttonOkcaixa = '.modal-actions > button';
    linkPerfil= '[href="/profile"]';
    linkFilmes = '.navbar-content > :nth-child(3)'
    buttonSalvar = '.account-save-button'


  typeEmail(email) {
    cy.get(this.inputEmail).type(email);
  };
  
  campoEmail() {
    cy.get(this.inputEmail).should('be.visible')
  };
  campoSenha (){
    cy.get(this.inputSenha).should('be.visible')
  }

  typeSenha(senha) {
    cy.get(this.inputSenha).type(senha);
  }

  clickButtonLogin() {
    cy.get(this.buttonLogin).click();
  }

  login(email, senha) {
    this.typeEmail(email);
    this.typeSenha(senha);
    this.clickButtonLogin();
  }
  caixaDeErro (){
    cy.get(this.caixaErro).should('be.visible').should('have.text', 'Falha ao autenticarUsuário ou senha inválidos.')
  }
  caixaDeErro1 (){
    cy.get(this.caixaErro).should('be.visible').should('have.text', 'Ocorreu um erroNão foi possível atualizar os dados.')
  }
  okFalha (){
    cy.get(this.buttonOkcaixa).click()
  }
  ErroEmail (){
    cy.get(this.msgErroEmail).should('be.visible').should('have.text', 'Informe o e-mail.');
  }
  ErroSenha(){
    cy.get(this.msgErroSenha).should('be.visible').should('have.text', 'Informe a senha')
  }
  
  Perfil(){
    cy.get(this.linkPerfil).should('be.visible');
  }
  ErroEmail1(){
    cy.get(this.msgErroEmail).should('be.visible').should('have.text','Informe um e-mail válido.')
  };
  Filmes(){
    cy.get(this.linkFilmes).click();
  };
  Perfil1(){
    cy.get(this.linkPerfil).click();
  };
  Salvar(){
    cy.get(this.buttonSalvar).click();
  }
}

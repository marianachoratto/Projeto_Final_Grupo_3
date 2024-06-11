export default class LoginPage {
    URL = "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login";
      
    inputEmail = '[placeholder="E-mail"]';
    inputSenha = '[placeholder="Password"]';
    buttonLogin = '.login-button';
    janelaFalha = '.modal-content';
    buttonOkFaha = 'button';
   
    
    
    
    typeEmail(email) {
      cy.get(this.inputEmail).type(email);
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
}
    
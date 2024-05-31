export default class ProfilePage {
    URL = "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/profile"
    
    buttonFilmes = '[href="/"]';
    buttonPerfil = '[href="/profile"]';
    buttonGerenciar = '[href="/account"]';
    buttonLogout = '[href="/logout"]';

    clickButtonPerfil() {
        cy.get(this.buttonPerfil).click();
    }
    
    clickButtonGerenciar() {
        cy.get(this.buttonGerenciar).click();
    }
      
    clickButtonLogout() {
        cy.get(this.buttonLogout).click();
    }
}
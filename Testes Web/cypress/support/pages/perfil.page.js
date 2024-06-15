export default class ProfilePage {
    URL = "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/profile"
    
    buttonFilmes = '[href="/"]';
    buttonPerfil = '[href="/profile"]';
    buttonGerenciar = '[href="/account"]';
    buttonLogout = '[href="/logout"]';
    labelIniciais = '.profile-nickname';
    userInfo = '.user-info' 

    minhasAvaliacoes = '.ratings h2';
    reviewCard = '.profile-review-card';
    reviewTitle = '.review-card-header p';
    reviewScore = '.stars';
    stars = '.filled';

    clickButtonPerfil() {
        cy.get(this.buttonPerfil).click();
    }
    
    clickButtonGerenciar() {
        cy.get(this.buttonGerenciar).click();
    }
      
    clickButtonLogout() {
        cy.get(this.buttonLogout).click();
    }

    clickReviewCard(posicao) {
        cy.get(this.reviewCard).eq(posicao).click();
    }

    getIniciais() {
        return cy.get(this.labelIniciais);
    }

    getUserInfo() {
        return cy.get(this.userInfo);
    }

    getMinhasAvaliacoes() {
        return cy.get(this.minhasAvaliacoes);
    }

    getReviewCard(posicao) {
        return cy.get(this.reviewCard).eq(posicao);
    }

    getReviewTitle(posicao) {
        return cy.get(this.reviewTitle).eq(posicao);
    }

    getReviewScore(posicao) {
        return cy.get(this.reviewScore).eq(posicao);
    }
}
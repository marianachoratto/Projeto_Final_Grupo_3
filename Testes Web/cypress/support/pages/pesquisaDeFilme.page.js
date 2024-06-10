export default class SearchPage {
    inputSearch = '.search-input';
    buttonSearch = '.search-button';
    buttonHome = '.link-logo';
    buttonFilmes = '[href="/"]';
    buttonLogin = '[href="/login"]';
    buttonRegistro = '[href="/register"]';
    barraNav = '.navbar-content';
    movieList = '.carousel-data';

    typeSearch(texto) {
        cy.get(this.inputSearch).type(texto);
    }

    clickButtonSearch() {
        cy.get(this.buttonSearch).click();
    }
}
export default class SearchPage {
    inputSearch = '.search-input';
    buttonSearch = '.search-button';
    buttonHome = '.link-logo';
    buttonFilmes = '[href="/"]';
    buttonLogin = '[href="/login"]';
    buttonRegistro = '[href="/register"]';
    barraNav = '.navbar-content';
    movieList = '.carousel-data';
    movieCard = '.movie-card';
    moviePoster = '.movie-poster';
    movieTitle = 'h3.movie-title';
    movieDescription = 'p';
    avisoListaVazia = '.main'

    typeSearch(texto) {
        cy.get(this.inputSearch).type(texto);
    }

    clickButtonSearch() {
        cy.get(this.buttonSearch).click();
    }

    getMoviePoster(posição) {
        return cy.get(this.moviePoster).eq(posição).should("be.visible");
    }

    getMovieTitle(posição, text) {
        return cy.get(this.movieTitle).eq(posição).should("contain", text);
    }

    getMovieDescription(posição, text) {
        return cy.get(this.movieDescription).eq(posição).should("contain", text);
    }

    verificarMovieCard(posição, titulo, descricao) {
        this.getMoviePoster(posição);
        this.getMovieTitle(posição, titulo);
        this.getMovieDescription(posição, descricao);
    }

    getListaVazia(text) {
        return cy.get(this.avisoListaVazia).should("contain", text);
    }


}
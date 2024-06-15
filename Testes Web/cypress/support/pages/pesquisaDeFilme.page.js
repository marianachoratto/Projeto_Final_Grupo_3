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
    movieScore = '.good';
    movieTitle = 'h3.movie-title';
    movieDescription = 'p';
    avisoListaVazia = '.main'

    typeSearch(texto) {
        cy.get(this.inputSearch).type(texto);
    }

    clickButtonSearch() {
        cy.get(this.buttonSearch).click();
    }

    clickButtonLogin() {
        cy.get(this.buttonLogin).click();
    }

    clickMovieCard(posição) {
        cy.get(this.movieCard).eq(posição).click();
    }

    getMoviePoster(posição) {
        return cy.get(this.moviePoster).eq(posição).should("be.visible");
    }

    getMovieScore(posição, nota) {
        return cy.get(this.movieScore).eq(posição).should("contain", nota);
    }

    getMovieTitle(posição, titulo) {
        return cy.get(this.movieTitle).eq(posição).should("contain", titulo);
    }

    getMovieDescription(posição, descricao) {
        return cy.get(this.movieDescription).eq(posição).should("contain", descricao);
    }

    verificarMovieCard(posição, nota, titulo, descricao) {
        this.getMoviePoster(posição);
        this.getMovieScore(posição, nota);
        this.getMovieTitle(posição, titulo);
        this.getMovieDescription(posição, descricao);
    }

    getListaVazia(text) {
        return cy.get(this.avisoListaVazia).should("contain", text);
    }


}
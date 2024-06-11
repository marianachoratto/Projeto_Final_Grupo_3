export default class listagemDeFilmes {
    linkLogo = '[href="/"]';
    formPesquisa = '.search-input';
    buttonEnviar = '.search-button';
    linkFilmes = '[href="/"]';
    linkLogin = '[href="/login"]';
    linkRegistro = '[href="/register"]';
    carouselDestaque = '.featured-movies > .carousel-container > .carousel-data';
    carouselBemAvaliados = '.top-rated-movies > .carousel-container > .carousel-data';
    carouselBAsetaEsquerda ='.top-rated-movies > .carousel-container > :nth-child(1)';
    carouselBAsetaDireita = '.top-rated-movies > .carousel-container > :nth-child(3)';
    carouselDEsquerda = '.featured-movies > .carousel-container > :nth-child(1)';
    carouselDDireita ='.featured-movies > .carousel-container > :nth-child(3)';
    headerFilmesEmDestaque = '.featured-movies > .section-header > h3';
    headerFilmesBemAvaliados = '.top-rated-movies > .section-header > h3';
    msgErro = 'p';
    cardFilme = '[href="/movies/23"] > .movie-card-footer';
    gridFilme = '.movie-details-container';
    nota1 = '.top-rated-movies > .carousel-container > .carousel-data > [href="/movies/23"] > .movie-card-footer > .bad';
    nota2 = '.top-rated-movies > .carousel-container > .carousel-data > [href="/movies/27"] > .movie-card-footer > .bad';
    nota3 = '.top-rated-movies > .carousel-container > .carousel-data > [href="/movies/28"] > .movie-card-footer > .good';
    nota4 = '.top-rated-movies > .carousel-container > .carousel-data > [href="/movies/29"] > .movie-card-footer > .good';
    getLogo (){
        return cy.get(this.linkLogin).click({ multiple: true });
    };
    getPesquisa (){
        return cy.get(this.formPesquisa).type('Teste');
    };
    getEnviar (){
        return cy.get(this.buttonEnviar).click();
    };
    getFilmes (){
        return cy.get(this.linkFilmes).click({ multiple: true });
    };
    getLogin (){
        return cy.get(this.linkLogin).click();
    };
    getRegistro (){
        return cy.get(this.linkRegistro).click();
    };
    getDestaque (){
        return cy.get(this.carouselDestaque);
    };
    getBemAvaliados (){
        return cy.get(this.carouselBemAvaliados);
    };
    getBAesquerda (){
        return cy.get(this.carouselBAsetaEsquerda);
    };
    getBAdireita (){
        return cy.get(this.carouselBAsetaDireita)
    };
    getFilmesBemAvaliados (){
        return  cy.get(this.headerFilmesBemAvaliados)
    };
    getFilmesEmDestaque (){
        return  cy.get(this.headerFilmesEmDestaque)
    };
    getDesquerda (){
        return cy.get(this.carouselDEsquerda)
    };
    getDdireita (){
        return cy.get(this.carouselDDireita)
    };
    getDesquerda1 (){
        return cy.get(this.carouselDEsquerda).click();
    };
    getDdireita1 (){
        return cy.get(this.carouselDDireita).click();
    };
    getDesquerda2 (){
        return cy.get(this.carouselDEsquerda);
    };
    getDdireita2 (){
        return cy.get(this.carouselDDireita);
    };
    getBAesquerda1 (){
        return cy.get(this.carouselBAsetaEsquerda).click();
    };
    getBAdireita1 (){
        return cy.get(this.carouselBAsetaDireita).click();
    };
    getBAesquerda2 (){
        return cy.get(this.carouselBAsetaEsquerda);
    };
    getBAdireita2 (){
        return cy.get(this.carouselBAsetaDireita);
    };
    getMsgerro (){
        return cy.get(this.msgErro)
    };
    getCardFilme (){
        return  cy.get(this.cardFilme).eq(0).click()
    };
    getDetalhes (){
        return  cy.get(this.gridFilme)
    };
    getNota1 (){
        return  cy.get(this.nota1)
    };
    getNota2 (){
        return  cy.get(this.nota2)
    };
    getNota3 (){
        return  cy.get(this.nota3)
    };
    getNota4 (){
        return  cy.get(this.nota4)
    };
}
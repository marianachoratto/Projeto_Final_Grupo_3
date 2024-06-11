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

    getLogo (){
        return cy.get(this.linkLogin).should('be.visible').click({ multiple: true });
    };
    getPesquisa (){
        return cy.get(this.formPesquisa).should('be.visible').type('Teste');
    };
    getEnviar (){
        return cy.get(this.buttonEnviar).should('be.visible').click();
    };
    getFilmes (){
        return cy.get(this.linkFilmes).should('be.visible').click({ multiple: true });
    };
    getLogin (){
        return cy.get(this.linkLogin).should('be.visible').click();
    };
    getRegistro (){
        return cy.get(this.linkRegistro).should('be.visible').click();
    };
    getDestaque (){
        return cy.get(this.carouselDestaque).should('be.visible');
    };
    getBemAvaliados (){
        return cy.get(this.carouselBemAvaliados).should('be.visible');
    };
    getBAesquerda (){
        return cy.get(this.carouselBAsetaEsquerda).should('be.visible');
    };
    getBAdireita (){
        return cy.get(this.carouselBAsetaDireita).should('be.visible')
    };
    getFilmesBemAvaliados (){
        return  cy.get(this.headerFilmesBemAvaliados).should('be.visible')
    };
    getFilmesEmDestaque (){
        return  cy.get(this.headerFilmesEmDestaque).should('be.visible')
    };
    getDesquerda (){
        return cy.get(this.carouselDEsquerda).should('be.visible')
    };
    getDdireita (){
        return cy.get(this.carouselDDireita).should('be.visible')
    };
    getDesquerda1 (){
        return cy.get(this.carouselDEsquerda).should('be.visible').should('be.enabled').click();
    };
    getDdireita1 (){
        return cy.get(this.carouselDDireita).should('be.visible').should('be.enabled').click();
    };
    getDesquerda2 (){
        return cy.get(this.carouselDEsquerda).should('be.visible').should('not.be.enabled');
    };
    getDdireita2 (){
        return cy.get(this.carouselDDireita).should('be.visible').should('not.be.enabled');
    };
    getBAesquerda1 (){
        return cy.get(this.carouselBAsetaEsquerda).should('be.visible').should('be.enabled').click();
    };
    getBAdireita1 (){
        return cy.get(this.carouselBAsetaDireita).should('be.visible').should('be.enabled').click();
    };
    getBAesquerda2 (){
        return cy.get(this.carouselBAsetaEsquerda).should('be.visible').should('be.visible').should('not.be.enabled');
    };
    getBAdireita2 (){
        return cy.get(this.carouselBAsetaDireita).should('be.visible').should('be.visible').should('not.be.enabled');
    };
    getMsgerro (){
        return cy.get(this.msgErro).should('be.visible').should('have.text','Ops! Parece que ainda não temos nenhum filme.')
    }
}
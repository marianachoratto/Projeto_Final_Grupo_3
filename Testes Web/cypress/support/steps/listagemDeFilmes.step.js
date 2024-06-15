import {
    Given,
    When,
    Then,
    Before,
    After,
} from "@badeball/cypress-cucumber-preprocessor";

import listagemDeFilmes from "../pages/listagemDeFilmes.page";
import { faker } from "@faker-js/faker";
import LoginPage from "../pages/login.page";

let name = "Monky Flip";
let email = faker.internet.email();
let password = "123456";
const pageLista = new listagemDeFilmes
const pageLogin = new LoginPage

Given("que entrei na pagina inical", () => {
    cy.visit('');
});

Before({tags:"@listaDestaque"}, ()=>{
    cy.intercept('GET', 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies', {
        fixture: "filmes.json",
    }).as("listaFilmes");
});

Before({tags:"@listaBemAvaliados"}, ()=>{
    cy.intercept('GET', 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies?sort=true', {
        fixture: "filmes.json",
    }).as("lista_Filmes")
});

Before({tags:"@listaBemAvaliados1"}, ()=>{
    cy.intercept('GET', 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies?sort=true', {
        fixture: "filme.json",
    }).as("lista_Filmes")
});

Before({tags:"@listaDestaque1"}, ()=>{
    cy.intercept('GET', 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies', {
        fixture: "filme.json",
    }).as("listaFilmes");
});

Then('é possivel ver a lista de filmes cadastrados', () => {
    pageLista.getDestaque().should('be.visible');
    pageLista.getFilmesEmDestaque().should('be.visible');
    pageLista.getDdireita().should('be.visible');
    pageLista.getDesquerda().should('be.visible');
    pageLista.getBemAvaliados().should('be.visible');
    pageLista.getFilmesBemAvaliados().should('be.visible');
    pageLista.getBAesquerda().should('be.visible');
    pageLista.getBAdireita().should('be.visible');

});

Before({ tags: "@createUser" }, () => {

    cy.criarUsuario(name, email, password).then((response) => {
        userid = response.body.id;
    });
});

Before({ tags: "@login" }, () => {
    cy.visit('');
    pageLista.getLogin();
    pageLogin.login(email, password);
    cy.wait(2000);
})

After({ tags: "@deleteUser" }, () => {
    cy.fixture("usuario_alt.json").then(() => {
        cy.loginValido(email, password).then((response) => {
            tokenid = response.body.accessToken;
            cy.promoverAdmin(tokenid);
            cy.excluirUsuario(userid, tokenid);
        });
    });
});

When('existem mais de 5 filmes cadastrados', () => {
    cy.wait('@listaFilmes')
});

Then('é possivel passar os carrosseis para os lados', () => {
    pageLista.getDesquerda2().should('be.visible').should('not.be.enabled');
    pageLista.getDdireita().should('be.visible').should('be.enabled');
    pageLista.getDdireita1();
    pageLista.getDdireita2().should('be.visible').should('not.be.enabled');
    pageLista.getDesquerda().should('be.visible').should('be.enabled');
    pageLista.getDesquerda1();
    pageLista.getBAesquerda2().should('be.visible').should('not.be.enabled');
    pageLista.getBAdireita().should('be.visible').should('be.enabled');
    pageLista.getBAdireita1();
    pageLista.getBAdireita2().should('be.visible').should('not.be.enabled');
    pageLista.getBAesquerda().should('be.visible').should('be.enabled');
    pageLista.getBAesquerda1();
});

Then('a lista dos mais bem avaliados deve estar em ordem do maior para o menor', () => {
    pageLista.getNota1().should('contain', '100%');
    pageLista.getNota2().should('contain', '80%');
    pageLista.getNota3().should('contain', '60%');
    pageLista.getNota4().should('contain', '40%');
});

Before({ tags: "@loginApi" }, () => {
    cy.criarFilmeAdm(email, password);
})

Before({ tags: "@listaVazia" }, () => {
    cy.intercept('GET', 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies', {
        fixture: "listaVazia.json",
    }).as("listaVazia");
})
When('nao esxitem filmes na lista de filmes', () => {
    cy.get('@listaVazia').then((response)=>{
        expect(response).to.be.null
    })
})

Then('uma mensagem deve avisar ao usuario', () => {
    cy.wait('@listaVazia')
    pageLista.getMsgerro().should('be.visible').should('have.text', 'Ops! Parece que ainda não temos nenhum filme.');
})

Then('todos os botoes da paginaçao devem funcionar', () => {
    pageLista.getRegistro().should('be.visible');
    pageLista.getLogin().should('be.visible');
    pageLista.getLogo().should('be.visible'); 
    pageLista.getPesquisa().should('be.visible');
    pageLista.getEnviar().should('be.visible');
    pageLista.getFilmes().should('be.visible');
})

When('existe algum filme ou filmes cadastrados', () => {
    cy.wait('@listaFilmes')
    pageLista.getFilmesEmDestaque().should('be.visible');
    pageLista.getFilmesBemAvaliados().should('be.visible');
});

Then('é possivel ver mais detalhes dos filmes', () => {

    pageLista.getCardFilme().should('be.visible');
    pageLista.getDetalhes().should('be.visible');
});

Then('nao posso usar o carrossel', ()=>{
    pageLista.getDesquerda2().should('be.visible').should('not.be.enabled');
    pageLista.getBAdireita2().should('be.visible').should('not.be.enabled');
    pageLista.getBAesquerda2().should('be.visible').should('not.be.enabled');
    pageLista.getDdireita2().should('be.visible').should('not.be.enabled');
});

When('existe um filme cadastrado', ()=>{
    pageLista.getFilmesEmDestaque().should('be.visible');
    pageLista.getFilmesBemAvaliados().should('be.visible');
})
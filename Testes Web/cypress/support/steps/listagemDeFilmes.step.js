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

Then('é possivel ver a lista de filmes cadastrados', () => {
    pageLista.getRegistro();
    pageLista.getLogin();
    pageLista.getLogo();
    pageLista.getPesquisa();
    pageLista.getEnviar();
    pageLista.getFilmes();
    pageLista.getDestaque();
    pageLista.getFilmesEmDestaque();
    pageLista.getDdireita();
    pageLista.getDesquerda();
    pageLista.getBemAvaliados();
    pageLista.getFilmesBemAvaliados();
    pageLista.getBAesquerda();
    pageLista.getBAdireita();

});

Before({ tags: "@createUser" }, () => {

    cy.criarUsuario(name, email, password).then((response) => {
        userid = response.body.id;
    });
});

Before({tags: "@login"}, ()=>{
    cy.visit('');
    pageLista.getLogin();
    pageLogin.login(email,password);
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

When('existem mais de 4 filmes cadastrados', () =>{
    cy.intercept('GET','https://raromdb-3c39614e42d4.herokuapp.com/api/movies',{
       fixture: "filmes.json",
    }).as("listaFilmes");
    cy.intercept('GET','https://raromdb-3c39614e42d4.herokuapp.com/api/movies?sort=true',{
        fixture: "filmes.json",
    }).as("lista_Filmes")
});

Then('é possivel passar os carrosseis para os lados', ()=>{
    pageLista.getDesquerda2();
    pageLista.getDdireita1();
    pageLista.getDdireita2();
    pageLista.getDesquerda1();
    pageLista.getBAesquerda2();
    pageLista.getBAdireita1();
    pageLista.getBAdireita2();
    pageLista.getBAesquerda1();
});

Then('a lista dos mais bem avaliados deve estar em ordem do maior para o menor', ()=>{

});

Before({tags: "@loginApi"}, ()=>{
    cy.criarFilmeAdm(email, password);
})

When('nao esxitem filmes na lista de filmes',()=>{
    cy.intercept('GET','https://raromdb-3c39614e42d4.herokuapp.com/api/movies',{
        fixture: "listaVazia.json",
     }).as("listaVazia");
})

Then('uma mensagem deve avisar ao usuario', ()=>{
    cy.wait('@listaVazia')
    pageLista.getMsgerro();
})
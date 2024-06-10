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
    cy.wait(2);
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

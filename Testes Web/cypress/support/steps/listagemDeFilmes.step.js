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

When('que existem mais de seis filmes cadastrados', () =>{
    cy.intercept('GET','https://raromdb-3c39614e42d4.herokuapp.com/api/movies',{
        statusCode:200,
        body: [
            {
                "id": 23,
                "title": "Jonathan o retorno",
                "genre": "Terror",
                "description": "damno in bos cultura depereo cultellus viriliter adfectus cruentus audio confero",
                "totalRating": 3,
                "durationInMinutes": 120,
                "releaseYear": 2000
            }]
    })

})
import {
    Given,
    When,
    Then,
    Before,
    After,
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import SearchPage from "../pages/pesquisaDeFilme.page";
import LoginPage from "../pages/login.page";
  
const searchPage = new SearchPage();
const loginPage = new LoginPage();

let user
let token
let movie1
let movie2
let movieBody1
let movieBody2

Before({ tags: "@criarFilmes" }, () => {
    cy.fixture('movie1').then((response) => {
        movieBody1 = response;
    }); 
    cy.fixture('movie2').then((response) => {
        movieBody2 = response;
    }); 
    cy.cadastrarUsuario().then((response) => {
        user = response;
        cy.loginValido(user.email, user.password).then((response) => {
            token = response.body.accessToken;
            cy.promoverAdmin(token);
            cy.newMovie(movieBody1, token).then((response) => {
                movie1 = response.body;
            });
            cy.newMovie(movieBody2, token).then((response) => {
                movie2 = response.body;
            });
        });
    });
});
  
After({ tags: "@deletarFilmes" }, () => {
    cy.deletarFilme(movie1.id, token);
    cy.deletarFilme(movie2.id, token);
    cy.deletarFilme(2563, token);
    cy.deletarFilme(2564, token);
    cy.deletarFilme(2565, token);
    cy.deletarFilme(2566, token);
    cy.deletarFilme(2567, token);
    cy.deletarFilme(2568, token);
    cy.deletarFilme(2583, token);
    cy.deletarFilme(2584, token);
    cy.deletarFilme(2585, token);
    cy.deletarFilme(2586, token);
    cy.deletarFilme(2587, token);
    cy.deletarFilme(2588, token);
    cy.excluirUsuario(user.id, token);
});

Given("que acessei a página inicial", function () {
    cy.visit('/');
});

When("informar o título completo {string} na barra de busca", function (text) {
    searchPage.typeSearch(text);
});

When("clicar no botão de pesquisa", function () {
    searchPage.clickButtonSearch();
});

Then("visualizarei o filme correspondente na tela", function () {

})
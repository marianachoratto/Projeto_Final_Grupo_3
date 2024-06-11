import {
    Given,
    When,
    Then,
    Before,
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import SearchPage from "../pages/pesquisaDeFilme.page";
import LoginPage from "../pages/login.page";
  
const searchPage = new SearchPage();
const loginPage = new LoginPage();

let token
let movie1
let movie2
let movieBody1
let movieBody2
let user
let movie100

Before({ tags: "@criaFilme100" }, () => {
    const movieBody100 = 
    {
    title: faker.string.alpha(100),
    genre: "Gênero do filme",
    description: "Descrição do filme",
    durationInMinutes: 120,
    releaseYear: 2024
    }

    cy.cadastrarUsuario().then((response) => {
        user = response;
        cy.loginValido(user.email, user.password).then((response) => {
            const tokenUser = response.body.accessToken;
            cy.promoverAdmin(tokenUser);
            cy.newMovie(movieBody100, tokenUser).then((response) => {
                movie100 = response.body;
            });
            //cy.excluirUsuario(user.id, tokenUser);
        });
    });
});

before(() => {
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
                //cy.criarReviewNota5(token, movie1.id);
            });
            cy.newMovie(movieBody2, token).then((response) => {
                movie2 = response.body;
            });
            cy.excluirUsuario(user.id, token);
        });
    });
});
  
after(() => {
    cy.deletarFilme(movie1.id, token);
    cy.deletarFilme(movie2.id, token);
    cy.deletarFilme(movie100.id, token);
    cy.excluirUsuario(user.id, token);
});

Given("que acessei a página inicial", function () {
    cy.visit('/');
});

// Given("que existe um título de 100 caracteres cadastrado", function () {
//     cy.cadastrarUsuario().then((response) => {
//         user = response;
//         cy.loginValido(user.email, user.password).then((response) => {
//             const tokenUser = response.body.accessToken;
//             cy.promoverAdmin(tokenUser);
//             cy.newMovie(movieBody100, tokenUser).then((response) => {
//                 movie100 = response.body;
//             });
//             cy.excluirUsuario(user.id, tokenUser);
//         });
//     });
// });



When("informar o título completo {string} na barra de busca", function (text) {
    let textoBusca = text.split(' ').join('+');
    cy.intercept("GET", 'api/movies/search?title=' + textoBusca).as('searchMovie');
    
    searchPage.typeSearch(text);
});

When("clicar no botão de pesquisa", function () {
    searchPage.clickButtonSearch();
});

When("informar parte do título na barra de busca", function () {
    let textoBusca = movie1.title.substring(0, 17).split(' ').join('+');
    cy.intercept("GET", 'api/movies/search?title=' + textoBusca).as('searchMovie');

    searchPage.typeSearch(movie1.title.substring(0, 17));
});

When("informar os caracteres especiais na barra de busca", function () {
    searchPage.typeSearch(movie1.title.substring(51, 56));
});

When("informar um título não cadastrado na barra de busca", function () {
    searchPage.typeSearch(faker.string.alpha(12));
});

When("informar o ID do filme", function () {
    searchPage.typeSearch(movie1.id);
});

When("informar o gênero do filme", function () {
    searchPage.typeSearch(movie1.genre);
});

When("informar a descrição do filme", function () {
    searchPage.typeSearch(movie1.description);
});

When("informar o ano de lançamento do filme", function () {
    searchPage.typeSearch(movie1.releaseYear);
});

When("informar o título com 100 caracteres", function () {
    searchPage.typeSearch(movie100.title);
});



Then("visualizarei o filme correspondente na tela", function () {
    cy.wait('@searchMovie').then((intercept) => {
        expect(intercept.response.statusCode).to.equal(200);
        expect(intercept.response.body[0].title).to.equal(movie2.title);
    });
    
    searchPage.verificarMovieCard(0, movie2.title.substring(0, 19), movie2.description.substring(0, 49));
});

Then("visualizarei todos os filmes que contém o texto pesquisado", function () {
    cy.wait('@searchMovie').then((intercept) => {
        expect(intercept.response.statusCode).to.equal(200);
        expect(intercept.response.body[0].title).to.equal(movie1.title);
        expect(intercept.response.body[1].title).to.equal(movie2.title);
    });
    
    searchPage.verificarMovieCard(0, movie1.title.substring(0, 19), movie1.description.substring(0, 49));
    searchPage.verificarMovieCard(1, movie2.title.substring(0, 19), movie2.description.substring(0, 49));
});

Then("visualizarei o filme correspondente ao título pesquisado", function () {
    searchPage.verificarMovieCard(0, movie1.title.substring(0, 19), movie1.description.substring(0, 49));
});

Then("visualizarei a mensagem {string}", function (string) {
    searchPage.getListaVazia(string);
});

Then("não será possível encontrar o filme", function () {
    cy.contains(movie1.title.substring(0, 19)).should('not.exist');
});

Then("encontrarei o filme correspondente ao título pesquisado", function () {
    searchPage.verificarMovieCard(0, movie100.title.substring(0, 19), movie100.description);
});
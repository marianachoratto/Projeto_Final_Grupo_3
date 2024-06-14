import {
    Given,
    When,
    Then,
    Before,
    After
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import LoginPage from "../pages/login.page";
import ProfilePage from "../pages/perfil.page";
import MoviePage from "../pages/infoFilmes.page";

const loginPage = new LoginPage();
const profilePage = new ProfilePage();
const moviePage = new MoviePage();

reviewTextUpdate = "Filme interessante, recomendo!";
scoreUpdate = 4;

let userAdm;
let movie1;
let movie2;

let user;
let token;

before(() => {
    cy.cadastrarUsuario().then((response) => {
        userAdm = response;
        cy.loginValido(userAdm.email, userAdm.password).then((response) => {
            tokenAdm = response.body.accessToken;
            cy.promoverAdmin(tokenAdm);

            cy.fixture('movie1').then((response) => {
                const movieBody1 = response;
                cy.newMovie(movieBody1, tokenAdm).then((response) => {
                    movie1 = response.body;
                });
            }); 

            cy.fixture('movie2').then((response) => {
                const movieBody2 = response;
                cy.newMovie(movieBody2, tokenAdm).then((response) => {
                    movie2 = response.body;
                });
            }); 
        });
    });

    cy.cadastrarUsuario().then((response) => {
        user = response;
        cy.loginValido(user.email, user.password).then((response) => {
            token = response.body.accessToken;
            cy.reviewMovie1(token, movie1.id);
            cy.reviewMovie2(token, movie2.id);
        });
    });
});
  
after(() => {
    cy.deletarFilme(movie1.id, tokenAdm);
    cy.deletarFilme(movie2.id, tokenAdm);
    cy.excluirUsuario(user.id, tokenAdm);
    cy.excluirUsuario(userAdm.id, tokenAdm);
});

Given("que acessei o meu Perfil", function () {
    cy.intercept("GET", "api/users/review/all").as("listReview");
    
    cy.visit('/login');
    loginPage.login(user.email, user.password);
    profilePage.clickButtonPerfil();
});

Given("que outro usuário avaliou o mesmo filme que eu", function () {
    cy.cadastrarUsuario().then((response) => {
        const userNovaReview = response;
        cy.loginValido(userNovaReview.email, userNovaReview.password).then((response) => {
            const tokenNovaReview = response.body.accessToken;
            cy.criarReviewNota5(tokenNovaReview, movie1.id);
            cy.inativarUsuario(tokenNovaReview);
        });
    });
});

Given("que um dos filmes avaliados foi excluído", function () {
    cy.deletarFilme(movie1.id, tokenAdm);
});

When("clicar na avaliação desejada", function () {
    profilePage.clickReviewCard(1);
});

When("atualizar uma avaliação", function () {
    profilePage.clickReviewCard(1);    
    moviePage.escrevendoAvaliacao(reviewTextUpdate, scoreUpdate);
});

When("acessar a página Perfil novamente", function () {
    cy.visit('/profile');
});

When("clicar em Logout", function () {
    profilePage.clickButtonLogout();
});

Then("visualizarei todas as avaliações feitas por mim", function () {
    profilePage.getMinhasAvaliacoes().should("have.text", "Minhas avaliações");
    profilePage.getReviewCard(0).should("be.visible");
    profilePage.getReviewCard(1).should("be.visible");
});

Then("verificarei os títulos das minhas avaliações", function () {
    profilePage.getReviewTitle(0).should("have.text", movie1.title);
    profilePage.getReviewTitle(1).should("have.text", movie2.title);
});

Then("verificarei as notas das minhas avaliações", function () {
    profilePage.getReviewScore(0).find(profilePage.stars).its("length").should("equal", score1);
    profilePage.getReviewScore(1).find(profilePage.stars).its("length").should("equal", score2);
});

Then("verificarei os textos das minhas avaliações", function () {
    profilePage.getReviewCard(0).should("contain", reviewText1);
    profilePage.getReviewCard(1).should("contain", reviewText2);
});

Then("visualizarei os detalhes do filme avaliado", function () {
    moviePage.verificarDadosFilme(movie2.title, movie2.description, movie2.genre, movie2.releaseYear, "1h 41m");
});

Then("atualizarei minha avaliação", function () {
    moviePage.escrevendoAvaliacao(reviewTextUpdate, scoreUpdate);
});

Then("visualizarei a avaliação atualizada", function () {
    profilePage.getReviewScore(1).find(profilePage.stars).its("length").should("equal", scoreUpdate + 1);
});

Then("serei redirecionado para a página de Login automaticamente", function () {
    cy.url().should("equal", loginPage.URL);
    cy.contains("Login");
    cy.contains("Entre com suas credenciais");
});

Then("visualizarei somente as minhas avaliações", function () {
    cy.get(profilePage.reviewCard).its("length").should("equal", 2);
});

Then("não será possível consultar a avaliação do filme excluído", function () {
    profilePage.getMinhasAvaliacoes().should("have.text", "Minhas avaliações");
    cy.contains(movie1.title).should("not.exist");
});
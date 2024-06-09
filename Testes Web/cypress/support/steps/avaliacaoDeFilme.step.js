import {
  Given,
  When,
  Then,
  Before,
  After,
} from "@badeball/cypress-cucumber-preprocessor";
import MoviePage from "../pages/infoFilmes.page";
import LoginPage from "../pages/login.page";
let moviePage = new MoviePage();
let loginPage = new LoginPage();

let userData;
let userData2;
let movieId;
let token1;
let token2;
let textoReview;
let numEstrelas;

Before(() => {
  cy.intercept("POST", "/api/auth/login").as("logarUsuario");
  cy.intercept("GET", "/api/users/*").as("getUser");
  cy.intercept("POST", "/api/users/review").as("enviandoComentario");
  // cy.intercept("GET", "/api/movies/*").as("getMovies");

  cy.cadastrarUsuario().then((resposta) => {
    userData = resposta;
    cy.loginValido(userData.email, userData.password).then((resposta) => {
      token1 = resposta.body.accessToken;
      cy.promoverAdmin(token1);
      cy.criarFilme(token1).then((resposta) => {
        movieId = resposta.id;
      });
    });
  });
});

After(() => {
  cy.excluirUsuario(userData.id, token1);
});

after({ tags: "@deletarUsuario" }, function () {
  cy.deletarUsuario(userData2.email, userData2.password, userData2.id);
});

Given(
  "que estou na página de filmes de um filme previamente cadastrado",
  function () {
    cy.intercept(
      "GET",
      "https://raromdb-3c39614e42d4.herokuapp.com/api/movies/" + movieId,
      {
        fixture: "listReview.json",
      }
    ).as("listReviews");

    cy.visit(
      "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/" + movieId
    );
  }
);

When("tento escrever a avaliação de um filme não estando logado", function () {
  cy.get(moviePage.textoNovaAvaliacao).should("be.disabled");
});

Then(
  'sou direcionada para o botão "Entre para escrever sua review"',
  function () {
    cy.get(moviePage.botaoLoginAvaliacao).should("be.visible");
    cy.get(moviePage.botaoLoginAvaliacao).click();
  }
);

Then("sou redirecionada para a página de login", function () {
  cy.url().should(
    "equal",
    "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login"
  );
});

Given("que estou logado como usuário comum", function () {
  cy.cadastrarUsuario().then(function (resposta) {
    userData2 = resposta;
    cy.visit("/login");
    loginPage.login(userData2.email, userData2.password);

    cy.wait("@logarUsuario").then(function (resposta) {
      token2 = resposta.response.body.accessToken;
    });
    cy.wait("@getUser");
    cy.visit(
      "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/" + movieId
    );
  });
});

Given("que estou logado como usuário administrador", function () {
  cy.cadastrarUsuario().then(function (resposta) {
    userData2 = resposta;
    cy.loginValido(userData2.email, userData2.password).then(function (
      resposta
    ) {
      token2 = resposta.body.accessToken;
      cy.promoverAdmin(token2);
      cy.visit("/login");
      loginPage.login(userData2.email, userData2.password);

      cy.wait("@logarUsuario").then(function (resposta) {
        token2 = resposta.response.body.accessToken;
      });
      cy.wait("@getUser");
      cy.visit(
        "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/" + movieId
      );
    });
  });
});

Given("que estou logado como usuário crítico", function () {
  cy.cadastrarUsuario().then(function (resposta) {
    userData2 = resposta;
    cy.loginValido(userData2.email, userData2.password).then(function (
      resposta
    ) {
      token2 = resposta.body.accessToken;
      cy.promoverCritico(token2);
      cy.visit("/login");
      loginPage.login(userData2.email, userData2.password);

      cy.wait("@logarUsuario").then(function (resposta) {
        token2 = resposta.response.body.accessToken;
      });
      cy.wait("@getUser");
      cy.visit(
        "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/" + movieId
      );
    });
  });
});

When("escrevo a avaliação de um filme", function () {
  textoReview = "Não gostei do filme";
  numEstrelas = 1;
  moviePage.escrevendoAvaliacao(textoReview, numEstrelas);
  cy.wait("@enviandoComentario");
});

Then("a avaliação é feita com sucesso", function () {
  let numEstrelasCerto = numEstrelas + 1;

  cy.get(moviePage.divCardsAvaliacaoUsuario)
    .find(moviePage.cardAvaliacaoUsuario)
    .its("length")
    .should("equal", 1);
  cy.get(moviePage.divEstrelasdaReview)
    .find(moviePage.estrelasDadas)
    .its("length")
    .should("equal", numEstrelasCerto);
  cy.get(moviePage.divTextoDaReview)
    .invoke("text")
    .should("equal", textoReview);
});

When("dou nota para um filme, mas não escrevo uma review", function () {
  cy.get(moviePage.estrelasDoComentário).eq(4).click();
  cy.get(moviePage.botaoEnviarAvaliacao).click();
});

When("escrevo uma review, mas não dou uma nota ao filme", function () {
  cy.get(moviePage.textoNovaAvaliacao).type("Filme muito divertido!");
  cy.get(moviePage.botaoEnviarAvaliacao).click();
});

Then("aparece a mensagem {string} e {string}", function (mensagem1, mensagem2) {
  cy.contains("h3", mensagem1).should("be.visible");
  cy.contains("p", mensagem2).should("be.visible");
});

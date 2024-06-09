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
// Tirar milhões de variáveis
let userData;
let movieId;
let token;
let email;
let userid;
let password;

Before(() => {
  cy.intercept("POST", "/api/auth/login").as("logarUsuario");
  cy.intercept("GET", "/api/users/*").as("getUser");

  cy.cadastrarUsuario().then((resposta) => {
    userid = resposta.id;
    email = resposta.email;
    password = resposta.password;
    cy.loginValido(email, password).then((resposta) => {
      token = resposta.body.accessToken;
      cy.promoverAdmin(token);
      cy.criarFilme(token).then((resposta) => {
        movieId = resposta.id;
        movieTitle = resposta.title;
      });
    });
  });
});

// After(() => {
//   cy.excluirUsuario(userid, token);
// });

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
    userData = resposta;
    cy.visit("/login");
    // Fazer uma função disso
    cy.get(loginPage.inputEmail).type(userData.email);
    cy.get(loginPage.inputSenha).type(userData.password);
    cy.get(loginPage.buttonLogin).click();

    cy.wait("@logarUsuario").then(function (resposta) {
      token = resposta.response.body.accessToken;
      cy.log(resposta);
      cy.log(token);
    });
    cy.wait("@getUser");
    cy.visit(
      "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/" + movieId
    );
  });
});

When("escrevo a avaliação de um filme", function () {
  cy.get(moviePage.textoNovaAvaliacao).type("Não gostei do filme");
  cy.get(moviePage.estrelas).eq(1).click();
});

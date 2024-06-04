// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { faker } from "@faker-js/faker";
const apiUrl = "https://raromdb-3c39614e42d4.herokuapp.com/";
let email;
let password = faker.internet.password(6);
let idNovoUsuario;
let nome;
let tokenid;

// Commands de Usuários
Cypress.Commands.add("cadastrarUsuario", () => {
  return cy
    .request({
      method: "POST",
      url: apiUrl + "api/users",
      body: {
        name: "faker " + faker.person.firstName(),
        email: faker.internet.email(),
        password: password,
      },
    })
    .then(function (resposta) {
      idNovoUsuario = resposta.body.id;

      nome = resposta.body.name;
      email = resposta.body.email;

      return cy.wrap({
        nome: nome,
        email: email,
        id: idNovoUsuario,
        password: password,
      });
    });
});

Cypress.Commands.add("loginValido", (email, password) => {
  cy.request({
    method: "POST",
    url: "/api/auth/login",
    body: {
      email: email,
      password: password,
    },
  }).then(function (resposta) {
    tokenid = resposta.body.accessToken;

    return {
      token: tokenid,
    };
  });
});

Cypress.Commands.add("promoverAdmin", (tokenid) => {
  cy.request({
    method: "PATCH",
    url: "/api/users/admin",
    headers: {
      Authorization: `Bearer ${tokenid}`,
    },
  });
});

Cypress.Commands.add("excluirUsuario", (userid, tokenid) => {
  cy.request({
    method: "DELETE",
    url: apiUrl + "api/users/" + userid,
    headers: {
      Authorization: `Bearer ${tokenid}`,
    },
  });
});

// Commands de filme
Cypress.Commands.add("deletarFilme", (movieId, tokenid) => {
  cy.request({
    method: "DELETE",
    url: apiUrl + "api/movies/" + movieId,
    headers: {
      Authorization: `Bearer ${tokenid}`,
    },
  });
});

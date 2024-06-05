import { faker } from "@faker-js/faker";
const apiUrl = "https://raromdb-3c39614e42d4.herokuapp.com/";

Cypress.Commands.add("deletarUsuario", (email, password, idNovoUsuario) => {
  return cy
    .request({
      method: "POST",
      url: apiUrl + "api/auth/login",
      body: {
        email: email,
        password: password,
      },
    })
    .then(function (resposta) {
      token = resposta.body.accessToken;

      cy.request({
        method: "PATCH",
        url: apiUrl + "api/users/admin",
        auth: {
          bearer: token,
        },
      });
    })
    .then(function () {
      cy.request({
        method: "DELETE",
        url: apiUrl + `api/users/${idNovoUsuario}`,
        auth: {
          bearer: token,
        },
      });
    });
});

Cypress.Commands.add("cadastrarUsuario", (password) => {
  return cy
    .request({
      method: "POST",
      url: apiUrl + "api/users",
      body: {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: password,
      },
    })
    .then(function (resposta) {

      dadosUser = resposta.body

      return cy.wrap(dadosUser);
    });
});

Cypress.Commands.add("CadastrarEPromoverAdmin", (password) => {
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
      token = resposta.body.accessToken;

      cy.request({
        method: "PATCH",
        url: apiUrl + "api/users/admin",
        auth: {
          bearer: token,
        },
      });
    });
});

Cypress.Commands.add("CadastrarEPromoverAdmin", (password) => {
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
      token = resposta.body.accessToken;

      cy.request({
        method: "PATCH",
        url: apiUrl + "api/users/admin",
        auth: {
          bearer: token,
        },
      });
    });
});

Cypress.Commands.add("promoverCritico", function (tokenid) {
  cy.request({
    method: "PATCH",
    url: apiUrl + "api/users/apply",
    headers: {
      Authorization: `Bearer ${tokenid} `,
    },
  });
});

Cypress.Commands.add("promoverAdmin", (tokenid) => {
  cy.request({
    method: "PATCH",
    url: apiUrl + "api/users/admin",
    headers: {
      Authorization: `Bearer ${tokenid}`,
    },
  });
});

Cypress.Commands.add("loginValido", function (email, password) {
  cy.request({
    method: "POST",
    url: apiUrl + "api/auth/login",
    body: {
      email: email,
      password: password,
    },
  });
});

Cypress.Commands.add("excluirUsuario", function (userid, tokenid) {
  cy.request({
    method: "DELETE",
    url: apiUrl + "api/users/" + userid,
    headers: {
      Authorization: `Bearer ${tokenid}`,
    },
  });
});

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
    .then(function (resposta) {
      cy.request({
        method: "DELETE",
        url: apiUrl + `api/users/${idNovoUsuario}`,
        auth: {
          bearer: token,
        },
      });
    });
});

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

Cypress.Commands.add("promoverCritico", function (tokenid) {
  cy.request({
    method: "PATCH",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/apply",
    headers: {
      Authorization: `Bearer ${tokenid} `,
    },
  });
});

Cypress.Commands.add("promoverAdmin", function (tokenid) {
  cy.request({
    method: "PATCH",
    url: apiUrl +"api/users/admin",
    headers: {
      Authorization: `Bearer ${tokenid}`,
    },
  });
});

Cypress.Commands.add('loginValido', function (email, password) {
  cy.request({
      method: "POST",
      url: apiUrl + "api/auth/login",
      body: {
        email: email,
        password: password
      },
    })
})

Cypress.Commands.add('excluirUsuario', function (userid, tokenid) {
  cy.log('Excluir usuário');
  cy.request({
    method: 'DELETE',
    url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/' + userid,
    headers: {
      Authorization: `Bearer ${tokenid}`
    }
  })
});
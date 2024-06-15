import { faker } from "@faker-js/faker";
const apiUrl = "https://raromdb-3c39614e42d4.herokuapp.com";
let email, email1, email2;
let password = '123456';
let idNovoUsuario;
let nome
let token, token1, token2


// Commands de Usuários
Cypress.Commands.add("criarUsuario", (name, emailValido, password) => {
  cy.request({
    method: "POST",
    url: "/api/users",
    body: {
      name: name,
      email: emailValido,
      password: password,
    },
  });
});

Cypress.Commands.add("cadastrarUsuario", () => {
  return cy
    .request({
      method: "POST",
      url: "/api/users",
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
    url: "/api/users/" + userid,
    headers: {
      Authorization: `Bearer ${tokenid}`,
    },
  });
});

Cypress.Commands.add("promoverCritico", function (tokenid) {
  cy.request({
    method: "PATCH",
    url: "api/users/apply",
    headers: {
      Authorization: `Bearer ${tokenid} `,
    },
  });
});

Cypress.Commands.add("deletarUsuario", (email, password, idNovoUsuario) => {
  return cy
    .request({
      method: "POST",
      url: "/api/auth/login",
      body: {
        email: email,
        password: password,
      },
    })
    .then(function (resposta) {
      token = resposta.body.accessToken;

      cy.request({
        method: "PATCH",
        url: "api/users/admin",
        auth: {
          bearer: token,
        },
      });
    })
    .then(function () {
      cy.request({
        method: "DELETE",
        url: `/api/users/${idNovoUsuario}`,
        auth: {
          bearer: token,
        },
      });
    });
});

Cypress.Commands.add("deletarUsuario", (email, password, idNovoUsuario) => {
  return cy
    .request({
      method: "POST",
      url: "/api/auth/login",
      body: {
        email: email,
        password: password,
      },
    })
    .then(function (resposta) {
      token = resposta.body.accessToken;

      cy.request({
        method: "PATCH",
        url: "api/users/admin",
        auth: {
          bearer: token,
        },
      });
    })
    .then(function () {
      cy.request({
        method: "DELETE",
        url: `/api/users/${idNovoUsuario}`,
        auth: {
          bearer: token,
        },
      });
    });
});

Cypress.Commands.add('criarDoisUsuarios', (email1, email2, password, userid1, userid2) => {
  cy.cadastrarUsuario().then((resposta) => {
    userid1 = resposta.id;
    email1 = resposta.email;
    password = resposta.password;
    cy.cadastrarUsuario().then((resposta) => {
      userid2 = resposta.id;
      email2 = resposta.email;
      password = resposta.password;
    })
  })
})

Cypress.Commands.add('loginDoisUsuarios', (email1, email2, password, token1, token2) => {
  cy.loginValido(email1, password).then((resposta) => {
    token1 = resposta.body.accessToken
  })
  cy.loginValido(email2, password).then((resposta) => {
    token2 = resposta.body.accessToken
  })
})

Cypress.Commands.add("listaUsers", (tokenid) => {
  cy.request({
    method: "GET",
    url: "/api/users/",
    headers: {
      Authorization: `Bearer ${tokenid}`,
    },
  });
});

Cypress.Commands.add("findUser", (userId, tokenid) => {
  cy.request({
    method: "GET",
    url: "/api/users/" + userId,
    headers: {
      Authorization: `Bearer ${tokenid}`,
    },
  });
});
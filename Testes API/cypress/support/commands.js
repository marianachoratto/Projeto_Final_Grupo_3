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
  // cy.promoverAdmin(tokenid).then(function (resposta) {
  // });
});

Cypress.Commands.add('criarUsuario', (name, emailValido, password) => {
  cy.request({
      method: 'POST',
      url: '/api/users',
      body: {
          "name": name,
          "email": emailValido,
          "password": password
      }
  })
})

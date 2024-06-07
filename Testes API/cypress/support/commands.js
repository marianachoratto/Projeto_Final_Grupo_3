import { faker } from "@faker-js/faker";
const apiUrl = "https://raromdb-3c39614e42d4.herokuapp.com/";
let email;
let password = faker.internet.password(6);
let idNovoUsuario;
let nome;
let token;
let filmeid;


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
      tokenid = resposta.body.accessToken;

      cy.request({
        method: "PATCH",
        url: "api/users/admin",
        headers: {
            Authorization: `Bearer ${tokenid}`,
          }
      });
    })
    .then(function () {
      cy.request({
        method: "DELETE",
        url: `/api/users/${idNovoUsuario}`,
        auth: {
          bearer: tokenid,
        },
      });
    });
});

// Commands de filme
Cypress.Commands.add("deletarFilme", (idFilme, tokenid) => {
  cy.request({
    method: "DELETE",
    url: "api/movies/" + idFilme,
    headers: {
        Authorization: `Bearer ${tokenid}`,
      },
  });
});

Cypress.Commands.add("criarFilme", (tokenid) => {
  return cy.request({
      method: "POST",
      url: "/api/movies",
      headers: {
        Authorization: `Bearer ${tokenid}`,
      },
      body: {
        title: faker.internet.userName(),
        genre: faker.internet.password(8),
        description: faker.internet.email(),
        durationInMinutes: 100,
        releaseYear: 2022,
      },
    }).then((resposta) => {
      return {
        id: resposta.body.id,
        title: resposta.body.title,
        genre: resposta.body.genre,
        description: resposta.body.description,
        durationInMinutes: 100,
        releaseYear: 2022,
      };
    });
});
//Review 
Cypress.Commands.add("criarReviewNota5",(tokenid, filmeid)=>{  
  cy.request({
        method: "POST",
        url: "/api/users/review",
        auth: {
            bearer: tokenid,
        },
        body:{
            "movieId": filmeid,
            "score": 5,
            "reviewText": "Absolut Cinema",
        }
    });
});

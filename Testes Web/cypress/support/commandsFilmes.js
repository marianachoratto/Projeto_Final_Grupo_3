import { faker } from "@faker-js/faker";
const apiUrl = "https://raromdb-3c39614e42d4.herokuapp.com";

Cypress.Commands.add("deletarFilme", (idFilme, token) => {
  cy.request({
    method: "DELETE",
    url: apiUrl + "/api/movies/" + idFilme,
    auth: {
      bearer: token,
    },
  });
});

Cypress.Commands.add("criarFilme", (userToken) => {
  return cy
    .request({
      method: "POST",
      url: apiUrl + "/api/movies",
      auth: {
        bearer: userToken,
      },
      body: {
        title: faker.internet.userName(),
        genre: faker.internet.password(8),
        description: faker.internet.email(),
        durationInMinutes: 100,
        releaseYear: 2022,
      },
    })
    .then((resposta) => {
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

Cypress.Commands.add("criarFilmeAdm", (email, password) => {
  let token;
  cy.fixture("novoFilme.json").then((dadosFilme) => {
    return cy
      .request({
        method: "POST",
        url: apiUrl + "/api/auth/login",
        body: {
          email: email,
          password: password,
        },
      })
      .then(function (resposta) {
        token = resposta.body.accessToken;

        cy.request({
          method: "PATCH",
          url: apiUrl + "/api/users/admin",
          auth: {
            bearer: token,
          },
        });
      })
      .then(() => {
        cy.request({
          method: "POST",
          url: apiUrl + "/api/movies",
          body: dadosFilme,
          headers: {
            Authorization: "Bearer " + token,
          },
        }).then(function (resposta) {
          return {
            id: resposta.body.id,
            title: resposta.body.title,
            genre: resposta.body.genre,
            description: resposta.body.description,
            durationInMinutes: resposta.body.durationInMinutes,
            releaseYear: resposta.body.releaseYear,
            token: token,
          };
        });
      });
  });
});
Cypress.Commands.add("reviewMovie1", (token, movieId) => {
  cy.request({
    method: "POST",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/review",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: {
      movieId: movieId,
      score: 2,
      reviewText: "Filme muito bom. Vale a pena o ingresso!",
    },
  })
})

Cypress.Commands.add("reviewMovie2", (token, movieId) => {
  cy.request({
    method: "POST",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/review",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: {
      movieId: movieId,
      score: 4,
      reviewText: "Filme bem maneiro!",
    },
  })
})


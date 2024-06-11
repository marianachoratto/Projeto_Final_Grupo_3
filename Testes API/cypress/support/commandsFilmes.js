import { faker } from "@faker-js/faker";
let token;

Cypress.Commands.add("deletarFilme", (idFilme, token) => {
  cy.request({
    method: "DELETE",
    url: "api/movies/" + idFilme,
    auth: {
      bearer: token,
    },
  });
});

Cypress.Commands.add("criarFilme", (userToken) => {
  return cy
    .request({
      method: "POST",
      url: "/api/movies",
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
          url: "/api/users/admin",
          auth: {
            bearer: token,
          },
        });
      })
      .then(() => {
        cy.request({
          method: "POST",
          url: "/api/movies",
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

Cypress.Commands.add("newMovie", (movieBody, token) => {
  cy.request({
    method: "POST",
    url: "/api/movies",
    body: {
      title: movieBody.title,
      genre: movieBody.genre,
      description: movieBody.description,
      durationInMinutes: movieBody.durationInMinutes,
      releaseYear: movieBody.releaseYear,
    },
    auth: {
      bearer: token,
    },
  });
});

Cypress.Commands.add("updateMovie", (movieId, movieUpdate, token) => {
  cy.request({
    method: "PUT",
    url: "/api/movies/" + movieId,
    body: {
      title: movieUpdate.title,
      genre: movieUpdate.genre,
      description: movieUpdate.description,
      durationInMinutes: movieUpdate.durationInMinutes,
      releaseYear: movieUpdate.releaseYear,
    },
    auth: {
      bearer: token,
    },
  });
  cy.wrap(movieUpdate);
});

Cypress.Commands.add("criarReviewNota5", (tokenid, filmeid) => {
  cy.request({
    method: "POST",
    url: "/api/users/review",
    auth: {
      bearer: tokenid,
    },
    body: {
      movieId: filmeid,
      score: 5,
      reviewText: "Absolut Cinema",
    },
  });
});

Cypress.Commands.add("procurarPeloId", (filmeid) => {
  cy.request({
    method: "GET",
    url: `/api/movies/${filmeid}`,
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
  });
});

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
  });
});

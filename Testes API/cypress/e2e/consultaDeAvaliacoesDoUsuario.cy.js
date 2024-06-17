describe("Consulta de avaliações do usuário", function () {
  let userAdm;
  let tokenAdm;
  let user;
  let token;

  let movie1;
  let score1;
  let reviewText1;
  let movie2;
  let score2;
  let reviewText2;

  before(() => {
    cy.cadastrarUsuario().then((response) => {
      userAdm = response;
      cy.loginValido(userAdm.email, userAdm.password).then((response) => {
        tokenAdm = response.body.accessToken;
        cy.promoverAdmin(tokenAdm);

        cy.fixture("movie1").then((response) => {
          const movieBody1 = response;
          cy.newMovie(movieBody1, tokenAdm).then((response) => {
            movie1 = response.body;
          });
        });

        cy.fixture("movie2").then((response) => {
          const movieBody2 = response;
          cy.newMovie(movieBody2, tokenAdm).then((response) => {
            movie2 = response.body;
          });
        });
      });
    });
  });

  after(() => {
    cy.deletarFilme(movie1.id, tokenAdm);
    cy.deletarFilme(movie2.id, tokenAdm);
    cy.excluirUsuario(userAdm.id, tokenAdm);
  });

  describe("Acesso a consulta de avaliações do usuário", () => {
    beforeEach(() => {
      cy.cadastrarUsuario().then((response) => {
        user = response;
      });
    });

    afterEach(() => {
      cy.excluirUsuario(user.id, tokenAdm);
    });

    it("Usuário não autenticado não tem permissão para consultar suas avaliações", () => {
      cy.loginValido(user.email, user.password).then((response) => {
        token = response.body.accessToken;
        cy.reviewMovie1(token, movie1.id).then((response) => {
          reviewText1 = response.reviewText;
          score1 = response.score;
        });

        cy.request({
          method: "GET",
          url: "/api/users/review/all",
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.equal(401);
          expect(response.body.error).to.equal("Unauthorized");
          expect(response.body.message).to.equal("Access denied.");
        });
      });
    });

    it("Usuário Comum tem permissão para consultar suas avaliações", () => {
      cy.loginValido(user.email, user.password).then((response) => {
        token = response.body.accessToken;
        cy.reviewMovie1(token, movie1.id).then((response) => {
          reviewText1 = response.reviewText;
          score1 = response.score;
        });

        cy.request({
          method: "GET",
          url: "/api/users/review/all",
          auth: {
            bearer: token,
          },
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an("Array");
          expect(response.body).to.have.length(1);
          expect(response.body[0]).to.have.property("id");
          expect(response.body[0].movieId).to.equal(movie1.id);
          expect(response.body[0].movieTitle).to.equal(movie1.title);
          expect(response.body[0].reviewText).to.equal(reviewText1);
          expect(response.body[0].score).to.equal(score1);
          expect(response.body[0].reviewType).to.equal(0);
        });
      });
    });

    it("Usuário Crítico tem permissão para consultar suas avaliações", () => {
      cy.loginValido(user.email, user.password).then((response) => {
        token = response.body.accessToken;
        cy.promoverCritico(token);
        cy.reviewMovie1(token, movie1.id).then((response) => {
          reviewText1 = response.reviewText;
          score1 = response.score;
        });

        cy.request({
          method: "GET",
          url: "/api/users/review/all",
          auth: {
            bearer: token,
          },
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an("Array");
          expect(response.body).to.have.length(1);
          expect(response.body[0]).to.have.property("id");
          expect(response.body[0].movieId).to.equal(movie1.id);
          expect(response.body[0].movieTitle).to.equal(movie1.title);
          expect(response.body[0].reviewText).to.equal(reviewText1);
          expect(response.body[0].score).to.equal(score1);
          expect(response.body[0]).to.have.property("reviewType");
        });
      });
    });

    it("Usuário Administrador tem permissão para consultar suas avaliações", () => {
      cy.loginValido(user.email, user.password).then((response) => {
        token = response.body.accessToken;
        cy.promoverAdmin(token);
        cy.reviewMovie1(token, movie1.id).then((response) => {
          reviewText1 = response.reviewText;
          score1 = response.score;
        });

        cy.request({
          method: "GET",
          url: "/api/users/review/all",
          auth: {
            bearer: token,
          },
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an("Array");
          expect(response.body).to.have.length(1);
          expect(response.body[0]).to.have.property("id");
          expect(response.body[0].movieId).to.equal(movie1.id);
          expect(response.body[0].movieTitle).to.equal(movie1.title);
          expect(response.body[0].reviewText).to.equal(reviewText1);
          expect(response.body[0].score).to.equal(score1);
          expect(response.body[0]).to.have.property("reviewType");
        });
      });
    });
  });

  describe("Testes de verificação das informações das avaliações", () => {
    let reviewTextUpdate;
    let scoreUpdate;

    beforeEach(() => {
      cy.cadastrarUsuario().then((response) => {
        user = response;
        cy.loginValido(user.email, user.password).then((response) => {
          token = response.body.accessToken;
          cy.reviewMovie1(token, movie1.id).then((response) => {
            reviewText1 = response.reviewText;
            score1 = response.score;
          });
          cy.reviewMovie2(token, movie2.id).then((response) => {
            reviewText2 = response.reviewText;
            score2 = response.score;
          });
        });
      });
    });

    afterEach(() => {
      cy.promoverAdmin(token);
      cy.excluirUsuario(user.id, token);
    });

    it("A lista deve exibir informações de todas as avaliações feitas pelo usuário", () => {
      cy.request({
        method: "GET",
        url: "/api/users/review/all",
        auth: {
          bearer: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("Array");
        expect(response.body).to.have.length(2);
        expect(response.body[0]).to.have.property("id");
        expect(response.body[0].movieId).to.equal(movie1.id);
        expect(response.body[0].movieTitle).to.equal(movie1.title);
        expect(response.body[0].reviewText).to.equal(reviewText1);
        expect(response.body[0].score).to.equal(score1);
        expect(response.body[0].reviewType).to.equal(0);
        expect(response.body[1]).to.have.property("id");
        expect(response.body[1].movieId).to.equal(movie2.id);
        expect(response.body[1].movieTitle).to.equal(movie2.title);
        expect(response.body[1].reviewText).to.equal(reviewText2);
        expect(response.body[1].score).to.equal(score2);
        expect(response.body[1].reviewType).to.equal(0);
      });
    });

    it("Uma avaliação atualizada pelo usuário deverá ser imediatamente atualizada na lista", () => {
      cy.criarReviewNota5(token, movie1.id)
        .then((response) => {
          reviewTextUpdate = response.reviewText;
          scoreUpdate = response.score;
        })
        .then(() => {
          cy.request({
            method: "GET",
            url: "/api/users/review/all",
            auth: {
              bearer: token,
            },
          }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an("Array");
            expect(response.body).to.have.length(2);
            expect(response.body[0]).to.have.property("id");
            expect(response.body[0].movieId).to.equal(movie1.id);
            expect(response.body[0].movieTitle).to.equal(movie1.title);
            expect(response.body[0].reviewText).to.equal(reviewTextUpdate);
            expect(response.body[0].score).to.equal(scoreUpdate);
            expect(response.body[0].reviewType).to.equal(0);
          });
        });
    });

    it("Caso um filme seja excluído, a avaliação feita pelo usuário também será excluída da lista", () => {
      cy.promoverAdmin(token);
      cy.deletarFilme(movie1.id, token);
      cy.deletarFilme(movie2.id, token);

      cy.request({
        method: "GET",
        url: "/api/users/review/all",
        auth: {
          bearer: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.empty;
      });
    });
  });
});

describe("Avaliações feitas por um usuário comum não mudam o tipo quando a conta é promovida", function () {
  let userAdm;
  let tokenAdm;
  let movie1;
  let movie1Id;
  let user;
  let token;

  before(() => {
    cy.cadastrarUsuario().then((response) => {
      userAdm = response;
      cy.loginValido(userAdm.email, userAdm.password).then((response) => {
        tokenAdm = response.body.accessToken;
        cy.promoverAdmin(tokenAdm);

        cy.fixture("movie1").then((response) => {
          const movieBody1 = response;
          cy.newMovie(movieBody1, tokenAdm).then((response) => {
            movie1 = response.body;
            movie1Id = response.body.id;
          });
        });
      });
    });
  });

  after(() => {
    cy.deletarFilme(movie1.id, tokenAdm);
    cy.excluirUsuario(userAdm.id, tokenAdm);
  });

  it("Avaliações feita por usuário comum não mudam o tipo de review já feito", function () {
    cy.cadastrarUsuario().then(function (resposta) {
      user = resposta;
      cy.loginValido(user.email, user.password)
        .then(function (resposta) {
          token = resposta.body.accessToken;
        })
        .then(function () {
          cy.request({
            method: "POST",
            url: "/api/users/review",
            auth: {
              bearer: token,
            },
            body: {
              movieId: movie1.id,
              score: 5,
              reviewText: "Gostei do filme",
            },
          });
        })
        .then(function (resposta) {
          expect(resposta.status).to.equal(201);
        })
        .then(function () {
          cy.request({
            method: "GET",
            url: `/api/movies/${movie1Id}`,
            auth: {
              bearer: token,
            },
          }).then(function (resposta) {
            expect(resposta.body.reviews[0].reviewType).to.equal(0);
          });
        })
        .then(function () {
          cy.promoverAdmin(token);
          cy.request({
            method: "GET",
            url: "/api/users/review/all",
            auth: {
              bearer: token,
            },
          });
        })
        .then(function (resposta) {
          expect(resposta.body[0].reviewType).to.equal(0);
        });

      cy.deletarUsuario(user.email, user.password, user.id);
    });
  });
});

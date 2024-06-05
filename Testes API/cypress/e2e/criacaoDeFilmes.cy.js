describe("Criação de Filmes", () => {
  describe("Criação de Filmes com Sucesso", function () {
    let id;
    let token;
    let email;
    let password;
    let movieId;

    beforeEach(function () {
      cy.cadastrarUsuario().then((resposta) => {
        id = resposta.id;
        email = resposta.email;
        password = resposta.password;
        cy.loginValido(email, password).then(function (resposta) {
          token = resposta.token;
          cy.promoverAdmin(token);
        });
      });
    });

    afterEach(function () {
      cy.deletarFilme(movieId, token);
      cy.excluirUsuario(id, token);
    });

    it("O usuário administrador deve poder criar filmes com sucesso", () => {
      cy.fixture("novoFilme.json").then(function (filme) {
        cy.request({
          method: "POST",
          url: "api/movies",
          auth: {
            bearer: token,
          },
          body: filme,
        })
          .then(function (resposta) {
            expect(resposta.status).to.equal(201);
            expect(resposta.body.title).to.equal(filme.title);
            expect(resposta.body.description).to.equal(filme.description);
            expect(resposta.body.durationInMinutes).to.equal(
              filme.durationInMinutes
            );
            expect(resposta.body.genre).to.equal(filme.genre);
            expect(resposta.body.releaseYear).to.equal(filme.releaseYear);
            expect(resposta.body).to.have.property("id");
          })
          .then(function (resposta) {
            movieId = resposta.body.id;

            console.log(movieId);
          });
      });
    });

    it("Deve ser possível criar filme com nome de 1 caractere", function () {
      cy.request({
        method: "POST",
        url: "api/movies",
        auth: {
          bearer: token,
        },
        body: {
          title: "A",
          genre: "Drama",
          description: "Oi",
          durationInMinutes: 185,
          releaseYear: 1997,
        },
      }).then(function (resposta) {
        expect(resposta.status).to.equal(201);
        expect(resposta.body).to.have.property("id");
        expect(resposta.body.title).to.equal("A");
        expect(resposta.body.genre).to.equal("Drama");
        expect(resposta.body.description).to.equal("Oi");
        expect(resposta.body.durationInMinutes).to.equal(185);
        expect(resposta.body.releaseYear).to.equal(1997);
      });
    });

    it("Deve ser possível criar filme com nome de até 100 caracteres", function () {
      let nomeDoFilme = "";
      for (let index = 0; index <= 99; index++) {
        nomeDoFilme += "a";
      }

      cy.request({
        method: "POST",
        url: "api/movies",
        auth: {
          bearer: token,
        },
        body: {
          title: nomeDoFilme,
          genre: "Drama",
          description: "Oi",
          durationInMinutes: 185,
          releaseYear: 1997,
        },
      })
        .then(function (resposta) {
          expect(resposta.status).to.equal(201);
          expect(resposta.body).to.have.property("id");
          expect(resposta.body.title).to.equal(nomeDoFilme);
          expect(resposta.body.genre).to.equal("Drama");
          expect(resposta.body.description).to.equal("Oi");
          expect(resposta.body.durationInMinutes).to.equal(185);
          expect(resposta.body.releaseYear).to.equal(1997);
        })
        .then(function (resposta) {
          movieId = resposta.body.id;

          console.log(movieId);
        });
    });

    it("Deve ser possível criar filme com descrição de 1 caractere", function () {
      cy.request({
        method: "POST",
        url: "api/movies",
        auth: {
          bearer: token,
        },
        body: {
          title: "Titanic",
          genre: "Drama",
          description: "B",
          durationInMinutes: 185,
          releaseYear: 1997,
        },
      })
        .then(function (resposta) {
          expect(resposta.status).to.equal(201);
          expect(resposta.body).to.have.property("id");
          expect(resposta.body.title).to.equal("Titanic");
          expect(resposta.body.genre).to.equal("Drama");
          expect(resposta.body.description).to.equal("B");
          expect(resposta.body.durationInMinutes).to.equal(185);
          expect(resposta.body.releaseYear).to.equal(1997);
        })
        .then(function (resposta) {
          movieId = resposta.body.id;
        });
    });

    it("Deve ser possível criar filme com descrição de até 500 caracteres", function () {
      let descricaoDoFilme = "";
      for (let index = 0; index <= 499; index++) {
        descricaoDoFilme += "a";
      }

      cy.request({
        method: "POST",
        url: "api/movies",
        auth: {
          bearer: token,
        },
        body: {
          title: "Titanic",
          genre: "Drama",
          description: descricaoDoFilme,
          durationInMinutes: 185,
          releaseYear: 1997,
        },
      })
        .then(function (resposta) {
          expect(resposta.status).to.equal(201);
          expect(resposta.body).to.have.property("id");
          expect(resposta.body.title).to.equal("Titanic");
          expect(resposta.body.genre).to.equal("Drama");
          expect(resposta.body.description).to.equal(descricaoDoFilme);
          expect(resposta.body.durationInMinutes).to.equal(185);
          expect(resposta.body.releaseYear).to.equal(1997);
        })
        .then(function (resposta) {
          movieId = resposta.body.id;

          console.log(movieId);
        });
    });

    it("Deve ser possível criar filme com ano de lançamento a partir de 1895", function () {
      cy.request({
        method: "POST",
        url: "api/movies",
        auth: {
          bearer: token,
        },
        body: {
          title: "Titanic",
          genre: "Drama",
          description: "O navio afunda.",
          durationInMinutes: 185,
          releaseYear: 1895,
        },
      })
        .then(function (resposta) {
          expect(resposta.status).to.equal(201);
          expect(resposta.body).to.have.property("id");
          expect(resposta.body.title).to.equal("Titanic");
          expect(resposta.body.genre).to.equal("Drama");
          expect(resposta.body.description).to.equal("O navio afunda.");
          expect(resposta.body.durationInMinutes).to.equal(185);
          expect(resposta.body.releaseYear).to.equal(1895);
        })
        .then(function (resposta) {
          movieId = resposta.body.id;
        });
    });

    it("Deve ser possível criar um filme com duração de 1 minuto", function () {
      cy.request({
        method: "POST",
        url: "api/movies",
        auth: {
          bearer: token,
        },
        body: {
          title: "Titanic",
          genre: "Drama",
          description: "O navio afunda.",
          durationInMinutes: 1,
          releaseYear: 1997,
        },
      })
        .then(function (resposta) {
          expect(resposta.status).to.equal(201);
          expect(resposta.body).to.have.property("id");
          expect(resposta.body.title).to.equal("Titanic");
          expect(resposta.body.genre).to.equal("Drama");
          expect(resposta.body.description).to.equal("O navio afunda.");
          expect(resposta.body.durationInMinutes).to.equal(1);
          expect(resposta.body.releaseYear).to.equal(1997);
        })
        .then(function (resposta) {
          movieId = resposta.body.id;
        });
    });

    it("Deve ser possível criar filme com duração de até 720 horas", function () {
      cy.request({
        method: "POST",
        url: "api/movies",
        auth: {
          bearer: token,
        },
        body: {
          title: "Titanic",
          genre: "Drama",
          description: "O navio afunda.",
          durationInMinutes: 43200,
          releaseYear: 1997,
        },
      })
        .then(function (resposta) {
          expect(resposta.status).to.equal(201);
          expect(resposta.body).to.have.property("id");
          expect(resposta.body.title).to.equal("Titanic");
          expect(resposta.body.genre).to.equal("Drama");
          expect(resposta.body.description).to.equal("O navio afunda.");
          expect(resposta.body.durationInMinutes).to.equal(43200);
          expect(resposta.body.releaseYear).to.equal(1997);
        })
        .then(function (resposta) {
          movieId = resposta.body.id;
        });
    });
  });

  describe("É possível cadastrar 2 filmes iguais", function () {
    let idFilme;
    let titleFilme;
    let genreFilme;
    let descriptionFilme;
    let durationInMinutesFilme;
    let releaseYearFilme;
    let token;
    let dadosUser;

    before(function () {
      cy.cadastrarUsuario().then((resposta) => {
        dadosUser = resposta;
        cy.loginValido(dadosUser.email, dadosUser.password).then(function (
          resposta
        ) {
          token = resposta.token;
          cy.promoverAdmin(token).then(function (resposta) {
            cy.criarFilme(token).then(function (resposta) {
              idFilme = resposta.id;
              titleFilme = resposta.title;
              genreFilme = resposta.genre;
              descriptionFilme = resposta.description;
              durationInMinutesFilme = resposta.durationInMinutes;
              releaseYearFilme = resposta.releaseYear;
            });
          });
        });
      });
    });

    after(function () {
      cy.deletarFilme(idFilme, token);
      cy.excluirUsuario(dadosUser.id, token);
    });

    it("É possível cadastrar 2 filmes iguais", function () {
      cy.request({
        method: "POST",
        url: "api/movies",
        auth: {
          bearer: token,
        },
        body: {
          title: titleFilme,
          genre: genreFilme,
          description: descriptionFilme,
          durationInMinutes: durationInMinutesFilme,
          releaseYear: releaseYearFilme,
        },
      }).then(function (resposta) {
        expect(resposta.status).to.equal(201);
        expect(resposta.body.id).not.be.equal(idFilme);
        expect(resposta.body.title).to.equal(titleFilme);
        expect(resposta.body.genre).to.equal(genreFilme);
        expect(resposta.body.description).to.equal(descriptionFilme);
        expect(resposta.body.durationInMinutes).to.equal(
          durationInMinutesFilme
        );
        expect(resposta.body.releaseYear).to.equal(releaseYearFilme);
      });
    });

    it("É possível cadastrar 2 filmes iguais, mas com informações diferentes", function () {
      cy.request({
        method: "POST",
        url: "api/movies",
        auth: {
          bearer: token,
        },
        body: {
          title: titleFilme,
          genre: genreFilme,
          description: "A descrição do filme é diferente",
          durationInMinutes: 187,
          releaseYear: releaseYearFilme,
        },
      }).then((resposta) => {
        expect(resposta.status).to.equal(201);
        expect(resposta.body.id).not.be.equal(idFilme);
        expect(resposta.body.title).to.equal(titleFilme);
        expect(resposta.body.genre).to.equal(genreFilme);
        expect(resposta.body.description).to.equal(
          "A descrição do filme é diferente"
        );
        expect(resposta.body.durationInMinutes).to.equal(187);
        expect(resposta.body.releaseYear).to.equal(releaseYearFilme);
      });
    });
  });

  describe.only("Criação de Filmes com Falha", function () {
    // Conferir, pq no swagger diz que deve retornar 400. Ou conferir com Yuri, pq no swagger não tem especificação.
    it("Não é possível criar um filme sem possuir um usuário autenticado", function () {
      cy.fixture("novoFilme.json").then(function (filme) {
        cy.request({
          method: "POST",
          url: "api/movies",
          body: filme,
          failOnStatusCode: false,
        }).then(function (resposta) {
          expect(resposta.status).to.equal(401);
          expect(resposta.body.error).to.equal("Unauthorized");
          expect(resposta.body.message).to.equal("Access denied.");
        });
      });
    });

    it.only("Não é possível criar um filme sem ser usuário administrador", function () {
      let dadosUser;
      let token;

      cy.cadastrarUsuario().then(function (resposta) {
        dadosUser = resposta;
        cy.loginValido(dadosUser.email, dadosUser.password).then(function (
          resposta
        ) {
          token = resposta.token;

          cy.request({
            method: "POST",
            url: "api/movies",
            auth: {
              bearer: token,
            },
            body: {
              title: "Titanic",
              genre: "Drama",
              description: "O navio afunda.",
              durationInMinutes: 185,
              releaseYear: 1996,
              failOnStatusCode: false,
            },
          }).then(function (resposta) {
            expect(resposta.status).to.equal(403);
            expect(resposta.body.message).to.equal("Forbidden");
          });
        });
      });
    });

    it("Não deve ser possível criar filme sem nome", function () {});

    it("Não deve ser possível criar filme com string vazia", function () {});

    it("Não deve ser possível criar filme com nome com mais de 100 caracteres", function () {});

    it("Não deve ser possível criar filme sem gênero", function () {});

    it("Não deve ser possível criar filme com gênero com mais de 100 caractere", function () {});

    it("Não deve ser possível criar filme sem descrição", function () {});

    it("Não deve ser possível criar filme com descrição de mais de 500 caracteres", function () {});

    it("Não deve ser possível criar filme com ano de lançamento anterior à 1895", function () {});

    it("Não deve ser possível criar filme com ano de lançamento após 2024", function () {});

    it("Não deve ser possível criar filme sem duração", function () {});

    it("Não deve ser possível criar filme com duração maior que 720 horas", function () {});
  });
});

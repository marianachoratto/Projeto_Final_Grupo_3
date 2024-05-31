describe("Criação de Filmes", () => {
  describe.only("Criação de Filmes com Sucesso", function () {
    let id;
    let token;
    let bodyFilme = {
      id: 25875,
      title: "Título",
      genre: "Gênero",
      description: "Olá",
      durationInMinutes: 185,
      releaseYear: 2020,
    };

    before(function () {
      cy.cadastrarEPromoverAdmin().then((resposta) => {
        id = resposta.id;
        token = resposta.token;
      });
    });

    after(function () {
      cy.excluirUsuarioSimples(id, token);
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
        }).then(function (resposta) {
          expect(resposta.status).to.equal(201);
          expect(resposta.body.title).to.equal(filme.title);
          expect(resposta.body.description).to.equal(filme.description);
          expect(resposta.body.durationInMinutes).to.equal(
            filme.durationInMinutes
          );
          expect(resposta.body.genre).to.equal(filme.genre);
          expect(resposta.body.releaseYear).to.equal(filme.releaseYear);
          expect(resposta.body).to.have.property("id");
        });
      });
    });

    it.only("Deve ser possível criar filme com nome de 1 caractere", function () {
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

    it("Deve ser possível criar filme com nome de até 100 caracteres", function () {});

    it("Deve ser possível criar filme com descrição de 1 caractere", function () {});

    it("Deve ser possível criar filme com descrição de até 500 caracteres", function () {});

    it("Deve ser possível criar filme com ano de lançamento a partir de 1895", function () {});

    it("Deve ser possível criar um filme com duração de 1 minuto", function () {});

    it("Deve ser possível criar filme com duração de até 720 horas", function () {});
  });

  describe("É possível cadastrar 2 filmes iguais", function () {
    it("É possível cadastrar 2 filmes iguais", function () {});

    it("É possível cadastrar 2 filmes iguais, mas com informações diferentes", function () {});
  });

  describe("Criação de Filmes com Falha", function () {
    it("Não é possível criar um filme sem possuir um usuário autenticado", function () {
      cy.visit("https://example.cypress.io");
    });

    it("Não é possível criar um filme sem ser usuário administrador", function () {});

    it("Não deve ser possível criar filme sem nome", function () {});

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

describe("Listagem de filmes", () => {
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
          cy.criarFilme(token);
        });
      });
    });
  });

  it("É possivel usário ver a lista de filmes estando sem logar", () => {
    cy.request({
      method: "GET",
      url: "api/movies",
    }).then((resposta) => {
      // ver quantos filmes a lista retorna
      expect(resposta.status).to.eq(200);
      expect(resposta.body[0]).to.have.property("totalRating");
      expect(resposta.body[0]).to.have.property("id");
      expect(resposta.body[0]).to.have.property("genre");
      expect(resposta.body[0]).to.have.property("description");
      expect(resposta.body[0]).to.have.property("durationInMinutes");
      expect(resposta.body[0]).to.have.property("releaseYear");
    });
  });

  it("Deve ser possível fazer a listagem de todos filmes", function () {
    // Pesquisar sem nome do filme
    // VER QUANTOS FILMES A LISTA RETORNA
    // Exemplos de asserções:
    // arrayNumber = resposta.body.length;
    // expect(resposta.status).to.equal(200);
    // expect(resposta.body).to.be.an("array");
    // expect(resposta.body.length).to.deep.equal(arrayNumber);
  });

  it("Deve ser possível a consulta de filmes pelo título", function () {});

  describe("Listagem de filme de usuário logado", function () {
    let dadosUser;
    let token;

    before(function () {
      cy.cadastrarUsuario().then((resposta) => {
        dadosUser = resposta;
        cy.loginValido(dadosUser.email, dadosUser.password).then(function (
          resposta
        ) {
          token = resposta.token;
          cy.promoverAdmin(token).then(function (resposta) {
            cy.criarFilme(token);
          });
        });
      });
    });

    beforeEach(() => {
      cy.cadastrarUsuario().then((response) => {
        dadosUser = response;
      });
    });

    afterEach(function () {
      cy.loginValido(dadosUser.email, dadosUser.password).then(function (
        resposta
      ) {
        token = resposta.token;
        cy.promoverAdmin(token).then(function (resposta) {
          cy.excluirUsuario(dadosUser.id, token);
          cy.deletarFilme();
        });
      });
    });

    it("É possivel ver a lista de filmes estando logado como usuario comum", () => {
      cy.loginValido(dadosUser.email, dadosUser.password);
      cy.request({
        method: "GET",
        url: "api/movies",
      }).then((resposta) => {
        // ver quantos filmes a lista retorna
        expect(resposta.status).to.eq(200);
        expect(resposta.body[0]).to.have.property("totalRating");
        expect(resposta.body[0]).to.have.property("id");
        expect(resposta.body[0]).to.have.property("genre");
        expect(resposta.body[0]).to.have.property("description");
        expect(resposta.body[0]).to.have.property("durationInMinutes");
        expect(resposta.body[0]).to.have.property("releaseYear");
      });
    });

    it("É possivel ver a lista de filmes estando logado como usuario critico", () => {
      cy.loginValido(dadosUser.email, dadosUser.password).then(function (
        resposta
      ) {
        token = resposta.token;
        cy.promoverCritico(token).then(function (resposta) {
          cy.request({
            method: "GET",
            url: "api/movies",
          }).then((resposta) => {
            // ver quantos filmes a lista retorna
            expect(resposta.status).to.eq(200);
            expect(resposta.body[0]).to.have.property("totalRating");
            expect(resposta.body[0]).to.have.property("id");
            expect(resposta.body[0]).to.have.property("genre");
            expect(resposta.body[0]).to.have.property("description");
            expect(resposta.body[0]).to.have.property("durationInMinutes");
            expect(resposta.body[0]).to.have.property("releaseYear");
          });
        });
      });
    });

    it("É possivel ver a lista de filmes estando logado como usuario ADM", () => {
      let token;
      cy.loginValido(dadosUser.email, dadosUser.password).then((resposta) => {
        token = resposta.token;

        cy.promoverAdmin(token);
        cy.request({
          method: "GET",
          url: "api/movies",
        }).then((resposta) => {
          expect(resposta.status).to.eq(200);
          // ver quantos filmes a lista retorna
          expect(resposta.body[0]).to.have.property("totalRating");
          expect(resposta.body[0]).to.have.property("id");
          expect(resposta.body[0]).to.have.property("genre");
          expect(resposta.body[0]).to.have.property("description");
          expect(resposta.body[0]).to.have.property("durationInMinutes");
          expect(resposta.body[0]).to.have.property("releaseYear");
        });
      });
    });
  });

  it("Consulta de filme com filme inexistente não deve retornar nenhum filme", function () {
    // checar lista vazia
  });
});

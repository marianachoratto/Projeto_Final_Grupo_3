import { faker } from "@faker-js/faker";
describe("Qualquer tipo de usuario pode ver a lista de filmes", () => {
  let name = "Gabriel";
  let emailValido = faker.internet.email();
  let password = "123456";
  let tokenid;
  let userid;

  beforeEach(() => {
    cy.criarUsuario(name, emailValido, password).then((response) => {
      userid = response.body.id;
      cy.loginValido(emailValido, password).then((response) => {
        tokenid = response.body.accessToken;
        cy.promoverAdmin(tokenid);
        cy.criarFilme(tokenid).then((resposta) => {
          filmeid = resposta.id;
        });
      });
    });
  });
  afterEach(() => {
    cy.loginValido(emailValido, password).then((response) => {
      tokenid = response.body.accessToken;
      cy.promoverAdmin(tokenid);
      cy.excluirUsuario(userid, tokenid);
    });
  });

  it("É possivel ver a lista de filmes estando sem logar", () => {
    cy.request({
      method: "GET",
      url: "api/movies",
    }).then((response) => {
      let listaArray = response.body.length;

      expect(response.body).to.have.length(listaArray);
      expect(response.status).to.eq(200);
      expect(response.body[0]).to.have.property("id");
      expect(response.body[0]).to.have.property("title");
      expect(response.body[0]).to.have.property("genre");
      expect(response.body[0]).to.have.property("description");
      expect(response.body[0]).to.have.property("durationInMinutes");
      expect(response.body[0]).to.have.property("releaseYear");
      expect(response.body[0]).to.have.property("totalRating");
    });
  });

  it("É possivel ver a lista de filmes sendo usuario comum", () => {
    cy.cadastrarUsuario().then(function (resposta) {
      let dadosUser = resposta;
      cy.loginValido(dadosUser.email, dadosUser.password).then(function (
        resposta
      ) {
        let token = resposta.body.accessToken;
        cy.request({
          method: "GET",
          url: "api/movies",
          auth: {
            bearer: token,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body[0]).to.have.property("id");
          expect(response.body[0]).to.have.property("title");
          expect(response.body[0]).to.have.property("genre");
          expect(response.body[0]).to.have.property("description");
          expect(response.body[0]).to.have.property("durationInMinutes");
          expect(response.body[0]).to.have.property("releaseYear");
          expect(response.body[0]).to.have.property("totalRating");
        });

        cy.deletarUsuario(dadosUser.email, dadosUser.password, dadosUser.id);
      });
    });
  });

  it("É possivel ver a lista de filmes sendo usuario critico", () => {
    cy.loginValido(emailValido, password).then((response) => {
      tokenid = response.body.accessToken;
      cy.promoverCritico(tokenid);
    });
    cy.request({
      method: "GET",
      url: "api/movies",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body[0]).to.have.property("id");
      expect(response.body[0]).to.have.property("title");
      expect(response.body[0]).to.have.property("genre");
      expect(response.body[0]).to.have.property("description");
      expect(response.body[0]).to.have.property("durationInMinutes");
      expect(response.body[0]).to.have.property("releaseYear");
      expect(response.body[0]).to.have.property("totalRating");
    });
  });

  it("É possivel ver a lista de filmes sendo usuario admin", () => {
    cy.loginValido(emailValido, password).then((response) => {
      tokenid = response.body.accessToken;
      cy.promoverAdmin(tokenid);
    });
    cy.request({
      method: "GET",
      url: "api/movies",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body[0]).to.have.property("id");
      expect(response.body[0]).to.have.property("title");
      expect(response.body[0]).to.have.property("genre");
      expect(response.body[0]).to.have.property("description");
      expect(response.body[0]).to.have.property("durationInMinutes");
      expect(response.body[0]).to.have.property("releaseYear");
      expect(response.body[0]).to.have.property("totalRating");
    });
  });

  it("É possivel ver a lista de filmes ordenada pelas notas", () => {
    let filmeid;
    cy.loginValido(emailValido, password).then((response) => {
      tokenid = response.body.accessToken;
      cy.promoverAdmin(tokenid);
      cy.criarFilme(tokenid).then((resposta) => {
        filmeid = resposta.id;
        cy.criarReviewNota5(tokenid, filmeid);
      });
    });

    cy.request({
      method: "GET",
      url: "api/movies?sort=true",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body[0].totalRating).to.eq(5);
    });
  });
});

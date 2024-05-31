import { faker } from "@faker-js/faker";

describe("Criação de Filmes", () => {
  describe.only("Criação de Filmes com Sucesso", function () {
    const apiUrl = "https://raromdb-3c39614e42d4.herokuapp.com/";
    let email;
    let password;
    let nome;
    let id;
    let token;

    before(function () {
      cy.cadastrarEPromoverAdmin().then((resposta) => {
        id = resposta.id;
        token = resposta.token;
        cy.log(id, token);
      });
    });

    after(function () {
      cy.excluirUsuarioSimples(id, token);
    });

    it("O usuário administrador deve poder criar filmes com sucesso", () => {
      cy.log("oi");
    });
  });

  describe("Criação de Filmes com Falha", function () {
    it("teste 2", function () {
      cy.visit("https://example.cypress.io");
    });
  });
});

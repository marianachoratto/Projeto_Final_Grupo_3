import { faker } from "@faker-js/faker";

let user
let userDeletado
let token

describe("Testes de permissão de exclusão de conta", () => {
  
    before(() => {
      cy.cadastrarUsuario().then((response) => {
        user = response;
      }); 

      cy.cadastrarUsuario().then((response) => {
        userDeletado = response;
      }); 
    });
  
    after(() => {
      cy.loginValido(user.email, user.password).then((response) => {
        token = response.body.accessToken;
        cy.promoverAdmin(token);          
        cy.excluirUsuario(userDeletado.id, token);
        cy.excluirUsuario(user.id, token);
      });  
    });
  
    it("Usuário deslogado não tem autorização para excluir contas", () => {
      cy.request({
        method: "DELETE",
        url: "/api/movies/" + user.id,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body.error).to.equal("Unauthorized");
        expect(response.body.message).to.equal("Access denied.");
      });
    });

});

// Usuário deslogado não tem autorização para excluir contas
// Usuário comum não tem autorização para excluir contas
// Usuário crítico não tem autorização para excluir contas
// Usuário administrador tem autorização para excluir a própria conta
// Usuário administrador tem autorização para excluir a conta de outro usuário

// As avaliações feitas pelo usuário excluído também são excluídas
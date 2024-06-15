let user;
let userDeletar;
let token;
let movie;


describe("Testes de exclusão de conta", () => {
  
  before(() => {
    cy.cadastrarUsuario().then((response) => {
      user = response;
    }); 
    cy.cadastrarUsuario().then((response) => {
      userDeletar = response;
    }); 
  });
  
  it("Usuário deslogado não tem autorização para excluir contas", () => {
    cy.request({
      method: "DELETE",
      url: "/api/users/" + user.id,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.error).to.equal("Unauthorized");
      expect(response.body.message).to.equal("Access denied.");
    });
  });

  it("Usuário comum não tem autorização para excluir a conta de outro usuário", () => {
    cy.loginValido(user.email, user.password).then((response) => {
      token = response.body.accessToken;
      cy.request({
        method: "DELETE",
        url: "/api/users/" + userDeletar.id,
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(403);
        expect(response.body.message).to.equal("Forbidden");
      });
    });
  });

  it("Usuário comum não tem autorização para excluir a própria conta", () => {
    cy.loginValido(user.email, user.password).then((response) => {
      token = response.body.accessToken;
      cy.request({
        method: "DELETE",
        url: "/api/users/" + user.id,
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(403);
        expect(response.body.message).to.equal("Forbidden");
      });
    });
  });

  it("Usuário crítico não tem autorização para excluir a conta de outro usuário", () => {
    cy.loginValido(user.email, user.password).then((response) => {
      token = response.body.accessToken;
      cy.promoverCritico(token);
      cy.request({
        method: "DELETE",
        url: "/api/users/" + userDeletar.id,
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(403);
        expect(response.body.message).to.equal("Forbidden");
      });
    });
  });

  it("Usuário crítico não tem autorização para excluir a própria conta", () => {
    cy.loginValido(user.email, user.password).then((response) => {
      token = response.body.accessToken;
      cy.promoverCritico(token);
      cy.request({
        method: "DELETE",
        url: "/api/users/" + user.id,
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(403);
        expect(response.body.message).to.equal("Forbidden");
      });
    });
  });

  it("Usuário administrador tem autorização para excluir a conta de outro usuário", () => {
    cy.loginValido(user.email, user.password).then((response) => {
      token = response.body.accessToken;
      cy.promoverAdmin(token);
      cy.request({
        method: "DELETE",
        url: "/api/users/" + userDeletar.id,
        auth: {
          bearer: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);
      });
      cy.findUser(userDeletar.id, token).then((response) => {
        expect(response.body).to.be.empty;
      });
    });
  });

  it("Usuário administrador tem autorização para excluir a própria conta", () => {
    cy.loginValido(user.email, user.password).then((response) => {
      token = response.body.accessToken;
      cy.promoverAdmin(token);
      cy.request({
        method: "DELETE",
        url: "/api/users/" + user.id,
        auth: {
          bearer: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);
      });
    });
  });
});


describe("Teste para verificar se as avaliações são excluídas", () => {
  
  before(() => {
    cy.cadastrarUsuario().then((response) => {
      user = response;
    }); 
    cy.cadastrarUsuario().then((response) => {
      userDeletar = response;
      cy.criarFilmeAdm(userDeletar.email, userDeletar.password).then((response) =>{
        movie = response;
        const tokenuserDeletar = response.token;
        cy.criarReviewNota5(tokenuserDeletar, movie.id)
      });
    }); 
  });

  after(() => {
    cy.deletarFilme(movie.id, token);
    cy.excluirUsuario(user.id, token);
  });

  it("As avaliações feitas pelo usuário excluído também são excluídas", () => {
    cy.loginValido(user.email, user.password).then((response) => {
      token = response.body.accessToken;
      cy.promoverAdmin(token);
      cy.request({
        method: "DELETE",
        url: "/api/users/" + userDeletar.id,
        auth: {
          bearer: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);
      });
    }).then(() => {
      cy.procurarPeloId(movie.id).then((response) => {
        expect(response.body.reviews).to.be.empty;
      });
    });
  });
});
import { faker } from "@faker-js/faker";

const movieUpdate = {
  title: "Título Atualizado",
  genre: "Gênero Atualizado",
  description: "Descrição Atualizada",
  durationInMinutes: 100,
  releaseYear: 2015
}; 


let user;
let token;
let movie;

describe("Testes de permissão para atualizar filmes", () => {
  
  before(() => {
    cy.cadastrarUsuario().then((response) => {
      const user1 = response;
      cy.criarFilmeAdm(user1.email, user1.password).then((response) =>{
        movie = response;
        const token1 = response.token;
        cy.excluirUsuario(user1.id, token1);
      });

      cy.cadastrarUsuario().then((response) => {
        user = response;
      });
    }); 
  });

  after(() => {
    cy.loginValido(user.email, user.password).then((response) => {
      token = response.body.accessToken;
      cy.promoverAdmin(token);
      cy.deletarFilme(movie.id, token);            
      cy.excluirUsuario(user.id, token);
    });  
  });

  it("Usuário deslogado não tem autorização para atualizar filme", () => {
    cy.request({
      method: "PUT",
      url: "/api/movies/" + movie.id,
      body: movieUpdate,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.error).to.equal("Unauthorized");
      expect(response.body.message).to.equal("Access denied.");
    });
  });

  it("Usuário comum não tem autorização para atualizar filme", () => {
    cy.loginValido(user.email, user.password).then((response) => {
      token = response.body.accessToken;
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: movieUpdate,
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

  it("Usuário crítico não tem autorização para atualizar filme", () => {
    cy.loginValido(user.email, user.password).then((response) => {
      token = response.body.accessToken;
      cy.promoverCritico(token);
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: movieUpdate,
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

  it("Usuário administrador tem autorização para atualizar filme", () => {
    cy.loginValido(user.email, user.password).then((response) => {
      token = response.body.accessToken;
      cy.promoverAdmin(token);
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: movieUpdate,
        auth: {
          bearer: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);
        cy.procurarPeloId(movie.id).then((response) => {
          expect(response.body).to.contain(movieUpdate);
        });
      });
    });
  });
});


describe("Testes de atualização de filme", () => {

  before(() => {
    cy.cadastrarUsuario().then((response) => {
      user = response;
      cy.criarFilmeAdm(user.email, user.password).then((response) => {
        movie = response;
        token = response.token;
      });
    });
  });

  after(() => {
    cy.deletarFilme(movie.id, token);
    cy.excluirUsuario(user.id, token);
  });

  describe("Atualizações permitidas", () => {

    it("Deve ser possível atualizar apenas o título, informando 1 caractere", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          title: "X",
        },
        auth: {
          bearer: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);
        cy.procurarPeloId(movie.id).then((response) => {
          expect(response.body.title).to.equal("X");
        });
      });
    });

    it("Deve ser possível atualizar apenas o título, informando 100 caracteres", () => {
      const title100 = faker.string.alpha(100);
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          title: title100,
        },
        auth: {
          bearer: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);
        cy.procurarPeloId(movie.id).then((response) => {
          expect(response.body.title).to.equal(title100);
        });
      });
    });

    it("Deve ser possível atualizar apenas o gênero, informando 1 caractere", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          genre: "Y",
        },
        auth: {
          bearer: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);
        cy.procurarPeloId(movie.id).then((response) => {
          expect(response.body.genre).to.equal("Y");
        });
      });
    });

    it("Deve ser possível atualizar apenas o gênero, informando 100 caracteres", () => {
      const genre100 = faker.string.alpha(100);
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          genre: genre100,
        },
        auth: {
          bearer: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);
        cy.procurarPeloId(movie.id).then((response) => {
          expect(response.body.genre).to.equal(genre100);
        });
      });
    });

    it("Deve ser possível atualizar apenas a descrição, informando 1 caractere", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          description: "Z",
        },
        auth: {
          bearer: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);
        cy.procurarPeloId(movie.id).then((response) => {
          expect(response.body.description).to.equal("Z");
        });
      });
    });

    it("Deve ser possível atualizar apenas a descrição, informando 500 caracteres", () => {
      const description500 = faker.string.alpha(500);
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          description: description500,
        },
        auth: {
          bearer: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);
        cy.procurarPeloId(movie.id).then((response) => {
          expect(response.body.description).to.equal(description500);
        });
      });
    });

    it("Deve ser possível atualizar apenas o ano de lançamento, informando o ano de 1895", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          releaseYear: 1895,
        },
        auth: {
          bearer: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);
        cy.procurarPeloId(movie.id).then((response) => {
          expect(response.body.releaseYear).to.equal(1895);
        });
      });
    });

    it("Deve ser possível atualizar apenas o ano de lançamento, informando o ano de 2024", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          releaseYear: 2024,
        },
        auth: {
          bearer: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);
        cy.procurarPeloId(movie.id).then((response) => {
          expect(response.body.releaseYear).to.equal(2024);
        });
      });
    });

    it("Deve ser possível atualizar apenas a duração, informando 1 minuto", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          durationInMinutes: 1,
        },
        auth: {
          bearer: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);
        cy.procurarPeloId(movie.id).then((response) => {
          expect(response.body.durationInMinutes).to.equal(1);
        });
      });
    });

    it("Deve ser possível atualizar apenas a duração, informando 720 horas", () => {
      const duration720h = 720 * 60;
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          durationInMinutes: duration720h,
        },
        auth: {
          bearer: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);
        cy.procurarPeloId(movie.id).then((response) => {
          expect(response.body.durationInMinutes).to.equal(duration720h);
        });
      });
    });

    it("Deve ser possível atualizar todas as informações simultaneamente", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: movieUpdate,
        auth: {
          bearer: token,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);
        cy.procurarPeloId(movie.id).then((response) => {
          expect(response.body.title).to.equal(movieUpdate.title);
          expect(response.body.genre).to.equal(movieUpdate.genre);
          expect(response.body.description).to.equal(movieUpdate.description);
          expect(response.body.durationInMinutes).to.equal(movieUpdate.durationInMinutes);
          expect(response.body.releaseYear).to.equal(movieUpdate.releaseYear);
        });
      });
    });
  });

  describe("Atualizações não permitidas", () => {

    it("Não deve ser possível atualizar título informando mais de 100 caracteres", () => {
      const title101 = faker.string.alpha(101);
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          title: title101,
        },
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message[0]).to.equal("title must be shorter than or equal to 100 characters");
      });
    });

    it("Não deve ser possível atualizar título informando string vazia", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          title: "",
        },
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message[0]).to.equal("title must be longer than or equal to 1 characters");
      });
    });

    // Bug
    it("Não deve ser possível atualizar título informando espaço em branco (apertar barra de espaço)", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          title: " ",
        },
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message[0]).to.equal("title must be longer than or equal to 1 characters");
      });
    });

    it("Não deve ser possível atualizar gênero informando mais de 100 caracteres", () => {
      const genre101 = faker.string.alpha(101);
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          genre: genre101,
        },
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message[0]).to.equal("genre must be shorter than or equal to 100 characters");
      });
    });

    it("Não deve ser possível atualizar gênero informando string vazia", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          genre: "",
        },
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message[0]).to.equal("genre must be longer than or equal to 1 characters");
      });
    });

    // Bug
    it("Não deve ser possível atualizar gênero informando espaço em branco (apertar barra de espaço)", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          genre: " ",
        },
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message[0]).to.equal("genre must be longer than or equal to 1 characters");
      });
    });

    it("Não deve ser possível atualizar descrição informando mais de 500 caracteres", () => {
      const description501 = faker.string.alpha(501);
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          description: description501,
        },
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message[0]).to.equal("description must be shorter than or equal to 500 characters");
      });
    });

    it("Não deve ser possível atualizar descrição informando string vazia", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          description: "",
        },
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message[0]).to.equal("description must be longer than or equal to 1 characters");
      });
    });

    // Bug
    it("Não deve ser possível atualizar descrição informando espaço em branco (apertar barra de espaço)", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          description: " ",
        },
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message[0]).to.equal("description must be longer than or equal to 1 characters");
      });
    });

    it("Não deve ser possível atualizar ano de lançamento informando ano anterior a 1895", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          releaseYear: 1894,
        },
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message[0]).to.equal("releaseYear must not be less than 1895");
      });
    });

    it("Não deve ser possível atualizar ano de lançamento informando ano posterior a 2024", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          releaseYear: 2025,
        },
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message[0]).to.equal("releaseYear must not be greater than 2024");
      });
    });

    it("Não deve ser possível atualizar ano de lançamento informando caracteres não numéricos", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          releaseYear: "ano",
        },
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message[0]).to.equal("releaseYear must not be greater than 2024");
        expect(response.body.message[1]).to.equal("releaseYear must not be less than 1895");
        expect(response.body.message[2]).to.equal("releaseYear must be an integer number");
        expect(response.body.message[3]).to.equal("releaseYear must be a number conforming to the specified constraints");
      });
    });

    it("Não deve ser possível atualizar ano de lançamento informando número decimal", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          releaseYear: 2022.6,
        },
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message[0]).to.equal("releaseYear must be an integer number");
      });
    });

    it("Não deve ser possível atualizar duração informando menos de 1 minuto", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          durationInMinutes: 0,
        },
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message[0]).to.equal("durationInMinutes must not be less than 1");
      });
    });

    it("Não deve ser possível atualizar duração informando mais de 720 horas", () => {
      const durationLimit = 720 * 60 + 1;
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          durationInMinutes: durationLimit,
        },
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message[0]).to.equal("durationInMinutes must not be greater than 43200");
      });
    });

    it("Não deve ser possível atualizar duração informando caracteres não numéricos", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          durationInMinutes: "duração",
        },
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message[0]).to.equal("durationInMinutes must not be greater than 43200");
        expect(response.body.message[1]).to.equal("durationInMinutes must not be less than 1");
        expect(response.body.message[2]).to.equal("durationInMinutes must be an integer number");
        expect(response.body.message[3]).to.equal("durationInMinutes must be a number conforming to the specified constraints");
      });
    });

    it("Não deve ser possível atualizar duração informando número decimal", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          durationInMinutes: 115.2,
        },
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message[0]).to.equal("durationInMinutes must be an integer number");
      });
    });

    it("Não deve ser possível atualizar duração informando valor entre 0 e 1", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + movie.id,
        body: {
          durationInMinutes: 0.9,
        },
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message[0]).to.equal("durationInMinutes must not be less than 1");
        expect(response.body.message[1]).to.equal("durationInMinutes must be an integer number");
      });
    });

    it("Não deve ser possível atualizar filme informando um ID inexistente", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + 999999999999999,
        body: movieUpdate,
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("Not Found");
        expect(response.body.message).to.equal("Movie not found");
      });
    });

    it("Não deve ser possível atualizar filme informando um ID com caracteres não numéricos", () => {
      cy.request({
        method: "PUT",
        url: "/api/movies/" + "ID",
        body: movieUpdate,
        auth: {
          bearer: token,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message).to.equal("Validation failed (numeric string is expected)");
      });
    });
  });
});

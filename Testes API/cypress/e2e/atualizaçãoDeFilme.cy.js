import { faker } from "@faker-js/faker";

const movieUpdate = 
{
    title: "Título Atualizado",
    genre: "Gênero Atualizado",
    description: "Descrição Atualizada",
    durationInMinutes: 100,
    releaseYear: 2015
} 

describe("Permissão para atualizar filmes", () => {
    let user
    let user1
    let token
    let token1
    let movie

    before(() => {
        cy.cadastrarUsuario().then((response) => {
            user1 = response;
            cy.criarFilmeAdm(user1.email, user1.password).then((response) =>{
                movie = response;
                token1 = response.token;
            });
        }); 
    });

    beforeEach(() => {      
        cy.cadastrarUsuario().then((response) => {
            user = response;
        });
    });

    after(() => {
        cy.deletarFilme(movie.id, token1);
        cy.excluirUsuario(user1.id, token1);
    });

    afterEach(() => {
        cy.loginValido(user.email, user.password).then((response) => {
            token = response.body.accessToken;
            cy.promoverAdmin(token);            
            cy.excluirUsuario(user.id, token);
        });
    });

    it('Usuário deslogado não tem autorização para atualizar filme', () => {      
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

    it('Usuário comum não tem autorização para atualizar filme', () => {      
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

    it('Usuário crítico não tem autorização para atualizar filme', () => {      
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

    it('Usuário administrador tem autorização para atualizar filme', () => {      
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


// Usuário deslogado não tem autorização para atualizar filme
// Usuário comum não tem autorização para atualizar filme
// Usuário crítico não tem autorização para atualizar filme
// Usuário administrador tem autorização para atualizar filme

// Deve ser possível atualizar apenas o título, informando 1 caractere
// Deve ser possível atualizar apenas o título, informando até 100 caracteres
// Deve ser possível atualizar apenas o gênero, informando 1 caractere
// Deve ser possível atualizar apenas o gênero, informando até 100 caracteres
// Deve ser possível atualizar apenas a descrição, informando 1 caractere
// Deve ser possível atualizar apenas a descrição, informando até 500 caracteres
// Deve ser possível atualizar apenas o ano de lançamento, informando ano a partir de 1895
// Deve ser possível atualizar apenas o ano de lançamento, informando ano até 2024
// Deve ser possível atualizar apenas a duração, informando a partir de 1 minuto
// Deve ser possível atualizar apenas a duração, informando até 720 horas
// Deve ser possível atualizar todas as informações do filme simultaneamente

// Não deve ser possível atualizar título informando mais de 100 caracteres
// Não deve ser possível atualizar título informando espaço em branco (apertar barra de espaço)
// Não deve ser possível atualizar gênero informando mais de 100 caracteres
// Não deve ser possível atualizar gênero informando espaço em branco (apertar barra de espaço)
// Não deve ser possível atualizar descrição informando mais de 500 caracteres
// Não deve ser possível atualizar ano de lançamento informando ano anterior a 1895
// Não deve ser possível atualizar ano de lançamento informando ano posterior a 2024
// Não deve ser possível atualizar duração informando menos de 1 minuto
// Não deve ser possível atualizar duração informando mais de 720 horas

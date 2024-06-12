import { faker } from "@faker-js/faker";

const movieUpdate = 
{
    title: "Título Atualizado",
    genre: "Gênero Atualizado",
    description: "Descrição Atualizada",
    durationInMinutes: 100,
    releaseYear: 2015
} 

describe("Testes de permissão para atualizar filmes", () => {
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

describe("Testes de atualização de filme", () => {
    let user
    let token
    let movie

    before(() => {
        cy.cadastrarUsuario().then((response) => {
            user = response;
            cy.criarFilmeAdm(user.email, user.password).then((response) =>{
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
        
        it('Deve ser possível atualizar apenas o título, informando 1 caractere', () => {      
            cy.request({
                method: "PUT",
                url: "/api/movies/" + movie.id,
                body: { 
                title: "X"
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

        it('Deve ser possível atualizar apenas o título, informando 100 caracteres', () => {      
            const title100 = faker.string.alpha(100);
            cy.request({
                method: "PUT",
                url: "/api/movies/" + movie.id,
                body: { 
                title: title100
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

        it('Deve ser possível atualizar apenas o gênero, informando 1 caractere', () => {      
            cy.request({
                method: "PUT",
                url: "/api/movies/" + movie.id,
                body: { 
                genre: "Y"
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
        

        it('Deve ser possível atualizar apenas o gênero, informando 100 caracteres', () => {      
            const genre100 = faker.string.alpha(100);
            cy.request({
                method: "PUT",
                url: "/api/movies/" + movie.id,
                body: { 
                genre: genre100
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

        it('Deve ser possível atualizar apenas a descrição, informando 1 caractere', () => {      
            cy.request({
                method: "PUT",
                url: "/api/movies/" + movie.id,
                body: { 
                description: "Z"
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

        it('Deve ser possível atualizar apenas a descrição, informando 500 caracteres', () => {      
            const description500 = faker.string.alpha(500);
            cy.request({
                method: "PUT",
                url: "/api/movies/" + movie.id,
                body: { 
                description: description500
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

        it('Deve ser possível atualizar apenas o ano de lançamento, informando o ano de 1895', () => {      
            cy.request({
                method: "PUT",
                url: "/api/movies/" + movie.id,
                body: { 
                releaseYear: 1895
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

        it('Deve ser possível atualizar apenas o ano de lançamento, informando o ano de 2024', () => {      
            cy.request({
                method: "PUT",
                url: "/api/movies/" + movie.id,
                body: { 
                releaseYear: 2024
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

        it('Deve ser possível atualizar apenas a duração, informando 1 minuto', () => {      
            cy.request({
                method: "PUT",
                url: "/api/movies/" + movie.id,
                body: { 
                durationInMinutes: 1
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

        it('Deve ser possível atualizar apenas a duração, informando 720 horas', () => {      
            const duration720h = 720*60
            cy.request({
                method: "PUT",
                url: "/api/movies/" + movie.id,
                body: { 
                durationInMinutes: duration720h
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

        it('Deve ser possível atualizar todas as informações simultaneamente', () => {      
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

    
});



// Usuário deslogado não tem autorização para atualizar filme
// Usuário comum não tem autorização para atualizar filme
// Usuário crítico não tem autorização para atualizar filme
// Usuário administrador tem autorização para atualizar filme

// Deve ser possível atualizar apenas o título, informando 1 caractere
// Deve ser possível atualizar apenas o título, informando 100 caracteres
// Deve ser possível atualizar apenas o gênero, informando 1 caractere
// Deve ser possível atualizar apenas o gênero, informando 100 caracteres
// Deve ser possível atualizar apenas a descrição, informando 1 caractere
// Deve ser possível atualizar apenas a descrição, informando 500 caracteres
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

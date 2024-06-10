import { faker } from "@faker-js/faker";

describe("Acesso a pesquisa de filmes", () => {
    let user
    let token
    let movie

    beforeEach(() => { 
        cy.cadastrarUsuario().then((response) => {
            user = response;
            cy.criarFilmeAdm(user.email, user.password).then((response) =>{
                movie = response;
                token = response.token;
                cy.excluirUsuario(user.id, token);
            });
        });      

        cy.cadastrarUsuario().then((response) => {
            user = response;
        });
    });

    afterEach(() => {
        cy.loginValido(user.email, user.password).then((response) => {
            token = response.body.accessToken;
            cy.promoverAdmin(token);            
            cy.deletarFilme(movie.id, token);
            cy.excluirUsuario(user.id, token);
        });
    });

    it('Usuário não logado no sistema consegue acessar a pesquisa de filmes', () => {      
        cy.request({
            method: "GET",
            url: "/api/movies/search?title=" + movie.title,
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body[0]).to.have.property('id');
            expect(response.body[0].title).to.contain(movie.title);
            expect(response.body[0]).to.have.property('genre');
            expect(response.body[0]).to.have.property('description');
            expect(response.body[0]).to.have.property('durationInMinutes');
            expect(response.body[0]).to.have.property('releaseYear');
            expect(response.body[0]).to.have.property('totalRating');
        });
    });

    it('Usuário Comum consegue acessar a pesquisa de filmes', () => {      
        cy.loginValido(user.email, user.password).then((response) => {
            token = response.body.accessToken;
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movie.title,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body[0].title).to.contain(movie.title);
                expect(response.body[0]).to.have.property('id');
                expect(response.body[0]).to.have.property('genre');
                expect(response.body[0]).to.have.property('description');
                expect(response.body[0]).to.have.property('durationInMinutes');
                expect(response.body[0]).to.have.property('releaseYear');
                expect(response.body[0]).to.have.property('totalRating');
            });
        });
    });

    it('Usuário Critico consegue acessar a pesquisa de filmes', () => {      
        cy.loginValido(user.email, user.password).then((response) => {
            token = response.body.accessToken;
            cy.promoverCritico(token);
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movie.title,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body[0].title).to.contain(movie.title);
                expect(response.body[0]).to.have.property('id');
                expect(response.body[0]).to.have.property('genre');
                expect(response.body[0]).to.have.property('description');
                expect(response.body[0]).to.have.property('durationInMinutes');
                expect(response.body[0]).to.have.property('releaseYear');
                expect(response.body[0]).to.have.property('totalRating');
            });
        });
    });
   
    it('Usuário Administrador consegue acessar a pesquisa de filmes', () => {      
        cy.loginValido(user.email, user.password).then((response) => {
            token = response.body.accessToken;
            cy.promoverAdmin(token);
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movie.title,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body[0].title).to.contain(movie.title);
                expect(response.body[0]).to.have.property('id');
                expect(response.body[0]).to.have.property('genre');
                expect(response.body[0]).to.have.property('description');
                expect(response.body[0]).to.have.property('durationInMinutes');
                expect(response.body[0]).to.have.property('releaseYear');
                expect(response.body[0]).to.have.property('totalRating');
            });
        });
    });
});


describe("Pesquisa de filme", () => {
    let user
    let token
    let movie
    let movieBody

    before(() => {
        cy.fixture('movie1').then((response) => {
            movieBody = response;
            cy.cadastrarUsuario().then((response) => {
                user = response;
                cy.loginValido(user.email, user.password).then((response) => {
                    token = response.body.accessToken;
                    cy.promoverAdmin(token);
                    cy.newMovie(movieBody, token).then((response) => {
                        movie = response.body;
                    });
                });
            });
        });            
    });

    after(() => {
        cy.deletarFilme(movie.id, token);
        cy.excluirUsuario(user.id, token);
    });
    
    describe("Pesquisa de filme com resultado", () => {
        it('Deve ser possível encontrar filme informando o título completo', () => {
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movie.title,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body[0].id).to.equal(movie.id);
                expect(response.body[0].title).to.equal(movie.title);
                expect(response.body[0].genre).to.equal(movie.genre);
                expect(response.body[0].description).to.equal(movie.description);
                expect(response.body[0].durationInMinutes).to.equal(movie.durationInMinutes);
                expect(response.body[0].releaseYear).to.equal(movie.releaseYear);
                expect(response.body[0].totalRating).to.equal(null);
            });
        });

        it('Deve ser possível encontrar filme informando título em caixa alta', () => {
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movie.title.toUpperCase(),
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body[0].id).to.equal(movie.id);
                expect(response.body[0].title).to.equal(movie.title);
                expect(response.body[0].genre).to.equal(movie.genre);
                expect(response.body[0].description).to.equal(movie.description);
                expect(response.body[0].durationInMinutes).to.equal(movie.durationInMinutes);
                expect(response.body[0].releaseYear).to.equal(movie.releaseYear);
                expect(response.body[0].totalRating).to.equal(null);
            });
        });

        it('Deve ser possível encontrar filme informando título em caixa baixa', () => {
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movie.title.toLowerCase(),
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body[0].id).to.equal(movie.id);
                expect(response.body[0].title).to.equal(movie.title);
                expect(response.body[0].genre).to.equal(movie.genre);
                expect(response.body[0].description).to.equal(movie.description);
                expect(response.body[0].durationInMinutes).to.equal(movie.durationInMinutes);
                expect(response.body[0].releaseYear).to.equal(movie.releaseYear);
                expect(response.body[0].totalRating).to.equal(null);
            });
        });

        it('Deve ser possível encontrar filme informando título parcial', () => {
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + "O Círculo Dourado",
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body[0].title).to.contain("O Círculo Dourado");
            });
        });

        it('Deve ser possível encontrar filme informando título com caracteres especiais', () => {
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + "! #$@*&%_+'",
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body[0].title).to.contain("! #$@*&%_+'");
            });
        });
    });

    describe("Pesquisa de filme não encontrado", () => {
        it('Deve retornar lista vazia ao pesquisar um título não cadastrado', () => {
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + faker.string.alpha(20),
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.empty;
            });
        });
    
        it('Não deve ser possível encontrar um filme deletado', () => {
            cy.deletarFilme(movie.id, token);
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movie.title,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.empty;
            });
        });
    
        it('Não deve ser possível encontrar um filme pelo ID', () => {
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movie.id,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.not.contain(movie);
            });
        });
    
        it('Não deve ser possível encontrar um filme pelo gênero', () => {
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movie.genre,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.not.contain(movie);
            });
        });
    
        it('Não deve ser possível encontrar um filme pela descrição', () => {
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movie.description,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.not.contain(movie);
            });
        });
    
        it('Não deve ser possível encontrar um filme pelo ano de lançamento', () => {
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movie.releaseYear,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.not.contain(movie);
            });
        });
    });
});


describe("Pesquisa de filme atualizado", () => {
    let user
    let token
    let movie
    let movieUpdate
    let movieBody

    before(() => {
        cy.fixture('movie1').then((response) => {
            movieBody = response;
            cy.cadastrarUsuario().then((response) => {
                user = response;
                cy.loginValido(user.email, user.password).then((response) => {
                    token = response.body.accessToken;
                    cy.promoverAdmin(token);
                    cy.newMovie(movieBody, token).then((response) => {
                        movie = response.body;
                    });
                    cy.fixture('movie2').then((response) => {
                        movieBody = response;
                        cy.updateMovie(movie.id, movieBody, token).then((response) =>{
                            movieUpdate = response;
                        });
                    });
                });
            });
        });            
    });

    after(() => {
        cy.deletarFilme(movie.id, token);
        cy.excluirUsuario(user.id, token);
    });

    it('Deve ser possível encontrar filme informando título atualizado', () => {
        cy.request({
            method: "GET",
            url: "/api/movies/search?title=" + movieUpdate.title,
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body[0].id).to.equal(movie.id);
            expect(response.body[0].title).to.equal(movieUpdate.title);
            expect(response.body[0].genre).to.equal(movieUpdate.genre);
            expect(response.body[0].description).to.equal(movieUpdate.description);
            expect(response.body[0].durationInMinutes).to.equal(movieUpdate.durationInMinutes);
            expect(response.body[0].releaseYear).to.equal(movieUpdate.releaseYear);
            expect(response.body[0].totalRating).to.equal(null);
        });
    });

    it('Não deve ser possível encontrar filme informando título anterior', () => {
        cy.request({
            method: "GET",
            url: "/api/movies/search?title=" + movie.title,
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.empty;
        });
    });
});    


describe("Pesquisa de filmes com títulos contendo o mesmo texto", () => {
    let user
    let token
    let movie1
    let movie2
    let movieBody1
    let movieBody2

    before(() => {
        cy.fixture('movie1').then((response) => {
            movieBody1 = response;
        }); 
        cy.fixture('movie2').then((response) => {
            movieBody2 = response;
        }); 
        cy.cadastrarUsuario().then((response) => {
            user = response;
            cy.loginValido(user.email, user.password).then((response) => {
                token = response.body.accessToken;
                cy.promoverAdmin(token);
                cy.newMovie(movieBody1, token).then((response) => {
                    movie1 = response.body;
                });
                cy.newMovie(movieBody2, token).then((response) => {
                    movie2 = response.body;
                });
            });
        });
    });

    after(() => {
        cy.deletarFilme(movie1.id, token);
        cy.deletarFilme(movie2.id, token);
        cy.excluirUsuario(user.id, token);
    });
    
    it('Deve ser possível encontrar filmes com títulos que contém o mesmo texto', () => {
        cy.request({
            method: "GET",
            url: "/api/movies/search?title=" + "'Kingsman",
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(2);
            expect(response.body[0].title).to.equal(movie1.title);
            expect(response.body[1].title).to.equal(movie2.title);
        });
    });
});    


describe("Pesquisa de filme com título com 100 caracteres", () => {
    let user
    let token
    let movie
    const movieBody = 
    {
        title: faker.string.alpha(100),
        genre: "Gênero do filme",
        description: "Descrição do filme",
        durationInMinutes: 120,
        releaseYear: 2024
    }

    before(() => {
        cy.cadastrarUsuario().then((response) => {
            user = response;
            cy.loginValido(user.email, user.password).then((response) => {
                token = response.body.accessToken;
                cy.promoverAdmin(token);
                cy.newMovie(movieBody, token).then((response) => {
                    movie = response.body;
                });
            });
        });           
    });

    after(() => {
        cy.deletarFilme(movie.id, token);
        cy.excluirUsuario(user.id, token);
    });
    
   
    it('Deve ser possível encontrar filme com título com 100 caracteres', () => {
        cy.request({
            method: "GET",
            url: "/api/movies/search?title=" + movie.title,
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body[0].id).to.equal(movie.id);
            expect(response.body[0].title).to.equal(movie.title);
            expect(response.body[0].genre).to.equal(movie.genre);
            expect(response.body[0].description).to.equal(movie.description);
            expect(response.body[0].durationInMinutes).to.equal(movie.durationInMinutes);
            expect(response.body[0].releaseYear).to.equal(movie.releaseYear);
            expect(response.body[0].totalRating).to.equal(null);
        });
    });
});
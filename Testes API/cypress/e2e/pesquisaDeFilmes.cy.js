import { faker } from "@faker-js/faker";


const movieBody1 = {
    title: "Kingsman 2: O Círculo Dourado! #$@*&%_",
    genre: "Ação, aventura e espionagem",
    description: "Em Kingsman: O Círculo Dourado, nossos heróis enfrentam um novo desafio.",
    durationInMinutes: 141,
    releaseYear: 2017
};

const movieBody2 = {
    title: "Kingsman 1: Serviço Secret0!",
    genre: "Ação, aventura e espionagem",
    description: "Eggsy é um jovem com problemas de disciplina que parece perto de se tornar um criminoso.",
    durationInMinutes: 129,
    releaseYear: 2015
};

let user;
let token;
let movie;
let movie1;
let movie2;

describe("Acesso a pesquisa de filmes", () => {

    beforeEach(() => { 
        cy.cadastrarUsuario().then((response) => {
            const userAdm = response;
            cy.criarFilmeAdm(userAdm.email, userAdm.password).then((response) =>{
                const tokenAdm = response.token;
                movie = response;
                cy.excluirUsuario(userAdm.id, tokenAdm);
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

    before(() => {
            cy.cadastrarUsuario().then((response) => {
            user = response;
            cy.loginValido(user.email, user.password).then((response) => {
                token = response.body.accessToken;
                cy.promoverAdmin(token);
                cy.newMovie(movieBody1, token).then((response) => {
                    movie = response.body;
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
                url: "/api/movies/search?title=" + movie.title.substring(13, 29),
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body[0].title).to.contain(movie.title.substring(13, 29));
            });
        });

        it('Deve ser possível encontrar filme informando título com caracteres especiais', () => {
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movie.title.substring(32, 38),
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body[0].title).to.contain(movie.title.substring(32, 38));
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
                expect(response.body).to.be.empty;
            });
        });
    
        it('Não deve ser possível encontrar um filme pelo gênero', () => {
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movie.genre,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.empty;
            });
        });
    
        it('Não deve ser possível encontrar um filme pela descrição', () => {
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movie.description,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.empty;
            });
        });
    
        it('Não deve ser possível encontrar um filme pelo ano de lançamento', () => {
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movie.releaseYear,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.empty;
            });
        });
    });
});


describe("Pesquisa de filme atualizado", () => {
    
    let movieOriginal;
    const movieUpdate = {
        title: "Título Atualizado",
        genre: "Gênero Atualizado",
        description: "Descrição Atualizada",
        durationInMinutes: 100,
        releaseYear: 2015
    }; 

    before(() => {
        cy.cadastrarUsuario().then((response) => {
        user = response;
        cy.loginValido(user.email, user.password).then((response) => {
            token = response.body.accessToken;
            cy.promoverAdmin(token);
            cy.newMovie(movieBody2, token).then((response) => {
                movieOriginal = response.body;
            }).then(() => {
                cy.updateMovie(movieOriginal.id, movieUpdate, token);
            });
        });
        });          
    });

    after(() => {
        cy.deletarFilme(movieOriginal.id, token);
        cy.excluirUsuario(user.id, token);
    });

    it('Deve ser possível encontrar filme informando título atualizado', () => {
        cy.request({
            method: "GET",
            url: "/api/movies/search?title=" + movieUpdate.title,
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body[0].id).to.equal(movieOriginal.id);
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
            url: "/api/movies/search?title=" + movieOriginal.title,
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.empty;
        });
    });
});    


describe("Pesquisa de filmes com títulos contendo o mesmo texto", () => {

    before(() => { 
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
            url: "/api/movies/search?title=" + movie1.title.substring(1, 8),
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(2);
            expect(response.body[0].title).to.equal(movie1.title);
            expect(response.body[1].title).to.equal(movie2.title);
        });
    });
});    


describe("Pesquisa de filme com título com 100 caracteres", () => {
    
    const movieBody100 = 
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
                cy.newMovie(movieBody100, token).then((response) => {
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
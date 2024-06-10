import { faker } from "@faker-js/faker";

describe("Acesso a pesquisa de filmes", () => {
    let user
    let userComum
    let userCritico
    let userAdm
    let token
    let tokenAdm
    let movie

    before(() => {
        cy.cadastrarUsuario().then((response) => {
            user = response;
            cy.criarFilmeAdm(user.email, user.password).then((response) =>{
                movie = response;
                token = response.token;
                cy.excluirUsuario(user.id, token);
            });
        });      
        cy.cadastrarUsuario().then((response) => {
            userComum = response;
        });
        cy.cadastrarUsuario().then((response) => {
            userCritico = response;
        });
        cy.cadastrarUsuario().then((response) => {
            userAdm = response;
        });
    });

    after(() => {
        cy.loginValido(userAdm.email, userAdm.password).then((response) => {
            tokenAdm = response.body.accessToken;
            cy.deletarFilme(movie.id, token);
            cy.excluirUsuario(userComum.id, token);
            cy.excluirUsuario(userCritico.id, token);
            cy.excluirUsuario(userAdm.id, tokenAdm);
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
        cy.loginValido(userComum.email, userComum.password).then((response) => {
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
        cy.loginValido(userCritico.email, userCritico.password).then((response) => {
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
        cy.loginValido(userCritico.email, userCritico.password).then((response) => {
            tokenAdm = response.body.accessToken;
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
    
    describe("Pesquisas de filme com sucesso", () => {
        it('Deve ser possível encontrar filme informando o título completo e visualizar suas informações', () => {
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

    describe("Pesquisas de filme não encontrado", () => {
    
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
                expect(response.body).to.not.contain(movie.title);
            });
        });
    
        it('Não deve ser possível encontrar um filme pelo gênero', () => {
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movie.genre,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.not.contain(movie.title);
            });
        });
    
        it('Não deve ser possível encontrar um filme pela descrição', () => {
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movie.description,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.not.contain(movie.title);
                expect(response.body).to.not.contain(movie.description);
            });
        });
    
        it('Não deve ser possível encontrar um filme pelo ano de lançamento', () => {
            cy.request({
                method: "GET",
                url: "/api/movies/search?title=" + movie.releaseYear,
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.not.contain(movie.title);
            });
        });
    });
});




    // describe("Pesquisa de filmes que contém o mesmo título", () => {
    
    //     let movieBody
    //     let movie

    //     beforeEach(() => {
    //         cy.fixture('movie1').then((response) => {
    //             movieBody = response
    //             cy.cadastrarUsuario().then((response) => {
    //                 const email = response.email;
    //                 const password = response.password;
    //                 const id = response.id;
    //                 cy.loginValido(email, password).then((response) => {
    //                     const token = response.body.accessToken;
    //                     cy.promoverAdmin(token);
    //                     cy.newMovie(movieBody, token).then((response) => {
    //                         movie = response.body;
    //                     });
    //                    cy.excluirUsuario(id, token);
    //                 });
    //             });
    //         });            
    //     });

    //     afterEach(() => {
    //         cy.cadastrarUsuario().then((response) => {
    //             const email = response.email;
    //             const password = response.password;
    //             const id = response.id;
    //             cy.loginValido(email, password).then((response) => {
    //                 const token = response.body.accessToken;
    //                 cy.promoverAdmin(token);
    //                 cy.deletarFilme(movie.id, token);
    //                 cy.excluirUsuario(id, token);
    //             });
    //         });
    //     });

    //     it('Deve ser possível encontrar filme com títulos iguais', () => {});

    // });




//     describe("Acesso à pesquisa de filmes", () => {
    
//         let movieBody
//         let movie

//         beforeEach(() => {
//             cy.fixture('movie1').then((response) => {
//                 movieBody = response
//                 cy.cadastrarUsuario().then((response) => {
//                     const email = response.email;
//                     const password = response.password;
//                     const id = response.id;
//                     cy.loginValido(email, password).then((response) => {
//                         const token = response.body.accessToken;
//                         cy.promoverAdmin(token);
//                         cy.newMovie(movieBody, token).then((response) => {
//                             movie = response.body;
//                         });
//                        cy.excluirUsuario(id, token);
//                     });
//                 });
//             });            
//         });

//         afterEach(() => {
//             cy.cadastrarUsuario().then((response) => {
//                 const email = response.email;
//                 const password = response.password;
//                 const id = response.id;
//                 cy.loginValido(email, password).then((response) => {
//                     const token = response.body.accessToken;
//                     cy.promoverAdmin(token);
//                     cy.deletarFilme(movie.id, token);
//                     cy.excluirUsuario(id, token);
//                 });
//             });
//         });

//         it('Usuário não autenticado no sistema consegue acessar a pesquisa de filme', () => {
//             cy.request({
//                 method: "GET",
//                 url: "/api/movies/search?title=" + movie.title,
//             }).then((response) => {
//                 expect(response.status).to.equal(200);
//                 expect(response.body[0]).to.contain(movie);
//             });
//         });

//         it('Usuário comum consegue acessar a pesquisa de filme', () => { });

//         it('Usuário crítico consegue acessar a pesquisa de filme', () => { });

//         it('Usuário administrador consegue acessar a pesquisa de filme', () => { });
//     });



// Deve ser possível encontrar filme informando o título completo
// Deve ser possível encontrar filme informando título em caixa alta
// Deve ser possível encontrar filme informando título em caixa baixa
// Deve ser possível encontrar filme informando título parcial
// Deve ser possível encontrar filme informando título com caracteres especiais

// Deve retornar lista vazia ao pesquisar um título não cadastrado
// Não deve ser possível encontrar um filme pelo ID
// Não deve ser possível encontrar um filme pelo gênero
// Não deve ser possível encontrar um filme pela descrição
// Não deve ser possível encontrar um filme pelo ano de lançamento
// Não deve ser possível encontrar um filme deletado



// Deve ser possível encontrar filmes com títulos iguais **** separado - before criar 2 filmes


// Deve ser possível encontrar filme pelo título atualizado
// Não deve ser possível encontrar filme informando título anterior


// usuário não autenticado no sistema consegue acessar a pesquisa de filme
// usuário comum consegue acessar a pesquisa de filme
// usuário critico consegue acessar a pesquisa de filme
// usuário adm consegue acessar a pesquisa de filme



// let movieUpdate
// let movie2

// it('Deve ser possível encontrar filme que foi atualizado', () => {
//     cy.fixture('movie2').then((response) => {
//         movie2 = response;
//         cy.updateMovie(movie.id, movie2, token).then((response) =>{
//             movieUpdate = response;
//         });
//     });
//     cy.request({
//         method: "GET",
//         url: "/api/movies/search?title=" + "Kingsman 1: Serviço Secret0!",
//     }).then((response) => {
//         expect(response.status).to.equal(200);
//         expect(response.body[0].title).to.equal(movieUpdate.title);
//     });
// });
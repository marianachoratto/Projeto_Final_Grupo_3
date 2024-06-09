import { faker } from "@faker-js/faker";

describe("Pesquisa de filme", () => {
    
    describe("Pesquisas de filme com sucesso", () => {
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
                url: "/api/movies/search?title=" + "! $#@*&%_+-'",
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body[0].title).to.contain("! $#@*&%_+-'");
            });
        });
    });
});

describe("Pesquisas de filme não encontrado", () => {
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



// usuário não autenticado no sistema consegue acessar a pesquisa de filme
// usuário comum consegue acessar a pesquisa de filme
// usuário critico consegue acessar a pesquisa de filme
// usuário adm consegue acessar a pesquisa de filme



// it('Deve ser possível encontrar filme que teve o título atualizado', () => {
//     cy.fixture('movie2').then((response) => {
//         cy.wrap(response).as('movieUpdate');
//         cy.cadastrarUsuario().then((response) => {
//             const email = response.email;
//             const password = response.password;
//             const id = response.id;
//             cy.loginValido(email, password).then((response) => {
//                 const token = response.body.accessToken;
//                 cy.promoverAdmin(token);
//                 cy.updateMovie(movie.id, movieUpdate, token)
//                 cy.excluirUsuario(id, token); 
//             });
//         });
//     });
    
//     cy.request({
//         method: "GET",
//         url: "/api/movies/search?title=" + movieUpdate.title,
//     }).then((response) => {
//         expect(response.status).to.equal(200);
//         // expect(response.body[0].id).to.equal(movie.id);
//         // expect(response.body[0].title).to.contain(movieUpdate.title);
//     });
// });
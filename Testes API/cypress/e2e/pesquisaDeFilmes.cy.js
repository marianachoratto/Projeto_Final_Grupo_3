import { faker } from "@faker-js/faker";

describe("Pesquisa de filme", () => {

    describe("Pesquisa de filme por título", () => {
    
        let movie
        let movieBody
        let movieUpdate

        beforeEach(() => {
            cy.fixture('movie1').then((response) => {
                movieBody = response;
                cy.cadastrarUsuario().then((response) => {
                    const email = response.email;
                    const password = response.password;
                    const id = response.id;
                    cy.loginValido(email, password).then((response) => {
                        const token = response.body.accessToken;
                        cy.promoverAdmin(token);
                        cy.newMovie(movieBody, token).then((response) => {
                            movie = response.body;
                        });
                       cy.excluirUsuario(id, token);
                    });
                });
            });            
        });

        afterEach(() => {
            cy.cadastrarUsuario().then((response) => {
                const email = response.email;
                const password = response.password;
                const id = response.id;
                cy.loginValido(email, password).then((response) => {
                    const token = response.body.accessToken;
                    cy.promoverAdmin(token);
                    cy.deletarFilme(movie.id, token);
                    cy.excluirUsuario(id, token);
                });
            });
        });

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
                expect(response.body[0].title).to.contain(movie.title);
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
});



// Deve ser possível encontrar filme informando o título completo

// Deve ser possível encontrar filme informando título parcial

// Deve ser possível encontrar filme informando título em caixa alta

// Deve retornar lista vazia ao pesquisar um título não cadastrado

// Não deve ser possível encontrar um filme pelo ID

// Não deve ser possível encontrar um filme pelo gênero

// Não deve ser possível encontrar um filme pela descrição

// Não deve ser possível encontrar um filme pelo ano de lançamento

// Não deve ser possível encontrar um filme deletado



// Deve ser possível encontrar filmes com títulos iguais **** separado - before criar 2 filmes
// Deve ser possível encontrar filme que teve o título atualizado



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
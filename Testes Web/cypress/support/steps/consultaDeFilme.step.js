import {
    Given, When, Then, Before, After
} from "@badeball/cypress-cucumber-preprocessor";

import MoviePage from "../pages/infoFilmes.page";
const pageMovie = new MoviePage()

import LoginPage from "../pages/login.page";
const loginPage = new LoginPage();

import { userObject, createTokenObject } from "../userStorage"

let movieId
let name
let token, token1, token2
let email
let userid, userid1, userid2
let password
let type
Before({ tags: '@validação' },() => {
    cy.cadastrarUsuario().then((resposta) => {
        userid = resposta.id;
        name = resposta.nome;
        email = resposta.email;
        password = resposta.password;
        cy.loginValido(email, password).then((resposta) => {
            token = resposta.body.accessToken;
            cy.promoverAdmin(token);
            cy.criarFilme(token)
                .then((resposta) => {
                    movieId = resposta.id;
                    movieTitle = resposta.title;
                    movieDescription = resposta.description;
                    movieGenre = resposta.genre;
                    durationMovie = resposta.durationInMinutes;
                    movieYear = resposta.releaseYear
                })
            cy.excluirUsuario(userid, token);
        })
    })
})

After({ tags: '@limparValidação' }, () => {
    cy.loginValido(email, password).then((resposta) => {
        token = resposta.body.accessToken;
        cy.promoverAdmin(token)
        cy.deletarFilme(movieId, token);
        cy.excluirUsuario(userid, token);
    })
})

Given('que acesso um filme', () => {
    cy.cadastrarUsuario().then((resposta) => {
        userid = resposta.id;
        name = resposta.nome;
        email = resposta.email;
        password = resposta.password
    })
    cy.visit('https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/' + movieId)
})

Given('que acesso filme estando deslogado', () => {
    cy.cadastrarUsuario().then((resposta) => {
        userid = resposta.id;
        name = resposta.nome;
        email = resposta.email;
        password = resposta.password
    })
    cy.intercept('GET', 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies/' + movieId, {
        fixture: 'listReview.json',
    }).as('listReviews');
    cy.visit('https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/' + movieId)
})

Given('que acesso filme com usuário comum', () => {
    cy.cadastrarUsuario().then((resposta) => {
        userid = resposta.id;
        name = resposta.nome;
        email = resposta.email;
        password = resposta.password
        cy.loginValido(email, password).then((resposta) => {
            token = resposta.body.accessToken;
            type = 0
            const userLocal = userObject(userid, name, email, type);

            cy.window().then((window) => {
                window.sessionStorage.setItem('user-session-info', JSON.stringify(userLocal));
            });

            const tokenLocal = createTokenObject(token);

            cy.window().then((window) => {
                window.sessionStorage.setItem('session-info', JSON.stringify(tokenLocal));
            });
        })
    })
    cy.intercept('GET', 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies/' + movieId, {
        fixture: 'listReview.json',
    }
    ).as('listReviews');
    cy.visit('https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/' + movieId)
})

Given('que acesso filme com usuário crítico', () => {
    cy.cadastrarUsuario().then((resposta) => {
        userid = resposta.id;
        name = resposta.nome;
        email = resposta.email;
        password = resposta.password
        cy.loginValido(email, password).then((resposta) => {
            token = resposta.body.accessToken;
            cy.promoverCritico(token)
            type = 2
            const userLocal = userObject(userid, name, email, type);

            cy.window().then((window) => {
                window.sessionStorage.setItem('user-session-info', JSON.stringify(userLocal));
            });

            const tokenLocal = createTokenObject(token);

            cy.window().then((window) => {
                window.sessionStorage.setItem('session-info', JSON.stringify(tokenLocal));
            });
        })
    })
    cy.intercept('GET', 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies/' + movieId, {
        fixture: 'listReview.json',
    }).as('listReviews');
    cy.visit('https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/' + movieId)
})

Given('que acesso filme com usuário admin', () => {
    cy.cadastrarUsuario().then((resposta) => {
        userid = resposta.id;
        name = resposta.nome;
        email = resposta.email;
        password = resposta.password
        cy.loginValido(email, password).then((resposta) => {
            token = resposta.body.accessToken;
            cy.promoverAdmin(token)
            type = 1
            const userLocal = userObject(userid, name, email, type);

            cy.window().then((window) => {
                window.sessionStorage.setItem('user-session-info', JSON.stringify(userLocal));
            });

            const tokenLocal = createTokenObject(token);

            cy.window().then((window) => {
                window.sessionStorage.setItem('session-info', JSON.stringify(tokenLocal));
            });
        })
    })
    cy.intercept('GET', 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies/' + movieId, {
        fixture: 'listReview.json',
    }).as('listReviews');
    cy.visit('https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/' + movieId)
})

When('visualizo as avaliações', () => {
    cy.get(pageMovie.avaliacaoAudiencia).should('be.visible')
    cy.get(pageMovie.avaliacaoCritica).should('be.visible')
})

When('quando visualizo a pagina do filme', () => {
    cy.url().should('eq', 'https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/' + movieId)
})

Then('consigo ver os detalhes do filme', () => {
    cy.get(pageMovie.tituloFilme).should('be.visible').should('have.text', "Example")
    cy.get(pageMovie.descricaoFilme).should('be.visible').should('have.text', "Caminhando pela fé")
    cy.get(pageMovie.generoFilme).should('be.visible').should('have.text', "religioso")
    cy.get(pageMovie.anoFilme).should('be.visible').should('have.text', "2005")
    cy.get(pageMovie.duracaoFilme).should('be.visible').should('have.text', "1h 46m")
    cy.get(pageMovie.capaFilme).should('be.visible')

})

Then('consigo ver uma opção para avaliar o filme', () => {
    cy.get(pageMovie.tituloNovaAvaliacao).should('be.visible')
    cy.get(pageMovie.novaAvaliacao).should('be.visible')
    cy.get(pageMovie.textoNovaAvaliacao).should('be.enabled')
    cy.get(pageMovie.botaoEnviarAvaliacao).should('be.enabled')
})

Then('tenho uma opção de realizar login para avaliar filme', () => {
    cy.get(pageMovie.tituloNovaAvaliacao).should('be.visible')
    cy.get(pageMovie.novaAvaliacao).should('be.visible')
    cy.get(pageMovie.textoNovaAvaliacao).should('be.disabled')
    cy.get(pageMovie.botaoLoginAvaliacao).should('be.visible')
})

Then('as reviews publicadas estão visíveis', () => {
    cy.get(pageMovie.tituloAvaliacoes).should('be.visible')
    cy.get(pageMovie.sessaoAvaliacoes).should('be.visible')
    cy.get(pageMovie.nomeUsuario1).should('be.visible').should('have.text', "admin")
    cy.get(pageMovie.nomeUsuario2).should('be.visible').should('have.text', "critico")
    cy.get(pageMovie.nomeUsuario3).should('be.visible').should('have.text', "comum")
    cy.get(pageMovie.avaliacaoUsuario1).should('be.visible').should('have.text', "filme mediano")
    cy.get(pageMovie.avaliacaoUsuario2).should('be.visible').should('have.text', "mais ou menos")
    cy.get(pageMovie.avaliacaoUsuario3).should('be.visible').should('have.text', "curti muito")

    //cy.get(pageMovie.notas).filter(pageMovie.starFilled).should('have.lenght', 3)
    // for (let i = 0; i <= 5; i++){
    //     cy.get(pageMovie.notaUsuario1)
    // }
})

Then('as avaliações comuns correspondem a média de avaliações dos usuários comuns', () => {
    cy.get(pageMovie.quantidadeNotaAudiencia).should('have.text', "2 avaliações")
})

Then('as avaliações da crítica correspondem a média de avaliações dos usuários críticos', () => {
    cy.get(pageMovie.quantidadeNotaCritico).should('have.text', "2 avaliações")
})

Then('as avaliações dos admins não são contabilizados nas avaliações', () => {
    cy.get(pageMovie.quantidadeNotaAudiencia).should('have.text', "Nenhuma avaliação")
    cy.get(pageMovie.quantidadeNotaCritico).should('have.text', "Nenhuma avaliação")
})

Before({ tags: '@reviewsComum' }, () => {
    cy.cadastrarUsuario().then((resposta) => {
        userid = resposta.id;
        name = resposta.nome;
        email = resposta.email;
        password = resposta.password;
        cy.loginValido(email, password).then((resposta) => {
            token = resposta.body.accessToken;
            cy.promoverAdmin(token);
            cy.criarFilme(token)
                .then((resposta) => {
                    movieId = resposta.id;
                })
            cy.excluirUsuario(userid, token)
        })
    })
    cy.cadastrarUsuario().then((resposta) => {
        userid1 = resposta.id;
        email = resposta.email;
        password = resposta.password;
        cy.loginValido(email, password).then((resposta) => {
            token1 = resposta.body.accessToken;
            cy.request({
                method: "POST",
                url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/review",
                auth: {
                    bearer: token1,
                },
                body: {
                    movieId: movieId,
                    score: 4,
                    reviewText: "Filme muito bom. Vale a pena o ingresso!",
                },
            })
            cy.cadastrarUsuario().then((resposta) => {
                userid2 = resposta.id;
                email = resposta.email;
                password = resposta.password;
                cy.loginValido(email, password).then((resposta) => {
                    token2 = resposta.body.accessToken;
                    cy.request({
                        method: "POST",
                        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/review",
                        auth: {
                            bearer: token2,
                        },
                        body: {
                            movieId: movieId,
                            score: 2,
                            reviewText: "Filme muito bom. Vale a pena o ingresso!",
                        },
                    })
                })
            })
        })
    })
})

Before({ tags: '@reviewsCritico' }, () => {
    cy.cadastrarUsuario().then((resposta) => {
        userid = resposta.id;
        name = resposta.nome;
        email = resposta.email;
        password = resposta.password;
        cy.loginValido(email, password).then((resposta) => {
            token = resposta.body.accessToken;
            cy.promoverAdmin(token);
            cy.criarFilme(token)
                .then((resposta) => {
                    movieId = resposta.id;
                })
            cy.excluirUsuario(userid, token)
        })
    })
    cy.cadastrarUsuario().then((resposta) => {
        userid1 = resposta.id;
        email = resposta.email;
        password = resposta.password;
        cy.loginValido(email, password).then((resposta) => {
            token1 = resposta.body.accessToken;
            cy.promoverCritico(token1)
            cy.request({
                method: "POST",
                url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/review",
                auth: {
                    bearer: token1,
                },
                body: {
                    movieId: movieId,
                    score: 4,
                    reviewText: "Filme muito bom. Vale a pena o ingresso!",
                },
            })
            cy.cadastrarUsuario().then((resposta) => {
                userid2 = resposta.id;
                email = resposta.email;
                password = resposta.password;
                cy.loginValido(email, password).then((resposta) => {
                    token2 = resposta.body.accessToken;
                    cy.promoverCritico(token2)
                    cy.request({
                        method: "POST",
                        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/review",
                        auth: {
                            bearer: token2,
                        },
                        body: {
                            movieId: movieId,
                            score: 2,
                            reviewText: "Filme muito bom. Vale a pena o ingresso!",
                        },
                    })
                })
            })
        })
    })
})

Before({ tags: '@reviewsAdmin' }, () => {
    cy.cadastrarUsuario().then((resposta) => {
        userid = resposta.id;
        name = resposta.nome;
        email = resposta.email;
        password = resposta.password;
        cy.loginValido(email, password).then((resposta) => {
            token = resposta.body.accessToken;
            cy.promoverAdmin(token);
            cy.criarFilme(token)
                .then((resposta) => {
                    movieId = resposta.id;
                })
            cy.excluirUsuario(userid, token)
        })
    })
    cy.cadastrarUsuario().then((resposta) => {
        userid1 = resposta.id;
        email = resposta.email;
        password = resposta.password;
        cy.loginValido(email, password).then((resposta) => {
            token1 = resposta.body.accessToken;
            cy.promoverAdmin(token1)
            cy.request({
                method: "POST",
                url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/review",
                auth: {
                    bearer: token1,
                },
                body: {
                    movieId: movieId,
                    score: 4,
                    reviewText: "Filme muito bom. Vale a pena o ingresso!",
                },
            })
            cy.cadastrarUsuario().then((resposta) => {
                userid2 = resposta.id;
                email = resposta.email;
                password = resposta.password;
                cy.loginValido(email, password).then((resposta) => {
                    token2 = resposta.body.accessToken;
                    cy.promoverAdmin(token2)
                    cy.request({
                        method: "POST",
                        url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/review",
                        auth: {
                            bearer: token2,
                        },
                        body: {
                            movieId: movieId,
                            score: 2,
                            reviewText: "Filme muito bom. Vale a pena o ingresso!",
                        },
                    })
                })
            })
        })
    })
})

After({ tags: '@deleteAll' }, () => {
    cy.loginValido(email, password).then((resposta) => {
        token = resposta.body.accessToken;
        cy.promoverAdmin(token)
        cy.deletarFilme(movieId, token);
        cy.excluirUsuario(userid2, token);
        cy.excluirUsuario(userid1, token);
        cy.excluirUsuario(userid, token);
    })
})

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
let token
let email
let userid
let password
let type
Before(() => {
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

After(() => {
    cy.loginValido(email, password).then((resposta) => {
        token = resposta.body.accessToken;
        cy.promoverAdmin(token)
        cy.deletarFilme(movieId, token);
        cy.excluirUsuario(userid, token);
    })
})

Given('que acesso filme estando deslogado', () => {
    cy.cadastrarUsuario().then((resposta) => {
        userid = resposta.id;
        name = resposta.nome;
        email = resposta.email;
        password = resposta.password
    })
    cy.fixture('listReview.json').then(() => {
        cy.intercept('GET', 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies/' + movieId, {
            fixture: 'listReview.json',
        }).as('listReviews');
    })
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
    cy.fixture('listReview.json').then(() => {
        cy.intercept('GET', 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies/' + movieId, {
            fixture: 'listReview.json',
        }
        ).as('listReviews');
    })
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
    cy.fixture('listReview.json').then(() => {
        cy.intercept('GET', 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies/' + movieId, {
            fixture: 'listReview.json',
        }).as('listReviews');
    })
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
    cy.fixture('listReview.json').then(() => {
        cy.intercept('GET', 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies/' + movieId, {
            fixture: 'listReview.json',
        }).as('listReviews');
    })
    cy.visit('https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/' + movieId)
})

When('quando visualizo a pagina do filme', () => {
    // cy.wait('@listReviews').then(() => {
    cy.url().should('eq', 'https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/' + movieId)
})
// })

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


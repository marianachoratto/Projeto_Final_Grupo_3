import {
    Given,
    When,
    Then,
    Before,
    After,
} from "@badeball/cypress-cucumber-preprocessor";

let movieId
let name
let token
let email
let userid
let password
let movieTitle, movieDescription, movieGenre, durationMovie, movieYear
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

Given('que acesso um filme deslogado', () => {
    cy.cadastrarUsuario().then((resposta) => {
        userid = resposta.id;
        name = resposta.nome;
        email = resposta.email;
        password = resposta.password
    })
    cy.fixture('listReview.json').then(() => {
        cy.intercept('GET', 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies/' + movieId, {
            fixture: 'listReview.json'
        }).as('listReviews');
    })
    cy.visit('https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/' + movieId)

})

When('quando visualizo o filme', () => {
    cy.wait('@listReviews').then(() => {
        
    })
})

Then('as avaliações correspondem a média ')

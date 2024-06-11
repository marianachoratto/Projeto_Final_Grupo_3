import {
    Given, When, Then, Before, After
} from "@badeball/cypress-cucumber-preprocessor";

import MoviePage from "../pages/infoFilmes.page";
const pageMovie = new MoviePage()

import LoginPage from "../pages/login.page";
const loginPage = new LoginPage();


let movieId
let name1, name2
let token, token1, token2
let email, email1, email2
let userid, userid1, userid2
let password
Before({ tags: '@reviewsUsuariosComuns' }, () => {
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
    cy.cadastrarUsuario().then((resposta) => {
        userid1 = resposta.id;
        name1 = resposta.nome;
        email1 = resposta.email;
        password = resposta.password
        cy.loginValido(email1, password).then((resposta) => {
            token1 = resposta.body.accessToken;
            cy.reviewMovie1(token1, movieId)
        })
    })
    cy.cadastrarUsuario().then((resposta) => {
        userid2 = resposta.id;
        name2 = resposta.nome;
        email2 = resposta.email;
        password = resposta.password
        cy.loginValido(email2, password).then((resposta) => {
            token2 = resposta.body.accessToken;
            cy.reviewMovie2(token2, movieId)
        })
    })
    cy.cadastrarUsuario().then((resposta) => {
        userid = resposta.id;
        name = resposta.nome;
        email = resposta.email;
        password = resposta.password
    })
})
Before({ tags: '@reviewsUsuariosCriticos' }, () => {
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
    cy.cadastrarUsuario().then((resposta) => {
        userid1 = resposta.id;
        name1 = resposta.nome;
        email1 = resposta.email;
        password = resposta.password
        cy.loginValido(email1, password).then((resposta) => {
            token1 = resposta.body.accessToken;
            cy.promoverCritico(token1)
            cy.reviewMovie1(token1, movieId)
        })
    })
    cy.cadastrarUsuario().then((resposta) => {
        userid2 = resposta.id;
        name2 = resposta.nome;
        email2 = resposta.email;
        password = resposta.password
        cy.loginValido(email2, password).then((resposta) => {
            token2 = resposta.body.accessToken;
            cy.promoverCritico(token2)
            cy.reviewMovie2(token2, movieId)
        })
    })
    cy.cadastrarUsuario().then((resposta) => {
        userid = resposta.id;
        name = resposta.nome;
        email = resposta.email;
        password = resposta.password
    })
})

Before({ tags: '@reviewsUsuariosAdmins' }, () => {
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
    cy.cadastrarUsuario().then((resposta) => {
        userid1 = resposta.id;
        name1 = resposta.nome;
        email1 = resposta.email;
        password = resposta.password
        cy.loginValido(email1, password).then((resposta) => {
            token1 = resposta.body.accessToken;
            cy.promoverAdmin(token1)
            cy.reviewMovie1(token1, movieId)
        })
    })
    cy.cadastrarUsuario().then((resposta) => {
        userid2 = resposta.id;
        name2 = resposta.nome;
        email2 = resposta.email;
        password = resposta.password
        cy.loginValido(email2, password).then((resposta) => {
            token2 = resposta.body.accessToken;
            cy.promoverAdmin(token2)
            cy.reviewMovie2(token2, movieId)
        })
    })
    cy.cadastrarUsuario().then((resposta) => {
        userid = resposta.id;
        name = resposta.nome;
        email = resposta.email;
        password = resposta.password
    })
})

After({ tags: '@deleteAll' }, () => {
    cy.loginValido(email, password).then((resposta) => {
        token = resposta.body.accessToken;
        cy.promoverAdmin(token)
        cy.deletarFilme(movieId, token)
        cy.excluirUsuario(userid2, token)
        cy.excluirUsuario(userid1, token)
        cy.excluirUsuario(userid, token)
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
    cy.visit('https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/' + movieId)
})

Given('que acesso filme com usuário comum', () => {
    cy.visit("https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login")
    cy.loginValido(email, password).then(() => {
        cy.intercept("GET", "https://raromdb-3c39614e42d4.herokuapp.com/api/users/*").as('getUser')
        cy.intercept('POST', 'https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login'
        ).as('login');
        loginPage.login(email, password);
        cy.wait('@login')
    })
    cy.wait('@getUser')
    cy.visit('https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/' + movieId)

})

Given('que acesso filme com usuário crítico', () => {
    cy.visit("https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login")
    cy.loginValido(email, password).then((resposta) => {
        token = resposta.body.accessToken;
        cy.promoverCritico(token).then(() => {
            cy.intercept("GET", "https://raromdb-3c39614e42d4.herokuapp.com/api/users/*").as('getUser')
            cy.intercept('POST', 'https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login'
            ).as('login');
            loginPage.login(email, password);
            cy.wait('@login')
        })
    })
    cy.wait('@getUser')
    cy.visit('https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/' + movieId)
})

Given('que acesso filme com usuário admin', () => {
    cy.visit("https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login")
    cy.loginValido(email, password).then((resposta) => {
        token = resposta.body.accessToken;
        cy.promoverAdmin(token).then(() => {
            cy.intercept("GET", "https://raromdb-3c39614e42d4.herokuapp.com/api/users/*").as('getUser')
            cy.intercept('POST', 'https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login'
            ).as('login');
            loginPage.login(email, password);
            cy.wait('@login')
        })
    })
    cy.wait('@getUser')
    cy.visit('https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/' + movieId)
})


When('visualizo as avaliações', () => {
    cy.get(pageMovie.avaliacaoAudiencia).should('be.visible')
    cy.get(pageMovie.avaliacaoCritica).should('be.visible')
})

When('visualizo a pagina do filme', () => {
    cy.url().should('eq', 'https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/movies/' + movieId)
})

Then('consigo ver os detalhes do filme', () => {
    cy.get(pageMovie.tituloFilme).should('be.visible').should('have.text', movieTitle)
    cy.get(pageMovie.descricaoFilme).should('be.visible').should('have.text', movieDescription)
    cy.get(pageMovie.generoFilme).should('be.visible').should('have.text', movieGenre)
    cy.get(pageMovie.anoFilme).should('be.visible').should('have.text', movieYear)
    cy.get(pageMovie.duracaoFilme).should('be.visible').should('have.text', "1h 40m")
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
    cy.get(pageMovie.nomeUsuario1).should('be.visible').should('have.text', name1)
    cy.get(pageMovie.nomeUsuario2).should('be.visible').should('have.text', name2)
    cy.get(pageMovie.avaliacaoUsuario1).should('be.visible').should('have.text', "Filme muito bom. Vale a pena o ingresso!")
    cy.get(pageMovie.avaliacaoUsuario2).should('be.visible').should('have.text', "Filme bem maneiro!")
    cy.get(pageMovie.notaUsuario1).its('length').should('eq', 2);
    cy.get(pageMovie.notaUsuario2).its('length').should('eq', 4);

})

Then('as avaliações comuns correspondem a média de avaliações dos usuários comuns', () => {
    cy.get(pageMovie.quantidadeAvaliacaoAudiencia).should('have.text', "2 avaliações")
    cy.get(pageMovie.mediaAudiencia).its('length').should('eq', 3);
})

Then('as avaliações da crítica correspondem a média de avaliações dos usuários críticos', () => {
    cy.get(pageMovie.quantidadeAvaliacaoCritico).should('have.text', "2 avaliações")
    cy.get(pageMovie.mediaCritica).its('length').should('eq', 3);
})

Then('as avaliações dos admins não são contabilizados nas avaliações', () => {
    cy.get(pageMovie.quantidadeAvaliacaoAudiencia).should('have.text', "Nenhuma avaliação")
    cy.get(pageMovie.quantidadeAvaliacaoCritico).should('have.text', "Nenhuma avaliação")
    cy.get(pageMovie.mediaCritica).its('length').should('eq', 0);
    cy.get(pageMovie.mediaAudiencia).its('length').should('eq', 0);
})



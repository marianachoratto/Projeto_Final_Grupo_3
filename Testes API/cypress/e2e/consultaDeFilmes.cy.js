describe('Consultado informações detalhadas de filmes', () => {
    let movieId
    let name
    let token, token1, token2
    let email
    let userid, userid1, userid2
    beforeEach(() => {
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
            })
        })
    })
    afterEach(() => {
        cy.loginValido(email, password)
        cy.promoverAdmin(token)
        cy.deletarFilme(movieId, token);
        cy.excluirUsuario(userid2, token);
        cy.excluirUsuario(userid1, token);
        cy.excluirUsuario(userid, token);
    })
})
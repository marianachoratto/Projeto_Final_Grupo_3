describe('Consultado informações detalhadas de filmes', () => {
    let movieId, movieTitle, movieDescription, movieGenre, movieDuration, movieYear
    let name, name1, name2
    let token, token1, token2
    let email, email1, email2, password
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
                        movieDuration = resposta.durationInMinutes;
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
    })
    afterEach(() => {
        cy.loginValido(email, password).then((resposta) => {
            token = resposta.body.accessToken
            cy.promoverAdmin(token)
            cy.deletarFilme(movieId, token);
            cy.excluirUsuario(userid2, token);
            cy.excluirUsuario(userid1, token);
            cy.excluirUsuario(userid, token);
        })

    })
    it('É possível consultar detalhes de um filme com usuário deslogado', () => {
        cy.cadastrarUsuario().then((resposta) => {
            userid = resposta.id
            email = resposta.email;
            password = resposta.password;
        })
        cy.request({
            method: "GET",
            url: 'api/movies/' + movieId
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.title).to.eq(movieTitle)
            expect(response.body.id).to.eq(movieId)
            expect(response.body.description).to.eq(movieDescription)
            expect(response.body.genre).to.eq(movieGenre)
            expect(response.body.audienceScore).to.eq(3)
            expect(response.body.criticScore).to.eq(0)
            expect(response.body.durationInMinutes).to.eq(movieDuration)
            expect(response.body.releaseYear).to.eq(movieYear)
        });
    })
    it('É possível consultar detalhes de um filme com usuário comum', () => {
        cy.cadastrarUsuario().then((resposta) => {
            userid = resposta.id
            email = resposta.email;
            password = resposta.password;
            cy.loginValido(email, password).then((resposta) => {
                token = resposta.body.accessToken
            })
        })
        
        cy.request({
            method: "GET",
            url: 'api/movies/' + movieId,
            headers: {
                Authorization: "Bearer " + token,
              }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.title).to.eq(movieTitle)
            expect(response.body.id).to.eq(movieId)
            expect(response.body.description).to.eq(movieDescription)
            expect(response.body.genre).to.eq(movieGenre)
            expect(response.body.audienceScore).to.eq(3)
            expect(response.body.criticScore).to.eq(0)
            expect(response.body.durationInMinutes).to.eq(movieDuration)
            expect(response.body.releaseYear).to.eq(movieYear)
        });
    })
    it('É possível consultar detalhes de um filme com usuário crítico', () => {
        cy.cadastrarUsuario().then((resposta) => {
            userid = resposta.id
            email = resposta.email;
            password = resposta.password;
            cy.loginValido(email, password).then((resposta) => {
                token = resposta.body.accessToken
                cy.promoverCritico(token)
            })
        })
        
        cy.request({
            method: "GET",
            url: 'api/movies/' + movieId,
            headers: {
                Authorization: "Bearer " + token,
              }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.title).to.eq(movieTitle)
            expect(response.body.id).to.eq(movieId)
            expect(response.body.description).to.eq(movieDescription)
            expect(response.body.genre).to.eq(movieGenre)
            expect(response.body.audienceScore).to.eq(3)
            expect(response.body.criticScore).to.eq(0)
            expect(response.body.durationInMinutes).to.eq(movieDuration)
            expect(response.body.releaseYear).to.eq(movieYear)
        });
    })
    it('É possível consultar detalhes de um filme com usuário admin', () => {
        cy.cadastrarUsuario().then((resposta) => {
            userid = resposta.id
            email = resposta.email;
            password = resposta.password;
            cy.loginValido(email, password).then((resposta) => {
                token = resposta.body.accessToken
                cy.promoverAdmin(token)
            })
        })
        
        cy.request({
            method: "GET",
            url: 'api/movies/' + movieId,
            headers: {
                Authorization: "Bearer " + token,
              }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.title).to.eq(movieTitle)
            expect(response.body.id).to.eq(movieId)
            expect(response.body.description).to.eq(movieDescription)
            expect(response.body.genre).to.eq(movieGenre)
            expect(response.body.audienceScore).to.eq(3)
            expect(response.body.criticScore).to.eq(0)
            expect(response.body.durationInMinutes).to.eq(movieDuration)
            expect(response.body.releaseYear).to.eq(movieYear)
        });
    })
    it('Retorna todas as reviews de um filme ao realizar consulta', () => {
        cy.cadastrarUsuario().then((resposta) => {
            userid = resposta.id
            email = resposta.email;
            password = resposta.password;
        })
        cy.request({
            method: "GET",
            url: 'api/movies/' + movieId
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.reviews).to.be.a("array")
            expect(response.body.reviews.length).to.eq(2)
        });
    })
    it('É possível vizualizar todas as reviews de um filme', () => {
        cy.cadastrarUsuario().then((resposta) => {
            userid = resposta.id
            email = resposta.email;
            password = resposta.password;
        })
        cy.request({
            method: "GET",
            url: 'api/movies/' + movieId
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.reviews[0].user.name).to.eq(name1)
            expect(response.body.reviews[0].user.type).to.eq(0)
            expect(response.body.reviews[0].user.id).to.eq(userid1)
            expect(response.body.reviews[0].reviewText).to.eq("Filme muito bom. Vale a pena o ingresso!")
            expect(response.body.reviews[0].reviewType).to.eq(0)
            expect(response.body.reviews[0].score).to.eq(2)

            expect(response.status).to.eq(200)
            expect(response.body.reviews[1].user.name).to.eq(name2)
            expect(response.body.reviews[1].user.type).to.eq(0)
            expect(response.body.reviews[1].user.id).to.eq(userid2)
            expect(response.body.reviews[1].reviewText).to.eq("Filme bem maneiro!")
            expect(response.body.reviews[1].reviewType).to.eq(0)
            expect(response.body.reviews[1].score).to.eq(4)

        });
    })
    it('O score da audiência é a média das reviews de usuários comuns', () => {
        let score1, score2
        cy.cadastrarUsuario().then((resposta) => {
            userid = resposta.id
            email = resposta.email;
            password = resposta.password;
        })
        cy.request({
            method: "GET",
            url: 'api/movies/' + movieId
        }).then((response) => {
            expect(response.status).to.eq(200)
            score1 = response.body.reviews[0].score
            score2 = response.body.reviews[1].score
            expect(response.body.audienceScore).to.eq((score1 + score2) / 2)
        });
    })
})

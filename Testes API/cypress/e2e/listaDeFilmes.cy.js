import { faker } from "@faker-js/faker";
describe('Qualquer tipo de usuario pode ver a lista de filmes', () => {
    let name = 'Gabriel'
    let emailValido = faker.internet.email();
    let password = '123456'
    let tokenid
    let userid
    let filmeid

    beforeEach(() => {
        cy.criarUsuario(name, emailValido, password).then((response) => {
            userid = response.body.id;
            cy.loginValido(emailValido, password).then((response) => {
                tokenid = response.body.accessToken;
                cy.promoverAdmin(tokenid);
                cy.criarFilme(tokenid).then((resposta) => {
                    filmeid = resposta.id
                })

            })

        })
    })
    afterEach(() => {
        cy.loginValido(emailValido, password).then((response) => {
            tokenid = response.body.accessToken;
            cy.promoverAdmin(tokenid);
            cy.excluirUsuario(userid, tokenid);
        });
    })
    after('É possivel ver a lista de filmes estando sem logar', () => {
        cy.reload();
        cy.request({
            method: "GET",
            url: "api/movies",

        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0]).to.have.property('id');
            expect(response.body[0]).to.have.property('title');
            expect(response.body[0]).to.have.property('genre');
            expect(response.body[0]).to.have.property('description');
            expect(response.body[0]).to.have.property('durationInMinutes');
            expect(response.body[0]).to.have.property('releaseYear');
            expect(response.body[0]).to.have.property('totalRating');
        });
    });


    it('É possivel ver a lista de filmes sendo usuario comum', () => {
        cy.loginValido(emailValido, password);
        cy.request({
            method: "GET",
            url: "api/movies",

        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0]).to.have.property('id');
            expect(response.body[0]).to.have.property('title');
            expect(response.body[0]).to.have.property('genre');
            expect(response.body[0]).to.have.property('description');
            expect(response.body[0]).to.have.property('durationInMinutes');
            expect(response.body[0]).to.have.property('releaseYear');
            expect(response.body[0]).to.have.property('totalRating');
        });
    });

    it('É possivel ver a lista de filmes sendo usuario critico', () => {
        cy.loginValido(emailValido, password).then((response) => {
            tokenid = response.body.accessToken;
            cy.promoverCritico(tokenid);
        });
        cy.request({
            method: "GET",
            url: "api/movies",

        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0]).to.have.property('id');
            expect(response.body[0]).to.have.property('title');
            expect(response.body[0]).to.have.property('genre');
            expect(response.body[0]).to.have.property('description');
            expect(response.body[0]).to.have.property('durationInMinutes');
            expect(response.body[0]).to.have.property('releaseYear');
            expect(response.body[0]).to.have.property('totalRating');
        });
    });

    it('É possivel ver a lista de filmes sendo usuario admin', () => {
        cy.loginValido(emailValido, password).then((response) => {
            tokenid = response.body.accessToken;
            cy.promoverAdmin(tokenid);
        });
        cy.request({
            method: "GET",
            url: "api/movies",

        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0]).to.have.property('id');
            expect(response.body[0]).to.have.property('title');
            expect(response.body[0]).to.have.property('genre');
            expect(response.body[0]).to.have.property('description');
            expect(response.body[0]).to.have.property('durationInMinutes');
            expect(response.body[0]).to.have.property('releaseYear');
            expect(response.body[0]).to.have.property('totalRating');
        });
    });

    it('É possivel ver a lista de filmes ordenada pelas notas', () => {
        let filmeid
        cy.loginValido(emailValido, password).then((response) => {
            tokenid = response.body.accessToken;
            cy.promoverAdmin(tokenid);
            cy.criarFilme(tokenid).then((resposta) => {
                filmeid = resposta.id;
            cy.criarReviewNota5(tokenid, filmeid);
            });
        });

        cy.request({
            method: "GET",
            url: "api/movies?sort=true",

        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0].totalRating).to.eq(5);
        });
    });


});




import { faker } from "@faker-js/faker";
describe('Teste de inativação de conta', () => {
    let name = 'Gabriel'
    let emailValido = faker.internet.email().toLocaleLowerCase();
    let password = '123456'
    let tokenid
    let userid
    


    beforeEach(() => {
        cy.criarUsuario(name, emailValido, password).then((response) => {
            userid = response.body.id;
            cy.loginValido(emailValido, password).then((response) => {
                tokenid = response.body.accessToken;
            });
        })

    })

    it('Um usuario comum pode inativar sua conta', () => {
        cy.request({
            method: "PATCH",
            url: "/api/users/inactivate",
            auth: {
                bearer: tokenid,
            },

        }).then((response) => {
            expect(response.status).to.eq(204);
        })
    });



    it('Um usuario critico pode inativar sua conta', () => {
        cy.promoverCritico(tokenid);
        cy.request({
            method: "PATCH",
            url: "/api/users/inactivate",
            auth: {
                bearer: tokenid,
            },

        }).then((response) => {
            expect(response.status).to.eq(204);
        })

    });

    it('Um usuario administrador pode inativar sua conta', () => {
        cy.promoverAdmin(tokenid);
        cy.request({
            method: "PATCH",
            url: "/api/users/inactivate",
            auth: {
                bearer: tokenid,
            },

        }).then((response) => {
            expect(response.status).to.eq(204);
        })
    });

    it('Um usuario nao autenticado, nao pode inativar sua conta', () => {
        cy.request({
            method: "PATCH",
            url: "/api/users/inactivate",
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        })
        cy.loginValido(emailValido, password).then((response) => {
            tokenid = response.body.accessToken;
            cy.promoverAdmin(tokenid);
            cy.excluirUsuario(userid, tokenid);
        });

    })

    it('Apos inativar a conta ainda é possivel ver os reviews feitos pelo usario', () => {
        let filmeid
        cy.loginValido(emailValido, password).then((response) => {
            tokenid = response.body.accessToken;
            cy.promoverAdmin(tokenid);
            cy.criarFilme(tokenid).then((resposta) => {
                filmeid = resposta.id;
                cy.criarReviewNota5(tokenid, filmeid);
                cy.request({
                    method: "PATCH",
                    url: "/api/users/inactivate",
                    auth: {
                        bearer: tokenid,
                    },
                }).then((response) => {
                    expect(response.status).to.eq(204);
                });
                cy.procurarPeloId(filmeid).then((response) => {
                    expect(response.body.reviews).to.be.an('Array')
                    expect(response.body.reviews[0]).to.have.property('reviewText').to.have.eq('Absolut Cinema')
                });
            });
        })
    });

    it('Apos inativar sua conta o usuario pode criar uma nova com o mesmo email da conta inativada', () => {
        cy.request({
            method: "PATCH",
            url: "/api/users/inactivate",
            auth: {
                bearer: tokenid,
            },

        }).then((response) => {
            expect(response.status).to.eq(204);
        });
        cy.criarUsuario(name, emailValido, password).then((response) => {
            expect(response.body.email).to.eq(emailValido)
        })
    });

})





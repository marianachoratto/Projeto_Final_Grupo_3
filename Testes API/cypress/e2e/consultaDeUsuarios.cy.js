import { faker } from "@faker-js/faker";
let name = "Gabriel";
let password = "123456";
let tokenid;
let userid;
let emailValido;
let emailValido2 = name + faker.internet.email();
let userid2;
describe("Teste de consulta de usuarios geral", () => {

    beforeEach(() => {
        emailValido = faker.internet.email().toLocaleLowerCase();

        cy.criarUsuario(name, emailValido, password).then((response) => {
            userid = response.body.id;
            cy.loginValido(emailValido, password).then((response) => {
                tokenid = response.body.accessToken;
            });
        });
    });

    afterEach(() => {
        cy.loginValido(emailValido, password).then((response) => {
            tokenid = response.body.accessToken;
            cy.promoverAdmin(tokenid);
            cy.excluirUsuario(userid, tokenid);
        });
    });

    it('Usuarios comuns nao podem consultar os usuarios', () => {
        cy.request({
            Method: 'GET',
            url: "/api/users",
            auth: {
                bearer: tokenid,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });

    });
    it('Usuarios criticos nao podem consultar os usuarios', () => {
        cy.promoverCritico(tokenid)
        cy.request({
            Method: 'GET',
            url: "/api/users",
            auth: {
                bearer: tokenid,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });

    });
    it('Apenas Usuarios ADMIN podem consultar os usuarios', () => {
        cy.promoverAdmin(tokenid)
        cy.request({
            Method: 'GET',
            url: "/api/users",
            auth: {
                bearer: tokenid,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0]).to.have.property("id");
            expect(response.body[0]).to.have.property("name");
            expect(response.body[0]).to.have.property("email");
            expect(response.body[0]).to.have.property("type");
            expect(response.body[0]).to.have.property("active");

        });

    });

})

describe("Teste de consulta de usuarios por id", () => {
    beforeEach(() => {
        emailValido = faker.internet.email().toLocaleLowerCase();

        cy.criarUsuario(name, emailValido, password).then((response) => {
            userid = response.body.id;
            cy.loginValido(emailValido, password).then((response) => {
                tokenid = response.body.accessToken;
            });
        });
    });

    afterEach(() => {
        cy.loginValido(emailValido, password).then((response) => {
            tokenid = response.body.accessToken;
            cy.promoverAdmin(tokenid);
            cy.excluirUsuario(userid, tokenid);
        });
    });

    it('Usuarios comuns nao podem consultar outros usuarios', () => {
        cy.request({
            Method: 'GET',
            url: "/api/users/" + 9999,
            auth: {
                bearer: tokenid,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });

    });

    it('Usuarios comuns podem consultar a si mesmos', () => {
        cy.request({
            Method: 'GET',
            url: "/api/users/" + userid,
            auth: {
                bearer: tokenid,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("id");
            expect(response.body).to.have.property("name");
            expect(response.body).to.have.property("email");
            expect(response.body).to.have.property("type");
            expect(response.body).to.have.property("active");

        });

    });

    it('Usuarios criticos nao podem consultar outros usuarios', () => {
        cy.promoverCritico(tokenid)
        cy.request({
            Method: 'GET',
            url: "/api/users/" + 9999,
            auth: {
                bearer: tokenid,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
        });

    });

    it('Usuarios criticos podem consultar a si mesmos', () => {
        cy.request({
            Method: 'GET',
            url: "/api/users/" + userid,
            auth: {
                bearer: tokenid,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("id");
            expect(response.body).to.have.property("name");
            expect(response.body).to.have.property("email");
            expect(response.body).to.have.property("type");
            expect(response.body).to.have.property("active");

        });

    });

    it('Apenas Usuarios ADMIN podem consultar a si mesmos', () => {
        cy.promoverAdmin(tokenid)
        cy.request({
            Method: 'GET',
            url: "/api/users/" + userid,
            auth: {
                bearer: tokenid,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("id");
            expect(response.body).to.have.property("name");
            expect(response.body).to.have.property("email");
            expect(response.body).to.have.property("type");
            expect(response.body).to.have.property("active");

        });

    });

    it('Apenas Usuarios ADMIN podem consultar a outros', () => {
        cy.criarUsuario(name, emailValido2, password).then((response) => {
            userid2 = response.body.id
        }).then(() => {
            cy.promoverAdmin(tokenid);
            cy.request({
                method: 'GET',
                url: "/api/users/" + userid2,
                auth: {
                    bearer: tokenid,
                },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property("id");
                expect(response.body).to.have.property("name");
                expect(response.body).to.have.property("email");
                expect(response.body).to.have.property("type");
                expect(response.body).to.have.property("active");

            });
        });



    });

})

describe("Teste de consulta de usuarios por id/geral sem autenticação", () => {
    beforeEach(() => {
        emailValido = faker.internet.email().toLocaleLowerCase();

        cy.criarUsuario(name, emailValido, password).then((response) => {
            userid = response.body.id;
        });
    });

    afterEach(() => {
        cy.loginValido(emailValido, password).then((response) => {
            tokenid = response.body.accessToken;
            cy.promoverAdmin(tokenid);
            cy.excluirUsuario(userid, tokenid);
        });
    });
    
    it('Usuarios sem logar nao podem consultar a lista de usuarios', () => {
        cy.request({
            Method: 'GET',
            url: "/api/users",
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);

        });

    });

    it('Usuarios sem logar nao podem consultar a outros mesmos', () => {
        cy.request({
            Method: 'GET',
            url: "/api/users/" + userid,
            auth: {
                bearer: tokenid,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);

        });

    });
})
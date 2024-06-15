let userid, email, password, token

describe('Cenários de login', () => {

    before(() => {
        cy.cadastrarUsuario().then((response) => {
            userid = response.id;
            email = response.email;
            password = response.password;
        });
    });

    after(() => {
        cy.loginValido(email, password).then((response) => {
            token = response.body.accessToken;
            cy.promoverAdmin(token);
            cy.excluirUsuario(userid, token);
        });
    });

    it('É possível realizar login', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                "email": email,
                "password": password
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.accessToken).to.not.be.empty;
            token = response.body.accessToken;
        });
    });

    it('A sessão deve expirar após uma hora', () => {
        let tokenExpirado = 'tokenexpirado'
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                "email": email,
                "password": password
            },
        }).then((response) => {
            token = response.body.accessToken;
        });
        cy.request({
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${tokenExpirado} `,
            },
            url: "api/users/apply",
            failOnStatusCode: false,
        }
        ).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.error).to.equal("Unauthorized");
            expect(response.body.message).to.equal("Access denied.");
        });
    });
});

describe('Cenários de falha', () => {
    it('Não é possível realizar login sem informar email', function () {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                "email": "",
                "password": password
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.error).to.equal("Bad Request");
            expect(response.body.message).to.include("email should not be empty");
            expect(response.body.message).to.include("email must be an email");
        });
    });

    it('Não é possível realizar login sem informar senha', function () {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                "email": email,
                "password": ""
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.error).to.equal("Bad Request");
            expect(response.body.message).to.include("password should not be empty");
        });
    });

    it('Não é possível realizar login sem informar email e senha', function () {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                "email": "",
                "password": ""
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.error).to.equal("Bad Request");
            expect(response.body.message).to.include("email should not be empty");
            expect(response.body.message).to.include("email must be an email");
            expect(response.body.message).to.include("password should not be empty");
        });
    });

    it('Não é possível realizar login informando email e senha não correspondentes', function () {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                "email": "email@email.com",
                "password": "senhanãocorrespondente"
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.error).to.equal("Unauthorized");
            expect(response.body.message).to.equal("Invalid username or password.");
        });
    });
});
let userid, email, password, token

describe('Cenarios de login', () => {
    before('Criando usuário', () => {
        cy.cadastrarUsuario().then((response) => {
            userid = response.id;
            email = response.email;
            password = response.password;
        })
    })

    after('Promover usuario', () => {
        cy.loginValido(email, password).then((response) => {
            token = response.body.accessToken;
            cy.promoverAdmin(token);
            cy.excluirUsuario(userid, token)
        })
    })

    it('É possível realizar login', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                "email": email,
                "password": password
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.accessToken).to.not.be.empty;
            token = response.body.accessToken;
        })
    })

    it('A sessão deve expirar após uma hora', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                "email": email,
                "password": password
            }
        }).then((response) => {
            token = response.body.accessToken;
        })
        cy.clock().then((clock) => {
            clock.tick(3600000)
        }).then(() => {
            cy.promoverAdmin(token).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })
})

describe('Cenários de falha', () => {
    it('Realizar login sem preencher email deve retornar 400', function () {
            cy.request({
                method: 'POST',
                url: '/api/auth/login',
                body: {
                    "email": "",
                    "password": password
                },
                failOnStatusCode: false
            }).then(function (response) {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.include("Bad Request")
                expect(response.body.message).to.include("email should not be empty")
                expect(response.body.message).to.include("email must be an email")
            })
        })
})
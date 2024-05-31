const { faker } = require('@faker-js/faker')

let tokenid
let userid

describe('Testes criação de usuário', () => {
    let password = '123456'

    afterEach(() => {
        cy.get('@email').then((email) => {
            cy.loginValido(email, password)
                .then((response) => {
                    tokenid = response.body.accessToken;
                    cy.promoverAdmin(tokenid);
                    cy.excluirUsuario(userid, tokenid)
                });
        })
    })

    it('Cadastrar usuário válido deve retornar 201', () => {
        let name = faker.person.firstName()
        let emailValido = faker.random.alpha({ count: 12 }).toLowerCase() + '@dominio.net'
        cy.wrap(emailValido).as("email")
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": name,
                "email": emailValido,
                "password": password
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.name).to.eq(name);
            expect(response.body.email).to.eq(emailValido);
            expect(response.body.type).to.eq(0)
            expect(response.body.active).to.eq(true)
            userid = response.body.id;
            cy.wrap(emailValido).as("email")
        })
    });

    it('Criar conta informando e-mail com 60 caracteres deve retornar 201', () => {
        let name = faker.person.firstName()
        let emailValido = faker.random.alpha({ count: 48 }).toLowerCase() + '@dominio.net'
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": name,
                "email": emailValido,
                "password": password
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.name).to.eq(name);
            expect(response.body.email).to.eq(emailValido);
            expect(response.body.type).to.eq(0)
            expect(response.body.active).to.eq(true)
            userid = response.body.id;
            cy.wrap(emailValido).as("email")
        })
    })

    it('Criar conta informando nome com 1 caractere deve retornar 201', () => {
        let name = '%'
        let emailValido = faker.random.alpha({count: 7}).toLowerCase() + '@dominio.com'
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": name,
                "email": emailValido,
                "password": password
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.name).to.eq(name);
            expect(response.body.email).to.eq(emailValido);
            expect(response.body.type).to.eq(0)
            expect(response.body.active).to.eq(true)
            userid = response.body.id;
            cy.wrap(emailValido).as("email")
        })
    })

    it('Criar conta informando nome com 100 caracteres deve retornar 201', () => {
        let name = faker.random.alpha({count: 100})
        let emailValido = faker.random.alpha({count: 7}).toLowerCase() + '@dominio.com'
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": name,
                "email": emailValido,
                "password": password
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.name).to.eq(name);
            expect(response.body.email).to.eq(emailValido);
            expect(response.body.type).to.eq(0)
            expect(response.body.active).to.eq(true)
            userid = response.body.id;
            cy.wrap(emailValido).as("email")
        })
    })

    it('Criar conta informando e-mail com 5 caracteres deve retornar 201', () => {
        let name = faker.person.firstName()
        let emailValido = 'u@g.p'
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": name,
                "email": emailValido,
                "password": password
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.name).to.eq(name);
            expect(response.body.email).to.eq(emailValido);
            expect(response.body.type).to.eq(0)
            expect(response.body.active).to.eq(true)
            userid = response.body.id;
            cy.wrap(emailValido).as("email")
        })
    })
}) 
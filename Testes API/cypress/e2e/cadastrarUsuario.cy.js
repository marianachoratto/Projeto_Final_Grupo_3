const { faker } = require('@faker-js/faker')

let token
let userid

describe('Testes criação de usuário', () => {
    let password = '123456'
    afterEach(() => {
        cy.get('@email').then((email) => {
            cy.loginValido(email, password).then((resposta) => {
                token = resposta.token;
                cy.promoverAdmin(token);
                cy.excluirUsuario(userid, token)
            });
        })
    })

    it('Cadastrar usuário válido deve retornar 201', () => {
        let name = faker.person.firstName()
        let emailValido = faker.random.alpha({ count: 12 }).toLowerCase() + '@dominio.net'
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

    it('Criar conta informando nome com 1 caractere deve retornar 201', () => {
        let name = '%'
        let emailValido = faker.random.alpha({ count: 7 }).toLowerCase() + '@dominio.com'
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
        let name = faker.random.alpha({ count: 100 })
        let emailValido = faker.random.alpha({ count: 7 }).toLowerCase() + '@dominio.com'
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

    it('Criar conta informando nome com  numeros e caracteres especiais deve retornar 201', () => {
        let name = '!@#$%126875., ;~][´=-9'
        let emailValido = faker.random.alpha({ count: 7 }).toLowerCase() + '@dominio.com'
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

    it('Não é possível cadastrar usuário informando e-mail já cadastrado', () => {
        let name = faker.person.lastName()
        let emailValido = faker.random.alpha({ count: 7 }).toLowerCase() + '@dominio.com'
        let password = "123456"
        cy.criarUsuario(name, emailValido, password).then((response) => {
            userid = response.body.id;
            cy.wrap(emailValido).as("email")
            cy.request({
                method: 'POST',
                url: '/api/users',
                body: {
                    "name": name,
                    "email": emailValido,
                    "password": password
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(409);
                expect(response.body.message).to.eq('Email already in use')
                expect(response.body.error).to.eq('Conflict')
            })
        })
    })

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

describe('Cenários de falha', () => {
    it('Não é possível cadastrar usuário sem informar nome', () => {
        let name = ''
        let emailValido = faker.random.alpha({ count: 7 }).toLowerCase() + '@dominio.com'
        let password = '123456'
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": name,
                "email": emailValido,
                "password": password
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.include('name should not be empty')
            expect(response.body.message).to.include('name must be longer than or equal to 1 characters')
            expect(response.body.error).to.eq('Bad Request')
        })
    })

    it('Não é possível cadastrar usuário sem informar email', () => {
        let name = faker.person.lastName()
        let email = ''
        let password = '123456'
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": name,
                "email": email,
                "password": password
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.include('email must be longer than or equal to 5 characters')
            expect(response.body.message).to.include('email must be an email')
            expect(response.body.message).to.include('email should not be empty')
            expect(response.body.error).to.eq('Bad Request')
        })
    })

    it('Não é possível cadastrar usuário sem informar senha', () => {
        let name = faker.person.lastName()
        let emailValido = faker.random.alpha({ count: 7 }).toLowerCase() + '@dominio.com'
        let password = ''
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": name,
                "email": emailValido,
                "password": password
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.include('password must be longer than or equal to 6 characters')
            expect(response.body.message).to.include('password should not be empty')
            expect(response.body.error).to.eq('Bad Request')
        })
    })
    
    it('Não é possível cadastrar usuário sem preencher formulário', () => {
        let name = ''
        let emailValido = ''
        let password = ''
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": name,
                "email": emailValido,
                "password": password
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.error).to.eq('Bad Request')
            expect(response.body.message).to.include('email must be longer than or equal to 5 characters')
            expect(response.body.message).to.include('email must be an email')
            expect(response.body.message).to.include('email should not be empty')
            expect(response.body.message).to.include('password must be longer than or equal to 6 characters')
            expect(response.body.message).to.include('password should not be empty')
            expect(response.body.message).to.include('name should not be empty')
            expect(response.body.message).to.include('name must be longer than or equal to 1 characters')
        })
    })

    it('Não é possível cadastrar usuário informando email inválido', () => {
        let name = faker.person.lastName()
        let email = 'padraoinvalido'
        let password = '123456'
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": name,
                "email": email,
                "password": password
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.include('email must be an email')
            expect(response.body.error).to.eq('Bad Request')
        })
    })

    it('Não é possível cadastrar usuário informando nome com espaços vazios', () => {
        let name = '     '
        let emailValido = faker.random.alpha({ count: 7 }).toLowerCase() + '@dominio.com'
        let password = '123456'
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": name,
                "email": emailValido,
                "password": password
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.include('name should not be empty')
            expect(response.body.message).to.include('name must be an name')
            expect(response.body.error).to.eq('Bad Request')
        })
    })

    it('Não é possível cadastrar usuário informando senha com espaços vazios', () => {
        let name = faker.person.lastName()
        let emailValido = faker.random.alpha({ count: 7 }).toLowerCase() + '@dominio.com'
        let password = '        '
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": name,
                "email": emailValido,
                "password": password
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.include('password must be an password')
            expect(response.body.message).to.include('password should not be empty')
            expect(response.body.error).to.eq('Bad Request')
        })
    })

    it('Não é possível cadastrar usuário informando email com mais de 60 digitos', () => {
        let name = faker.person.lastName()
        let email61 = faker.random.alpha({ count: 49 }).toLowerCase() + '@dominio.net'
        let password = '123456'
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": name,
                "email": email61,
                "password": password
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.include('email must be shorter than or equal to 60 characters')
            expect(response.body.error).to.eq('Bad Request')
        })
    })

    it('Não é possível cadastrar usuário informando nome mais de 100 caracteres', () => {
        let name = faker.random.alpha({ count: 101 })
        let emailValido = faker.random.alpha({ count: 7 }).toLowerCase() + '@dominio.com'
        let password = '123456'
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": name,
                "email": emailValido,
                "password": password
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.include('name must be shorter than or equal to 100 characters')
            expect(response.body.error).to.eq('Bad Request')
        })
    })
})
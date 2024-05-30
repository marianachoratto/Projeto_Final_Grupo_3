import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import CreateUser from "../pages/cadastrarUsuario.page";
const createUser = new CreateUser()

import { faker } from '@faker-js/faker';

let userid
let tokenid
let email
let password

Before({ tags: '@createUser' }, () => {
    cy.fixture('usuario.json').then(function (newuser) {
        cy.request({
            method: 'POST',
            url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users',
            body: newuser.novoUsuario
        }).then((response) => {
            userid = response.body.id
        })
    })
})

After({ tags: '@deleteUser' }, () => {
    cy.fixture('usuario.json').then(function (dadosUsuario) {

        cy.loginValido(email, password)
            .then(function (response) {
                tokenid = response.body.accessToken;
                cy.promoverAdmin(tokenid);
                cy.excluirUsuario(userid, tokenid)
            })
    })
})

Given('que acessei a funcionalidade de cadastro', function () {
    cy.visit('/register')
});

When('informo um nome {string}', (name) => {
    createUser.typeName(name)
})

When('informo um nome inválido {string}', (name) => {
    createUser.typeName(name)
});

When('visualizo a pagina de criação', () => { })

When('informo um nome válido', () => {
    const name = faker.person.firstName()
    createUser.typeName(name)
})

When('informo um email válido', () => {
    email = faker.internet.email()
    createUser.typeEmail(email)
})

When('informo um nome com mais de 100 caracteres', () => {
    const name101 = faker.random.alpha({ count: 101 })
    createUser.typeName(name101)
})

When('informo uma senha válida', () => {
    password = '123456'
    createUser.typePassword(password)
})

When('confirmo a senha', () => {
    createUser.typeConfirmPassword('123456')
})

When('clico para cadastrar', () => {
    cy.intercept(
        'POST',
        'https://raromdb-3c39614e42d4.herokuapp.com/api/users',).as('criar')
    createUser.clickButtomSubmit()
})

When('informo dados válidos com e-mail já cadastrado', () => {
    cy.fixture('usuario.json').then((dadosUsuario) => {
        email = dadosUsuario.novoUsuario.email;
        password = dadosUsuario.novoUsuario.password;
        createUser.typeName(dadosUsuario.novoUsuario.name)
        createUser.typeEmail(email)
        createUser.typePassword(password)
        createUser.typeConfirmPassword(password)
    })
})

Then('o usuário não é criado', () => {
    cy.wait('@criar').its('response')
        .then((response) => {
            expect(response.statusCode).to.eq(409)
            cy.get(createUser.modalSucess).contains('Falha no cadastro.')
            cy.get(createUser.modalRegistration).contains('E-mail já cadastrado. Utilize outro e-mail')
        })
})

Then('um usuário do tipo comum será gerado', () => {
    cy.wait('@criar').its('response')
        .then((response) => {
            expect(response.body.type).to.eq(0)
            cy.get(createUser.modalSucess).contains('Sucesso')
            cy.get(createUser.modalRegistration).contains('Cadastro realizado!')
            userid = response.body.id;
        })
})

Then('os inputs estão habilitados e instruções visíveis', () => {
    createUser.paginaCriacao()
})

Then('retorna mensagem informando o limite de caracteres', () => {
    cy.get(createUser.spanName).contains('O nome deve ter no máximo 100 dígitos.')
})

Then('retorna mensagem informando que o nome deve ser preenchido', () => {
    cy.get(createUser.spanName).contains('Informe o nome.')
})

Then('retorna mensagem informando que o email deve ser preenchido', () => {
    cy.get(createUser.spanEmail).contains('Informe o e-mail.')
})
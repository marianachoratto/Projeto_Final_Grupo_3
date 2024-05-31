import {
  Given,
  When,
  Then,
  Before,
  After,
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import CreateUser from "../pages/cadastrarUsuario.page";
import AccountPage from "../pages/gerenciarConta.page";
import ProfilePage from "../pages/perfil.page";

const createUser = new CreateUser();
const accountPage = new AccountPage();
const profilePage = new ProfilePage();

Before({ tags: "@criarUsuario" }, () => {
    const name = faker.person.firstName();
    const email = faker.internet.email();

    cy.visit('/register');
    cy.intercept("POST", "api/users").as('postUser');
    createUser.cadastrar(name, email, '123456');

    cy.wait('@postUser').then((intercept) => {
        cy.wrap(intercept.response.body.id).as('id');
        cy.wrap(intercept.response.body.name).as('nome');
        cy.wrap(intercept.response.body.email).as('email');
        cy.wrap(intercept.response.body.type).as('tipoUser');
    });
});

Given("que entrei no perfil do meu usuário já cadastrado", function () {
    profilePage.clickButtonPerfil();
});

Given("que acessei a funcionalidade de gerenciamento de conta", function () {
    profilePage.clickButtonGerenciar();
});

Then("o nome cadastrado deve estar correto", function () {
    cy.get('@nome').then((nome) => {
        accountPage.getNome().invoke('val').should('equal', nome);
    })
});

Then("o email deve estar correto", function () {
    cy.get('@email').then((email) => {
        accountPage.getEmail().invoke('val').should('equal', email);
    })
});

Then("o usuário deve ser do tipo comum", function () {
    cy.get('@tipoUser').then((type) => {
        accountPage.getTipoUsuario().invoke('val').should('equal', `${type}`);
        accountPage.getUserComum().invoke('text').should('equal', 'Comum');
    }); 
})


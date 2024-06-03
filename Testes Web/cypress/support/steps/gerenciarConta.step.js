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
import LoginPage from "../pages/login.page";

const createUser = new CreateUser();
const accountPage = new AccountPage();
const profilePage = new ProfilePage();
const loginPage = new LoginPage();

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




When("acessar a opção Gerenciar Conta", function () {
    profilePage.clickButtonGerenciar();
});

When("acessar a opção Logout", function () {
    profilePage.clickButtonLogout();
});

When("tentar acessar a funcionalidade de Gerenciamento de Conta", function () {
    cy.visit('/account');
});

When("habilitar a alteração de senha", function () {
    accountPage.clickButtonAlterarSenha();
});

When("começar a alterar a senha", function () {
    accountPage.typeSenha('ABCDEFG');
    accountPage.typeConfirmarSenha('ABCDEFG');
});

When("clicar no botão de cancelar", function () {
    accountPage.clickButtonCancelar();
});



When("informar uma nova senha {string} e confirmá-la", function (senha) {
    accountPage.typeSenha(senha);
    accountPage.typeConfirmarSenha(senha);
});




Then("as iniciais, nome e email do usuário devem estar visíveis", function () {
    profilePage.getIniciais().should('be.visible');

    cy.get('@nome').then((nome) => {
        profilePage.getUserInfo().invoke('text').should('contain', nome);
    })

    cy.get('@email').then((email) => {
        profilePage.getUserInfo().invoke('text').should('contain', email);
    })
});

Then("o nome e email do usuário devem estar visíveis", function () {
    cy.get('@nome').then((nome) => {
        accountPage.getNome().invoke('val').should('equal', nome);
    })
    
    cy.get('@email').then((email) => {
        accountPage.getEmail().invoke('val').should('equal', email);
    })
});

Then("o usuário deve ser do tipo Comum", function () {
    cy.get('@tipoUser').then((type) => {
        accountPage.getTipoUsuario().invoke('val').should('equal', `${type}`);
        accountPage.getUserComum().invoke('text').should('equal', 'Comum');
    }); 
});

Then("serei redirecionado para a página de Login automaticamente", function () {
    cy.url().should('equal', loginPage.URL);
    cy.contains('Login');
    cy.contains('Entre com suas credenciais');
});

Then("o campo E-mail deve estar desabilitado a edição", function () {
    accountPage.getEmail().should('be.disabled');
});

Then('o campo Tipo de usuário deve estar desabilitado a edição', function () {
    accountPage.getTipoUsuario().should('be.disabled');
});

Then('os campos Senha e Confirmar senha deven estar desabilitados a edição', function () {
    accountPage.getSenha().should('be.disabled');
    accountPage.getConfirmarSenha().should('be.disabled');
});

Then('a alteração é cancelada', function () {
    accountPage.getSenha().should('be.disabled');
    accountPage.getConfirmarSenha().should('be.disabled');
});
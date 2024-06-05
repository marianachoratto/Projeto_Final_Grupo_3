import {
  Given,
  When,
  Then,
  Before,
  After,
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import AccountPage from "../pages/gerenciarConta.page";
import ProfilePage from "../pages/perfil.page";
import LoginPage from "../pages/login.page";

const accountPage = new AccountPage();
const profilePage = new ProfilePage();
const loginPage = new LoginPage();

let dadosUser
let tokenid

Before({ tags: "@criarUsuario" }, () => {
    cy.visit('/login');
    cy.cadastrarUsuario('123456').then((response) => {
        dadosUser = response
        loginPage.login(dadosUser.email, '123456');
    });
});

After({ tags: "@deletarUsuario" }, () => {
    cy.loginValido(dadosUser.email, '123456').then((response) => {
        tokenid = response.body.accessToken;
        cy.promoverAdmin(tokenid);
        cy.excluirUsuario(dadosUser.id, tokenid);
    });
});

Given("que entrei no perfil do meu usuário já cadastrado", function () {
    profilePage.clickButtonPerfil();
});

Given("que meu perfil foi promovido a Crítico", function () {
    profilePage.clickButtonLogout();

    cy.loginValido(dadosUser.email, '123456').then((response) => {
        cy.wrap(response.body.accessToken).as('token');
    });

    cy.get('@token').then((token) => {
        cy.promoverCritico(token);
    });
});

Given("que meu perfil foi promovido a Administrador", function () {
    profilePage.clickButtonLogout();

    cy.loginValido(dadosUser.email, '123456').then((response) => {
        cy.wrap(response.body.accessToken).as('token');
    });

    cy.get('@token').then((token) => {
        cy.promoverAdmin(token);
    });
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

When("informar um novo nome {string}", function (nome) {
    accountPage.limparNome();
    accountPage.typeNome(nome);
    cy.wrap(nome).as('novoNome');
});

When('confirmar a operação', function () {
    cy.intercept("PUT", "api/users/" + dadosUser.id).as('updateUser');
    accountPage.clickButtonSalvar();
});

When("informar uma senha {string} e confirmá-la", function (senha) {
    accountPage.typeSenha(senha);
    accountPage.typeConfirmarSenha(senha);
    cy.wrap(senha).as('novaSenha');
});

When("informar um novo nome, uma nova senha e confirmá-la", function () {
    accountPage.atualizar('Nome Atualizado', 'novaSenha');
    cy.wrap('Nome Atualizado').as('novoNome');
});

When('informar uma senha {string} diferente da confirmação {string}', function (senha, confirmação) {
    accountPage.typeSenha(senha);
    accountPage.typeConfirmarSenha(confirmação);
});

When('informar espaços em branco na senha', function () {
    accountPage.typeSenha('       ');
    accountPage.typeConfirmarSenha('       ');
});

When("informar um nome maior que 100 caracteres", function () {
    const nome101 = faker.string.alpha(101);
    accountPage.limparNome();
    accountPage.typeNome(nome101);
});

When("limpar o campo Nome", function () {
    accountPage.limparNome();
});

When("informar um espaço em branco no nome", function () {
    accountPage.limparNome();
    accountPage.typeNome(' ');
});

When("fizer login novamente e acessar a opção Gerenciar Conta", function () {
    cy.visit('/login');
    loginPage.login(dadosUser.email, '123456');
    profilePage.clickButtonPerfil();
    profilePage.clickButtonGerenciar();
});

Then("as iniciais, nome e email do usuário devem estar visíveis", function () {
    profilePage.getIniciais().should('be.visible');
    profilePage.getUserInfo().invoke('text').should('contain', dadosUser.name);
    profilePage.getUserInfo().invoke('text').should('contain', dadosUser.email);
});

Then("o nome e email do usuário devem estar visíveis", function () {
    accountPage.getNome().invoke('val').should('equal', dadosUser.name);
    accountPage.getEmail().invoke('val').should('equal', dadosUser.email);
});

Then("o usuário deve ser do tipo Comum", function () {
    accountPage.getTipoUsuario().invoke('val').should('equal', `${dadosUser.type}`);
    accountPage.getUserComum().invoke('text').should('equal', 'Comum');
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

Then('visualizarei a mensagem de sucesso {string}', function (text) {
    cy.wait('@updateUser').then((intercept) => {
        expect(intercept.response.statusCode).to.equal(200);
        accountPage.getModalTitulo().should('have.text', 'Sucesso');
        accountPage.getModalMensagem().should('have.text', text);
    });
});

Then('verificarei meu nome alterado na tela', function () {
    accountPage.clickButtonOk();
    cy.get('@novoNome').then((nome) => {
        accountPage.getNome().invoke('val').should('equal', nome);
    });
});

Then("é possível fazer login com a nova senha", function () {
    profilePage.clickButtonPerfil();
    profilePage.clickButtonLogout();
    cy.visit('/login');

    cy.get('@novaSenha').then((senha) => {
        loginPage.login(dadosUser.email, senha);
    });

    profilePage.clickButtonPerfil();
    profilePage.getUserInfo().invoke('text').should('contain', dadosUser.name);
    profilePage.getUserInfo().invoke('text').should('contain', dadosUser.email);
});

Then('visualizarei o alerta {string}', function (text) {
    accountPage.alerta(0, text);
});

Then('visualizarei a mensagem de erro {string}', function (text) {
    cy.wait('@updateUser').then((intercept) => {
        expect(intercept.response.statusCode).to.equal(400);
        accountPage.getModalTitulo().should('have.text', 'Ocorreu um erro');
        accountPage.getModalMensagem().should('have.text', text);
    });
});

Then('visualizarei os alertas {string} e {string}', function (text1, text2) {
    accountPage.alerta(0, text1);
    accountPage.alerta(1, text2);
});

Then("o usuário deve ser do tipo Crítico", function () {
    accountPage.getTipoUsuario().invoke('val').should('equal', '2');
    accountPage.getUserCritico().invoke('text').should('equal', 'Crítico(a)');
});

Then("o usuário deve ser do tipo Administrador", function () {
    accountPage.getTipoUsuario().invoke('val').should('equal', '1');
    accountPage.getUserAdmin().invoke('text').should('equal', 'Administrador');
});
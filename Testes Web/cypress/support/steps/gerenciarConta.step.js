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

let name;
let email;
let password;
let id;
let type;

Before({ tags: "@criarUsuario" }, () => {
  name = faker.person.firstName();
  email = faker.internet.email().toLowerCase();
  password = faker.internet.password(6);

  cy.visit("/login");
  cy.criarUsuario(name, email, password).then((response) => {
    id = response.body.id;
    type = response.body.type;

    loginPage.login(email, password);
  });
});

After({ tags: "@deletarUsuario" }, () => {
  cy.loginValido(email, password).then((response) => {
    token = response.body.accessToken;
    cy.promoverAdmin(token);
    cy.excluirUsuario(id, token);
  });
});

Given("que entrei no perfil do meu usuário já cadastrado", function () {
  profilePage.clickButtonPerfil();
});

Given("que meu perfil foi promovido a Crítico", function () {
  profilePage.clickButtonLogout();

  cy.loginValido(email, password).then((response) => {
    token = response.body.accessToken;
    cy.promoverCritico(token);
  });
});

Given("que meu perfil foi promovido a Administrador", function () {
  profilePage.clickButtonLogout();

  cy.loginValido(email, password).then((response) => {
    token = response.body.accessToken;
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
  cy.visit("/account");
});

When("habilitar a alteração de senha", function () {
  accountPage.clickButtonAlterarSenha();
});

When("alterar a senha", function () {
  accountPage.typeSenha("ABCDEFG");
  accountPage.typeConfirmarSenha("ABCDEFG");
});

When("clicar no botão de cancelar", function () {
  accountPage.clickButtonCancelar();
});

When("informar um novo nome {string}", function (nome) {
  accountPage.limparNome();
  accountPage.typeNome(nome);
  cy.wrap(nome).as("novoNome");
});

When("confirmar a operação", function () {
  cy.intercept("PUT", "api/users/" + id).as("updateUser");
  accountPage.clickButtonSalvar();
});

When("informar uma senha {string}", function (senha) {
  accountPage.typeSenha(senha);
  accountPage.typeConfirmarSenha(senha);
  cy.wrap(senha).as("novaSenha");
});

When("informar um novo nome, uma nova senha e confirmá-la", function () {
  accountPage.atualizar("Nome Atualizado", "novaSenha");
  cy.wrap("Nome Atualizado").as("novoNome");
});

When("informar uma senha {string} diferente da confirmação {string}", function (senha, confirmação) {
  accountPage.typeSenha(senha);
  accountPage.typeConfirmarSenha(confirmação);
});

When("informar espaços em branco na senha", function () {
  accountPage.typeSenha("       ");
  accountPage.typeConfirmarSenha("       ");
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
  accountPage.typeNome(" ");
});

When("fizer login novamente e acessar a opção Gerenciar Conta", function () {
  cy.visit("/login");
  loginPage.login(email, password);
  profilePage.clickButtonPerfil();
  profilePage.clickButtonGerenciar();
});

Then("as iniciais, nome e email do usuário devem estar visíveis", function () {
  profilePage.getIniciais().should("be.visible");
  profilePage.getUserInfo().invoke("text").should("contain", name);
  profilePage.getUserInfo().invoke("text").should("contain", email);
});

Then("o nome e email do usuário devem estar visíveis", function () {
  accountPage.getNome().invoke("val").should("equal", name);
  accountPage.getEmail().invoke("val").should("equal", email);
});

Then("o usuário deve ser do tipo Comum", function () {
  accountPage.getTipoUsuario().invoke("val").should("equal", `${type}`);
  accountPage.getUserComum().invoke("text").should("equal", "Comum");
});

Then("serei redirecionado para a página de Login automaticamente", function () {
  cy.url().should("equal", loginPage.URL);
  cy.contains("Login");
  cy.contains("Entre com suas credenciais");
});

Then("a edição no campo E-mail deve estar desabilitada", function () {
  accountPage.getEmail().should("be.disabled");
});

Then("deve estar desabilitada a edição no campo Tipo de usuário", function () {
  accountPage.getTipoUsuario().should("be.disabled");
});

Then("devem estar desabilitados para a edição o campo Senha e Confirmar Senha", function () {
  accountPage.getSenha().should("be.disabled");
  accountPage.getConfirmarSenha().should("be.disabled");
});

Then("a alteração é cancelada", function () {
  accountPage.getSenha().should("be.disabled");
  accountPage.getConfirmarSenha().should("be.disabled");
});

Then("visualizarei a mensagem de sucesso {string}", function (text) {
  cy.wait("@updateUser").then((intercept) => {
    expect(intercept.response.statusCode).to.equal(200);
    accountPage.getModalTitulo().should("have.text", "Sucesso");
    accountPage.getModalMensagem().should("have.text", text);
  });
});

Then("verificarei meu nome alterado na tela", function () {
  accountPage.clickButtonOk();
  cy.get("@novoNome").then((nome) => {
    accountPage.getNome().invoke("val").should("equal", nome);
  });
});

Then("é possível fazer login com a nova senha", function () {
  profilePage.clickButtonPerfil();
  profilePage.clickButtonLogout();
  cy.visit("/login");

  cy.get("@novaSenha").then((senha) => {
    loginPage.login(email, senha);
  });

  profilePage.clickButtonPerfil();
  profilePage.getUserInfo().invoke("text").should("contain", name);
  profilePage.getUserInfo().invoke("text").should("contain", email);
});

Then("visualizarei o alerta {string}", function (text) {
  accountPage.alerta(0, text);
});

Then("visualizarei a mensagem de erro {string}", function (text) {
  cy.wait("@updateUser").then((intercept) => {
    expect(intercept.response.statusCode).to.equal(400);
    accountPage.getModalTitulo().should("have.text", "Ocorreu um erro");
    accountPage.getModalMensagem().should("have.text", text);
  });
});

Then("visualizarei os alertas {string} e {string}", function (text1, text2) {
  accountPage.alerta(0, text1);
  accountPage.alerta(1, text2);
});

Then("o usuário deve ser do tipo Crítico", function () {
  accountPage.getTipoUsuario().invoke("val").should("equal", "2");
  accountPage.getUserCritico().invoke("text").should("equal", "Crítico(a)");
});

Then("o usuário deve ser do tipo Administrador", function () {
  accountPage.getTipoUsuario().invoke("val").should("equal", "1");
  accountPage.getUserAdmin().invoke("text").should("equal", "Administrador");
});

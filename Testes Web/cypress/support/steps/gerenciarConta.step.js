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

Before({ tags: "" }, () => {
    const name = faker.person.firstName();
    const email = faker.internet.email();
    
    cy.visit('/register');
    createUser.cadastrar(name, email, '123456');
});

Given("que entrei no perfil do meu usuário já cadastrado", function () {
    profilePage.clickButtonPerfil();
});

Given("que acessei a funcionalidade de gerenciamento de contas", function () {
    profilePage.clickButtonGerenciar();
});



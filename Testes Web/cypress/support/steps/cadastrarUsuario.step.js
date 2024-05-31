import {
  Given,
  When,
  Then,
  Before,
  After,
} from "@badeball/cypress-cucumber-preprocessor";
import CreateUser from "../pages/cadastrarUsuario.page";
const createUser = new CreateUser();

import { faker } from "@faker-js/faker";

let userid;
let tokenid;
let email;
let password;

Before({ tags: "@createUser" }, () => {
  cy.fixture("usuario.json").then((newuser) => {
    cy.request({
      method: "POST",
      url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users",
      body: newuser.novoUsuario,
    }).then((response) => {
      userid = response.body.id;
    });
  });
});

After({ tags: "@deleteUser" }, () => {
  cy.fixture("usuario.json").then(function (dadosUsuario) {
    cy.loginValido(email, password).then(function (response) {
      tokenid = response.body.accessToken;
      cy.promoverAdmin(tokenid);
      cy.excluirUsuario(userid, tokenid);
    });
  });
});

Given("que acessei a funcionalidade de cadastro", function () {
  cy.visit("/register");
});

When("informo um nome {string}", (name) => {
  createUser.typeName(name);
});

When("informo um email inválido {string}", (email) => {
  createUser.typeEmail(email);
});

When("informo um email com 5 caracteres", () => {
  email = "a@c.l";
  createUser.typeEmail(email);
});

When("informo um email com 60 caracteres", () => {
  email = faker.random.alpha({ count: 48 }) + "@dominio.com";
  createUser.typeEmail(email);
});

When("informo um email válido com letras maiúsculas", () => {
  email = "EMAILVALIDO50@DOMINIO.COM";
  createUser.typeEmail(email);
});

When("informo uma senha {string}", (password) => {
  createUser.typePassword(password);
});

When("confirmo a senha {string}", (password) => {
  createUser.typeConfirmPassword(password);
});

When("informo um nome inválido {string}", (name) => {
  createUser.typeName(name);
});

When("visualizo a pagina de criação", () => {});

When("informo um nome válido", () => {
  const name = faker.person.firstName();
  createUser.typeName(name);
});

When("informo um email válido", () => {
  email = faker.internet.email();
  createUser.typeEmail(email);
});

When("informo um nome com mais de 100 caracteres", () => {
  const name101 = faker.random.alpha({ count: 101 });
  createUser.typeName(name101);
});

When('informo um nome com 100 caracteres', () => {
  const name100 = faker.random.alpha({ count: 100 });
  createUser.typeName(name100);
})

When("informo uma senha válida", () => {
  password = "123456";
  createUser.typePassword(password);
  cy.wrap(password).as("confirmPassword");
});

When("informo uma senha com 6 caracteres", () => {
  password = "a!@#5ç";
  createUser.typePassword(password);
  cy.wrap(password).as("confirmPassword");
});

When("informo uma senha com 12 caracteres", () => {
  password = "123456123456";
  createUser.typePassword(password);
  cy.wrap(password).as("confirmPassword");
});

When("confirmo a senha", () => {
  cy.get("@confirmPassword").then((confirmPassword) => {
    createUser.typeConfirmPassword(confirmPassword);
  });
});

When("clico para cadastrar", () => {
  cy.intercept(
    "POST",
    "https://raromdb-3c39614e42d4.herokuapp.com/api/users"
  ).as("criar");
  createUser.clickButtomSubmit();
});

When("informo dados válidos com e-mail já cadastrado", () => {
  cy.fixture("usuario.json").then((dadosUsuario) => {
    email = dadosUsuario.novoUsuario.email;
    password = dadosUsuario.novoUsuario.password;
    createUser.typeName(dadosUsuario.novoUsuario.name);
    createUser.typeEmail(email);
    createUser.typePassword(password);
    createUser.typeConfirmPassword(password);
  });
});

Then("o usuário não é criado", () => {
  cy.wait("@criar")
    .its("response")
    .then((response) => {
      expect(response.statusCode).to.eq(409)
      cy.get(createUser.modalSucess).contains("Falha no cadastro.")
      cy.get(createUser.modalRegistration).contains("E-mail já cadastrado. Utilize outro e-mail")
    });
});

Then('um usuário do tipo comum será gerado', () => {
  cy.wait('@criar').its('response')
      .then((response) => {
          expect(response.body.type).to.eq(0)
          expect(response.body.active).to.eq(true)
          cy.get(createUser.modalSucess).contains('Sucesso')
          cy.get(createUser.modalRegistration).contains('Cadastro realizado!')
          userid = response.body.id;
      })
})

Then("os inputs estão habilitados e instruções visíveis", () => {
  cy.get(createUser.title).should('have.text', "Cadastre-se").should('be.visible');
  cy.get(createUser.span).should('have.text', "Crie uma conta para poder acessar Raromdb.").should('be.visible');
  cy.get(createUser.labelName).should('have.text', "Nome:").should('be.visible');
  cy.get(createUser.inputName).should('be.enabled')
  cy.get(createUser.labelEmail).should('have.text', "E-mail:").should('be.visible');
  cy.get(createUser.inputEmail).should('be.enabled')
  cy.get(createUser.labelPassword).should('have.text', "Senha:").should('be.visible');
  cy.get(createUser.inputPassword).should('be.enabled')
  cy.get(createUser.labelConfirmPassword).should('have.text', "Confirmar senha:").should('be.visible');
  cy.get(createUser.inputConfirmPassword).should('be.enabled')
  cy.get(createUser.buttomSubmit).should('be.enabled').should('have.text', "Cadastrar")
});

Then("retorna mensagem informando o limite de caracteres", () => {
  cy.get(createUser.spanName).contains("O nome deve ter no máximo 100 dígitos.");
});

Then("retorna mensagem informando que o nome deve ser preenchido", () => {
  cy.get(createUser.spanName).contains("Informe o nome.");
});

Then("retornará erro no formulário {string}", (mensagem) => {
  if (createUser.spanPassword > 0) {
    cy.get(createUser.spanPassword).contains(mensagem);
  } else {
    cy.get(createUser.spanConfirmPassword).contains(mensagem);
  }
});

Then("retorna mensagem informando que o email deve ser preenchido", () => {
  cy.get(createUser.spanEmail).contains("Informe o e-mail.");
});

Then("retornará mensagem de email inválido {string}", (mensagem) => {
  cy.get(createUser.spanEmail).contains(mensagem);
});

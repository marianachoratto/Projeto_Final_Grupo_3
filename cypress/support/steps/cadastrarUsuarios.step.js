import {
  Given,
  When,
  Then,
  After,
} from "@badeball/cypress-cucumber-preprocessor";

Given("que acessei a funcionalidade de cadastro", function () {
  cy.visit("/");
});

When("Quando informo um nome válido", function () {
  cy.log(oi);
});

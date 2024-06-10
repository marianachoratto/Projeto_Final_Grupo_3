import {
    Given,
    When,
    Then,
    Before,
    After,
} from "@badeball/cypress-cucumber-preprocessor";

import listagemDeFilmes from "../pages/listagemDeFilmes.page";

const pageLista = new listagemDeFilmes

Given("que entrei na pagina inical", () => {
    cy.visit('');
    
});

Then('é possivel ver a lista de filmes cadastrados', () => {
    cy.visit('');
    
});
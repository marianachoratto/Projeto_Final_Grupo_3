// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('excluirUsuario', (userid, tokenid) => {
    cy.request({
        method: 'DELETE',
        url: '/api/users/' + userid,
        headers: {
            Authorization: `Bearer ${tokenid}`
        }
    })
});

Cypress.Commands.add('loginValido', (email, password) => {
    cy.request({
        method: "POST",
        url: '/api/auth/login',
        body: {
            email: email,
            password: password
        },
    })
})

Cypress.Commands.add("promoverAdmin", (tokenid) => {
    cy.request({
        method: "PATCH",
        url: '/api/users/admin',
        headers: {
            Authorization: `Bearer ${tokenid}`,
        },
    });
});
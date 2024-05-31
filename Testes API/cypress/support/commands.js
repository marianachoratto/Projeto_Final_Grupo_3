const { faker } = require('@faker-js/faker')

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

Cypress.Commands.add('criarUsuario', (name, emailValido, password, userid) => {
    cy.request({
        method: 'POST',
        url: '/api/users',
        body: {
            "name": name,
            "email": emailValido,
            "password": password
        }
    })
})
describe('Promoção de usuário', () => {
    let id;
    let token;
    let name
    let email;
    let password;
    beforeEach(() => {
        cy.cadastrarUsuario().then((resposta) => {
            id = resposta.id;
            name = resposta.nome;
            email = resposta.email;
            password = resposta.password;
            cy.loginValido(email, password).then((resposta) => {
                token = resposta.body.accessToken;
            })
        })
    })
    afterEach(() => {
        cy.promoverAdmin(token);
        cy.excluirUsuario(id, token);
    });

    it('É possível promover usuário comum para usuário crítico', () => {
        cy.request({
            method: "PATCH",
            url: "api/users/apply",
            headers: {
                Authorization: `Bearer ${token} `,
            },
        }).then((response) => {
            expect(response.status).to.eq(204)
        });

        cy.request({
            method: "GET",
            url: "api/users/" + id,
            headers: {
                Authorization: `Bearer ${token} `,
            },
        }).then((response) => {
            expect(response.body.id).to.eq(id)
            expect(response.body.name).to.eq(name)
            expect(response.body.email).to.eq(email)
            expect(response.body.type).to.eq(2)
            expect(response.body.active).to.eq(true)
        })
    });

    it('É possível promover usuário comum para usuário admin', () => {
        cy.request({
            method: "PATCH",
            url: "api/users/admin",
            headers: {
                Authorization: `Bearer ${token} `,
            },
        }).then((response) => {
            expect(response.status).to.eq(204)
        });

        cy.request({
            method: "GET",
            url: "api/users/" + id,
            headers: {
                Authorization: `Bearer ${token} `,
            },
        }).then((response) => {
            expect(response.body.id).to.eq(id)
            expect(response.body.name).to.eq(name)
            expect(response.body.email).to.eq(email)
            expect(response.body.type).to.eq(1)
            expect(response.body.active).to.eq(true)
        })
    }); 

    it('É possível promover usuário crítico para usuário admin', () => {
        cy.promoverCritico(token);
        cy.request({
            method: "PATCH",
            url: "api/users/admin",
            headers: {
                Authorization: `Bearer ${token} `,
            },
        }).then((response) => {
            expect(response.status).to.eq(204)
        });

        cy.request({
            method: "GET",
            url: "api/users/" + id,
            headers: {
                Authorization: `Bearer ${token} `,
            },
        }).then((response) => {
            expect(response.body.id).to.eq(id)
            expect(response.body.name).to.eq(name)
            expect(response.body.email).to.eq(email)
            expect(response.body.type).to.eq(1)
            expect(response.body.active).to.eq(true)
        })
    }); 

    it('É possível promover usuário admin para usuário crítico', () => {
        cy.promoverAdmin(token);
        cy.request({
            method: "PATCH",
            url: "api/users/apply",
            headers: {
                Authorization: `Bearer ${token} `,
            },
        }).then((response) => {
            expect(response.status).to.eq(204)
        });

        cy.request({
            method: "GET",
            url: "api/users/" + id,
            headers: {
                Authorization: `Bearer ${token} `,
            },
        }).then((response) => {
            expect(response.body.id).to.eq(id)
            expect(response.body.name).to.eq(name)
            expect(response.body.email).to.eq(email)
            expect(response.body.type).to.eq(2)
            expect(response.body.active).to.eq(true)
        })
    }); 
})


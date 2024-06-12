describe('Cenarios de login', () => {
    let userid, email, password, token

    before('Criando usuário', () => {
        cy.cadastrarUsuario().then((resposta) => {
            userid = resposta.id;
            email = resposta.email;
            password = resposta.password;
        })
    })

    after('Promover usuario', () => {
        cy.promoverAdmin(token);
        cy.excluirUsuario(userid, token)
    })

    it('Realizando login válido', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                "email": email,
                "password": password
              }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.accessToken).to.not.be.empty;
            token = response.body.accessToken;

        })
    })
})
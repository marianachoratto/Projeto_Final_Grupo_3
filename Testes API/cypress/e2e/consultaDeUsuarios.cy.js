import { faker } from "@faker-js/faker";
describe("Teste de consulta de usuarios id/geral", () => {
    let name = "Gabriel";
    let password = "123456";
    let tokenid;
    let userid;
    let emailValido;

    beforeEach(() => {
        emailValido = faker.internet.email().toLocaleLowerCase();

        cy.criarUsuario(name, emailValido, password).then((response) => {
            userid = response.body.id;
            cy.loginValido(emailValido, password).then((response) => {
                tokenid = response.body.accessToken;
            });
        });
    });

    afterEach(() => {
        cy.loginValido(emailValido, password).then((response) => {
            tokenid = response.body.accessToken;
            cy.promoverAdmin(tokenid);
            cy.excluirUsuario(userid, tokenid);
        });
    });

    it('Usuarios comuns nao podem consultar os usuarios',()=>{
        cy.request({
            Method: 'GET',
            url: "/api/users",
            auth: {
                bearer: tokenid,
              },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
          });

    });
    it('Usuarios criticos nao podem consultar os usuarios',()=>{
        cy.promoverCritico(tokenid)
        cy.request({
            Method: 'GET',
            url: "/api/users",
            auth: {
                bearer: tokenid,
              },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(403);
          });

    });
    it('Apenas Usuarios ADMIN podem consultar os usuarios', () => {
        cy.promoverAdmin(tokenid)
        cy.request({
            Method: 'GET',
            url: "/api/users",
            auth: {
                bearer: tokenid,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0]).to.have.property("id");
            expect(response.body[0]).to.have.property("name");
            expect(response.body[0]).to.have.property("email");
            expect(response.body[0]).to.have.property("type");
            expect(response.body[0]).to.have.property("active");
           
        });

    });

})
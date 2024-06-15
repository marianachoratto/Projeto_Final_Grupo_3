import {
    Given,
    When,
    Then,
    Before,
    After,
} from "@badeball/cypress-cucumber-preprocessor";

import { faker } from "@faker-js/faker";
import LoginPage from "../pages/login.page";


let name = "Monky Flip";
let email = faker.internet.email();
let password = "123456";
const pageLogin = new LoginPage


Before({ tags: "@createUser" }, () => {

    cy.criarUsuario(name, email, password).then((response) => {
        userid = response.body.id;
    });
});

After({ tags: "@deleteUser" }, () => {
    cy.fixture("usuario_alt.json").then(() => {
        cy.loginValido(email, password).then((response) => {
            tokenid = response.body.accessToken;
            cy.promoverAdmin(tokenid);
            cy.excluirUsuario(userid, tokenid);
        });
    });
});

Given('que acessei a página de login', ()=>{
    cy.visit('/login')
});


Then('posso ver o formulário de login', ()=>{
    pageLogin.campoEmail();
    pageLogin.campoSenha();
});

When('coloco os dados do usuário nos inputs de login e senha',()=>{
    pageLogin.typeEmail(email);
    pageLogin.typeSenha(password);
});

When('confirmo a operação',()=>{
    pageLogin.clickButtonLogin();
});

Then('o login deve ser realizado com sucesso',()=>{
    pageLogin.Perfil();
});
When('não coloco o email',()=>{
    pageLogin.campoEmail();
});
When('coloco a senha',()=>{
    pageLogin.typeSenha(password)
});

Then('deve aparecer uma mensagem abaixo do input email dizendo "Informe o e-mail"',()=>{
    pageLogin.ErroEmail()
});
When('não coloco a senha',()=>{
    pageLogin.campoSenha();
});
When('coloco o email',()=>{
    pageLogin.typeEmail(email)
});

Then('deve aparecer uma mensagem abaixo do input senha dizendo "Informe a senha"',()=>{
    pageLogin.ErroSenha()
});

When('coloco o email errado',()=>{
    pageLogin.typeEmail('ppppp@')
});

When('deve aparecer uma mensagem informando que o email precisa estar no padrão',()=>{
    pageLogin.ErroEmail1()
});
When('coloco a senha errada',()=>{
    pageLogin.typeSenha('123')
});
When('deve aparecer uma mensagem informando falha ao autenticar',()=>{
    pageLogin.caixaDeErro();
    pageLogin.okFalha();
})
When('o login é realizado com sucesso',()=>{
    pageLogin.Filmes();
    pageLogin.Perfil();

});
Then('a sessão dura 60 minutos',()=>{
    cy.clock();  
    cy.tick(3800000);
    cy.intercept("PUT","https://raromdb-3c39614e42d4.herokuapp.com/api/users/" + userid,{
        statusCode: 401,
        body:{
            message: "Access denied.",
            error: "Unauthorized",
            statusCode:401
        }
    }).as('expirado') 
});
Then('nao é possivel fazer requisiçoes',()=>{
    cy.visit('/account');
    pageLogin.Salvar();
    cy.wait('@expirado').then(()=>{
        pageLogin.caixaDeErro1();
    });
})


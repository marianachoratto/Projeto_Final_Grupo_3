// chamar o commands cy.nomedocomnd
// cy.cadastrarUsuario()

import {Given,When,Then, Before,After } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from '../pages/login.page';
import { faker } from "@faker-js/faker";

const loginPage = new LoginPage();

let email 
let password
let idNovoUsuario
let nome

After({ tags: '@deletarUsuario'}, () => {
  cy.deletarUsuario(email, password, idNovoUsuario)

})

Given('que acessei a página de login', () => {
    cy.visit('https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login');
});

Then('vejo o formulário de login visível e habilitado', () => {
    cy.get(loginPage.inputEmail).should('be.visible');
    cy.get(loginPage.inputSenha).should('be.visible');
    cy.get(loginPage.buttonLogin).should('be.enabled')
});
Given('tenho acesso aos dados de um usuário cadastrado', () => {
      cy.intercept("POST", "api/auth/login").as("logar");
      cy.cadastrarUsuario().then(function (resposta) {
        idNovoUsuario = resposta.id;
      //  nome = resposta.nome;
        email = resposta.email;
        password = resposta.password;
      });
    }
  );
When('coloco os dados do usuário nos inputs de login e senha', () => {
    cy.get(loginPage.inputEmail).type(email)
    cy.get(loginPage.inputSenha).type(password);
   
  });

When('confirmo a operação', () => {
    loginPage.clickButtonLogin();
  });
  
Then('o login deve ser realizado com sucesso', () => {
    cy.url().should('equal', 'https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/');
  });

Then('Não deve ser possível logar sem adicionar email', () => {
    
}); 

When('coloco a senha', () => {
  cy.get(loginPage.inputSenha).type(password);

})

Then('deve aparecer uma mensagem abaixo do input email dizendo {string}', (email) => {
  cy.contains(email)

})

When('não coloco o email', () => {

})

When('coloco o email', () => {
  cy.get(loginPage.inputEmail).type(email)

})

When('não coloco a senha', () => {

})

Then('deve aparecer uma mensagem abaixo do input senha dizendo {string}', (senha) => {
  cy.contains(senha)

})

When('coloco o email errado', () => {
  cy.get(loginPage.inputEmail).type('grasy@gmail')
})

Then('deve aparecer uma mensagem informando falha ao autenticar', () => {
  cy.contains('Informe um e-mail válido.')
})

When('coloco a senha errada', () => {
  cy.get(loginPage.inputSenha).type('111111')
})

Then('deve aparecer uma mensagem de alerta informando falha ao autenticar', () => {
  cy.contains('Falha ao autenticar')
  cy.contains('Usuário ou senha inválidos.')
})

Given('tenho acesso aos dados de um usuário cadastrado com email em letra maiúscula', () => {
  cy.cadastrarUsuario().then((resposta) => {
    email = resposta.email.toUpperCase()
    password = resposta.password
    idNovoUsuario = resposta.id

    
  })
   
})

When('coloco o email em letras maiúsculas', () => {
  cy.get(loginPage.inputEmail).type(email)
 
})

When('faço um login com senha ou email incorretos', () => {
  cy.get(loginPage.inputEmail).type('grasy@gmail.com')
  cy.get(loginPage.inputSenha).type(password);
  loginPage.clickButtonLogin();
  cy.wait('@logar')
  
})

Then('deve aparecer uma mensagem dizendo falha ao autenticar', () => {
  cy.contains('Falha ao autenticar')
  cy.contains('Usuário ou senha inválidos.')
})

When('clico no botão de Ok', () => {
  cy.get(loginPage.buttonOkFaha).eq(2).click()
    
})

Then("a janela de alerta fecha", () => {
  cy.get(loginPage.janelaFalha).should('not.exist')
  
});

//Then('o usuário deve permanecer logado por 60 minutos', function () {
  
 // cy.clock(); // Congela o relógio do navegador
//  cy.get(loginPage.inputEmail).type(email)
 //   cy.get(loginPage.inputSenha).type(password);; // Assegura que o usuário esteja logado
 // cy.tick(3600000); // Avança 60 minutos (3600000 milissegundos)

  // Verifica se o usuário ainda está logado após 60 minutos
 // cy.get('body').should('not.contain', 'session-expired'); // Ajuste o seletor e a verificação conforme necessário
//});

//Then('a sessão do usuário deve expirar após 60 minutos', function () {
  // Simula a passagem de 60 minutos
 // cy.clock(); // Congela o relógio do navegador
 // cy.get(loginPage.inputEmail).type(email)
 // cy.get(loginPage.inputSenha).type(password);; // Assegura que o usuário esteja logado
 // cy.tick(3600000); // Avança 60 minutos (3600000 milissegundos)
//})












    
  
   

  
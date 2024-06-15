*** Settings ***

Resource     ../utils/config.robot

Test Setup    Abrir App
Test Teardown    Teardown


*** Test Cases ***

T001- O usuário não logado pode consultar filmes
    Dado que estou na página inicial do aplicativo
    Quando clico em um filme
    Então tenho acesso às suas informações

T002- O usuário logado pode consultar filmes
    Dado que tenho um usuário comum cadastrado
    Quando faço login
    Então sou redirecionada para a página inicial
    Quando clico em um filme
    Então tenho acesso às suas informações técnicas

T003- O usuario pode ir ate o menu de opções 
    Dado que estou na página inicial 
    Entao posso clicar nos tres traços 
    
T004- O usuario pode ir ate a pagina de filmes
    Dado que estou na página inicial 
    E clico no menu de opções
    E escolho a o opção filmes
    Então consigo ir a tela de filmes

T005- O usuario pode ir ate a pagina de login
    Dado que estou na página inicial 
    E clico no menu de opções
    E escolho a o opção login
    Então consigo ir a tela de login 

T006- O usuario pode ir ate a pagina de registro  
    Dado que estou na página inicial 
    E clico no menu de opções
    E escolho a o opção registro
    Então consigo ir a tela de registro
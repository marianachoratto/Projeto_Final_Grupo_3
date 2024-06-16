*** Settings ***

Resource    ../../base.robot



*** Keywords ***
Caso exista algum filme cadastrado 
    Iniciar sessão na API
    Cadastrar usuario comum na API
    Logar na API
    Virar administrador na API
    Criar filme na API 

Entao posso clicar no ícone de Menu
    Espera o elemento para clicar e checa se está habilitado    ${MENU}
    

E clico no menu de opções
    Espera o elemento para clicar    ${MENU}

E escolho a o opção filmes
    Espera o elemento para clicar    ${BOTAO_FILMES}

Então consigo ir a tela de filmes
   Espera o elemento para clicar e checa se está habilitado    ${CARD_FILME} 

E escolho a o opção login
   Espera o elemento para clicar    ${BOTÃO_LOGIN}

Então consigo ir a tela de login
    Checa se os elementos estão visíveis    ${Logo_Login}

E escolho a o opção de cadastro de usuários
    Espera o elemento para clicar    ${BOTAO_REGISTRO}

Então consigo ir a tela de cadastro
    Checa se os elementos estão visíveis    ${TITULO_CADASTRO}

Dado que estou na página inicial 
    Checa se os elementos estão visíveis    ${TITULO_HOME}
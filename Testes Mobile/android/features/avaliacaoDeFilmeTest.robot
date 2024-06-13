*** Settings ***

Resource     ../utils/config.robot

Test Setup    Abrir App
Test Teardown    Teardown


*** Test Cases ***
T02- Não é possível usuário não autenticado realizar review de filmes
    Dado que tenho um filme cadastrado
    Dado que estou na página inicial do aplicativo
    Quando clico em um filme e no botão de avaliações
    E escrevo um comentário
    Então aparecerá uma mensagem dizendo para fazer login

T03- É possível usuário autenticado realizar review de filmes
    Dado que tenho um filme cadastrado
    Dado que tenho um usuário comum cadastrado
    Quando faço login
    E faço uma review
    Então ela aparece na sessão de avaliações do filme

T04- É possível usuário crítico pode realizar review de filmes
    Dado que tenho um filme cadastrado
    Dado que tenho um usuário crítico cadastrado
    Quando faço login
    E faço uma review
    Então ela aparece na sessão de avaliações do filme

# T06- É possível usuário administrador realizar reviews de filmes

# # Bug 
# T07- É possível fazer review de filme sem digitar texto 

# É possível atualizar review do filme 

# Não é possível digitar uma avaliação contendo mais que 500 caracteres
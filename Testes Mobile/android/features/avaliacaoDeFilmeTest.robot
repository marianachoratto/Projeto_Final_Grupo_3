*** Settings ***

Resource     ../utils/config.robot

Test Setup    Abrir App
Test Teardown    Teardown



*** Test Cases ***
T01- Não é possível usuário não autenticado realizar review de filmes
    Dado que tenho um filme cadastrado
    Dado que estou na página inicial do aplicativo
    Quando clico em um filme e no botão de avaliações
    E escrevo um comentário
    Então aparecerá uma mensagem dizendo para fazer login

T02- É possível usuário autenticado realizar review de filmes
    Dado que tenho um filme cadastrado
    Dado que tenho um usuário comum cadastrado
    Quando faço login
    E faço uma review
    Então ela aparece na sessão de avaliações do filme

T03- É possível usuário crítico pode realizar review de filmes
    Dado que tenho um filme cadastrado
    Dado que tenho um usuário crítico cadastrado
    Quando faço login
    E faço uma review
    Então ela aparece na sessão de avaliações do filme

T04- É possível usuário administrador realizar reviews de filmes
    Dado que tenho um filme cadastrado
    Dado que tenho um usuário administrador cadastrado
    Quando faço login
    E faço uma review
    Então ela aparece na sessão de avaliações do filme

# # Bug: Aparece a mensagem não foi possível adicionar texto 
T05- É possível fazer review de filme sem digitar texto 
    Dado que tenho um filme cadastrado
    Dado que estou na página inicial do aplicativo
    Quando faço login
    Quando clico em um filme e no botão de avaliações
    E dou nota ao filme, mas não escrevo texto
    Então a review aparecerá na lista de avaliações

# Bug 
T06- Não é possível digitar uma avaliação contendo mais que 500 caracteres
    Dado que tenho um filme cadastrado
    Dado que estou na página inicial do aplicativo
    Quando faço login
    Quando clico em um filme e no botão de avaliações
    E digito uma avaliação contendo mais de 500 caracteres
    Então aparece uma mensagem de erro

T07-É possível atualizar review do filme
    Dado que tenho uma review cadastrada
    Quando faço outra review com um texto diferente
    Então a review é atualizada


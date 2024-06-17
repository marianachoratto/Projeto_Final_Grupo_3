*** Settings ***

Resource     ../utils/config.robot

Test Setup    Abrir App
Test Teardown    Teardown


*** Test Cases ***
CT001- É possível consultar detalhes de um filme com usuário crítico
    Dado que tenho um usuário crítico cadastrado
    Quando faço login
    Então sou redirecionada para a página inicial
    Quando clico em um filme
    Então tenho acesso às suas informações técnicas

CT002- É possível consutlar detalhes de um filme como usuário administrador
    Dado que tenho um usuário administrador cadastrado
    Quando faço login
    Então sou redirecionada para a página inicial
    Quando clico em um filme
    Então tenho acesso às suas informações técnicas

CT003- É possível ver as avaliações da audiência e da crítica
    Dado que tenho um filme cadastrado
    Dado que estou na página inicial do aplicativo
    Quando clico em um filme
    Então tenho acesso às avaliações da audiência e crítica

CT004- É possível ver a sessão de avaliações do usuário
    Dado que tenho um filme cadastrado
    Dado que estou na página inicial do aplicativo
    Quando clico em um filme
    Então tenho acesso à sessão de avaliações feita pelos usuários

*** Settings ***

Resource     ../utils/config.robot

Test Setup    Abrir App
Test Teardown    Teardown


*** Test Cases ***
# Tem que sempre criar um filme antes para garantir que o filme existe
T01- O usuário não logado pode consultar filmes
    Dado que estou na página inicial do aplicativo
    Quando clico em um filme
    Então tenho acesso às suas informações

T02- O usuário logado pode consultar filmes
    Dado que tenho um usuário comum cadastrado
    Quando faço login
    Então sou redirecionada para a página inicial
    Quando clico em um filme
    Então tenho acesso às suas informações técnicas 

T03- É possível consultar detalhes de um filme com usuário crítico
    Dado que tenho um usuário crítico cadastrado
    Quando faço login
    Então sou redirecionada para a página inicial
    Quando clico em um filme
    Então tenho acesso às suas informações técnicas

T04- É possível consutlar detalhes de um filme como usuário administrador
    Dado que tenho um usuário administrador cadastrado
    Quando faço login
    Então sou redirecionada para a página inicial
    Quando clico em um filme
    Então tenho acesso às suas informações técnicas

T04- É possível ver as avaliações da audiência e da crítica
    Dado que estou na página inicial do aplicativo
    Quando clico em um filme
    Então tenho acesso às avaliações da audiência e crítica

T05- É possível ver a sessão de avaliações do usuário
    Dado que estou na página inicial do aplicativo
    Quando clico em um filme
    Então tenho acesso à sessão de avaliações feita pelos usuários

# Testes de média? 
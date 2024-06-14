*** Settings ***

Resource     ../utils/config.robot

Test Setup    Abrir App
Test Teardown    Teardown


*** Test Cases ***
T01- O usuário não logado pode consultar filmes
    Dado que tenho um filme cadastrado na API
    Dado que estou na página inicial do aplicativo
    Quando clico em um filme
    Então tenho acesso às suas informações

T02- É possível consultar detalhes de filmes com um usuário logado
    Dado que tenho um filme cadastrado na API
    Dado que tenho um usuário comum cadastrado
    Quando faço login
    Então sou redirecionada para a página inicial
    Quando clico em um filme
    Então tenho acesso às suas informações técnicas 

T03- É possível consultar detalhes de um filme com usuário crítico
    Dado que tenho um filme cadastrado na API
    Dado que tenho um usuário crítico cadastrado
    Quando faço login
    Então sou redirecionada para a página inicial
    Quando clico em um filme
    Então tenho acesso às suas informações técnicas

T04- É possível consutlar detalhes de um filme como usuário administrador
    Dado que tenho um filme cadastrado na API
    Dado que tenho um usuário administrador cadastrado
    Quando faço login
    Então sou redirecionada para a página inicial
    Quando clico em um filme
    Então tenho acesso às suas informações técnicas

T06- O usuário pode ver a data da avaliação, nome, nota e texto de cada filme
    Dado que tenho um filme cadastrado
    Dado que estou na página inicial do aplicativo
    Quando clico em um filme
    Então posso ver ser nome, ano de lançamento, gênero e descrição

T04- É possível ver as avaliações da audiência e da crítica
    Dado que tenho um filme cadastrado
    Dado que estou na página inicial do aplicativo
    Quando clico em um filme
    Então tenho acesso às avaliações da audiência e crítica


# Tentar pegar os detalhes da avaliação
T05- É possível ver a sessão de avaliações do usuário
    Dado que tenho um filme cadastrado na API
    Dado que estou na página inicial do aplicativo
    Quando clico em um filme
    Então tenho acesso à sessão de avaliações feita pelos usuários


# T07- É possível ver a quantidade de avaliações da crítica e da audiência em cada filme
    # Dado que tenho um filme cadastrado
    # Dado que tenho vários usuários cadastrados e cada um faz uma review
    # Então consigo ver a quantidade de avaliações que aquele filme recebeu
#     # Dado que tenho um filme com reviews cadastradas
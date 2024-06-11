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
    Então tenho acesso às suas informações

# T03- É possível consultar detalhes de um filme com usuário crítico

T04- É possível consutlar detalhes de um filme como usuário administrador
    Dado que tenho um usuário administrador cadastrado
    # Quando faço login
    # Então sou redirecionada para a página inicial
    # Quando clico em um filme
    # Então tenho acesso às suas informações 

# T05- Ao dar refresh em filmes é retornada uma lista com todos os filmes

# T06- O score da audiência é a média das reviews de usuários comuns

# T07- O score da crítica é a média das reviews de usuários críticos

# # Bug:
# T08- Avaliações de administradores não devem impactar na média das reviews dos usuários comuns 
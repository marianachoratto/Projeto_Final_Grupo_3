*** Settings ***

Resource     ../utils/config.robot

Test Setup    Abrir App
Test Teardown    Teardown


*** Test Cases ***
T01- O usuário não logado pode consultar filmes
    Dado que estou na página inicial do aplicativo
    Quando clico 

# T02- O usuário logado pode consultar filmes

# T03- É possível consultar detalhes de um filme com usuário crítico

# T04- É possível consutlar detalhes de um filme como usuário administrador

# T05- Ao dar refresh em filmes é retornada uma lista com todos os filmes

# T06- O score da audiência é a média das reviews de usuários comuns

# T07- O score da crítica é a média das reviews de usuários críticos

# # Bug:
# T08- Avaliações de administradores não devem impactar na média das reviews dos usuários comuns 
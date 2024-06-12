*** Settings ***

Resource     ../utils/config.robot

Test Setup    Abrir App
Test Teardown    Teardown


*** Test Cases ***
T02- Não é possível usuário não autenticado realizar review de filmes
    Dado que estou na página inicial do aplicativo
    Quando clico em um filme 

# T03- É possível usuário autenticado realizar review de filmes

# T04- É possível usuário crítico pode realizar review de filmes

# T06- É possível usuário administrador realizar reviews de filmes

# # Bug 
# T07- É possível fazer review de filme sem digitar texto 
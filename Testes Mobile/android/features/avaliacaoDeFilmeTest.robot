*** Settings ***

Resource     ../utils/config.robot

Test Setup    Abrir App
Test Teardown    Teardown


*** Test Cases ***
# T01- O usuário pode ver informações sobre o filme ao clicá-lo
    
# T02- Não é possível usuário não autenticado realizar review de filmes 

# T03- É possível usuário autenticado realizar review de filmes

# T04- É possível usuário crítico pode realizar review de filmes

# T06- É possível usuário administrador realizar reviews de filmes

# # Bug 
# T07- É possível fazer review de filme sem digitar texto 
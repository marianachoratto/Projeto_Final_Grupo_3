*** Settings ***

Resource     ../utils/config.robot

Test Setup    Abrir App
Test Teardown    Teardown


*** Test Cases ***

CT0001-Deve ser possivel ver a lista de filmes 
    Apos o app abrir podemos ver todos os filmes disponiveis 
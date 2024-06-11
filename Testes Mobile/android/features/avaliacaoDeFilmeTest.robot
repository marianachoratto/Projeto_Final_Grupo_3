*** Settings ***

Resource     ../utils/config.robot

Test Setup    Abrir App
Test Teardown    Teardown


*** Test Cases ***
T01- O usuário pode ver informações sobre o filme ao clicá-lo
    Log To Console    oi
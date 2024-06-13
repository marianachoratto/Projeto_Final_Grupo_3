*** Settings ***

Resource   ../../base.robot

*** Keywords ***
Espera o elemento para clicar
    [Arguments]    ${elemento}
    Wait Until Element Is Visible    ${elemento}
    Click Element                    ${elemento}

Espera o elemento para clicar e checa se está habilitado
    [Arguments]    ${elemento}
    Wait Until Element Is Visible    ${elemento}
    Element Should Be Enabled    ${elemento}
    Click Element                    ${elemento}

Espera o elemento para fazer o inputtext
    [Arguments]    ${elemento}    ${texto}
    Wait Until Element Is Visible    ${elemento}
    Input Text                       ${elemento}    ${texto}

Pega o atributo do elemento e verifica se tem o texto esperado
    [Arguments]    ${elemento}    ${frase}    ${atributo}
    Wait Until Page Contains Element    ${elemento}
    ${variavel}=    AppiumLibrary.Get Element Attribute    ${elemento}    ${atributo}
    Should Contain    ${variavel}    ${frase}


Checa se os elementos estão presentes na página
    [Arguments]    @{ELEMENTOS}
    FOR    ${elemento}    IN    @{ELEMENTOS}
        Page Should Contain Element    ${elemento}
    END

Checa se os elementos estão visíveis
    [Arguments]    @{ELEMENTOS}
    FOR    ${elemento}    IN    @{ELEMENTOS}
        Element Should Be Visible    ${elemento}
    END

Checa se os elementos estão habilitados
    [Arguments]    @{ELEMENTOS}
    FOR    ${elemento}    IN    @{ELEMENTOS}
        Element Should Be Enabled    ${elemento}
    END

Deletar usuário e filme
    Virar administrador na API
    Deletar filme na API
    Deletar usuário na API
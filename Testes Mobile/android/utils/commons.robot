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
    Espera o elemento para clicar    ${elemento} 
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

Checa se os elementos estão visíveis e habilitados
    [Arguments]    @{ELEMENTOS}
    FOR    ${elemento}    IN    @{ELEMENTOS}
        Element Should Be Visible    ${elemento}
        Element Should Be Enabled    ${elemento}
    END

Espera o elemento e verifica o texto
    [Arguments]    ${elemento}    ${texto}
    Wait Until Page Contains Element    ${elemento}
    Page Should Contain Text    ${texto}

Utilizar Email ja cadastrado
    ${nomeFaker}=     FakerLibrary.Name
    ${senhaFaker}=    FakerLibrary.Password
    Espera o elemento para fazer o inputtext    ${INPUT_NOME}               ${nomeFaker}    
    Espera o elemento para fazer o inputtext    ${INPUT_EMAIL}              ${userEmailAPI}
    Espera o elemento para fazer o inputtext    ${INPUT_SENHA}              ${senhaFaker}    
    Espera o elemento para fazer o inputtext    ${INPUT_CONFIRMAR_SENHA}    ${senhaFaker} 

Espera e informa o valor do nome no input de cadastro
    ${nomeFaker}=     FakerLibrary.Name 
    Espera o elemento para fazer o inputtext    ${INPUT_NOME}               ${nomeFaker}

Espera e informa o valor do email no input de cadastro
    ${emailFaker}=    FakerLibrary.Email
    Espera o elemento para fazer o inputtext    ${INPUT_EMAIL}              ${emailFaker}

Espera e informa o valor da senha no input de cadastro 
    ${senhaFaker}=    FakerLibrary.Password   
    Espera o elemento para fazer o inputtext    ${INPUT_SENHA}              ${senhaFaker}    
    Espera o elemento para fazer o inputtext    ${INPUT_CONFIRMAR_SENHA}    ${senhaFaker} 

Valida nome de usuarios
    [Arguments]    @{nomes}
    @{nomes_de_usuarios}=    Create List
    FOR    ${nome}    IN    @{nomes}
        Append To List    ${nomes_de_usuarios}    ${nome}
    END

    ${elementos}=    Create List    ${INPUT_NOME}
    ${len_nomes}=    Get Length    ${nomes_de_usuarios}
    FOR    ${i}    IN RANGE    ${len_nomes}
        ${nome}=    Set Variable    ${nomes_de_usuarios}[${i}]
        ${elemento}=    Set Variable    ${elementos}[0]
        Espera o elemento para fazer o inputtext    ${elemento}    ${nome}
        Espera e informa o valor do email no input de cadastro
        Espera e informa o valor da senha no input de cadastro  
        Espera o elemento para clicar    ${BOTÃO_REGISTRAR_NOVO}
        Espera o elemento e verifica o texto    ${CADASTRO_SUCESSO}    "Cadastro realizado!"
        
        Run Keyword If    ${i} < ${len_nomes}-1    Espera o elemento para clicar    ${MENU}
        Run Keyword If    ${i} < ${len_nomes}-1    Espera o elemento para clicar    ${BOTÃO_REGISTRAR}
    END

Swipe para cima
    [Arguments]    ${start_x}=30    ${start_y}=30    ${end_x}=80    ${end_y}=15    
    Swipe By Percent    ${start_x}    ${start_y}    ${end_x}    ${end_y}  

  
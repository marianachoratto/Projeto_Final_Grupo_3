*** Settings ***
Resource    ../../base.robot
Library    OperatingSystem
Library    Collections
Library    String

*** Variables ***
${EMAIL_PROCURADO}    AAXIMPLIANLALEXANDERTHEE8DTCONQUARROFPLLLANPSANL@HOTMAIL.COM

*** Keywords ***
Login API com Token 
    Criar usuário API
    ${headers}=    Create Dictionary    accept=application/json    Content-Type=application/json    
    Create Session    alias=api    url=https://raromdb-3c39614e42d4.herokuapp.com/    headers=${headers}
    ${body}=    Create Dictionary    email=${userEmailAPI}    password=${senhaUserAPI}  
    ${response}    POST On Session    api    api/auth/login    json=${body}
    Set Local Variable    ${loginRealizado}    ${response.json()}
    Set Global Variable    ${token}    ${loginRealizado['accessToken']}
    RETURN    ${loginRealizado}
    
    
Criar usuário API
    ${headers}=    Create Dictionary    accept=application/json    Content-Type=application/json  
    ${userEmailAPI}=    Fakerlibrary.Email
    Set Global Variable    ${userEmailAPI}
    Set Global Variable    ${senhaUserAPI}    123456
    ${userNomeAPI}=    FakerLibrary.Name
    ${body}=    Create Dictionary    name=${userNomeAPI}   email=${userEmailAPI}    password=${senhaUserAPI}
    Create Session    alias=api    url=https://raromdb-3c39614e42d4.herokuapp.com/    headers=${headers}
    ${resposta}    POST On Session    alias=api    url=/api/users    json=${body}
    Set Local Variable    ${cadastroRealizado}    ${resposta.json()}
    Set To Dictionary    ${cadastroRealizado}    password=${senhaUserAPI}
    RETURN    ${cadastroRealizado}

Promover usuário para admin
    Login API com Token
    ${headers}=    Create Dictionary    accept=application/json    Content-Type=application/json    Authorization=Bearer ${token}
    ${resposta}    PATCH On Session    alias=api    url=/api/users/admin    headers=${headers}

Buscar ID do usuario criado
    # [Arguments]    ${emailProcurado}
    Promover usuário para admin
    ${headers}=    Create Dictionary    accept=application/json    Content-Type=application/json    Authorization=Bearer ${token}
    ${resposta}=    Get Users    ${headers}
    ${listarUsuarios}=    Set Variable    ${resposta.json()}
    ${email_minusculo}=     Convert To Lower Case    ${EMAIL_PROCURADO}
    ${user_id}=    Get User ID By Email    ${listarUsuarios}    ${email_minusculo}
    Log    User ID encontrado: ${user_id}
    RETURN    ${user_id}

Get Users
    [Arguments]    ${headers}
    ${resposta}=    GET On Session    alias=api    url=https://raromdb-3c39614e42d4.herokuapp.com/api/users    headers=${headers}
    RETURN    ${resposta}

Get User ID By Email
    [Arguments]    ${users}    ${email_procurado}
    ${user_id}=    Set Variable    None
    FOR    ${user}    IN    @{users}
        IF    '${user["email"]}' == '${email_procurado}'
            ${user_id}=    Set Variable    ${user["id"]}
            Exit For Loop
        END
    END
    Should Not Be Equal    ${user_id}    None    Usuário com o email ${email_procurado} não encontrado.
    Set Global Variable    ${user_id}
    RETURN    ${user_id}

Deletar usuario
    Promover usuário para admin
    Login API com Token  
    Buscar ID do usuario criado
    ${headers}=    Create Dictionary    accept=application/json    Content-Type=application/json    Authorization=Bearer ${token}
    ${resposta}    DELETE On Session    alias=api    url=/api/users/${user_id}    headers=${headers}
    RETURN    ${resposta}
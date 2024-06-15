*** Settings ***
Resource    ../../base.robot
Library    OperatingSystem
Library    Collections

*** Variables ***


*** Keywords ***
Login API
    ${headers}=    Create Dictionary    accept=application/json    Content-Type=application/json    
    Create Session    alias=api    url=https://raromdb-3c39614e42d4.herokuapp.com/    headers=${headers}

Login API com Token 
    [Arguments]    ${token}
    ${headers}=    Create Dictionary    accept=application/json    Content-Type=application/json    Authorization=Bearer ${token}
    Create Session    alias=api    url=https://raromdb-3c39614e42d4.herokuapp.com/    headers=${headers}

Criar usuário API
    ${userEmailAPI}=    Fakerlibrary.Email
    Set Global Variable    ${userEmailAPI}
    Set Local Variable    ${senhaUserAPI}    @Senha56
    ${userNomeAPI}=    FakerLibrary.Name
    ${body}=    Create Dictionary    name=${userNomeAPI}   email=${userEmailAPI}    password=${senhaUserAPI}
    Login API
    ${resposta}    POST On Session    alias=api    url=/api/users    json=${body}
    Set Local Variable    ${cadastroRealizado}    ${resposta.json()}
    Set To Dictionary    ${cadastroRealizado}    password=${senhaUserAPI}
    RETURN    ${cadastroRealizado}

Promover usuário para admin
    [Arguments]    ${token}
    Login API com Token   ${token}
    PATCH On Session    alias=api    url=/api/users/admin

Deletar usuário
    [Arguments]    ${usuario}    ${token}
    Promover usuário para admin   ${token}
    Login API com Token    ${token}
    ${resposta}    DELETE On Session    alias=api    url=/api/movies/${usuario}[id]
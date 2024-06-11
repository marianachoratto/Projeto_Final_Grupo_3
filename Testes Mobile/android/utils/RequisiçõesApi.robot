*** Settings ***

Resource    ../../base.robot
Library    Collections

*** Variables ***
${URL_API}    https://raromdb-3c39614e42d4.herokuapp.com


*** Keywords ***
Iniciar sessão na API
    Create Session    alias=API_raromd    url=${URL_API}    

Cadastrar usuario comum na API
    ${name_fake}    FakerLibrary.Name
    ${emailfake}    FakerLibrary.Email
    ${body}    Create Dictionary    name=${name_fake}    email=${emailfake}    password=123456
    ${RESPONSE}    POST On Session    alias=API_raromd    url=/api/users    json=${body}
    ${email}    Set Variable    ${RESPONSE.json()['email']}    
    Set Global Variable    ${email}

Logar na API
    ${body}    Create Dictionary    email=${email}    password=123456
    ${RESPONSE}    POST On Session    alias=API_raromd    url=/api/auth/login    json=${body}
    ${token}    Set Variable    ${RESPONSE.json()['accessToken']}    
    Set Global Variable    ${token}

Virar administrador na API
    ${body}    Create Dictionary    accessToken=${token}
    ${RESPONSE}    PATCH On Session    alias=API_raromd    url=/api/users/admin    json=${body}
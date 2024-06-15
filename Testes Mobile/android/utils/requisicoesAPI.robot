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
    ${id}    Set Variable    ${RESPONSE.json()['id']}
    Set Global Variable    ${id}

Logar na API
    ${body}    Create Dictionary    email=${email}    password=123456
    ${RESPONSE}    POST On Session    alias=API_raromd    url=/api/auth/login    json=${body}
    ${token}    Set Variable    ${RESPONSE.json()['accessToken']}    
    Set Global Variable    ${token}

Virar administrador na API
    ${headers}=    Create Dictionary    Authorization=Bearer ${token}
    ${RESPONSE}    PATCH On Session    alias=API_raromd    url=/api/users/admin    headers=${headers}

Virar usuário crítico na API
    ${headers}=    Create Dictionary    Authorization=Bearer ${token}
    ${RESPONSE}    PATCH On Session    alias=API_raromd    url=/api/users/apply    headers=${headers}

Deletar usuário na API
    ${headers}=    Create Dictionary    Authorization=Bearer ${token}
    ${RESPONSE}    DELETE On Session    alias=API_raromd    url=/api/users/${id}    headers=${headers}

Criar filme na API
    ${headers}=    Create Dictionary    Authorization=Bearer ${token}
    ${durationInMinutes}=    Convert To Integer    117
    ${releaseYear}=    Convert To Integer    1979
    ${body}    Create Dictionary    title=Alien   genre=Terror    description=Alien quer ser mamae    durationInMinutes=${durationInMinutes}    releaseYear=${releaseYear}    
    ${RESPONSE}    POST On Session    alias=API_raromd    url=/api/movies     headers=${headers}    json=${body}
    ${idFilme}    Set Variable    ${RESPONSE.json()['id']}
    Set Global Variable    ${idFilme}

Get Lista de Filmes
    Iniciar sessão na API
    ${RESPONSE}    GET On Session    alias=API_raromd    url=/api/movies
    ${resposta_json}    Set Variable    ${RESPONSE.json()}
    Set Global Variable    ${lista_de_filmes}    ${resposta_json}

Atualizar review na API
    Iniciar sessão na API
    Virar administrador na API
    ${scoreReview}    Convert To Integer    4
    ${scoreReview}    Convert To Integer    4
    ${body}    Create Dictionary    movieId=${idFilme}    score=${scoreReview}    reviewText=Nova Review
    ${headers}=    Create Dictionary    Authorization=Bearer ${token}
    ${RESPONSE}    POST On Session    alias=API_raromd    url=/api/users/review     headers=${headers}    json=${body}

Criar review de filme API
    [Arguments]    ${idDoFilme}
    Iniciar sessão na API
    Virar administrador na API
    ${scoreReview}    Convert To Integer    4
    ${scoreReview}    Convert To Integer    4
    ${body}    Create Dictionary    movieId=${idDoFilme}    score=${scoreReview}    reviewText=Nova Review
    ${headers}=    Create Dictionary    Authorization=Bearer ${token}
    ${RESPONSE}    POST On Session    alias=API_raromd    url=/api/users/review     headers=${headers}    json=${body}

Procurar filme pelo ID
    [Arguments]    ${idDoFilme}
    Iniciar sessão na API
    Virar administrador na API
    ${headers}=    Create Dictionary    Authorization=Bearer ${token}
    ${RESPONSE}    GET On Session    alias=API_raromd    url=/api/movies/${idDoFilme}     headers=${headers}
    ${filmePesquisadoReviews}    Set Variable    ${RESPONSE.json()['reviews']}    
    Set Global Variable    ${QUANTIDADE_REVIEW_COMUM}    Evaluate    str(len([item for item in ${filmePesquisadoReviews} if item['reviewType'] == 0]) )   
    Set Global Variable    ${QUANTIDADE_REVIEW_CRÍTICO}    Evaluate   str(len([item for item in ${filmePesquisadoReviews} if item['reviewType'] == 1]))

Deletar filme na API
    ${headers}=    Create Dictionary    Authorization=Bearer ${token}
    ${RESPONSE}    DELETE On Session   alias=API_raromd    url=/api/movies/${id}    headers=${headers}

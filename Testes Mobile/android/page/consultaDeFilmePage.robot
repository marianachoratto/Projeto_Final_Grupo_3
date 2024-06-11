*** Settings ***

Resource    ../../base.robot

*** Keywords ***
Dado que estou na página inicial do aplicativo
    Pega o atributo do elemento e verifica se tem o texto esperado    ${TITULO_HOME}    Home    content-desc

    
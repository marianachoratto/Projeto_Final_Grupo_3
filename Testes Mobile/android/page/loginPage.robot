*** Settings ***

Resource    ../../base.robot

*** Variables ***
${INPUT_EMAIL}    xpath=//android.widget.ImageView/android.widget.EditText[1]
${INPUT_SENHA}    xpath=//android.widget.ImageView/android.widget.EditText[2]
${BOTAO_FAZER_LOGIN}    xpath=//android.widget.Button[@content-desc="Login"]

*** Keywords ***
Dado que tenho um usuário cadastrado
    Iniciar sessão na API
    Cadastrar usuario comum na API


E sou redirecionada para a página inicial
    Pega o atributo do elemento e verifica se tem o texto esperado    ${TITULO_HOME}    Home    content-desc
    Deletar usuário

Quando faço login sem informar email
    Espera o elemento para clicar    ${MENU}
    Espera o elemento para clicar    ${BOTÃO_LOGIN}
    Espera o elemento para clicar    ${INPUT_SENHA}
    Input Text    ${INPUT_SENHA}    123456
    Espera o elemento para clicar    ${BOTAO_FAZER_LOGIN}

Quando faço o login sem informar senha
        Espera o elemento para clicar    ${MENU}
    Espera o elemento para clicar    ${BOTÃO_LOGIN}
    Espera o elemento para clicar    ${INPUT_EMAIL}
    Input Text    ${INPUT_EMAIL}    ${email}
    Espera o elemento para clicar    ${BOTAO_FAZER_LOGIN}

Quando faço o login sem informar email e senha
    Espera o elemento para clicar    ${MENU}
    Espera o elemento para clicar    ${BOTÃO_LOGIN}
    Espera o elemento para clicar    ${BOTAO_FAZER_LOGIN}

Quando faço o login informando o email errado
    Espera o elemento para clicar    ${MENU}
    Espera o elemento para clicar    ${BOTÃO_LOGIN}
    Espera o elemento para clicar    ${INPUT_EMAIL}
    Input Text    ${INPUT_EMAIL}    emailerrado@gmail.com
    Espera o elemento para clicar    ${INPUT_SENHA}
    Input Text    ${INPUT_SENHA}    123456
    Espera o elemento para clicar    ${BOTAO_FAZER_LOGIN}

Quando faço o login informando a senha errada
    Espera o elemento para clicar    ${MENU}
    Espera o elemento para clicar    ${BOTÃO_LOGIN}
    Espera o elemento para clicar    ${INPUT_EMAIL}
    Input Text    ${INPUT_EMAIL}    ${email}
    Espera o elemento para clicar    ${INPUT_SENHA}
    Input Text    ${INPUT_SENHA}    abcdef
    Espera o elemento para clicar    ${BOTAO_FAZER_LOGIN}

Quando faço o login informando uma senha com mais de 12 caracteres
    Espera o elemento para clicar    ${MENU}
    Espera o elemento para clicar    ${BOTÃO_LOGIN}
    Espera o elemento para clicar    ${INPUT_EMAIL}
    Input Text    ${INPUT_EMAIL}    ${email}
    Espera o elemento para clicar    ${INPUT_SENHA}
    Input Text    ${INPUT_SENHA}    123456789012
    Espera o elemento para clicar    ${BOTAO_FAZER_LOGIN}

Então recebo uma mensagem de sucesso
    Wait Until Keyword Succeeds    4    0    Element Should Be Visible    ${MSG_LOGIN_SUCESSO}

Então aparece um aviso dizendo para informar o email
    Element Should Be Visible    ${INFORME_EMAIL}
    Deletar usuário
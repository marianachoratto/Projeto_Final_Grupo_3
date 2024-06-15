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

Quando faço o login informando email inválido
    Espera o elemento para clicar    ${MENU}
    Espera o elemento para clicar    ${BOTÃO_LOGIN}
    Espera o elemento para clicar    ${INPUT_EMAIL}
    Input Text    ${INPUT_EMAIL}    marianagmail.com
    Espera o elemento para clicar    ${INPUT_SENHA}
    Input Text    ${INPUT_SENHA}    123456
    Espera o elemento para clicar    ${BOTAO_FAZER_LOGIN}

Então recebo uma mensagem de sucesso
    Wait Until Keyword Succeeds    4    0    Element Should Be Visible    ${MSG_LOGIN_SUCESSO}

Então aparece um aviso dizendo para informar o email
    Element Should Be Visible    ${INFORME_EMAIL}
    Deletar usuário

Então aparece um aviso dizendo para informar a senha
    Element Should Be Visible    ${INFORME_SENHA}
    Deletar usuário

Então recebo uma mensagem de erro pedindo para informar email e senha
     Element Should Be Visible    ${INFORME_EMAIL}
     Element Should Be Visible    ${INFORME_SENHA}
     Deletar usuário

Então recebo um aviso pedindo um email válido
    Element Should Be Visible    ${INFORME_EMAIL_VALIDO}
    Deletar usuário

Então aparece uma mensagem informando que o email é inválido
    Element Should Be Visible    ${INFORME_EMAIL_VALIDO}
    Deletar usuário

Então recebo uma mensagem informando que usuário ou senha podem estar errados
    Wait Until Keyword Succeeds    4    0    Element Should Be Visible    ${MSG_USARIO_SENHA_INVALIDOS}
    Deletar usuário

Quando faço login informando email não cadastrado
    Espera o elemento para clicar    ${MENU}
    Espera o elemento para clicar    ${BOTÃO_LOGIN}
    Espera o elemento para clicar    ${INPUT_EMAIL}
    Input Text    ${INPUT_EMAIL}    lalala@gmail.co
    Espera o elemento para clicar    ${INPUT_SENHA}
    Input Text    ${INPUT_SENHA}    123456
    Espera o elemento para clicar    ${BOTAO_FAZER_LOGIN}

Quando aperto o botão de login
    Espera o elemento para clicar    ${MENU}
    Espera o elemento para clicar    ${BOTÃO_LOGIN}

Então todas as funcionalidades devem estar visíveis e habilitadas
    Wait Until Element Is Visible    ${INPUT_EMAIL}
    Checa se os elementos estão visíveis    ${INPUT_EMAIL}    ${INPUT_SENHA}    ${BOTAO_FAZER_LOGIN}
    Checa se os elementos estão habilitados    ${INPUT_EMAIL}    ${INPUT_SENHA}    ${BOTAO_FAZER_LOGIN}
    Click Element    ${INPUT_EMAIL}
    Click Element    ${INPUT_SENHA}
    Deletar usuário
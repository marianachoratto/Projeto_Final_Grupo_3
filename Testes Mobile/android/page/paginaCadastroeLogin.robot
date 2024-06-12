*** Settings ***

Resource    ../../base.robot

*** Variables ***
#HEADER PAGINA DE CADASTRO
${TITULO_CADASTRO}    xpath=//android.view.View[@content-desc="Cadastro"]

#FORMULARIO CADASTRO 
${INPUT_NOME}               xpath=//android.widget.ImageView/android.widget.EditText[1]
${INPUT_EMAIL}              xpath=//android.widget.ImageView/android.widget.EditText[2]
${INPUT_SENHA}              xpath=//android.widget.ImageView/android.widget.EditText[3]
${INPUT_CONFIRMAR_SENHA}    xpath=//android.widget.ImageView/android.widget.EditText[4]
${BOTÃO_REGISTRAR_NOVO}     xpath=//android.widget.Button[@content-desc="Registrar"]
    
#MENSAGENS
${CADASTRO_SUCESSO}         xpath=//android.view.View[@content-desc="Cadastro realizado!"]

*** Keywords ***

Dado que acessei a funcionalidade de cadastro
    Espera o elemento para clicar    ${MENU} 
    Espera o elemento para clicar    ${BOTÃO_REGISTRAR}

Quando visualizo a pagina de criação
    Espera o elemento e verifica o texto   ${TITULO_CADASTRO}     "Cadastro"  

Quando informo um nome, email e senha válidos
    Espera e informa o valor dos inputs corretos no elemento de cadastro 

E clico para cadastrar
    Espera o elemento para clicar    ${BOTÃO_REGISTRAR_NOVO}

Então os inputs estão habilitados e instruções visíveis
    Checa se os elementos estão visíveis e habilitados    ${INPUT_NOME}    ${INPUT_EMAIL}    ${INPUT_SENHA}
    ...    ${INPUT_CONFIRMAR_SENHA}    ${BOTÃO_REGISTRAR_NOVO}

Então um usuário do tipo comum será gerado
    Espera o elemento e verifica o texto    ${CADASTRO_SUCESSO}    "Cadastro realizado!"


    
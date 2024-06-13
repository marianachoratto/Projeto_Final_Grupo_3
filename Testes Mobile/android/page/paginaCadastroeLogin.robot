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
${EMAIL_CADASTRADO}         xpath=//android.view.View[@content-desc="E-mail já cadastrado. Utilize outro e-mail."]
${ERRO_GENERICO}            xpath=//android.view.View[@content-desc="Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde."]
${ERRO_NOME}                xpath=//android.view.View[@content-desc="Informe o nome."]

#GUARDA E-MAIL JÁ CADASTRADO
${EMAIL}

*** Keywords ***

Dado que acessei a funcionalidade de cadastro
    Espera o elemento para clicar    ${MENU} 
    Espera o elemento para clicar    ${BOTÃO_REGISTRAR}

Quando visualizo a pagina de criação
    Espera o elemento e verifica o texto   ${TITULO_CADASTRO}     "Cadastro"  

Quando realizo a criação de um novo usuario informando dados válidos com e-mail já cadastrado
    Utilizar Email ja cadastrado

Quando informo um nome com 100 caracteres
    Espera o elemento para fazer o inputtext    ${INPUT_NOME}    CarolineRutherfordTatumAliciaEliseWhitneyMargaritaSavannahAlejandraLilianaAnastasiaIsabellaTestItalo

Quando informo um nome com mais de 100 caracteres
    Espera o elemento para fazer o inputtext    ${INPUT_NOME}    CarolineRutherfordTatumAliciaEliseWhitneyMargaritaSavannahAlejandraLilianaAnastasiaIsabellaTestItaloRenan

E informo um nome válido
    Espera e informa o valor do nome no input de cadastro

E informo um email válido
    Espera e informa o valor do email no input de cadastro

E informo uma senha válida
    Espera e informa o valor da senha no input de cadastro 
    
E um usuario já foi cadastrado no sistema
    Criar usuário API 

E clico para cadastrar
    Espera o elemento para clicar    ${BOTÃO_REGISTRAR_NOVO}

Então os inputs estão habilitados e instruções visíveis
    Checa se os elementos estão visíveis e habilitados    ${INPUT_NOME}    ${INPUT_EMAIL}    ${INPUT_SENHA}
    ...    ${INPUT_CONFIRMAR_SENHA}    ${BOTÃO_REGISTRAR_NOVO}

Então um usuário do tipo comum será gerado
    Espera o elemento e verifica o texto    ${CADASTRO_SUCESSO}    "Cadastro realizado!"

Então o usuário não é criado
    Espera o elemento e verifica o texto    ${EMAIL_CADASTRADO}     "E-mail já cadastrado. Utilize outro e-mail."

Então retorna mensagem informando o limite de caracteres
    Espera o elemento e verifica o texto    ${ERRO_GENERICO}     "Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde."

Então retorna mensagem informando que o nome deve ser preenchido
    Espera o elemento e verifica o texto    ${ERRO_NOME}     "Informe o nome."



    
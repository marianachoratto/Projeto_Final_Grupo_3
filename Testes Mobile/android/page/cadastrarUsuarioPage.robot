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

#ERRO NOS INPUTS
${ERRO_NOME}                xpath=//android.view.View[@content-desc="Informe o nome."]
${ERRO_SENHA}               xpath=//android.view.View[@content-desc="Informe uma senha."]
${ERRO_CONFIRM_SENHA}       xpath=//android.view.View[@content-desc="Confirme a senha."]
${ERRO_SENHA_DIFERENTE}     xpath=//android.view.View[@content-desc="As senhas não coincidem."]
${ERRO_EMAIL}               xpath=//android.view.View[@content-desc="Informe o e-mail."]
${ERRO_EMAIL_VALIDO}        xpath=//android.view.View[@content-desc="Informe um e-mail válido."]

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
    Espera o elemento para fazer o inputtext    ${INPUT_NOME}    CarolineRutherfordTatumAliciaEliseWhitneyMargaritaSavannahAlejandraLilianaAnastasiaIsabellaTestItaloR

Quando deslizo a tela para o botão de cadastrar
    Swipe para cima

E informo um nome válido
    Espera e informa o valor do nome no input de cadastro

E informo nomes diferentes permitidos pela regra de negocio no cadastro
    Valida nome de usuarios    12348@#$¨%@@$¨&BVSFVSFVdcsdj<HRSARY##¨%$&*     ´    1      

E informo um nome com apenas espaços vazios   
    Valida nome de usuarios    ${"                                                "}     
                               
E informo um email válido
    Espera e informa o valor do email no input de cadastro

E informo um email com 5 caracteres
    Espera o elemento para fazer o inputtext    ${INPUT_EMAIL}    a@c.l

E informo um email inválido sem . e @
    Espera o elemento para fazer o inputtext    ${INPUT_EMAIL}    "#email" 

E informo um email inválido sem o @
    Espera o elemento para fazer o inputtext    ${INPUT_EMAIL}    "emailinvalido.com" 

E informo um email inválido sem o valor anterior ao @
    Espera o elemento para fazer o inputtext    ${INPUT_EMAIL}    "@mail.com" 

E informo um email inválido apenas com o texto e o @
    Espera o elemento para fazer o inputtext    ${INPUT_EMAIL}    emailinvalido@ 

E informo um email com mais de 60 caracteres
    Espera o elemento para fazer o inputtext    ${INPUT_EMAIL}    emailcom61caracteresemailcom61caracteresemailcomm@dominio.com

E informo um email com 60 caracteres
    Espera o elemento para fazer o inputtext    ${INPUT_EMAIL}    ${EMAIL_PROCURADO}

E informo um email válido com letras maiúsculas
    Espera o elemento para fazer o inputtext    ${INPUT_EMAIL}    ${EMAIL_PROCURADO}

E informo uma senha válida
    Espera e informa o valor da senha no input de cadastro 

E informo uma senha com 6 caracteres
    Espera o elemento para fazer o inputtext    ${INPUT_SENHA}    @Senha
    Espera o elemento para fazer o inputtext    ${INPUT_CONFIRMAR_SENHA}    @Senha

E informo uma senha com 12 caracteres
    Espera o elemento para fazer o inputtext    ${INPUT_SENHA}    @Senha123456
    Espera o elemento para fazer o inputtext    ${INPUT_CONFIRMAR_SENHA}    @Senha123456

E informo uma senha com mais de 12 caracteres
    Espera o elemento para fazer o inputtext    ${INPUT_SENHA}    @Senha1234567
    Espera o elemento para fazer o inputtext    ${INPUT_CONFIRMAR_SENHA}    @Senha1234567

E informo uma senha com menos de 6 caracteres
    Espera o elemento para fazer o inputtext    ${INPUT_SENHA}    @Senh
    Espera o elemento para fazer o inputtext    ${INPUT_CONFIRMAR_SENHA}    @Senh

E informo uma senha diferente ao confirmar 
    Espera o elemento para fazer o inputtext    ${INPUT_SENHA}    @Senh
    Espera o elemento para fazer o inputtext    ${INPUT_CONFIRMAR_SENHA}    @Senh45
    
E um usuario já foi cadastrado no sistema
    Criar usuário API 

E clico para cadastrar
    Espera o elemento para clicar    ${BOTÃO_REGISTRAR_NOVO}

Então os inputs estão habilitados e instruções visíveis
    Checa se os elementos estão visíveis e habilitados    ${INPUT_NOME}    ${INPUT_EMAIL}    ${INPUT_SENHA}
    ...    ${INPUT_CONFIRMAR_SENHA}    ${BOTÃO_REGISTRAR_NOVO}

Então um usuário do tipo comum será gerado
    Espera o elemento e verifica o texto    ${CADASTRO_SUCESSO}    "Cadastro realizado!"

Então um usuário do tipo comum será gerado e excluido 
    Espera o elemento e verifica o texto    ${CADASTRO_SUCESSO}    "Cadastro realizado!"
    Buscar ID do usuario criado   
    Deletar usuario

Então o usuário não é criado
    Espera o elemento e verifica o texto    ${EMAIL_CADASTRADO}     "E-mail já cadastrado. Utilize outro e-mail."

Então retornará erro no formulário 
    Espera o elemento e verifica o texto    ${ERRO_GENERICO}     "Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde."

Então retorna mensagem informando que o nome deve ser preenchido
    Espera o elemento e verifica o texto    ${ERRO_NOME}     "Informe o nome."

Então retorna mensagem informando que a senha deve ser preenchida
    Espera o elemento e verifica o texto    ${ERRO_SENHA}            "Informe uma senha."
    Espera o elemento e verifica o texto    ${ERRO_CONFIRM_SENHA}    "Confirme a senha."

Então retornará erro no input de confirmar senha
    Espera o elemento e verifica o texto    ${ERRO_SENHA_DIFERENTE}    As senhas não coincidem.

Então retorna mensagem informando que o email deve ser preenchido
    Espera o elemento e verifica o texto    ${ERRO_EMAIL}    "Informe o e-mail."

Então retornará mensagem de email inválido 
    Espera o elemento e verifica o texto    ${ERRO_EMAIL_VALIDO}    "Informe um e-mail válido."

*** Settings ***

Resource    ../../base.robot

*** Variables ***
# COLOQUE TODOS OS XPATHS DA PÁGINA AQUI
${MSG_LOGIN_SUCESSO}    xpath=//android.view.View[@content-desc="Login realizado!"]
${MSG_USARIO_SENHA_INVALIDOS}    xpath=//android.view.View[@content-desc="Usuário ou senha inválidos."]
${INFORME_EMAIL}        xpath=//android.view.View[@content-desc="Informe o e-mail."]    
${INFORME_SENHA}        xpath=//android.view.View[@content-desc="Informe uma senha."]
${INFORME_EMAIL_VALIDO}    xpath=//android.view.View[@content-desc="Informe um e-mail válido."]
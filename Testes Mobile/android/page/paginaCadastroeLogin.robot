*** Settings ***

Resource    ../../base.robot

*** Variables ***
# COLOQUE TODOS OS XPATHS DA PÁGINA AQUI
${MSG_LOGIN_SUCESSO}    xpath=//android.view.View[@content-desc="Login realizado!"]
${INFORME_EMAIL}        xpath=//android.view.View[@content-desc="Informe o e-mail."]    
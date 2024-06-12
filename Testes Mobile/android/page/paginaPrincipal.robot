*** Settings ***

Resource    ../../base.robot

*** Variables ***
# COLOQUE TODOS OS XPATHS DA PÁGINA AQUI
${TITULO_HOME}        xpath=//android.view.View[@content-desc="Home"]
${MENU}               xpath=//android.widget.Button[@content-desc="Open navigation menu"]
${CARD_FILME}         xpath=//android.widget.ImageView

# Botões do Menu
${BOTÃO_LOGIN}        xpath=//android.view.View[@content-desc="Login"]
${BOTÃO_REGISTRAR}    xpath=//android.view.View[@content-desc="Registre-se"]

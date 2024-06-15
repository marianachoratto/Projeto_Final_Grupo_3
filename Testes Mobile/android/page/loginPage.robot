*** Settings ***

Resource    ../../base.robot

*** Variables ***
${INPUT_EMAIL}    xpath=//android.widget.ImageView/android.widget.EditText[1]
${INPUT_SENHA}    xpath=//android.widget.ImageView/android.widget.EditText[2]
${BOTAO_FAZER_LOGIN}    xpath=//android.widget.Button[@content-desc="Login"]
${Logo_Login}    xpath=//android.view.View[@content-desc="Login"]

*** Keywords ***

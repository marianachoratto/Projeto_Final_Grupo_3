*** Settings ***

Resource   ../../base.robot

*** Keywords ***

# CT017 - Template não deve ser possível cadastrar com emails inválidos
#     [ARGUMENTS]    ${email}    ${mensagem}
#     Quando informo um nome válido
#     E informo um email inválido ${email}
#     E informo uma senha válida
#     E confirmo a senha
#     E clico para cadastrar
#     Então retornará mensagem de email inválido ${mensagem}
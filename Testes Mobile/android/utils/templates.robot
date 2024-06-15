*** Settings ***

Resource   ../../base.robot

*** Keywords ***

# Template CT007 - Validando nomes de usuário
#     [ARGUMENTS]    ${nome}
#     Quando informo um nome ${nome}
#     E informo um email válido
#     E informo uma senha válida
#     E confirmo a senha
#     E clico para cadastrar
#     Então um usuário do tipo comum será gerado

# CT010 - Template validando possíveis falhas em senha e confirmação de senha
#     [ARGUMENTS]    ${senha}    ${confirmarSenha}    ${mensagem}
#     Quando informo um nome válido
#     E informo um email válido
#     E informo uma senha ${senha}
#     E confirmo a senha ${confirmarSenha} 
#     E clico para cadastrar
#     Então retornará erro no formulário ${mensagem}

# CT017 - Template não deve ser possível cadastrar com emails inválidos
#     [ARGUMENTS]    ${email}    ${mensagem}
#     Quando informo um nome válido
#     E informo um email inválido ${email}
#     E informo uma senha válida
#     E confirmo a senha
#     E clico para cadastrar
#     Então retornará mensagem de email inválido ${mensagem}
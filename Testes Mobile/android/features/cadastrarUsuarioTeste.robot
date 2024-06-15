*** Settings ***

Resource     ../utils/config.robot

Test Setup    Abrir App
Test Teardown    Teardown


*** Test Cases ***

CT001 - Acessar formulario de cadastro deve estar visível e habilitado
    Dado que acessei a funcionalidade de cadastro
    Quando visualizo a pagina de criação
    Então os inputs estão habilitados e instruções visíveis

CT002 - Ao criar novo usuário deve ser gerado usuário do tipo comum
    Dado que acessei a funcionalidade de cadastro
    E informo um nome válido
    E informo um email válido
    E informo uma senha válida
    E clico para cadastrar
    Então um usuário do tipo comum será gerado

CT003 - Não é possível cadastrar usuário com email repetido
    Dado que acessei a funcionalidade de cadastro
    E um usuario já foi cadastrado no sistema
    Quando realizo a criação de um novo usuario informando dados válidos com e-mail já cadastrado
    E clico para cadastrar
    Então o usuário não é criado

CT004 - Deve ser possível criar usuário com nome até 100 caracteres
    Dado que acessei a funcionalidade de cadastro
    Quando informo um nome com 100 caracteres
    E informo um email válido
    E informo uma senha válida
    E clico para cadastrar
    Então um usuário do tipo comum será gerado

CT005 - Não deve ser possível criar usuário com nome maior que 100 caracteres
    Dado que acessei a funcionalidade de cadastro
    Quando informo um nome com mais de 100 caracteres
    E informo um email válido
    E informo uma senha válida
    E clico para cadastrar
    Então retornará erro no formulário 

CT006 - Não deve ser possível criar usuário sem informar um nome
    Dado que acessei a funcionalidade de cadastro
    E informo um email válido
    E informo uma senha válida
    E clico para cadastrar
    Então retorna mensagem informando que o nome deve ser preenchido

CT007 - Validando nomes de usuário
    Dado que acessei a funcionalidade de cadastro
    E informo nomes diferentes permitidos pela regra de negocio no cadastro
    Então um usuário do tipo comum será gerado

CT008 - Deve ser possível criar senha com 6 caracteres
    Dado que acessei a funcionalidade de cadastro
    E informo um nome válido
    E informo um email válido
    E informo uma senha com 6 caracteres
    E clico para cadastrar
    Então um usuário do tipo comum será gerado

CT009 - Deve ser possível criar senha com 12 caracteres
    Dado que acessei a funcionalidade de cadastro
    E informo um nome válido
    E informo um email válido
    E informo uma senha com 12 caracteres
    E clico para cadastrar
    Então um usuário do tipo comum será gerado 

CT010 - Validando senha com mais de 12 caracteres
    Dado que acessei a funcionalidade de cadastro
    E informo um nome válido
    E informo um email válido
    E informo uma senha com mais de 12 caracteres
    E clico para cadastrar
    Então retornará erro no formulário 

CT011 - Validando senha com menos de 6 caracteres
    Dado que acessei a funcionalidade de cadastro
    E informo um nome válido
    E informo um email válido
    E informo uma senha com menos de 6 caracteres
    E clico para cadastrar
    Então retornará erro no formulário 

CT012 - Validando senha com senhas diferentes 
    Dado que acessei a funcionalidade de cadastro
    E informo um nome válido
    E informo um email válido
    E informo uma senha diferente ao confirmar 
    E clico para cadastrar
    Então retornará erro no input de confirmar senha 

CT013 - Não deve ser possível cadastrar usuário sem informar senha
    Dado que acessei a funcionalidade de cadastro
    E informo um nome válido
    E informo um email válido
    Quando deslizo a tela para o botão de cadastrar
    E clico para cadastrar
    Então retorna mensagem informando que a senha deve ser preenchida

# CT012 - Deve ser possível criar usuário informando e-mail com 5 caracteres
    # Quando informo um nome válido
    # E informo um email com 5 caracteres
    # E informo uma senha válida
    # E confirmo a senha
    # E clico para cadastrar
    # Então um usuário do tipo comum será gerado

# CT013 - Deve ser possível criar usuário informando email com 60 caracteres
#     Quando informo um nome válido
#     E informo um email com 60 caracteres
#     E informo uma senha válida
#     E confirmo a senha
#     E clico para cadastrar
#     Então um usuário do tipo comum será gerado

# CT014 - Não deve ser possível criar um usuário sem email 
    # Quando informo um nome válido
    # E informo uma senha válida
    # E confirmo a senha
    # E clico para cadastrar
    # Então retorna mensagem informando que o email deve ser preenchido

# CT015 - Não deve ser possível criar um usuário informando nome com apenas espaços vazios
    # Quando informo um nome com apenas espaços vazios
    # E informo um email válido
    # E informo uma senha válida
    # E confirmo a senha
    # E clico para cadastrar
    # Então retorna mensagem informando que o nome deve ser preenchido

# CT016 - Não deve ser possível criar um usuário informando senha com apenas espaços vazios
    # Quando informo um nome válido
    # E informo um email válido
    # E informo uma senha com apenas espaços vazios
    # E confirmo a senha
    # E clico para cadastrar
    # Então retorna mensagem informando que a senha deve ser preenchida

# CT017 - Neve ser possível cadastrar com emails inválidos
#     [Template]    CT017 - Template não deve ser possível cadastrar com emails inválidos
#     #email                                                            mensagem
#     emailinvalido.com                                                 Informe um e-mail válido.
#     @mail.com                                                         Informe um e-mail válido.
#     emailinvalido@                                                    Informe um e-mail válido. 
#     emailcom61caracteresemailcom61caracteresemailcomm@dominio.com     O e-mail deve ter no máximo 60 dígitos.                As senhas devem ser iguais. 

# CT018 - Deve ser possível cadastrar um usuário com email de letras maiúscula
    # Quando informo um nome válido
    # E informo um email válido com letras maiúsculas
    # E informo uma senha válida
    # E confirmo a senha
    # E clico para cadastrar
    # Então um usuário do tipo comum será gerado
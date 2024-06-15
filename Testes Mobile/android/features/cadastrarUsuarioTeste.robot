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

CT014 - Deve ser possível criar usuário informando e-mail com 5 caracteres
    Dado que acessei a funcionalidade de cadastro
    E informo um nome válido
    E informo um email com 5 caracteres
    E informo uma senha válida
    E clico para cadastrar
    Então um usuário do tipo comum será gerado e excluido 

CT015 - Deve ser possível criar usuário informando email com 60 caracteres
    Dado que acessei a funcionalidade de cadastro
    E informo um nome válido
    E informo um email com 60 caracteres
    E informo uma senha válida
    E clico para cadastrar
    Então um usuário do tipo comum será gerado e excluido

CT016 - Não deve ser possível criar um usuário sem email 
    Dado que acessei a funcionalidade de cadastro
    E informo um nome válido
    E informo uma senha válida
    E clico para cadastrar
    Então retorna mensagem informando que o email deve ser preenchido


CT017 - Não deve ser possível cadastrar com emails inválidos [Example: #email]
    Dado que acessei a funcionalidade de cadastro
    E informo um nome válido
    E informo um email inválido sem . e @
    E informo uma senha válida
    E clico para cadastrar
    Então retornará mensagem de email inválido 

CT018 - Não deve ser possível cadastrar com emails inválidos [Example: #email]
    Dado que acessei a funcionalidade de cadastro
    E informo um nome válido
    E informo um email inválido sem . e @
    E informo uma senha válida
    E clico para cadastrar
    Então retornará mensagem de email inválido 

CT019 - Não deve ser possível cadastrar com emails inválidos [Example: emailinvalido.com]
    Dado que acessei a funcionalidade de cadastro
    E informo um nome válido
    E informo um email inválido sem o @
    E informo uma senha válida
    E clico para cadastrar
    Então retornará mensagem de email inválido 

CT020 - Não deve ser possível cadastrar com emails inválidos [Example: @mail.com]
    Dado que acessei a funcionalidade de cadastro
    E informo um nome válido
    E informo um email inválido sem o valor anterior ao @
    E informo uma senha válida
    E clico para cadastrar
    Então retornará mensagem de email inválido 

CT021 - Não deve ser possível cadastrar com emails inválidos [Example: emailinvalido@]
    Dado que acessei a funcionalidade de cadastro
    E informo um nome válido
    E informo um email inválido apenas com o texto e o @
    E informo uma senha válida
    E clico para cadastrar
    Então retornará mensagem de email inválido 

CT022 - Não deve ser possível cadastrar com email maior que 60 caracteres 
    Dado que acessei a funcionalidade de cadastro
    E informo um nome válido
    E informo um email com mais de 60 caracteres
    E informo uma senha válida
    E clico para cadastrar
    Então retornará erro no formulário

CT023 - Deve ser possível cadastrar um usuário com email de letras maiúscula
    Dado que acessei a funcionalidade de cadastro
    E informo um nome válido
    E informo um email válido com letras maiúsculas
    E informo uma senha válida
    E clico para cadastrar
    Então um usuário do tipo comum será gerado e excluido
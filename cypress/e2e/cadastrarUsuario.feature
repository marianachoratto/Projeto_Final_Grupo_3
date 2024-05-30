#language: pt
Funcionalidade: Cadastrar usuários 

Contexto: O usuário deve ter acessado a página de cadastro
    Dado que acessei a funcionalidade de cadastro

# Cenário: o formulário de cadastro deve estar visível e habilitado
#     Quando visualizo a pagina de criação
#     Então os inputs estão habilitados e instruções visíveis

# @deleteUser
# Cenário: Ao criar novo usuário deve ser gerado usuário do tipo comum
#     Quando informo um nome válido
#     E informo um email válido
#     E informo uma senha válida
#     E confirmo a senha
#     E clico para cadastrar
#     Então um usuário do tipo comum será gerado

# @createUser @deleteUser
# Cenário: Não é possível cadastrar usuário com email repetido
#     Quando informo dados válidos com e-mail já cadastrado
#     E clico para cadastrar
#     Então o usuário não é criado

# Cenário: Não deve ser possível criar usuário com nome maior que 100 caracteres
#     Quando informo um nome com mais de 100 caracteres
#     E informo um email válido
#     E informo uma senha válida
#     E confirmo a senha
#     E clico para cadastrar
#     Então retorna mensagem informando o limite de caracteres
    
#  Cenário: Não deve ser possível criar usuário sem informar um nome
#     Quando informo um email válido
#     E informo uma senha válida
#     E confirmo a senha
#     E clico para cadastrar
#     Então retorna mensagem informando que o nome deve ser preenchido

# Esquema do Cenário: Deve ser possível criar usuário de 1 a 100 caracteres
#     Quando informo um nome "<nome>"
#     E informo um email válido
#     E informo uma senha válida
#     E confirmo a senha
#     E clico para cadastrar
#     Então um usuário do tipo comum será gerado
#     Exemplos:
#     | nome                                                                                                                                                                                                     |
#     |nomecom100caracteresnomecom100caracteresnomecom100caracteresnomecom100caracteresnomecom100caracteres|
#     |12348@#$¨%@@$¨&BVSFVSFVdcsdj<HRSARY##¨%$&*|
#     | ´ |
#     | 1 |

Cenário: Não deve ser possível criar um usuário sem email 
    Quando informo um nome válido
    E informo uma senha válida
    E confirmo a senha
    E clico para cadastrar
    Então retorna mensagem informando que o email deve ser preenchido

# Cenário: Não deve ser possível criar usuário sem confirmação de senha

# Esquema do Cenário: Deve ser possível criar senha entre 6 e 12 caracteres

# Esquema do Cenário: Validando senha e confirmação de senha
#     Quando informar um nome válido
#     E informar um email válido
#     E informar uma senha "<senha>"
#     E confirmar a senha "<confirmarSenha>"
#     E clicar para cadastrar
#     Então retornará erro no formulário "<mensagem>"
#     Exemplos:
#     | senha         | confirmarSenha | mensagem                               |
#     | 1234567891234 | 1234567891234  | A senha deve ter no máximo 12 dígitos. |
#     | acsfe         | acsfe          | A senha deve ter pelo menos 6 dígitos. |
#     | asdfgh        | 12644568       | As senhas devem ser iguais.            |

# Esquema do Cenário: Não deve ser possível cadastrar com emails inválidos
# # mais de 60, sem padrão nomeUtilizador@dominio.

# Cenário: Deve ser possível cadastrar um usuário com email de letras maiúscula

#language: pt
Funcionalidade: Cadastrar usuários 

Contexto: O usuário deve ter acessado a página de cadastro
    Dado que acessei a funcionalidade de cadastro

Cenário: o formulário de cadastro deve estar visível e habilitado

Cenário: cadastrar usuário com sucesso
# Não esquecer de validar o tipo (0)

Cenário: Não é possível cadastrar usuário com email repetido

# Testes de falha
Esquema do Cenário: Não deve ser possível criar usuário se o nome não estiver entre 1 e 100 caracteres

    Exemplos: 
    |nome     | alerta           |
    | sem nome |
    | 101 caracteres|
 
Esquema do Cenário: Deve ser possível criar usuário de 1 a 100 caracteres
# Não esquecer de usuários "esdrúxulos", como *, 1234, emoji

Cenário: Não deve ser possível criar um usuário sem email 

Cenário: Não deve ser possível criar usuário sem confirmação de senha

Esquema do Cenário: Deve ser possível criar senha entre 6 e 12 caracteres

Esquema do Cenário: Validando senha e confirmação de senha
    Quando informar um nome válido
    E informar um email válido
    E informar uma senha "<senha>"
    E confirmar a senha "<confirmarSenha>"
    E clicar para cadastrar
    Então retornará erro no formulário "<mensagem>"
    Exemplos:
    | senha         | confirmarSenha | mensagem                               |
    | 1234567891234 | 1234567891234  | A senha deve ter no máximo 12 dígitos. |
    | acsfe         | acsfe          | A senha deve ter pelo menos 6 dígitos. |
    | asdfgh        | 12644568       | As senhas devem ser iguais.            |

Esquema do Cenário: Não deve ser possível cadastrar com emails inválidos
# mais de 60, sem padrão nomeUtilizador@dominio.

Cenário: Deve ser possível cadastrar um usuário com email de letras maiúscula

#language: pt

Funcionalidade: Validação ao logar usuário

Contexto: Acessar página de login 
    Dado que acessei a página de login

Cenário: O formulário de login deve estar visível e habilitado
    Então posso ver o formulário de login 

@createUser @deleteUser
Cenário: Logar usuário com sucesso
    Quando coloco os dados do usuário nos inputs de login e senha
    Quando confirmo a operação
    Então o login deve ser realizado com sucesso


Cenário: Não deve ser possível logar sem adicionar email
    Quando não coloco o email
    Quando coloco a senha
    Quando confirmo a operação
    Então deve aparecer uma mensagem abaixo do input email dizendo "Informe o e-mail"

  
Cenário: Não deve ser possível logar sem adicionar senha
    Quando coloco o email
    Quando não coloco a senha
    Quando confirmo a operação
    Então deve aparecer uma mensagem abaixo do input senha dizendo "Informe a senha"

  
Cenário: Não deve ser possível logar sem email e senha
    Quando não coloco o email
    Quando não coloco a senha
    E confirmo a operação
    Então deve aparecer uma mensagem abaixo do input email dizendo "Informe o e-mail"
    Então deve aparecer uma mensagem abaixo do input senha dizendo "Informe a senha"

 
Cenário: Não deve ser possível logar com email sem o padrão correto
    Quando coloco o email errado
    E coloco a senha
    E confirmo a operação
    Então deve aparecer uma mensagem informando que o email precisa estar no padrão

 
Cenário: Não deve ser possível logar com a senha errada
    Quando coloco o email
    E coloco a senha errada
    E confirmo a operação
    Então deve aparecer uma mensagem informando falha ao autenticar

# 1 hora e 1 tem 3.660.000 ms
@createUser @login @tick @deleteUser
Cenário: Após 60 minutos, a sessão do usuário expira
    Quando coloco os dados do usuário nos inputs de login e senha
    Quando confirmo a operação
    Quando o login é realizado com sucesso
    Entao a sessão dura 60 minutos
    Entao nao é possivel fazer requisiçoes
    
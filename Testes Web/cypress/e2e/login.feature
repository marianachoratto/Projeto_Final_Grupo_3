#language: pt

Funcionalidade: Validação ao logar usuário

Contexto: Acessar página de login 
    Dado que acessei a página de login

@ignore
Cenário: O formulário de login deve estar visível e habilitado
    Então vejo o formulário de login visível e habilitado
    
@ignore @deletarUsuario
Cenário: Logar usuário com sucesso
    E tenho acesso aos dados de um usuário cadastrado
    Quando coloco os dados do usuário nos inputs de login e senha
    E confirmo a operação
    Então o login deve ser realizado com sucesso

@ignore
Cenário: Não deve ser possível logar sem adicionar email
    E tenho acesso aos dados de um usuário cadastrado
    Quando não coloco o email
    E coloco a senha
    E confirmo a operação
    Então deve aparecer uma mensagem abaixo do input email dizendo "Informe o e-mail"

@ignore
Cenário: Não deve ser possível logar sem adicionar senha
    E tenho acesso aos dados de um usuário cadastrado
    Quando coloco o email
    E não coloco a senha
    E confirmo a operação
    Então deve aparecer uma mensagem abaixo do input senha dizendo "Informe a senha"

@ignore
Cenário: Não deve ser possível logar sem email e senha
    E tenho acesso aos dados de um usuário cadastrado
    Quando não coloco o email
    E não coloco a senha
    E confirmo a operação
    Então deve aparecer uma mensagem abaixo do input email dizendo "Informe o e-mail"
    E deve aparecer uma mensagem abaixo do input senha dizendo "Informe a senha"

@ignore
Cenário: Não deve ser possível logar com email sem o padrão correto
    E tenho acesso aos dados de um usuário cadastrado
    Quando coloco o email errado
    E coloco a senha
    E confirmo a operação
    Então deve aparecer uma mensagem informando falha ao autenticar

@ignore
Cenário: Não deve ser possível logar com a senha errada
    E tenho acesso aos dados de um usuário cadastrado
    Quando coloco o email
    E coloco a senha errada
    E confirmo a operação
    Então deve aparecer uma mensagem de alerta informando falha ao autenticar

@ignore
Cenário: É possível ao usuário logar com email em letras maiúsculas
    E tenho acesso aos dados de um usuário cadastrado com email em letra maiúscula
    Quando coloco o email em letras maiúsculas
    E coloco a senha
    E confirmo a operação
    Então o login deve ser realizado com sucesso

@ignore
Cenário: Ao clicar no botão do aviso de falha de usuário, a janela de alerta deve fechar
    E tenho acesso aos dados de um usuário cadastrado
    Quando faço um login com senha ou email incorretos
    Então deve aparecer uma mensagem dizendo falha ao autenticar
    Quando clico no botão de Ok
    Então a janela de alerta fecha 


Cenário: O usuário deve ficar logado por 60 minutos
    E tenho acesso aos dados de um usuário cadastrado
    Quando coloco os dados do usuário nos inputs de login e senha
    E confirmo a operação
    Então o usuário deve permanecer logado por 60 minutos


Cenário: Após 60 minutos, a sessão do usuário expira
    E tenho acesso aos dados de um usuário cadastrado
    Quando coloco os dados do usuário nos inputs de login e senha
    E confirmo a operação
    Então a sessão do usuário deve expirar após 60 minutos
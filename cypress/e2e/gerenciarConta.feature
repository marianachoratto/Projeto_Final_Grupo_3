#language: pt

Funcionalidade: Gerenciar conta

Contexto: o usuário deve ter acesso à sua página de informações
    Dado que entrei no perfil do meu usuário já cadastrado
    E estou na página do gerenciamento de contas


Cenário: As informações do usuário devem estar corretas na seção de gerenciar conta
    Então o nome cadastrado deve estar correto
    E o email deve estar correto
    E o usuário deve ser do tipo comum

@deletarUsuario 
Cenário: Dever ser possível alterar nome
    Quando altero o nome cadastrado
    E confirmo a operação 
    Então terei minhas informações atualizadas

@deletarUsuarioModificado 
Cenário: Deve ser possível alterar senha
    Quando clico no botão de alterar senha
    E altero a senha cadastrada
    E confirmo a operação
    Então terei minhas informações atualizadas

@deletarUsuarioModificado 
Cenário: Deve ser possível alterar nome e senha ao mesmo tempo
    Quando altero o nome cadastrado
    Quando clico no botão de alterar senha
    E altero a senha cadastrada
    E confirmo a operação
    Então terei minhas informações atualizadas

@deletarUsuario 
Cenário: Não deve ser possível alterar o email
    Quando tento alterar o email cadastrado
    Então não é possível alterá-lo


Cenário: Não deve ser possível alterar senha sem clicar no botão
    Quando tento alterar minha senha sem clicar no botão
    Então não é possível alterá-la


Cenário: Não deve ser possível alterar senha para que ela tenha mais de 12 caracteres
    Quando clico no botão de alterar senha
    E altero a senha cadastrada para que tenha 13 caracteres
    E confirmo a operação
    Então a senha não é alterada

@deletarUsuario 
Cenário: Não deve ser possível alterar senha para que ela tenha menos de 6 caracteres
    Quando clico no botão de alterar senha
    E altero a senha cadastrada para que ela tenha 5 caracteres
    E confirmo a operação
    Então aparece uma mensagem embaixo dos inputs de senha "A senha deve ter pelo menos 6 dígitos"

@deletarUsuario 
Cenário: O usuário deve conseguir cancelar uma operação de mudar senha
    Quando clico no botão de alterar senha
    E começo a alterar a senha
    Quando clico no botão de cancelar
    Então a operação é cancelada

@deletarUsuario 
Cenário: Não deve ser possível o usuário alterar senha passando um valor diferente no input de confirmação
    Quando clico no botão de alterar senha
    E passo um valor para senha
    E passo outro valor para a senha de confirmação
    E confirmo a operação
    Então aparece a mensagem 'As senhas devem ser iguais.'


Cenário: Não deve ser possível alterar informações sem passar a senha
    Quando altero o nome cadastrado
    E clico no botão de alterar senha
    Quando apago as senhas cadastradas
    E confirmo a operação
    Então aparece a mensagem 'Campo obrigatório'
    Então aparece a mensagem 'As senhas devem ser iguais.'


@deletarUsuario 
Cenário: Não deve ser possível usuário comum alterar o tipo de sua conta
    Dado que sou um usuário do tipo comum
    Então não deve ser possível alterar o tipo da conta

@deletarUsuario 
Cenário: Usuário não deve conseguir atualizar seu nome sem passar um valor de nome
    Quando apago o valor nome
    E confirmo a operação
    Então abaixo do input nome aparece a mensagem 'Informe o nome'

@deletarUsuario 
Cenário: Apenas um usuário logado pode acessar a seção de alterar informações de um usuário
    Quando volto à página de perfil
    E aperto logout
    Então sou direcionado para a página inicial
    E não há mais o link para o perfil do usuário

@deletarUsuario
Cenário: Na página de perfil o usuário consegue ver os filmes cadastrados
    Quando entro na página de perfil do usuário
    Então vejo os filmes que já avaliei

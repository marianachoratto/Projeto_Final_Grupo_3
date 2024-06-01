#language: pt

Funcionalidade: Gerenciar conta

Contexto: O usuário deve ter acesso à sua página de informações
    Dado que entrei no perfil do meu usuário já cadastrado
    E que acessei a funcionalidade de gerenciamento de conta

@criarUsuario
Cenário: As informações do usuário devem estar corretas na seção de gerenciar conta
    Então o nome cadastrado deve estar correto
    E o email deve estar correto
    E o usuário deve ser do tipo comum

@criarUsuario
Cenário: Deve ser possível alterar os próprios dados
    Quando informar um novo nome
    E habilitar a alteração de senha
    E informar uma nova senha e confirmá-la
    E confirmar a operação
    Então visualizarei a mensagem de sucesso "Informações atualizadas!"
    E verificarei meus nome alterado na tela

Cenário: Deve ser possível alterar apenas o nome
    Quando informar um novo nome
    E confirmar a operação
    Então visualizarei a mensagem de sucesso "Informações atualizadas!"
    E verificarei meus nome alterado na tela

Cenário: Deve ser possível alterar apenas a senha
    Quando habilitar a alteração de senha
    E informar uma nova senha e confirmá-la
    E confirmar a operação
    Então visualizarei a mensagem de sucesso "Informações atualizadas!"

Cenário: Não deve ser possível alterar o e-mail
    Quando acessar a opção Gerenciar Conta
    Então o campo e-mail deve estar desabilitado a edição

Cenário: Para o usuário comum não deve ser possível alterar o tipo de usuário
    Quando acessar a opção Gerenciar Conta
    Então o campo tipo de usuário deve estar desabilitado a edição




Cenário: Não deve ser possível alterar senha sem clicar no botão
    Quando tento alterar minha senha sem clicar no botão
    Então não é possível alterá-la


Cenário: Não deve ser possível alterar senha para que ela tenha mais de 12 caracteres
    Quando clico no botão de alterar senha
    E altero a senha cadastrada para que tenha 13 caracteres
    E confirmo a operação
    Então a senha não é alterada
 
Cenário: Não deve ser possível alterar senha para que ela tenha menos de 6 caracteres
    Quando clico no botão de alterar senha
    E altero a senha cadastrada para que ela tenha 5 caracteres
    E confirmo a operação
    Então aparece uma mensagem embaixo dos inputs de senha "A senha deve ter pelo menos 6 dígitos"
 
Cenário: O usuário deve conseguir cancelar uma operação de mudar senha
    Quando clico no botão de alterar senha
    E começo a alterar a senha
    Quando clico no botão de cancelar
    Então a operação é cancelada


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


Cenário: Não deve ser possível usuário comum alterar o tipo de sua conta
    Dado que sou um usuário do tipo comum
    Então não deve ser possível alterar o tipo da conta


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

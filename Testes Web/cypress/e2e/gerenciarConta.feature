#language: pt

Funcionalidade: Gerenciar conta

Contexto: O usuário deve ter acesso à sua página de informações
    Dado que entrei no perfil do meu usuário já cadastrado

@criarUsuario
Cenário: As informações do usuário devem estar corretas na página de perfil
    Então as iniciais, nome e email do usuário devem estar visíveis

@criarUsuario
Cenário: As informações do usuário devem estar corretas na seção de gerenciar conta
    Quando acessar a opção Gerenciar Conta
    Então o nome e email do usuário devem estar visíveis
    E o usuário deve ser do tipo Comum

@criarUsuario
Cenário: Não deve ser possível editar informações se o usuário não estiver autenticado
    Quando acessar a opção Logout
    E tentar acessar a funcionalidade de Gerenciamento de Conta
    Então serei redirecionado para a página de Login automaticamente

@criarUsuario
Cenário: Não deve ser possível alterar o e-mail
    Quando acessar a opção Gerenciar Conta
    Então o campo E-mail deve estar desabilitado a edição

@criarUsuario
Cenário: O usuário comum não deve conseguir alterar o tipo de usuário
    Quando acessar a opção Gerenciar Conta
    Então o campo Tipo de usuário deve estar desabilitado a edição

@criarUsuario
Cenário: Não deve ser possível alterar senha sem clicar no botão "Alterar senha"
    Quando acessar a opção Gerenciar Conta
    Então os campos Senha e Confirmar senha deven estar desabilitados a edição

@criarUsuario
Cenário: O usuário deve conseguir cancelar uma operação de alterar senha
    Quando acessar a opção Gerenciar Conta
    E habilitar a alteração de senha
    E começar a alterar a senha
    E clicar no botão de cancelar
    Então a alteração é cancelada

@criarUsuario
Esquema do Cenário: Deve ser possível alterar apenas o nome, informando valor de 1 a 100 dígitos
    Quando acessar a opção Gerenciar Conta
    E informar um novo nome '<nome>'
    E confirmar a operação
    Então visualizarei a mensagem de sucesso "Informações atualizadas!"
    E verificarei meu nome alterado na tela
    Exemplos:
    | nome  |
    |   A   |
    | Nome Com 100 Caracteres Nome Com 100 Caracteres Nome Com 100 Caracteres Nome Com 100 Caracteres Nome |

@criarUsuario
Esquema do Cenário: Deve ser possível alterar apenas a senha, informando valor de 6 a 12 dígitos
    Quando acessar a opção Gerenciar Conta
    E habilitar a alteração de senha
    E informar uma senha '<senha>' e confirmá-la
    E confirmar a operação
    Então visualizarei a mensagem de sucesso "Informações atualizadas!"
    E é possível fazer login com a nova senha
    Exemplos:
    |    senha     |
    | ABCDEFGHIJKL |
    |    123456    |

@criarUsuario
Cenário: Deve ser possível alterar nome e senha na mesma operação
    Quando acessar a opção Gerenciar Conta
    E habilitar a alteração de senha
    E informar um novo nome, uma nova senha e confirmá-la
    E confirmar a operação
    Então visualizarei a mensagem de sucesso "Informações atualizadas!"
    E verificarei meu nome alterado na tela

@criarUsuario
Esquema do Cenário: Não deve ser possível alterar senha se a confirmação de senha for divergente
    Quando acessar a opção Gerenciar Conta
    E habilitar a alteração de senha
    E informar uma senha '<senha>' diferente da confirmação '<confirmação>'
    E confirmar a operação
    Então visualizarei o alerta "As senhas devem ser iguais."
    Exemplos:
    | senha  | confirmação |
    | 123456 |   0123456   |
    | UVWXYZ |    ABCDEF   |

@criarUsuario
Esquema do Cenário: Não deve ser possível alterar senha menor que 6 dígitos
    Quando acessar a opção Gerenciar Conta
    E habilitar a alteração de senha
    E informar uma senha '<senha>' e confirmá-la
    E confirmar a operação
    Então visualizarei os alertas "A senha deve ter pelo menos 6 dígitos"
    Exemplos:
    | senha |
    |  ABC  |
    |   0   |

@criarUsuario
Esquema do Cenário: Não deve ser possível alterar senha maior que 12 dígitos
    Quando acessar a opção Gerenciar Conta
    E habilitar a alteração de senha
    E informar uma senha '<senha>' e confirmá-la
    E confirmar a operação
    Então visualizarei a mensagem de erro "Não foi possível atualizar os dados."
    Exemplos:
    |     senha     |
    | ABCDEFGHIJKLM |
    | 1234567890000 |

@criarUsuario
Cenário: Não deve ser possível alterar senha sem informar um valor de senha
    Quando acessar a opção Gerenciar Conta
    E habilitar a alteração de senha
    E confirmar a operação
    Então visualizarei o alerta "Campo obrigatório"
    E visualizarei o alerta "As senhas devem ser iguais."

@criarUsuario
Cenário: Não deve ser possível alterar senha informando espaços em branco (apertar barra de espaço)
    Quando acessar a opção Gerenciar Conta
    E habilitar a alteração de senha
    E informar um espaço em branco na senha
    E confirmar a operação
    Então visualizarei a mensagem de erro "Não foi possível atualizar os dados."

@criarUsuario
Cenário: Não deve ser possível alterar nome informando valor maior que 100 dígitos
    Quando acessar a opção Gerenciar Conta
    E informar um nome maior que 100 caracteres
    E confirmar a operação
    Então visualizarei o alerta "O nome deve ter no máximo 100 dígitos."

@criarUsuario
Cenário: Não deve ser possível alterar nome sem informar um valor de nome
    Quando acessar a opção Gerenciar Conta
    E limpar o campo Nome
    E confirmar a operação
    Então visualizarei o alerta "Informe o nome."

@criarUsuario
Cenário: Não deve ser possível alterar nome informando espaço em branco (apertar barra de espaço)
    Quando acessar a opção Gerenciar Conta
    E informar um espaço em branco no nome
    E confirmar a operação
    Então visualizarei a mensagem de erro "Não foi possível atualizar os dados."

@criarUsuario
Cenário: Usuário crítico consegue atualizar seus próprios dados e visualizar tipo de usuário
    Dado que meu perfil foi promovido a Crítico
    Quando acessar a opção Gerenciar Conta
    E habilitar a alteração de senha
    E informar um novo nome, uma nova senha e confirmá-la
    E confirmar a operação
    Então visualizarei a mensagem de sucesso "Informações atualizadas!"
    E verificarei meu nome alterado na tela
    E o usuário deve ser do tipo Crítico

@criarUsuario
Cenário: Usuário administrador consegue atualizar seus próprios dados e visualizar tipo de usuário
    Dado que meu perfil foi promovido a Administrador
    Quando acessar a opção Gerenciar Conta
    E habilitar a alteração de senha
    E informar um novo nome, uma nova senha e confirmá-la
    E confirmar a operação
    Então visualizarei a mensagem de sucesso "Informações atualizadas!"
    E verificarei meu nome alterado na tela
    E o usuário deve ser do tipo Administrador
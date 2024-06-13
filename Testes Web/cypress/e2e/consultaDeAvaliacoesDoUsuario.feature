#language: pt

Funcionalidade: Consulta de avaliações do usuário

Contexto: O usuário deve ter realizado avaliações de filmes
    Dado que avaliei filmes cadastrados no sistema


Cenário: As avaliações feitas pelo usuário devem estar listadas na página Perfil
    Quando acessar a página Perfil
    Então visualizarei todas as avaliações feitas por mim


Cenário: As avaliações listadas devem exibir título
    Quando acessar a página Perfil
    Então verificarei os títulos das minhas avaliações


Cenário: As avaliações listadas devem exibir nota
    Quando acessar a página Perfil
    Então verificarei as notas das minhas avaliações


Cenário: As avaliações listadas devem exibir texto avaliativo
    Quando acessar a página Perfil
    Então verificarei os textos das minhas avaliações


Cenário: É possível acessar os detalhes do filme avaliado e atualizar a avaliação
    Quando acessar a página Perfil
    E clicar na avaliação desejada
    Então visualizarei os detalhes do filme avaliado
    E atualizarei minha avaliação


Cenário: A avaliação atualizada pelo usuário deverá ser atualizada na página Perfil
    Quando atualizar uma avaliação
    E acessar a página Perfil
    Então visualizarei a avaliação atualizada


Cenário: Não deve ser possível consultar avaliações se o usuário não estiver autenticado
    Quando acessar a opção Logout
    E tentar acessar a página Perfil
    Então serei redirecionado para a página de Login automaticamente


Cenário: Não deve ser possível consultar avaliação de filme excluído do sistema
    Dado que o filme avaliado foi excluído
    Quando acessar a página Perfil
    Então a avaliação do filme excluído também será excluída


Cenário: Não deve ser possível visualizar avaliação feita por outro usuário 
    Dado que outro usuário avaliou o mesmo filme que eu
    Quando acessar a página Perfil
    Então visualizarei somente a minha avaliação


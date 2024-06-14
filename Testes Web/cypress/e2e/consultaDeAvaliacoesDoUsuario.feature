#language: pt

Funcionalidade: Consulta de avaliações do usuário

Contexto: O usuário deve estar autenticado, ter avaliações cadastradas e acessar o Perfil
    Dado que acessei o meu Perfil

Cenário: As avaliações feitas pelo usuário devem estar listadas na página Perfil
    Então visualizarei todas as avaliações feitas por mim

Cenário: As avaliações listadas devem exibir título
    Então verificarei os títulos das minhas avaliações

Cenário: As avaliações listadas devem exibir nota
    Então verificarei as notas das minhas avaliações

# Bug
Cenário: As avaliações listadas devem exibir texto avaliativo
    Então verificarei os textos das minhas avaliações

Cenário: É possível acessar os detalhes do filme avaliado e atualizar a avaliação
    Quando clicar na avaliação desejada
    Então visualizarei os detalhes do filme avaliado
    E atualizarei minha avaliação

Cenário: A avaliação atualizada pelo usuário deverá ser exibida na página Perfil
    Quando atualizar uma avaliação
    E acessar a página Perfil novamente
    Então visualizarei a avaliação atualizada

Cenário: Não deve ser possível consultar avaliações se o usuário não estiver autenticado
    Quando clicar em Logout
    E acessar a página Perfil novamente
    Então serei redirecionado para a página de Login automaticamente

Cenário: Não deve ser possível visualizar avaliação feita por outro usuário 
    Dado que outro usuário avaliou o mesmo filme que eu
    Quando acessar a página Perfil novamente
    Então visualizarei somente as minhas avaliações

Cenário: Não deve ser possível consultar avaliação de filme excluído do sistema
    Dado que um dos filmes avaliados foi excluído
    Quando acessar a página Perfil novamente
    Então não será possível consultar a avaliação do filme excluído
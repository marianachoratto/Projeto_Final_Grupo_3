#language: pt

Funcionalidade: Pesquisa de filme

Contexto: O usuário deve ter acesso à página inicial
    Dado que acessei a página inicial

# Esquema do Cenário: Deve ser possível encontrar filme informando o título completo, em letras maiúsculas ou minúsculas
#     Quando informar o título completo '<título>' na barra de busca
#     E clicar no botão de pesquisa
#     Então visualizarei o filme correspondente na tela
#     Exemplos:
#     | título |
#     | Piratas do Caribe 2 - O Bau da Morte! |
#     | PIRATAS DO CARIBE 2 - O BAU DA MORTE! |
#     | piratas do caribe 2 - o bau da morte! |

# Cenário: Deve ser possível encontrar filme informando título parcial
#     Quando informar parte do título na barra de busca
#     E clicar no botão de pesquisa
#     Então visualizarei todos os filmes que contém o texto pesquisado

# Cenário: Deve ser possível encontrar filme informando título com 100 caracteres
#     Quando informar o título com 100 caracteres
#     E clicar no botão de pesquisa
#     Então encontrarei o filme correspondente ao título pesquisado

# Cenário: Deve ser possível encontrar filme informando título com caracteres especiais
#     Quando informar os caracteres especiais na barra de busca
#     E clicar no botão de pesquisa
#     Então visualizarei o filme correspondente ao título pesquisado

# Cenário: Deve retornar lista vazia ao pesquisar um título não cadastrado
#     Quando informar um título não cadastrado na barra de busca
#     E clicar no botão de pesquisa
#     Então visualizarei a mensagem "Nenhum filme encontrado"

# Cenário: Não deve ser possível encontrar um filme pelo ID
#     Quando informar o ID do filme
#     E clicar no botão de pesquisa
#     Então não será possível encontrar o filme

# Cenário: Não deve ser possível encontrar um filme pelo gênero
#     Quando informar o gênero do filme
#     E clicar no botão de pesquisa
#     Então não será possível encontrar o filme

# Cenário: Não deve ser possível encontrar um filme pela descrição
#     Quando informar a descrição do filme
#     E clicar no botão de pesquisa
#     Então não será possível encontrar o filme

# Cenário: Não deve ser possível encontrar um filme pelo ano de lançamento
#     Quando informar o ano de lançamento do filme
#     E clicar no botão de pesquisa
#     Então não será possível encontrar o filme

@criarUser
Cenário: Usuário não logado no sistema consegue acessar a pesquisa de filmes
    Quando informar o título na barra de busca
    E clicar no botão de pesquisa
    Então visualizarei o filme correspondente na tela
    E consultarei mais detalhes do filme

@criarUser
Cenário: Usuário Comum consegue acessar a pesquisa de filmes
    Dado que fiz login sendo um usuário comum
    Quando informar o título na barra de busca
    E clicar no botão de pesquisa
    Então visualizarei o filme correspondente na tela
    E consultarei mais detalhes do filme

@criarUser
Cenário: Usuário Crítico consegue acessar a pesquisa de filmes
    Dado que fiz login sendo um usuário crítico
    Quando informar o título na barra de busca
    E clicar no botão de pesquisa
    Então visualizarei o filme correspondente na tela
    E consultarei mais detalhes do filme

@criarUser
Cenário: Usuário Administrador consegue acessar a pesquisa de filmes
    Dado que fiz login sendo um usuário administrador
    Quando informar o título na barra de busca
    E clicar no botão de pesquisa
    Então visualizarei o filme correspondente na tela
    E consultarei mais detalhes do filme
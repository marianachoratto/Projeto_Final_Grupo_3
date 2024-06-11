#language: pt

Funcionalidade: Pesquisa de filme

Esquema do Cenário: Deve ser possível encontrar filme informando o título completo, em letras maiúsculas ou minúsculas
    Dado que acessei a página inicial
    Quando informar o título completo '<título>' na barra de busca
    E clicar no botão de pesquisa
    Então visualizarei o filme correspondente na tela
    Exemplos:
    | título |
    | Piratas do Caribe 2 - O Bau da Morte! |
    | PIRATAS DO CARIBE 2 - O BAU DA MORTE! |
    | piratas do caribe 2 - o bau da morte! |

Cenário: Deve ser possível encontrar filme informando título parcial
    Dado que acessei a página inicial
    Quando informar parte do título na barra de busca
    E clicar no botão de pesquisa
    Então visualizarei todos os filmes que contém o texto pesquisado


# Cenário: Deve ser possível encontrar filme informando título com caracteres especiais
#     Dado que acessei a página inicial
#     Quando informar os caracteres especiais do título
#     E clicar no botão de pesquisa
#     Então visualizarei o filme correspondente aos caracteres na tela
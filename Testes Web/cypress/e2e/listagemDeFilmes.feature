#language: pt

Funcionalidade: Listagem de filmes 

Contexto: O usuario deseja ver a lista de filmes catalogados 
    Dado que entrei na pagina inical 

# Cenario: É possivel ver a lista de filmes estando sem logar
#     Entao é possivel ver a lista de filmes cadastrados 

# @createUser @login @deleteUser
# Cenario: É possivel ver a lista de filmes sendo usuario comum
#     Entao é possivel ver a lista de filmes cadastrados

 
# Cenario: Caso existam mais de 4 filmes cadastrados deve ser possivel passar a lista para o lado e voltar
#     Quando existem mais de 4 filmes cadastrados 
#     Entao é possivel passar os carrosseis para os lados

# @createUser @loginApi @deleteUser (terminarainda)
# Cenario:caso existam filmes avaliados a ordem da lista mais bem avaliados deve ser do maior para o menor 
#     Quando existem mais de 4 filmes cadastrados
#     Entao a lista dos mais bem avaliados deve estar em ordem do maior para o menor 

Cenario: caso nao existam filmes na lista uma mensagem de deve avisar 
    Quando nao esxitem filmes na lista de filmes 
    Entao uma mensagem deve avisar ao usuario 

# testar paginaçao e botoes todos 
# deve ser possivel ver mais detalhes dos filmes 
#deve ser possivel ver uma lista com todos os filmes 
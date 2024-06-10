#language: pt

Funcionalidade: Listagem de filmes 

Contexto: O usuario deseja ver a lista de filmes catalogados 
    Dado que entrei na pagina inical 

# Cenario: É possivel ver a lista de filmes estando sem logar
#     Entao é possivel ver a lista de filmes cadastrados 

# @createUser @login @deleteUser
# Cenario: É possivel ver a lista de filmes sendo usuario comum
#     Entao é possivel ver a lista de filmes cadastrados

 
Cenario: Caso existam mais de seis filmes cadastrados deve ser possivel passar a lista para o lado e voltar
    Quando que existem mais de seis filmes cadastrados 
    # Entao é possivel passar o carrossel para os lados 
# caso existam filmes avaliados a ordem da lista mais bem avaliados deve ser do maior para o menor 
# caso nao existam filmes na lista deve ser possivel fazer alguma coisa 
# testar paginaçao e botoes todos 
# deve ser possivel ver mais detalhes dos filmes 
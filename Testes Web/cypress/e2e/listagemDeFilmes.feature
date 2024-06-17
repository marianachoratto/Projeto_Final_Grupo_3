#language: pt

Funcionalidade: Listagem de filmes

Contexto: O usuario deseja ver a lista de filmes catalogados
    Dado que entrei na pagina inical

@listaDestaque
Cenario: É possivel ver a lista de filmes estando sem logar
    Entao é possivel ver a lista de filmes cadastrados

@createUser @login @deleteUser @listaDestaque
Cenario: É possivel ver a lista de filmes sendo usuario comum
    Entao é possivel ver a lista de filmes cadastrados


@listaDestaque @listaBemAvaliados
Cenario: Caso existam mais de 5 filmes cadastrados deve ser possivel passar a lista para o lado e voltar
    Quando existem mais de 5 filmes cadastrados
    Entao é possivel passar os carrosseis para os lados

@listaDestaque @listaBemAvaliados 
Cenario:caso existam filmes avaliados a ordem da lista mais bem avaliados deve ser do maior para o menor
    Quando existem mais de 5 filmes cadastrados
    Entao a lista dos mais bem avaliados deve estar em ordem do maior para o menor

@listaVazia
Cenario: caso nao existam filmes na lista uma mensagem de deve avisar
    Quando nao esxitem filmes na lista de filmes
    Entao uma mensagem deve avisar ao usuario

Cenario: a paginaçao e todos os seus botoes deve esta funcionando
    Entao todos os botoes da paginaçao devem funcionar

@listaDestaque
Cenario: deve ser possivel ver mais detalhes dos filmes
    Quando existe algum filme ou filmes cadastrados
    Entao é possivel ver mais detalhes dos filmes

@listaDestaque1 @listaBemAvaliados1
Cenario: Caso exista mais de 1 filme cadastrado nao deve ser possivel passar a lista para o lado e voltar
    Quando existe um filme cadastrado
    Entao nao posso usar o carrossel
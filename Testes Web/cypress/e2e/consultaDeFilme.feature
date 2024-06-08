#language: pt

Funcionalidade: Consulta filme

Cenário: Visualizando filme com usuário deslogado
    Dado que acesso filme estando deslogado
    Quando quando visualizo a pagina do filme
    Então consigo ver os detalhes do filme
    E tenho uma opção de realizar login para avaliar filme

Cenário: Visualizando filme com usuário comum
    Dado que acesso filme com usuário comum
    Quando quando visualizo a pagina do filme
    Então consigo ver os detalhes do filme
    E consigo ver uma opção para avaliar o filme

Cenário: Visualizando filme com usuário crítico
    Dado que acesso filme com usuário crítico
    Quando quando visualizo a pagina do filme
    Então consigo ver os detalhes do filme
    E consigo ver uma opção para avaliar o filme

Cenário: Visualizando filme com usuário admin
    Dado que acesso filme com usuário admin
    Quando quando visualizo a pagina do filme
    Então consigo ver os detalhes do filme
    E consigo ver uma opção para avaliar o filme
#language: pt

Funcionalidade: Consulta de informações detalhadas de filmes


@validação @limparValidação
Cenário: Visualizando filme com usuário deslogado
    Dado que acesso filme estando deslogado
    Quando quando visualizo a pagina do filme
    Então consigo ver os detalhes do filme
    E tenho uma opção de realizar login para avaliar filme
    E as reviews publicadas estão visíveis

@validação @limparValidação
Cenário: Visualizando filme com usuário comum
    Dado que acesso filme com usuário comum
    Quando quando visualizo a pagina do filme
    Então consigo ver os detalhes do filme
    E consigo ver uma opção para avaliar o filme
    E as reviews publicadas estão visíveis

@validação @limparValidação
Cenário: Visualizando filme com usuário crítico
    Dado que acesso filme com usuário crítico
    Quando quando visualizo a pagina do filme
    Então consigo ver os detalhes do filme
    E consigo ver uma opção para avaliar o filme
    E as reviews publicadas estão visíveis

@validação @limparValidação
Cenário: Visualizando filme com usuário admin
    Dado que acesso filme com usuário admin
    Quando quando visualizo a pagina do filme
    Então consigo ver os detalhes do filme
    E consigo ver uma opção para avaliar o filme
    E as reviews publicadas estão visíveis

@reviewsComum @deleteAll
Cenário: Validando reviews comum
    Dado que acesso um filme
    Quando visualizo as avaliações
    Então as avaliações comuns correspondem a média de avaliações dos usuários comuns

@reviewsCritico @deleteAll
Cenário: Validando reviews críticos
    Dado que acesso um filme
    Quando visualizo as avaliações
    Então as avaliações da crítica correspondem a média de avaliações dos usuários críticos

@reviewsAdmin @deleteAll
Cenário: Validando reviews críticos
    Dado que acesso um filme
    Quando visualizo as avaliações
    Então as avaliações dos admins não são contabilizados nas avaliações    
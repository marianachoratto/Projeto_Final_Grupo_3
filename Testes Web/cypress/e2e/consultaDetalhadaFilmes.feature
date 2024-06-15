#language: pt

Funcionalidade: Consulta de informações detalhadas de filmes


@reviewsUsuariosComuns @deleteAll
Cenário: Visualizando filme com usuário deslogado
    Dado que acesso filme estando deslogado
    Quando visualizo a pagina do filme
    Então consigo ver os detalhes do filme

@reviewsUsuariosComuns @deleteAll    
Cenário: Visualizando opção para realizar review com usuário deslogado
    Dado que acesso filme estando deslogado
    Quando visualizo a pagina do filme
    Então tenho uma opção de realizar login para avaliar filme

@reviewsUsuariosComuns @deleteAll
Cenário: Visualizando reviews publicadas com usuário deslogado
    Dado que acesso filme estando deslogado
    Quando visualizo a pagina do filme
    Então as reviews publicadas estão visíveis

@reviewsUsuariosComuns @deleteAll
Cenário: Visualizando filme com usuário comum
    Dado que acesso filme com usuário comum
    Quando visualizo a pagina do filme
    Então consigo ver os detalhes do filme

@reviewsUsuariosComuns @deleteAll
Cenário: Visualizando opção para realizar review com usuário comum
    Dado que acesso filme com usuário comum
    Quando visualizo a pagina do filme
    Então consigo ver uma opção para avaliar o filme

@reviewsUsuariosComuns @deleteAll
Cenário: Visualizando reviews publicadas com usuário comum
    Dado que acesso filme com usuário comum
    Quando visualizo a pagina do filme
    Então as reviews publicadas estão visíveis

@reviewsUsuariosComuns @deleteAll
Cenário: Visualizando filme com usuário crítico
    Dado que acesso filme com usuário crítico
    Quando visualizo a pagina do filme
    Então consigo ver os detalhes do filme  

@reviewsUsuariosComuns @deleteAll
Cenário: Visualizando opção para realizar review com usuário crítico
    Dado que acesso filme com usuário crítico
    Quando visualizo a pagina do filme
    Então consigo ver uma opção para avaliar o filme

@reviewsUsuariosComuns @deleteAll
Cenário: Visualizando reviews publicadas com usuário crítico
    Dado que acesso filme com usuário crítico
    Quando visualizo a pagina do filme
    Então as reviews publicadas estão visíveis

@reviewsUsuariosComuns @deleteAll
Cenário: Visualizando filme com usuário admin
    Dado que acesso filme com usuário admin
    Quando visualizo a pagina do filme
    Então consigo ver os detalhes do filme

@reviewsUsuariosComuns @deleteAll    
Cenário: Visualizando opção para realizar review com usuário admin
    Dado que acesso filme com usuário admin
    Quando visualizo a pagina do filme
    Então consigo ver uma opção para avaliar o filme

@@reviewsUsuariosComuns @deleteAll
Cenário: Visualizando reviews publicadas com usuário admin
    Dado que acesso filme com usuário admin
    Quando visualizo a pagina do filme
    Então as reviews publicadas estão visíveis

@reviewsUsuariosComuns @deleteAll
Cenário: Validando reviews de usuários comuns
    Dado que acesso um filme
    Quando visualizo as avaliações
    Então as avaliações comuns correspondem a média de avaliações dos usuários comuns

@reviewsUsuariosCriticos @deleteAll
Cenário: Validando reviews  de usuários críticos
    Dado que acesso um filme
    Quando visualizo as avaliações
    Então as avaliações da crítica correspondem a média de avaliações dos usuários críticos

@reviewsUsuariosAdmins @deleteAll
Cenário: Validando reviews de usuários admins
    Dado que acesso um filme
    Quando visualizo as avaliações
    Então as avaliações dos admins não são contabilizados nas avaliações    
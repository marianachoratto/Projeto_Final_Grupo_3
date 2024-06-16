*** Settings ***

Resource    ../../base.robot

*** Keywords ***
Dado que estou na página inicial do aplicativo
    Pega o atributo do elemento e verifica se tem o texto esperado    ${TITULO_HOME}    Home    content-desc

Quando clico em um filme
    Wait Until Keyword Succeeds    4    0    Espera o elemento para clicar e checa se está habilitado    ${CARD_FILME}

Dado que tenho um usuário comum cadastrado
    Iniciar sessão na API
    Cadastrar usuario comum na API

Dado que tenho um usuário administrador cadastrado
    Iniciar sessão na API
    Cadastrar usuario comum na API
    Logar na API
    Virar administrador na API
    Criar filme na API

Dado que tenho um usuário crítico cadastrado
    Iniciar sessão na API
    Cadastrar usuario comum na API
    Logar na API
    Virar administrador na API
    Criar filme na API
    Virar usuário crítico na API

Então sou redirecionada para a página inicial
    Pega o atributo do elemento e verifica se tem o texto esperado    ${TITULO_HOME}    Home    content-desc

Então tenho acesso às suas informações
    Pega o atributo do elemento e verifica se tem o texto esperado    ${TITULO_DETALHES_DO_FILME}    Detalhes do filme    content-desc
    Wait Until Page Contains Element    ${ANO_DE_LANCAMENTO}
    Page Should Contain Text    Ano de Lançamento:
    Page Should Contain Text    Duração:
    Page Should Contain Text    Gênero:
    Iniciar sessão na API
    Cadastrar usuario comum na API
    Deletar usuário

Então tenho acesso às suas informações técnicas
    Pega o atributo do elemento e verifica se tem o texto esperado    ${TITULO_DETALHES_DO_FILME}    Detalhes do filme    content-desc
    Wait Until Page Contains Element    ${ANO_DE_LANCAMENTO}
    Page Should Contain Text    Ano de Lançamento:
    Page Should Contain Text    Duração:
    Page Should Contain Text    Gênero:
    Logar na API
    Virar administrador na API
    Deletar usuário e filme

Quando faço login
    Espera o elemento para clicar    ${MENU}
    Espera o elemento para clicar    ${BOTÃO_LOGIN}
    Espera o elemento para clicar    ${LOGIN_INPUT_EMAIL}
    Input Text    ${LOGIN_INPUT_EMAIL}    ${email}
    Espera o elemento para clicar    ${LOGIN_INPUT_SENHA}
    Input Text    ${LOGIN_INPUT_SENHA}    123456
    Espera o elemento para clicar    ${BOTAO_FAZER_LOGIN}

Então tenho acesso às avaliações da audiência e crítica  
    Wait Until Element Is Visible    ${TITULO_DETALHES_DO_FILME}
    Swipe By Percent    0    70    0    23
    Wait Until Keyword Succeeds    4    0    Element Should Be Visible    ${AVALIACOES_AUDIENCIA}
    Wait Until Keyword Succeeds    4    0    Element Should Be Visible    ${AVALIACOES_CRITICA}
    Deletar usuário e filme

Então tenho acesso à sessão de avaliações feita pelos usuários
    Wait Until Element Is Visible    ${TITULO_DETALHES_DO_FILME}
    Swipe By Percent    0    70    0    23
    Wait Until Keyword Succeeds    4    0    Page Should Contain Text    Avaliações
    Deletar usuário e filme

Então posso ver ser nome, ano de lançamento, gênero e descrição
    Get Lista de Filmes 
    Set Global Variable    ${FILME_1}    ${lista_de_filmes}[0]
    Pega o atributo do elemento e verifica se tem o texto esperado    ${PAGINA_DO_FILME}    ${FILME_1}[title]    content-desc
    Pega o atributo do elemento e verifica se tem o texto esperado    ${PAGINA_DO_FILME}    ${FILME_1}[genre]    content-desc
    ${FILME_1_RELEASEYEAR}    Convert To String    ${FILME_1}[releaseYear]
    Pega o atributo do elemento e verifica se tem o texto esperado    ${PAGINA_DO_FILME}    ${FILME_1_RELEASEYEAR}    content-desc
    Pega o atributo do elemento e verifica se tem o texto esperado    ${PAGINA_DO_FILME}    ${FILME_1}[description]    content-desc
    Deletar usuário e filme
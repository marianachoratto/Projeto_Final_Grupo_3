*** Settings ***

Resource    ../../base.robot

*** Keywords ***
Dado que estou na página inicial do aplicativo
    Pega o atributo do elemento e verifica se tem o texto esperado    ${TITULO_HOME}    Home    content-desc

Quando clico em um filme
    Espera o elemento para clicar e checa se está habilitado    ${CARD_FILME}

Então tenho acesso às suas informações
    Pega o atributo do elemento e verifica se tem o texto esperado    ${TITULO_DETALHES_DO_FILME}    Detalhes do filme    content-desc
    Wait Until Page Contains Element    ${ANO_DE_LANCAMENTO}
    Page Should Contain Text    Ano de Lançamento:
    Page Should Contain Text    Duração:
    Page Should Contain Text    Gênero:

Então tenho acesso às suas informações técnicas
    Pega o atributo do elemento e verifica se tem o texto esperado    ${TITULO_DETALHES_DO_FILME}    Detalhes do filme    content-desc
    Wait Until Page Contains Element    ${ANO_DE_LANCAMENTO}
    Page Should Contain Text    Ano de Lançamento:
    Page Should Contain Text    Duração:
    Page Should Contain Text    Gênero:
    Logar na API
    Virar administrador na API
    Deletar usuário na API

Quando faço login
    Espera o elemento para clicar    ${MENU}
    Espera o elemento para clicar    ${BOTÃO_LOGIN}
    Espera o elemento para clicar    ${INPUT_EMAIL}
    Sleep    2
    Input Text    ${INPUT_EMAIL}     ${email}
    Espera o elemento para clicar    ${INPUT_SENHA}
    Input Text    ${INPUT_SENHA}    123456
    Espera o elemento para clicar    ${BOTAO_FAZER_LOGIN}

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

Então tenho acesso às avaliações da audiência e crítica  
    Wait Until Element Is Visible    ${TITULO_DETALHES_DO_FILME}
    Wait Until Keyword Succeeds    4    0    Element Should Be Visible    ${AVALIACOES_AUDIENCIA}
    Wait Until Keyword Succeeds    4    0    Element Should Be Visible    ${AVALIACOES_CRITICA}

Então tenho acesso à sessão de avaliações feita pelos usuários
    Wait Until Element Is Visible    ${TITULO_DETALHES_DO_FILME}
    Swipe By Percent    0    70    0    23
    Wait Until Keyword Succeeds    4    0    Page Should Contain Text    Avaliações
Quando clico em um filme
    Espera o elemento para clicar e checa se está habilitado    ${CARD_FILME}

Então tenho acesso às suas informações
    Pega o atributo do elemento e verifica se tem o texto esperado    ${TITULO_DETALHES_DO_FILME}    Detalhes do filme    content-desc
    Wait Until Page Contains Element    ${ANO_DE_LANCAMENTO}
    Page Should Contain Text    Ano de Lançamento:
    Page Should Contain Text    Duração:
    Page Should Contain Text    Gênero:
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
    Espera o elemento para clicar    ${INPUT_EMAIL}
    Input Text    ${INPUT_EMAIL}    ${email}
    Espera o elemento para clicar    ${INPUT_SENHA}
    Input Text    ${INPUT_SENHA}    123456
    Espera o elemento para clicar    ${BOTAO_FAZER_LOGIN}

Quando faço login 2
    Espera o elemento para clicar    ${BOTÃO_LOGIN}
    Espera o elemento para clicar    ${INPUT_EMAIL}
    Input Text    ${INPUT_EMAIL}    ${email}
    Espera o elemento para clicar    ${INPUT_SENHA}
    Input Text    ${INPUT_SENHA}    123456
    Espera o elemento para clicar    ${BOTAO_FAZER_LOGIN}
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

Dado que tenho um usuário crítico cadastrado 2
        Iniciar sessão na API
    Cadastrar usuario comum na API
    Logar na API
    Virar administrador na API
    Virar usuário crítico na API
Então sou redirecionada para a página inicial
    Pega o atributo do elemento e verifica se tem o texto esperado    ${TITULO_HOME}    Home    content-desc

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

# Dado que tenho um filme com reviews cadastradas
#     # 1 usuário comum
#     Dado que tenho um usuário comum cadastrado
#     Quando faço login
#     E faço uma review
#     Dado que tenho um usuário crítico cadastrado
#     Press Keycode    4
#     Click Element    locator
#     Quando faço login
#     E faço uma review

    # # 2 usuários críticos
    # FOR    ${counter}    IN RANGE    0    2
    # Dado que tenho um usuário crítico cadastrado
    # END
    # # 1 usuário admin
    # Dado que tenho um usuário administrador cadastrado

Dado que tenho vários usuários cadastrados e cada um faz uma review
    # 1 usuário 
    Dado que tenho um usuário comum cadastrado
    Get Lista de Filmes
    ${filme1}    Set Variable    ${lista_de_filmes}[0]
    Criar review de filme API    ${filme1}[id]
    # 2 usuários críticos
    FOR    ${counter}    IN RANGE    0    2
    Dado que tenho um usuário crítico cadastrado 2
    Criar review de filme API    ${filme1}[id]    
    END
    # 1 usuário admin
    Dado que tenho um usuário administrador cadastrado
    Criar review de filme API    ${filme1}[id]
    Procurar filme pelo ID    ${filme1}[id]

Então consigo ver a quantidade de avaliações que aquele filme recebeu
    Element Should Contain Text    ${AVALIACOES_AUDIENCIA}    Avaliação da audiência ${QUANTIDADE_REVIEW_COMUM} avaliações
    Element Should Contain Text    ${AVALIACOES_CRITICA}    Avaliação da crítica ${QUANTIDADE_REVIEW_CRÍTICO} avaliações
    # Asserção
    # NÃO ESQUECER DE DELETAR OS USUÁRIOS

Então posso ver ser nome, ano de lançamento, gênero e descrição
    Get Lista de Filmes 
    Set Global Variable    ${FILME_1}    ${lista_de_filmes}[0]
    Pega o atributo do elemento e verifica se tem o texto esperado    ${PAGINA_DO_FILME}    ${FILME_1}[title]    content-desc
    Pega o atributo do elemento e verifica se tem o texto esperado    ${PAGINA_DO_FILME}    ${FILME_1}[genre]    content-desc
    ${FILME_1_RELEASEYEAR}    Convert To String    ${FILME_1}[releaseYear]
    Pega o atributo do elemento e verifica se tem o texto esperado    ${PAGINA_DO_FILME}    ${FILME_1_RELEASEYEAR}    content-desc
    Pega o atributo do elemento e verifica se tem o texto esperado    ${PAGINA_DO_FILME}    ${FILME_1}[description]    content-desc
    Deletar usuário e filme
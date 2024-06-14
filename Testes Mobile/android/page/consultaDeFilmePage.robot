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
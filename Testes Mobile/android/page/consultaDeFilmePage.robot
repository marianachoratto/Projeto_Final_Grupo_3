*** Settings ***

Resource    ../../base.robot

*** Keywords ***
Dado que estou na página inicial do aplicativo
    Pega o atributo do elemento e verifica se tem o texto esperado    ${TITULO_HOME}    Home    content-desc

Quando clico em um filme
    Espera o elemento para clicar e checa se está habilitado    ${CARD_FILME}

Então tenho acesso às suas informações
    Pega o atributo do elemento e verifica se tem o texto esperado    ${TITULO_DETALHES_DO_FILME}    Detalhes do filme    content-desc
    Page Should Contain Text    Ano de Lançamento
    Page Should Contain Text    Duração
    Page Should Contain Text    Gênero

Quando faço login
    Espera o elemento para clicar    ${MENU}
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

Então sou redirecionada para a página inicial
    Pega o atributo do elemento e verifica se tem o texto esperado    ${TITULO_HOME}    Home    content-desc
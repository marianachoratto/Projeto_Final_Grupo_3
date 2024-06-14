*** Settings ***

Resource    ../../base.robot

*** Variables ***
${REVIEW_500_CHARACTERS}    a


*** Keywords ***
Quando clico em um filme e no botão de avaliações
    Espera o elemento para clicar e checa se está habilitado    ${CARD_FILME}
    Espera o elemento para clicar    ${BOTAO_COMENTARIO}

E escrevo um comentário
    Wait Until Element Is Visible    ${DÊ_NOTA_AO_FILME}
    Click Element    ${CAIXA_TEXTO}
    Input Text    ${CAIXA_TEXTO}    "Gostei do filme"
    Click Element    ${BOTAO_SALVAR}

Então aparecerá uma mensagem dizendo para fazer login
    Wait Until Element Is Visible    ${MENSAGEM_LOGIN}


E faço uma review
    Wait Until Keyword Succeeds    4    0    Click Element    ${CARD_FILME}
    Wait Until Element Is Visible    ${TITULO_DETALHES_DO_FILME}
    Wait Until Keyword Succeeds    4    0    Espera o elemento para clicar    ${BOTAO_COMENTARIO}
    Wait Until Element Is Visible    ${DÊ_NOTA_AO_FILME}
    Click Element    ${CAIXA_TEXTO}
    Input Text    ${CAIXA_TEXTO}    "Gostei bastante do filme."
    Click Element    ${ESTRELA_5}
    Click Element    ${BOTAO_SALVAR}
    Press Keycode    4
    Press Keycode    4

Então ela aparece na sessão de avaliações do filme
    Swipe By Percent    0    70    0    23
    Element Should Be Visible    ${COMENTÁRIO_USUÁRIO}
    Deletar usuário e filme

Dado que tenho um filme cadastrado
    Iniciar sessão na API
    Cadastrar usuario comum na API
    Logar na API
    Virar administrador na API
    Criar filme na API

Dado que tenho um filme cadastrado na API
    Iniciar sessão na API
    Cadastrar usuario comum na API
    Logar na API
    Virar administrador na API
    Criar filme na API
    Deletar usuário na API

E dou nota ao filme, mas não escrevo texto
    Wait Until Element Is Visible    ${DÊ_NOTA_AO_FILME}
    Click Element    ${ESTRELA_5}
    Click Element    ${BOTAO_SALVAR}
    Press Keycode    4
    Press Keycode    4

Então a review aparecerá na lista de avaliações
    Wait Until Element Is Visible    ${TITULO_DETALHES_DO_FILME}

E digito uma avaliação contendo mais de 500 caracteres
    ${string_construida}=    Set Variable    ${EMPTY}
    FOR    ${index}    IN RANGE    0    501
        ${string_construida}=    Catenate    SEPARATOR=    ${string_construida}    ${REVIEW_500_CHARACTERS}
    END
    Log    ${string_construida}

    Wait Until Element Is Visible    ${DÊ_NOTA_AO_FILME}
    Click Element    ${CAIXA_TEXTO}
    Input Text    ${CAIXA_TEXTO}    ${string_construida}
    Click Element    ${ESTRELA_5}
    Click Element    ${BOTAO_SALVAR}
    Press Keycode    4
    Press Keycode    4

Então aparece uma mensagem de erro
    Wait Until Element Is Visible    ${MENSAGEM_ERRO}    
    Deletar usuário e filme

Dado que tenho uma review cadastrada
    Dado que tenho um filme cadastrado
    Dado que tenho um usuário comum cadastrado
    Quando faço login
    Wait Until Keyword Succeeds    4    0    Click Element    ${CARD_FILME}
    Wait Until Element Is Visible    ${TITULO_DETALHES_DO_FILME}
    Wait Until Keyword Succeeds    4    0    Espera o elemento para clicar    ${BOTAO_COMENTARIO}
    Wait Until Element Is Visible    ${DÊ_NOTA_AO_FILME}
    Click Element    ${CAIXA_TEXTO}
    Input Text    ${CAIXA_TEXTO}    "Gostei bastante do filme."
    Click Element    ${ESTRELA_5}
    Click Element    ${BOTAO_SALVAR}
    Press Keycode    4
    Press Keycode    4

Quando faço outra review com um texto diferente
    Wait Until Element Is Visible    ${TITULO_DETALHES_DO_FILME}
    Wait Until Keyword Succeeds    4    0    Espera o elemento para clicar    ${BOTAO_COMENTARIO}
    Wait Until Element Is Visible    ${DÊ_NOTA_AO_FILME}
    Click Element    ${CAIXA_TEXTO}
    Input Text    ${CAIXA_TEXTO}    Filme Horrível
    Click Element    ${ESTRELA_1}
    Click Element    ${BOTAO_SALVAR}
    Press Keycode    4
    Press Keycode    4
Então a review é atualizada
    Wait Until Element Is Visible    ${TITULO_DETALHES_DO_FILME}
    Swipe By Percent    0    85    0    15

    ${TEXTO_DA_REVIEW}=    Run Keyword And Return Status    Page Should Contain Text    Filme bacaninha
    
    IF    '${TEXTO_DA_REVIEW}' == ${True}
        Page Should Contain Text    Filme Horrível
    ELSE
        Swipe By Percent    0    85    0    15

    END

    Deletar usuário e filme
    
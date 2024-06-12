*** Settings ***

Resource    ../../base.robot

*** Variables ***
# COLOQUE TODOS OS XPATHS DA PÁGINA AQUI
${TITULO_DETALHES_DO_FILME}    xpath=//android.view.View[@content-desc="Detalhes do filme"]
${ANO_DE_LANCAMENTO}            xpath=//android.widget.ImageView[contains(@content-desc,"Ano de Lançamento:")]
${AVALIACOES_AUDIENCIA}        xpath=//android.view.View[contains(@content-desc,"Avaliação da audiência")]
${AVALIACOES_CRITICA}        xpath=//android.view.View[contains(@content-desc,"Avaliação da crítica")]
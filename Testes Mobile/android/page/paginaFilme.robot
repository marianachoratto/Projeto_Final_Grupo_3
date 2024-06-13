*** Settings ***

Resource    ../../base.robot

*** Variables ***
# COLOQUE TODOS OS XPATHS DA PÁGINA AQUI
${TITULO_DETALHES_DO_FILME}    xpath=//android.view.View[@content-desc="Detalhes do filme"]
${BOTAO_COMENTARIO}            xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button
${ANO_DE_LANCAMENTO}            xpath=//android.widget.ImageView[contains(@content-desc,"Ano de Lançamento:")]
${AVALIACOES_AUDIENCIA}         xpath=//android.view.View[contains(@content-desc,"Avaliação da audiência")]
${AVALIACOES_CRITICA}           xpath=//android.view.View[contains(@content-desc,"Avaliação da crítica")]
${COMENTÁRIO_USUÁRIO}           xpath=//android.widget.ImageView/android.view.View[2]   

# Página de avaliações
${DÊ_NOTA_AO_FILME}             xpath=//android.view.View[@content-desc="Dê sua nota para o filme:"]
${CAIXA_TEXTO}                  xpath=//android.widget.EditText
${BOTAO_SALVAR}                 xpath=//android.widget.Button[@content-desc="Salvar"]
${MENSAGEM_LOGIN}               xpath=//android.view.View[@content-desc="Faça login e tente novamente."]
${ESTRELA_1}                    xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[1]
${ESTRELA_2}                    xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[2]
${ESTRELA_3}                    xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[3]
${ESTRELA_4}                    xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[4]
${ESTRELA_5}                    xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[5]
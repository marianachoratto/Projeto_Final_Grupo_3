*** Settings ***

Library      AppiumLibrary

#Utils
Resource     android/utils/commons.robot
Resource     android/utils/config.robot
Resource     android/utils/templates.robot

#Pages
Resource     android/page/avaliacaoDeFilmePage.robot
Resource     android/page/cadastrarUsuarioPage.robot
Resource     android/page/consultaDeFilmePage.robot
Resource     android/page/gerenciarContaPage.robot
Resource     android/page/listagemDeFilmesPage.robot
Resource     android/page/loginPage.robot
Resource     android/page/pesquisaDeFilmePage.robot
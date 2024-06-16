*** Settings ***

Library      AppiumLibrary
Library      RequestsLibrary    
Library      FakerLibrary
Library      Collections

#Utils
Resource     android/utils/commons.robot
Resource     android/utils/config.robot
Resource     android/utils/requisicoesAPI.robot
Resource     android/utils/requestsAPI.robot

#Pages
Resource     android/page/avaliacaoDeFilmePage.robot
Resource     android/page/cadastrarUsuarioPage.robot
Resource     android/page/listagemDeFilmesPage.robot
Resource     android/page/consultaDeFilmePage.robot
Resource     android/page/loginPage.robot
Resource     android/page/paginaFilme.robot
Resource     android/page/paginaPrincipal.robot
Resource     android/page/paginaCadastroeLogin.robot
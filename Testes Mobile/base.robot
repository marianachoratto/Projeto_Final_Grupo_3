*** Settings ***

Library      AppiumLibrary
Library      RequestsLibrary    
Library      FakerLibrary

#Utils
Resource     android/utils/commons.robot
Resource     android/utils/config.robot
Resource     android/utils/requestsAPI.robot

#Pages
Resource     android/page/avaliacaoDeFilmePage.robot
Resource     android/page/cadastrarUsuarioPage.robot
Resource     android/page/listagemDeFilmesPage.robot
Resource     android/page/loginPage.robot
Resource     android/page/paginaFilmeDetalhes.robot
Resource     android/page/paginaPrincipal.robot
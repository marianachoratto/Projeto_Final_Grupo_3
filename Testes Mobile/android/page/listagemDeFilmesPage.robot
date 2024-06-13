*** Settings ***

Resource    ../../base.robot



*** Keywords ***
Caso exista algum filme cadastrado 
    Iniciar sessão na API
    Cadastrar usuario comum na API
    Logar na API
    Virar administrador na API
    Criar filme na API 
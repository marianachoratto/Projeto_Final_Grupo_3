*** Settings ***

Resource     ../utils/config.robot

Test Setup    Abrir App
Test Teardown    Teardown


*** Test Cases ***
T01- É possível realizar login
    Dado que tenho um usuário cadastrado
    Quando faço login
    Então recebo uma mensagem de sucesso
    E sou redirecionada para a página inicial 

T02- Não é possível realizar login sem informar email
    Dado que tenho um usuário cadastrado
    Quando faço login sem informar email
    Então aparece um aviso dizendo para informar o email

T03- Não é possível realizar login sem informar a senha 
    Dado que tenho um usuário cadastrado
    Quando faço o login sem informar senha
    # Então recebo uma mensagem de erro

T04- Não é possível realizar login sem informar email e senha 
    Dado que tenho um usuário cadastrado
    Quando faço o login sem informar email e senha
    # Então recebo uma mensagem de erro

T05- Não é possível realizar login informando email errado 
    Dado que tenho um usuário cadastrado
    Quando faço o login informando o email errado
    # Então recebo uma mensagem de erro

T06- Não é possível realizar login informando senha errada
    Dado que tenho um usuário cadastrado
    Quando faço o login informando a senha errada
    # Então recebo uma mensagem de erro

T07- Não é possível fazer login informando uma senha com mais de 12 caracteres
    Dado que tenho um usuário cadastrado
    Quando faço o login informando uma senha com mais de 12 caracteres
    # Então recebo uma mensagem de erro
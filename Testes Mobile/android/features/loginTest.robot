*** Settings ***

Resource     ../utils/config.robot

Test Setup    Abrir App
Test Teardown    Teardown


*** Test Cases ***
T01- É possível realizar login
    Dado que tenho um usuário cadastrado
    Quando aperto o botão de login
    Então todas as funcionalidades devem estar visíveis e habilitadas

T01- Usuário deve conseguir autenticar-se com sucesso
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
    Então aparece um aviso dizendo para informar a senha

T04- Não é possível realizar login sem informar email e senha 
    Dado que tenho um usuário cadastrado
    Quando faço o login sem informar email e senha
    Então recebo uma mensagem de erro pedindo para informar email e senha

T05- Não é possível realizar login informando email errado 
    Dado que tenho um usuário cadastrado
    Quando faço o login informando o email errado
    Então recebo um aviso pedindo um email válido

T06- Não é possível realizar login informando senha errada
    Dado que tenho um usuário cadastrado
    Quando faço o login informando a senha errada
    Então recebo uma mensagem informando que usuário ou senha podem estar errados

T07- Não é possível fazer login informando uma senha com mais de 12 caracteres
    Dado que tenho um usuário cadastrado
    Quando faço o login informando uma senha com mais de 12 caracteres
    Então recebo uma mensagem informando que usuário ou senha podem estar errados

T08- Não é possível fazer login informando email inválido    
    Dado que tenho um usuário cadastrado
    Quando faço o login informando email inválido
    Então aparece uma mensagem informando que o email é inválido

T09- Usuário não deve conseguir autenticar-se com e-mail não cadastrado
    Dado que tenho um usuário cadastrado
    Quando faço login informando email não cadastrado
    Então recebo uma mensagem informando que usuário ou senha podem estar errados

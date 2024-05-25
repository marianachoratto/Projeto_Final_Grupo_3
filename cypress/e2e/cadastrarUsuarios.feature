#language: pt
Funcionalidade: Cadastrar usuários 

Contexto: O usuário deve ter acessado a página de cadastro
    Dado que acessei a funcionalidade de cadastro

 
Cenário: cadastrar usuário com sucesso 

 
Cenário: Quando cadastrado, o usuário será do tipo 0

Cenário: Não é possível cadastrar usuário com email repetido


Cenário: Não deve ser possível criar usuário sem nome 


Cenário: Não deve ser possível criar um usuário sem email 


Cenário: Não deve ser possível criar usuário sem senha principal 


Cenário: Não deve ser possível criar usuário sem repetição de senha 


Cenário: Não deve ser possível criar usuário sem nenhuma senha 


 
Cenário: Deve ser possível criar senha de até 12 caracteres



Cenário: Não deve ser possível criar senha a partir 13 caracteres



Cenário: Não deve ser possível cadastrar usuário com senha com menos de 6 caracteres


 
Esquema do Cenário: É possível cadastrar usuário com qualquer nome



Esquema do Cenário: Não deve ser possível cadastrar com emails inválidos

 
Cenário: Deve ser possível cadastrar um usuário com email de letras maiúsculas 

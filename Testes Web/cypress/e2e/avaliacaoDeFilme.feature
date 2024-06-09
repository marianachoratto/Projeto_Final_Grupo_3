#language: pt

Funcionalidade: Consulta de Detalhes de Filmes 

@ignore
Cenário: Usário não logado não deve conseguir escrever a avaliação de um filme
    Dado que estou na página de filmes de um filme previamente cadastrado
    Quando tento escrever a avaliação de um filme não estando logado
    Então sou direcionada para o botão "Entre para escrever sua review"
    E sou redirecionada para a página de login

@deletarUsuario @ignore
Cenário: Usuário comum autenticado deve conseguir escrever a avaliação de um filme
    Dado que estou logado como usuário comum
    Quando escrevo a avaliação de um filme
    Então a avaliação é feita com sucesso

@ignore
Cenário: Usuário administrador deve conseguir escrever a avaliação de um filme
    Dado que estou logado como usuário administrador
    Quando escrevo a avaliação de um filme
    Então a avaliação é feita com sucesso 

@ignore
Cenário: Usuário crítico deve conseguir escrever a avaliação de um filme
    Dado que estou logado como usuário crítico
    Quando escrevo a avaliação de um filme
    Então a avaliação é feita com sucesso

# Bug
@ignore
Cenário: Ao avaliar um filme o texto de review é facultativo
    Dado que estou logado como usuário comum
    Quando dou nota para um filme, mas não escrevo uma review
    Então a avaliação é feita com sucesso

@ignore
Cenário: Não deve ser possível o usuário consegui avaliar um filme sem escolher uma nota
    Dado que estou logado como usuário comum
    Quando escrevo uma review, mas não dou uma nota ao filme
    Então aparece a mensagem "Ocorreu um erro" e "Selecione uma estrela para avaliar o filme"


# Cenário: Após avaliar o filme, a avaliação deve aparecer imediatamente para o usuário

# Cenário: Um usuário não pode fazer duas avaliações do mesmo filme, apenas atualizá-la

# Cenário: É possível uma review ter até 500 caracteres

# Cenário: Não é possível uma review ter mais que 500 caracteres

# Esquema do Cenário: Usuário deve poder fechar a mensagem de erro ao avaliar um filme 
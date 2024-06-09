#language: pt

Funcionalidade: Consulta de Detalhes de Filmes 

Contexto: O usuário deve ter acesso à página de detalhes de filmes
    Dado que estou na página de filmes de um filme previamente cadastrado

@ignore
Cenário: Usário não logado não deve conseguir escrever a avaliação de um filme
    Quando tento escrever a avaliação de um filme não estando logado
    Então sou direcionada para o botão "Entre para escrever sua review"
    E sou redirecionada para a página de login

# Não esquecer de deletar o usuário ao final desse teste
Cenário: Usuário comum autenticado deve conseguir escrever a avaliação de um filme
    Dado que estou logado como usuário comum
    Quando escrevo a avaliação de um filme
    # Então a avaliação é feita com sucesso

# Cenário: Usuário administrador deve conseguir escrever a avaliação de um filme

# Cenário: Usuário crítico deve conseguir escrever a avaliação de um filme

# Cenário: Ao avaliar um filme o texto de review é facultativo

# Cenário: Não deve ser possível o usuário consegui avaliar um filme sem escolher uma nota

# Cenário: Após avaliar o filme, a avaliação deve aparecer imediatamente para o usuário

# Cenário: Um usuário não pode fazer duas avaliações do mesmo filme, apenas atualizá-la

# Cenário: É possível uma review ter até 500 caracteres

# Cenário: Não é possível uma review ter mais que 500 caracteres

# Esquema do Cenário: Usuário deve poder fechar a mensagem de erro ao avaliar um filme 
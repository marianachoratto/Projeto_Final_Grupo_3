describe("Testes de Avaliação de Filme", function () {
  it("Usuário sem autenticação não deve conseguir fazer review de filme", function () {});

  describe("Testes de avaliação de filmes com sucesso", function () {
    it("O usuário logado deve conseguir fazer uma avaliação de filme", function () {});

    it("A avaliação de filme deve entrar imediatamente no filme avaliado", function () {});

    it("Deve ser possível fazer avaliação de filme sem texto", function () {});

    it("Não deve ser criada uma segunda avaliação de filme se o usuário mudar o comentário", function () {});

    it("Deve ser possível criar uma review de filmes de até 500 caracteres", function () {});
  });

  describe("Testes de avaliação de filmes com falha", function () {
    it("Não deve ser possível criar review com mais de 500 caracteres", function () {});

    it("Não deve ser possível criar filme com notas quebradas", function () {});
  });
});

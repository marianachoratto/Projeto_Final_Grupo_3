describe('Listagem de filmes', () => {
  describe.only('Qualquer tipo de usuario pode ver a lista de filmes', () => {
    let bodyFilme = {
      id: 25875,
      title: "Título",
      genre: "Gênero",
      description: "Olá",
      durationInMinutes: 185,
      releaseYear: 2020,
    };





    it('É possivel ver a lista de filmes estando sem logar',() => {
      cy.request({
        method: "GET",
        url:"api/movies",
        body: filme,

      }).then((resposta)=>{
        expect(resposta.status).to.eq(200);
        expect(resposta.body.title).to.eq(lista.title)
      }) 

    })
  })







})
describe('Listagem de filmes', () => {
  describe.only('Qualquer tipo de usuario pode ver a lista de filmes', () => {


    it('É possivel ver a lista de filmes estando sem logar',() => {
      cy.request({
        method: "GET",
        url:"api/movies",

      }).then((resposta)=>{
        expect(resposta.status).to.eq(200);
        resposta.body.forEach(notaDosFilmes => {
        expect(notaDosFilmes).to.have.property('totalRating');
        expect(notaDosFilmes).to.have.property('id');
        expect(notaDosFilmes).to.have.property('genre');
        expect(notaDosFilmes).to.have.property('description');
        expect(notaDosFilmes).to.have.property('durationInMinutes');
        expect(notaDosFilmes).to.have.property('releaseYear');
          });
        });
      }) 

    })
  })








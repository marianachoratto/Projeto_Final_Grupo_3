
describe('Qualquer tipo de usuario pode ver a lista de filmes', () => {

  it('É possivel ver a lista de filmes estando sem logar', () => {
    cy.request({
      method: "GET",
      url: "api/movies",

    }).then((resposta) => {
      expect(resposta.status).to.eq(200);
      resposta.body.forEach(notaDosFilmes => {
        expect(notaDosFilmes).to.have.property('totalRating');
        expect(notaDosFilmes).to.have.property('id');
        expect(notaDosFilmes).to.have.property('genre');
        expect(notaDosFilmes).to.have.property('description');
        expect(notaDosFilmes).to.have.property('durationInMinutes');
        expect(notaDosFilmes).to.have.property('releaseYear');
      })
    })
  });

});

describe('Qualquer tipo de usuario pode ver a lista de filmes', () => {
  let dadosUser
  before(() => {
    cy.cadastrarUsuario('123456').then((response) => {
      dadosUser = response
    })
  });
  
  after(() => {
    cy.deletarUsuario(dadosUser.email, '123456', dadosUser.id);
  });

  it('É possivel ver a lista de filmes estando logado como usuario comum', () => {
    cy.loginValido(dadosUser.email, '123456')
    cy.request({
      method: "GET",
      url: "api/movies",
    }).then((resposta) => {
      expect(resposta.status).to.eq(200);
      resposta.body.forEach(notaDosFilmes => {
        expect(notaDosFilmes).to.have.property('totalRating');
        expect(notaDosFilmes).to.have.property('id');
        expect(notaDosFilmes).to.have.property('genre');
        expect(notaDosFilmes).to.have.property('description');
        expect(notaDosFilmes).to.have.property('durationInMinutes');
        expect(notaDosFilmes).to.have.property('releaseYear');
      })
    })
  });

});

describe('Qualquer tipo de usuario pode ver a lista de filmes', () => {
  let dadosUser
  before(() => {
        cy.cadastrarUsuario('123456').then((response) => {
          dadosUser = response
        })
      });
  before(() => {
    cy.LogarPromoverCritico(dadosUser.email,'123456',).then(() => {
    })
  });
  
  after(() => {
    cy.deletarUsuario(dadosUser.email, '123456', dadosUser.id);
  });

  it('É possivel ver a lista de filmes estando logado como usuario critico', () => {
    cy.loginValido(dadosUser.email, '123456')
    cy.request({
      method: "GET",
      url: "api/movies",
    }).then((resposta) => {
      expect(resposta.status).to.eq(200);
      resposta.body.forEach(notaDosFilmes => {
        expect(notaDosFilmes).to.have.property('totalRating');
        expect(notaDosFilmes).to.have.property('id');
        expect(notaDosFilmes).to.have.property('genre');
        expect(notaDosFilmes).to.have.property('description');
        expect(notaDosFilmes).to.have.property('durationInMinutes');
        expect(notaDosFilmes).to.have.property('releaseYear');
      })
    })
  });

});

describe('Qualquer tipo de usuario pode ver a lista de filmes', () => {
  let dadosUser
  before(() => {
        cy.cadastrarUsuario('123456').then((response) => {
          dadosUser = response
        })
      });
  before(() => {
    cy.LogarPromoverADM(dadosUser.email,'123456',).then(() => {
    })
  });
  
  after(() => {
    cy.deletarUsuario(dadosUser.email, '123456', dadosUser.id);
  });

  it('É possivel ver a lista de filmes estando logado como usuario ADM', () => {
    cy.loginValido(dadosUser.email, '123456')
    cy.request({
      method: "GET",
      url: "api/movies",
    }).then((resposta) => {
      expect(resposta.status).to.eq(200);
      resposta.body.forEach(notaDosFilmes => {
        expect(notaDosFilmes).to.have.property('totalRating');
        expect(notaDosFilmes).to.have.property('id');
        expect(notaDosFilmes).to.have.property('genre');
        expect(notaDosFilmes).to.have.property('description');
        expect(notaDosFilmes).to.have.property('durationInMinutes');
        expect(notaDosFilmes).to.have.property('releaseYear');
      })
    })
  });

});




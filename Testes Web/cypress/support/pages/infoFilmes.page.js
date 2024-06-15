export default class MoviePage {
  tituloFilme = ".movie-details-title";
  avaliacaoAudiencia = ".movie-score-info > :nth-child(1)";
  quantidadeAvaliacaoAudiencia = ".movie-score-info > :nth-child(1) > :nth-child(3)";
  quantidadeAvaliacaoCritico = ".movie-score-info > :nth-child(2) > :nth-child(3)";
  avaliacaoCritica = ".movie-score-info > :nth-child(2)";
  mediaAudiencia = ".movie-score-info > :nth-child(1) > div > .filled";
  mediaCritica = ".movie-score-info > :nth-child(2) > div > .filled";
  descricaoFilme = ".movie-detail-description";
  anoFilme = ":nth-child(4) > span";
  duracaoFilme = ":nth-child(5) > span";
  generoFilme = ":nth-child(6) > span";
  capaFilme = ".w-full";
  tituloNovaAvaliacao = ".movie-details-container > :nth-child(2)";
  novaAvaliacao = ".stars";
  textoNovaAvaliacao = "textarea";
  botaoEnviarAvaliacao = ".rate-movie > button";
  botaoLoginAvaliacao = ".rate-movie > a";
  tituloAvaliacoes = ".user-reviews-section > h2";
  sessaoAvaliacoes = ".user-reviews-section";
  nomeUsuario1 =
    ":nth-child(1) > .user-review-info > .user-reviecard-info > h3";
  nomeUsuario2 =
    ":nth-child(2) > .user-review-info > .user-reviecard-info > h3";
  nomeUsuario3 =
    ":nth-child(3) > .user-review-info > .user-reviecard-info > h3";
  dataUsuario1 = ".user-reviews-container > :nth-child(1) > label";
  dataUsuario2 = ".user-reviews-container > :nth-child(2) > label";
  avaliacaoUsuario1 = ":nth-child(1) > p";
  avaliacaoUsuario2 = ".user-reviews-container > :nth-child(2) > p";
  notaUsuario1 = ":nth-child(1) > .user-review-info > .user-reviecard-info > .star-container-reviewcard > .filled";
  notaUsuario2 = ":nth-child(2) > .user-review-info > .user-reviecard-info > .star-container-reviewcard > .filled";
  notas = "star-container-reviewcard";
  starFilled = "filled";
  botaoLogin = '[href="/login"]';
  estrelasDoComentário = "span.review-form-star";
  // card de avaliação já feita
  divCardsAvaliacaoUsuario = ".user-reviews-container";
  cardAvaliacaoUsuario = ".user-review-card";
  divEstrelasdaReview = ".star-container-reviewcard";
  estrelasDadas = ".filled";
  divTextoDaReview = ".user-review-card > p";


  escrevendoAvaliacao(texto, numEstrelas) {
    cy.get(this.textoNovaAvaliacao).clear().type(texto);
    cy.get(this.estrelasDoComentário).eq(numEstrelas).click();
    cy.get(this.botaoEnviarAvaliacao).click();
  }

  verificarDadosFilme(movieTitle, movieDescription, movieGenre, movieYear, movieDuration) {
    cy.get(this.tituloFilme).should('be.visible').should('have.text', movieTitle)
    cy.get(this.descricaoFilme).should('be.visible').should('have.text', movieDescription)
    cy.get(this.generoFilme).should('be.visible').should('have.text', movieGenre)
    cy.get(this.anoFilme).should('be.visible').should('have.text', movieYear)
    cy.get(this.duracaoFilme).should('be.visible').should('have.text', movieDuration)
    cy.get(this.capaFilme).should('be.visible')
  }

}
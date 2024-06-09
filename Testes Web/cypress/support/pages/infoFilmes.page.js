export default class MoviePage {
  tituloFilme = ".movie-details-title";
  avaliacaoAudiencia = ".movie-score-info > :nth-child(1)";
  avaliacaoCritica = ".movie-score-info > :nth-child(2)";
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
  botaoLogin = '[href="/login"]';
  estrelas = "span.review-form-star";
}

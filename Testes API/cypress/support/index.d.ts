/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    criarUsuario(
      name: string,
      emailValido: string,
      password: string
    ): Chainable<any>;

    excluirUsuario(userid: number, tokenid: string): Chainable<any>;

    cadastrarUsuario(): Chainable<any>;

    loginValido(email: string, password: string): Chainable<any>;

    promoverAdmin(tokenid: string): Chainable<any>;

    promoverCritico(tokenid: string): Chainable<any>;

    deletarUsuario(
      email: string,
      password: string,
      idNovoUsuario: number
    ): Chainable<any>;

    deletarFilme(idFilme: number, token: string): Chainable<any>;

    criarFilme(userToken: string): Chainable<any>;

    criarFilmeAdm(email: string, password: string): Chainable<any>;
  }
}

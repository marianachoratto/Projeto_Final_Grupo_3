import { faker } from "@faker-js/faker";

describe("Gerenciar Conta", () => {
    
    describe("Atualização do próprio usuário com sucesso", () => {
        let name
        let email
        let password
        let id
        let token

        beforeEach(() => {
            cy.cadastrarUsuario().then((response) => {
                name = response.nome;
                email = response.email;
                password = response.password;
                id = response.id;
                
                cy.loginValido(email, password).then((response) => {
                    token = response.body.accessToken;
                });
            });
        });

        afterEach(() => {
            cy.deletarUsuario (email, password, id);
        });

        it('Deve ser possível atualizar nome e senha simultaneamente', () => {
            name = "Nome Atualizado";
            password = "123456";
            
            cy.request({
                method: "PUT",
                url: "api/users/" + id,
                auth: {
                  bearer: token,
                },
                body: {
                    name,
                    password
                }
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal(name);
                expect(response.body.email).to.equal(email);
                expect(response.body.id).to.equal(id);
                expect(response.body.type).to.equal(0);
                expect(response.body.active).to.eq(true);

                cy.loginValido(email, password).then ((response) => {
                    expect(response.status).to.equal(200);
                })
            });
        });
        
        it('Deve ser possível atualizar apenas o nome, informando nome com 1 caractere', () => {
            name = "X";

            cy.request({
                method: "PUT",
                url: "api/users/" + id,
                auth: {
                  bearer: token,
                },
                body: {
                    name
                }
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal(name);
                expect(response.body.email).to.equal(email);
                expect(response.body.id).to.equal(id);
                expect(response.body.type).to.equal(0);
                expect(response.body.active).to.eq(true);
            });
        });

        it('Deve ser possível atualizar apenas o nome, informando nome com 100 caracteres', () => {
            name = faker.string.alpha(100);
            
            cy.request({
                method: "PUT",
                url: "api/users/" + id,
                auth: {
                  bearer: token,
                },
                body: {
                    name
                }
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal(name);
                expect(response.body.email).to.equal(email);
                expect(response.body.id).to.equal(id);
                expect(response.body.type).to.equal(0);
                expect(response.body.active).to.eq(true);
            });
        });

        it('Deve ser possível atualizar apenas a senha, informando senha com 6 caracteres', () => {
            password = "123456";

            cy.request({
                method: "PUT",
                url: "api/users/" + id,
                auth: {
                  bearer: token,
                },
                body: {
                    password
                }
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal(name);
                expect(response.body.email).to.equal(email);
                expect(response.body.id).to.equal(id);
                expect(response.body.type).to.equal(0);
                expect(response.body.active).to.eq(true);

                cy.loginValido(email, password).then ((response) => {
                    expect(response.status).to.equal(200);
                })
            });
        });

        it('Deve ser possível atualizar apenas a senha, informando senha com 12 caracteres', () => {
            password = "ABCDEFGHIJKL";
            
            cy.request({
                method: "PUT",
                url: "api/users/" + id,
                auth: {
                  bearer: token,
                },
                body: {
                    password
                }
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal(name);
                expect(response.body.email).to.equal(email);
                expect(response.body.id).to.equal(id);
                expect(response.body.type).to.equal(0);
                expect(response.body.active).to.eq(true);

                cy.loginValido(email, password).then ((response) => {
                    expect(response.status).to.equal(200);
                })
            });
        });

        it('Usuário crítico pode atualizar o próprio usuário', () => {
            name = "Usuário Crtico Atualizado";
            password = "123456";
            
            cy.promoverCritico(token);
            cy.request({
                method: "PUT",
                url: "api/users/" + id,
                auth: {
                  bearer: token,
                },
                body: {
                    name,
                    password
                }
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal(name);
                expect(response.body.email).to.equal(email);
                expect(response.body.id).to.equal(id);
                expect(response.body.type).to.equal(2);
                expect(response.body.active).to.eq(true);

                cy.loginValido(email, password).then ((response) => {
                    expect(response.status).to.equal(200);
                })
            });
        });

        it('Usuário administrador pode atualizar o próprio usuário', () => {
            name = "Usuário Administrador Atualizado";
            password = "123456";
            
            cy.promoverAdmin(token);
            cy.request({
                method: "PUT",
                url: "api/users/" + id,
                auth: {
                  bearer: token,
                },
                body: {
                    name,
                    password
                }
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal(name);
                expect(response.body.email).to.equal(email);
                expect(response.body.id).to.equal(id);
                expect(response.body.type).to.equal(1);
                expect(response.body.active).to.eq(true);

                cy.loginValido(email, password).then ((response) => {
                    expect(response.status).to.equal(200);
                })
            });
        });
    });


    describe("Atualização de qualquer usuário cadastrado no sistema", () => {
        let user1
        let user2

        beforeEach(() => {
            cy.cadastrarUsuario().then((response) => {
                user1 = response;
            });
            cy.cadastrarUsuario().then((response) => {
                user2 = response;
            });
        });

        afterEach(() => {
            cy.deletarUsuario(user1.email, user1.password, user1.id);
            cy.deletarUsuario(user2.email, user2.password, user2.id);
        });

        it('Usuário administrador pode atualizar qualquer usuário cadastrado no sistema', () => {
            user2.name = "Nome Atualizado";
            user2.password = "123456";

            cy.loginValido(user1.email, user1.password).then((response) => {
                user1.token = response.body.accessToken;
                cy.promoverAdmin(user1.token);

                cy.request({
                method: "PUT",
                url: "api/users/" + user2.id,
                auth: {
                  bearer: user1.token,
                },
                body: {
                    name: user2.name,
                    password: user2.password
                }
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal(user2.name);
                expect(response.body.email).to.equal(user2.email);
                expect(response.body.id).to.equal(user2.id);
                expect(response.body.type).to.equal(0);
                expect(response.body.active).to.eq(true);
            });
            });
        });
        
        it('Usuário comum não tem permissão para atualizar outros usuários', () => {
            cy.loginValido(user1.email, user1.password).then((response) => {
                user1.token = response.body.accessToken;

                cy.request({
                method: "PUT",
                url: "api/users/" + user2.id,
                auth: {
                  bearer: user1.token,
                },
                body: {
                    name: "Nome Atualizado",
                    password: "123456"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.equal(403);
                expect(response.body.message).to.equal("Forbidden");
            });
            });
        });

        it('Usuário crítico não tem permissão para atualizar outros usuários', () => {
            cy.loginValido(user1.email, user1.password).then((response) => {
                user1.token = response.body.accessToken;
                cy.promoverCritico(user1.token)

                cy.request({
                method: "PUT",
                url: "api/users/" + user2.id,
                auth: {
                  bearer: user1.token,
                },
                body: {
                    name: "Nome Atualizado",
                    password: "123456"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.equal(403);
                expect(response.body.message).to.equal("Forbidden");
            });
            });
        });
    });

    describe("Atualizações não autorizadas", () => {
        let id
        let name
        let email
        let password
        let token

        beforeEach(() => {
            cy.cadastrarUsuario().then((response) => {
                id = response.id;
                email = response.email;
                password = response.password;
            });
        });

        afterEach(() => {
            cy.deletarUsuario(email, password, id);
        });

        it('Usuário não autenticado não tem permissão para atualizar usuário', () => {
            cy.request({
                method: "PUT",
                url: "api/users/" + id,
                body: {
                    name: "Nome Atualizado",
                    password: "123456"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.equal(401);
                expect(response.body.message).to.equal("Access denied.");
                expect(response.body.error).to.equal("Unauthorized");
            });
        });

        it('Não deve ser possível atualizar nome informando string vazia', () => {
            cy.loginValido(email, password).then((response) => {
                token = response.body.accessToken

                cy.request({
                    method: "PUT",
                    url: "api/users/" + id,
                    auth: {
                        bearer: token,
                    },
                    body: {
                        name: ""
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body.message[0]).to.equal("name must be longer than or equal to 1 characters");
                    expect(response.body.error).to.equal("Bad Request");
                });
            });
        });

        it('Não deve ser possível atualizar nome informando mais de 100 caracteres', () => {
            name = faker.string.alpha(101);
            
            cy.loginValido(email, password).then((response) => {
                token = response.body.accessToken

                cy.request({
                    method: "PUT",
                    url: "api/users/" + id,
                    auth: {
                        bearer: token,
                    },
                    body: {
                        name,
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body.message[0]).to.equal("name must be shorter than or equal to 100 characters");
                    expect(response.body.error).to.equal("Bad Request");
                });
            });
        });

        it('Não deve ser possível atualizar nome informando espaço em branco (apertar barra de espaço)', () => {          
            cy.loginValido(email, password).then((response) => {
                token = response.body.accessToken

                cy.request({
                    method: "PUT",
                    url: "api/users/" + id,
                    auth: {
                        bearer: token,
                    },
                    body: {
                        name: " "
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body.message[0]).to.equal("name must be longer than or equal to 1 characters");
                    expect(response.body.error).to.equal("Bad Request");
                });
            });
        });

        it('Não deve ser possível atualizar senha informando string vazia', () => {
            cy.loginValido(email, password).then((response) => {
                token = response.body.accessToken

                cy.request({
                    method: "PUT",
                    url: "api/users/" + id,
                    auth: {
                        bearer: token,
                    },
                    body: {
                        password: ""
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body.message[0]).to.equal("password must be longer than or equal to 6 characters");
                    expect(response.body.error).to.equal("Bad Request");
                });
            });
        });

        it('Não deve ser possível atualizar senha informando menos de 6 caracteres', () => {
            cy.loginValido(email, password).then((response) => {
                token = response.body.accessToken

                cy.request({
                    method: "PUT",
                    url: "api/users/" + id,
                    auth: {
                        bearer: token,
                    },
                    body: {
                        password: "12345"
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body.message[0]).to.equal("password must be longer than or equal to 6 characters");
                    expect(response.body.error).to.equal("Bad Request");
                });
            });
        });
        
        it('Não deve ser possível atualizar senha informando mais de 12 caracteres', () => {
            cy.loginValido(email, password).then((response) => {
                token = response.body.accessToken

                cy.request({
                    method: "PUT",
                    url: "api/users/" + id,
                    auth: {
                        bearer: token,
                    },
                    body: {
                        password: "ABCDEFGHIJKLM"
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body.message[0]).to.equal("password must be shorter than or equal to 12 characters");
                    expect(response.body.error).to.equal("Bad Request");
                });
            });
        });

        it('Não deve ser possível atualizar senha informando espaços em branco (apertar barra de espaço)', () => {          
            cy.loginValido(email, password).then((response) => {
                token = response.body.accessToken

                cy.request({
                    method: "PUT",
                    url: "api/users/" + id,
                    auth: {
                        bearer: token,
                    },
                    body: {
                        password: "       "
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.equal(400);
                    expect(response.body.message[0]).to.equal("password must be longer than or equal to 6 characters");
                    expect(response.body.error).to.equal("Bad Request");
                });
            });
        });
    });
})
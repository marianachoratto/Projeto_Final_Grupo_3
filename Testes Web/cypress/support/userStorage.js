export const userObject = (useridLocal, nameLocal, emailLocal, typeLocal) => {
    return{
        state: {
        user: {
            id: useridLocal,
            name: nameLocal,
            email: emailLocal,
            type: typeLocal,
            active: true
        },
        nickname: "s"
    },
    version: 0}
};

export const createTokenObject = (tokenUser) => {
    return {
      state: {
        accessToken: tokenUser
      },
      version: 0
    };
  };
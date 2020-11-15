export default async (keycloak) => {
  return keycloak
    .loadUserInfo()
    .then((userInfo) => {
      return {
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
        email: userInfo.email,
        id: userInfo.sub,
      };
    })
    .catch((err) => err);
};

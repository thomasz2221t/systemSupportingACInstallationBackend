import AuthService from './AuthService';

const user = AuthService.getCurrentUser();

export function authHeader() {
  console.log(user);
  return { Authorization: 'Bearer ' + user };
}

export function authHeaderForPrimitiveTypePatch() {
  console.log(user);
  return {
    Authorization: 'Bearer ' + user,
    'Content-type': 'application/json',
  };
}

export function getTokenFromLocalStorage() {
  return user.accessToken;
}

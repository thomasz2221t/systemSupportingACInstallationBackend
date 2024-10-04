import AuthService from './AuthService';

const user = AuthService.getCurrentUser();

export function authHeader() {
  return { Authorization: 'Bearer ' + user };
}

export function authHeaderForPrimitiveTypePatch() {
  return {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      'Content-Type': 'application/json',
    },
  };
}

export function getTokenFromLocalStorage() {
  return user;
}

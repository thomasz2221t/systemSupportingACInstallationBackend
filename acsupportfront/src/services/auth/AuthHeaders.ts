import AuthService from "./AuthService";

const user = AuthService.getCurrentUser();

export default function authHeader() {
  console.log(user);
  return { Authorization: "Bearer " + user };
}

export function getTokenFromLocalStorage() {
  return user.accessToken;
}

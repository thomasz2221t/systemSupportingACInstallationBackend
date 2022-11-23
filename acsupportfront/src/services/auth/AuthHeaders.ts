const user = JSON.parse(localStorage.getItem("token")!);

export default function authHeader() {
  return { Authorization: "Bearer " + user.accessToken };
}

export function getTokenFromLocalStorage() {
  return user.accessToken;
}

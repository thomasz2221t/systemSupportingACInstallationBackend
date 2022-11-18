const user = JSON.parse(localStorage.getItem("user")!);

export default function authHeader() {
  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}

export function getTokenFromLocalStorage() {
  return user.accessToken;
}

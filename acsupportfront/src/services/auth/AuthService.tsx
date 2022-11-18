import axios from "axios";
import { UserType } from "types/UserType";
import { getTokenFromLocalStorage } from "./AuthHeaders";

const API_URL = "http://localhost:8080";

const login = (login: string, password: string) => {
  console.log("JWT");
  return axios
    .post(
      `${API_URL}/login`,
      {
        login,
        password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      console.log("then");
      if (response.data.token) {
        console.log("jwt accepted");
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(JSON.parse(localStorage.getItem("user")!));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const register = (props: UserType) => {
  return axios.post(`${API_URL}`, {
    props,
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user")!);
};

const AuthService = {
  login,
  logout,
  register,
  getCurrentUser,
};

export default AuthService;

import axios from "axios";
import { UserType } from "types/UserType";

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
        console.log(response);
        console.log(response.data);
        console.log(response.data.token);
        console.log(response.data.roles);
        localStorage.setItem("user", JSON.stringify(response.data.token));
        localStorage.setItem("roles", JSON.stringify(response.data.roles));
        console.log(JSON.parse(localStorage.getItem("user")!));
        console.log(JSON.parse(localStorage.getItem("roles")!));
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

const getCurrentUserRoles = () => {
  return JSON.parse(localStorage.getItem("roles")!);
};

const AuthService = {
  login,
  logout,
  register,
  getCurrentUser,
  getCurrentUserRoles,
};

export default AuthService;

import axios from "axios";
import { UserType } from "types/UserType";

const API_URL = "http://localhost:8080";

const login = (login: string, password: string) => {
  return axios
    .post(`${API_URL}/login`, {
      login,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
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

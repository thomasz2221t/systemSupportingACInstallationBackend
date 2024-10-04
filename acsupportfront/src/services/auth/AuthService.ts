import axios from 'axios';
import API_URL from 'utils/ApiUrl';

const login = (login: string, password: string) => {
  return axios
    .post(
      `${API_URL}/login`,
      {
        login,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('userId', JSON.stringify(response.data.id));
        localStorage.setItem('user', JSON.stringify(response.data.token));
        localStorage.setItem('roles', JSON.stringify(response.data.roles));
        localStorage.setItem('token', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUserId = () => {
  return JSON.parse(localStorage.getItem('userId')!);
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user')!);
};

const getCurrentUserRoles = () => {
  return JSON.parse(localStorage.getItem('roles')!);
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
  getCurrentUserRoles,
  getCurrentUserId,
};

export default AuthService;

import axios from 'axios';
import { UserType } from 'types/UserType';
import API_URL from 'utils/ApiUrl';

const login = (login: string, password: string) => {
  console.log('JWT');
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
      }
    )
    .then((response) => {
      console.log('then');
      if (response.data.token) {
        console.log('jwt accepted');
        console.log(response);
        console.log(response.data);
        console.log(response.data.token);
        console.log(response.data.roles);
        localStorage.setItem('userId', JSON.stringify(response.data.id));
        localStorage.setItem('user', JSON.stringify(response.data.token));
        localStorage.setItem('roles', JSON.stringify(response.data.roles));
        localStorage.setItem('token', JSON.stringify(response.data));
        console.log(JSON.parse(localStorage.getItem('user')!));
        console.log(JSON.parse(localStorage.getItem('roles')!));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const register = (props: UserType) => {
  return axios.post(`${API_URL}`, {
    props,
  });
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

const getWholeToken = () => {
  return JSON.parse(localStorage.getItem('token')!);
};

const AuthService = {
  login,
  logout,
  register,
  getCurrentUser,
  getCurrentUserRoles,
  getCurrentUserId,
};

export default AuthService;

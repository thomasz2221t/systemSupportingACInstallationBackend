import axios from 'axios';
import { UserType } from 'types/UserType';
import API_URL from 'utils/ApiUrl';
import { authHeader } from './auth/AuthHeaders';

const getUserBody = (userId: number) => {
  console.log(authHeader());
  return axios.get(`${API_URL}/user/${userId}`, {
    headers: authHeader(),
  });
};

const getFindAllOperators = () => {
  return axios.get(`${API_URL}/user/operators`, {
    headers: authHeader(),
  });
};

const patchUpdateUserBody = (userBody: UserType) => {
  return axios.patch(`${API_URL}/user`, {
    headers: authHeader(),
  });
};

const UserService = {
  getUserBody,
  getFindAllOperators,
  patchUpdateUserBody,
};

export default UserService;

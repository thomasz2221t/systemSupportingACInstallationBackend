import axios from 'axios';
import { UserType } from 'types/UserType';
import API_URL from 'utils/ApiUrl';
import { UserRoles } from 'utils/UserRoles';
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

const postCreateUserBody = (userBody: UserType, userRole: UserRoles) => {
  return axios.post(`${API_URL}/user`, userBody, {
    headers: authHeader(),
    params: { userRole },
  });
};

const UserService = {
  getUserBody,
  getFindAllOperators,
  patchUpdateUserBody,
  postCreateUserBody,
};

export default UserService;

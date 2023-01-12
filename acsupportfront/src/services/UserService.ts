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
  return axios.patch(`${API_URL}/user/${userBody.id}`, userBody, {
    headers: authHeader(),
  });
};

const postCreateUserBody = (userBody: UserType, userRole: UserRoles) => {
  return axios.post(`${API_URL}/user`, userBody, {
    params: { userRole },
  });
};

const deleteRemoveUserBody = (userId: number) => {
  return axios.delete(`${API_URL}/user/${userId}`, {
    headers: authHeader(),
  });
};

const UserService = {
  getUserBody,
  getFindAllOperators,
  patchUpdateUserBody,
  postCreateUserBody,
  deleteRemoveUserBody,
};

export default UserService;

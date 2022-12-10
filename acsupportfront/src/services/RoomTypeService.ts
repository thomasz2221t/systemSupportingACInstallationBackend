import axios from 'axios';
import API_URL from 'utils/ApiUrl';
import { authHeader } from './auth/AuthHeaders';

const getFindAllRooms = () => {
  return axios.get(`${API_URL}/roomtype`, {
    headers: authHeader(),
  });
};

const RoomTypeService = {
  getFindAllRooms,
};

export default RoomTypeService;

import axios from 'axios';
import API_URL from 'utils/ApiUrl';
import { authHeader } from './auth/AuthHeaders';

const getFindRoomType = (roomId: number) => {
  return axios.get(`${API_URL}/room/type/${roomId}`, {
    headers: authHeader(),
  });
};

const RoomService = {
  getFindRoomType,
};

export default RoomService;

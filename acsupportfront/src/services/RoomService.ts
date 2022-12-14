import axios from 'axios';
import RoomType from 'types/RoomType';
import API_URL from 'utils/ApiUrl';
import {
  authHeader,
  authHeaderForPrimitiveTypePatch,
} from './auth/AuthHeaders';

const getFindRoomType = (roomId: number) => {
  return axios.get(`${API_URL}/room/type/${roomId}`, {
    headers: authHeader(),
  });
};

const postCreateRoom = (roomBody: RoomType) => {
  return axios.post(`${API_URL}/room`, roomBody, {
    headers: authHeader(),
  });
};

const patchUpdateRoom = (roomId: number, roomBody: RoomType) => {
  return axios.patch(`${API_URL}/room/${roomId}`, roomBody, {
    headers: authHeader(),
  });
};

const patchAssignTypeToRoom = (roomId: Number, roomTypeId: Number) => {
  return axios.patch(
    `${API_URL}/room/assigntype/${roomId}`,
    roomTypeId,
    authHeaderForPrimitiveTypePatch()
  );
};

const RoomService = {
  getFindRoomType,
  postCreateRoom,
  patchUpdateRoom,
  patchAssignTypeToRoom,
};

export default RoomService;

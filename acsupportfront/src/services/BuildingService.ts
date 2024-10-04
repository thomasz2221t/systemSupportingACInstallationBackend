import axios from 'axios';
import BuildingType from 'types/BuildingType';
import API_URL from 'utils/ApiUrl';
import {
  authHeader,
  authHeaderForPrimitiveTypePatch,
} from './auth/AuthHeaders';

const getFindAllBuilding = () => {
  return axios.get(`${API_URL}/building`, {
    headers: authHeader(),
  });
};

const getUserBuildings = (userId: number) => {
  return axios.get(`${API_URL}/building/user/${userId}`, {
    headers: authHeader(),
  });
};

const getBuilding = (buildingId: number) => {
  return axios.get(`${API_URL}/building/${buildingId}`, {
    headers: authHeader(),
  });
};

const getFindBuildingType = (buildingId: number) => {
  return axios.get(`${API_URL}/building/type/${buildingId}`, {
    headers: authHeader(),
  });
};

const getFindAllBuildingsRooms = (buildingId: number) => {
  return axios.get(`${API_URL}/building/room/${buildingId}`, {
    headers: authHeader(),
  });
};

const postCreateBuilding = (buildingBody: BuildingType) => {
  return axios.post(`${API_URL}/building`, buildingBody, {
    headers: authHeader(),
  });
};

const patchUpdateBuilding = (
  buildingId: number,
  buildingBody: BuildingType,
) => {
  return axios.patch(`${API_URL}/building/${buildingId}`, buildingBody, {
    headers: authHeader(),
  });
};

const patchAssignTypeToBuilding = (buildingId: number, typeId: number) => {
  return axios.patch(
    `${API_URL}/building/assigntype/${buildingId}`,
    typeId,
    authHeaderForPrimitiveTypePatch(),
  );
};

const patchAssignUserToBuilding = (buildingId: number, userId: number) => {
  return axios.patch(
    `${API_URL}/building/assignuser/${buildingId}`,
    userId,
    authHeaderForPrimitiveTypePatch(),
  );
};

const patchAssignRoomToBuilding = (buildingId: number, roomId: number) => {
  return axios.patch(
    `${API_URL}/building/assignroom/${buildingId}`,
    roomId,
    authHeaderForPrimitiveTypePatch(),
  );
};

const getFindUserAssignedToBuilding = (buildingId: number) => {
  return axios.get(`${API_URL}/building/user/${buildingId}`, {
    headers: authHeader(),
  });
};

const getFindTypeAssignedToBuilding = (buildingId: number) => {
  return axios.get(`${API_URL}/building/type/${buildingId}`, {
    headers: authHeader(),
  });
};

const getFindBuildingTableData = () => {
  return axios.get(`${API_URL}/building/table`, {
    headers: authHeader(),
  });
};

const BuildingService = {
  getFindAllBuilding,
  getUserBuildings,
  getBuilding,
  getFindBuildingType,
  getFindAllBuildingsRooms,
  postCreateBuilding,
  patchUpdateBuilding,
  patchAssignTypeToBuilding,
  getFindUserAssignedToBuilding,
  patchAssignUserToBuilding,
  patchAssignRoomToBuilding,
  getFindTypeAssignedToBuilding,
  getFindBuildingTableData,
};

export default BuildingService;

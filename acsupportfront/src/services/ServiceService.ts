import axios from 'axios';
import ServiceType from 'types/ServiceType';
import API_URL from 'utils/ApiUrl';
import {
  authHeader,
  authHeaderForPrimitiveTypePatch,
} from './auth/AuthHeaders';

const getFindAllServices = () => {
  return axios.get(`${API_URL}/service`, {
    headers: authHeader(),
  });
};

const getFindServiceByBuildingId = (
  buildingId: number,
  page: number,
  numberOfElements: number
) => {
  return axios.get(
    `${API_URL}/service/building/${buildingId}?page=${page}&size=${numberOfElements}&sort=id`,
    {
      headers: authHeader(),
    }
  );
};

const getFindServiceType = (serviceId: number) => {
  return axios.get(`${API_URL}/service/type/${serviceId}`, {
    headers: authHeader(),
  });
};

const getFindServiceRoom = (serviceId: number) => {
  return axios.get(`${API_URL}/service/room/${serviceId}`, {
    headers: authHeader(),
  });
};

const postCreateService = (serviceBody: ServiceType) => {
  return axios.post(`${API_URL}/service`, serviceBody, {
    headers: authHeader(),
  });
};

const patchAssignTypeToService = (serviceId: number, serviceTypeId: number) => {
  return axios.patch(
    `${API_URL}/service/assigntype/${serviceId}`,
    serviceTypeId,
    authHeaderForPrimitiveTypePatch()
  );
};

const patchAssignServiceToRoom = (serviceId: number, roomId: number) => {
  return axios.patch(
    `${API_URL}/service/assignroom/${serviceId}`,
    roomId,
    authHeaderForPrimitiveTypePatch()
  );
};

const patchUpdateService = (serviceBody: ServiceType) => {
  return axios.patch(`${API_URL}/service/${serviceBody.id}`, serviceBody, {
    headers: authHeader(),
  });
};

const ServiceService = {
  getFindAllServices,
  getFindServiceByBuildingId,
  getFindServiceType,
  getFindServiceRoom,
  postCreateService,
  patchAssignTypeToService,
  patchAssignServiceToRoom,
  patchUpdateService,
};

export default ServiceService;

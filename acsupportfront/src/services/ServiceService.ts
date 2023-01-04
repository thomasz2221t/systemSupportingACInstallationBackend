import axios from 'axios';
import API_URL from 'utils/ApiUrl';
import { authHeader } from './auth/AuthHeaders';

/*const getFindAllServices = () => {
  return axios.get(`${API_URL}/service`, {
    headers: authHeader(),
  });
};*/

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

const ServiceService = {
  //getFindAllServices,
  getFindServiceByBuildingId,
  getFindServiceType,
  getFindServiceRoom,
};

export default ServiceService;

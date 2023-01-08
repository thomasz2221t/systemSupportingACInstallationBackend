import axios from 'axios';
import API_URL from 'utils/ApiUrl';
import { authHeader } from './auth/AuthHeaders';

const getFindAllServices = () => {
  return axios.get(`${API_URL}/offer`, {
    headers: authHeader(),
  });
};

const getFindOfferByServiceId = (serviceId: number) => {
  return axios.get(`${API_URL}/offer/service/${serviceId}`, {
    headers: authHeader(),
  });
};

const getFindAllEquipmentInOffer = (offerId: number) => {
  return axios.get(`${API_URL}/offer/equipment/${offerId}`, {
    headers: authHeader(),
  });
};

const getFindUserAssignedToOffer = (offerId: number) => {
  return axios.get(`${API_URL}/offer/user/${offerId}`, {
    headers: authHeader(),
  });
};

const patchUpdateOfferStatus = (offerId: number, statusCode: string) => {
  return axios.patch(
    `${API_URL}/offer/status/${offerId}`,
    {},
    {
      headers: authHeader(),
      params: { statusCode },
    }
  );
};

const OfferService = {
  getFindOfferByServiceId,
  getFindAllEquipmentInOffer,
  getFindUserAssignedToOffer,
  patchUpdateOfferStatus,
  getFindAllServices,
};

export default OfferService;

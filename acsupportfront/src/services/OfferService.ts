import axios from 'axios';
import API_URL from 'utils/ApiUrl';
import { authHeader } from './auth/AuthHeaders';

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
const OfferService = {
  getFindOfferByServiceId,
  getFindAllEquipmentInOffer,
  getFindUserAssignedToOffer,
};

export default OfferService;

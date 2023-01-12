import axios from 'axios';
import OfferType from 'types/OfferType';
import API_URL from 'utils/ApiUrl';
import {
  authHeader,
  authHeaderForPrimitiveTypePatch,
} from './auth/AuthHeaders';

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

const patchUpdateOffer = (offerBody: OfferType) => {
  return axios.patch(`${API_URL}/offer/${offerBody.id}`, offerBody, {
    headers: authHeader(),
  });
};

const patchAssignEquipmentToOffer = (offerId: number, equipmentId: number) => {
  return axios.patch(
    `${API_URL}/offer/assignequipment/${offerId}`,
    equipmentId,
    authHeaderForPrimitiveTypePatch()
  );
};

const patchAssingUserToOffer = (offerId: number, userId: number) => {
  return axios.patch(
    `${API_URL}/offer/assignuser/${offerId}`,
    userId,
    authHeaderForPrimitiveTypePatch()
  );
};

const deleteAllOfferEquipment = (offerId: number) => {
  return axios.delete(`${API_URL}/offer/delete/all/equipment/${offerId}`, {
    headers: authHeader(),
  });
};

const OfferService = {
  getFindOfferByServiceId,
  getFindAllEquipmentInOffer,
  getFindUserAssignedToOffer,
  patchUpdateOfferStatus,
  getFindAllServices,
  patchUpdateOffer,
  patchAssignEquipmentToOffer,
  patchAssingUserToOffer,
  deleteAllOfferEquipment,
};

export default OfferService;

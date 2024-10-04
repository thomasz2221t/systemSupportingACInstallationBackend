import axios from 'axios';
import API_URL from 'utils/ApiUrl';
import { authHeader } from './auth/AuthHeaders';

const getFindAllInstallerEquipment = () => {
  return axios.get(`${API_URL}/equipment`, {
    headers: authHeader(),
  });
};

const InstallerEquipmentService = {
  getFindAllInstallerEquipment,
};

export default InstallerEquipmentService;

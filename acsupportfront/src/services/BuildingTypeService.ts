import axios from 'axios'
import API_URL from 'utils/ApiUrl'
import authHeader from './auth/AuthHeaders'

const getFindAllBuildingType = () => {
  return axios.get(`${API_URL}/buildingtype`, {
    headers: authHeader(),
  })
}

const BuildingTypeService = {
  getFindAllBuildingType,
}

export default BuildingTypeService

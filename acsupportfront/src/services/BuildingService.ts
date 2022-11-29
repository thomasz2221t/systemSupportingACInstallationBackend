import axios from "axios";
import API_URL from "utils/ApiUrl";
import authHeader from "./auth/AuthHeaders";

const getUserBuildings = (userId: number) => {
  console.log(authHeader());
  return axios.get(`${API_URL}/building/user/${userId}`, {
    headers: authHeader(),
  });
};

const getBuilding = (buildingId: number) => {
  return axios.get(`${API_URL}/building/${buildingId}`, {
    headers: authHeader(),
  });
};

const UserService = {
  getUserBuildings,
  getBuilding,
};

export default UserService;

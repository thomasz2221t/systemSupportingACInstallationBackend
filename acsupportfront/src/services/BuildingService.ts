import axios from "axios";
import API_URL from "utils/ApiUrl";
import authHeader, { getTokenFromLocalStorage } from "./auth/AuthHeaders";

const gettingUserRequest = (userId: number) => {
  return axios.get(`${API_URL}/building/user/${userId}`, {
    Authorization: "Bearer " + getTokenFromLocalStorage(),
  });
};

export default gettingUserRequest;

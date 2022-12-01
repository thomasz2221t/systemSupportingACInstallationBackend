import axios from "axios";
import API_URL from "utils/ApiUrl";
import authHeader from "./auth/AuthHeaders";

const getUserBody = (userId: number) => {
  console.log(authHeader());
  return axios.get(`${API_URL}/user/${userId}`, {
    headers: authHeader(),
  });
};

export default getUserBody;

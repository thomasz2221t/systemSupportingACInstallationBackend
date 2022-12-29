import axios from 'axios';
import MessageType from 'types/MessageType';
import API_URL from 'utils/ApiUrl';
import { authHeader } from './auth/AuthHeaders';

const findChatMessage = (chatId: number) => {
  return axios.get(`${API_URL}/chat/${chatId}`, {
    headers: authHeader(),
  });
};

const receiveChatMessage = (messageBody: MessageType) => {
  return axios.post(`${API_URL}/chat`, messageBody, {
    headers: authHeader(),
  });
};

const ChatService = {
  findChatMessage,
  receiveChatMessage,
};

export default ChatService;

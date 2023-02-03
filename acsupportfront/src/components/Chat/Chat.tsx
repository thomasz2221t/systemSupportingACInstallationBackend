import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import ChatService from 'services/ChatService';
import MessageType from 'types/MessageType';
import BuildingType from 'types/BuildingType';
import BuildingService from 'services/BuildingService';
import UserService from 'services/UserService';

import './Chat.scss';

export type ChatPropType = {
  userId: number;
  buildingId: number;
};

export type MessageTypeWithUser = {
  id: number;
  message: string;
  date: string;
  userName: string;
  userLastName: string;
};

export default function Chat({ userId, buildingId }: ChatPropType) {
  const [message, setMessage] = useState<MessageType>({
    id: 0,
    message: '',
    date: '',
    chatId: 0,
    userId: 0,
  });
  const scrollBottomRef = useRef(null);
  const [chatMessages, setChatMessages] = useState<MessageType[]>([]);
  const [building, setBuilding] = useState<BuildingType>({
    id: 0,
    name: '',
    imagePath: '',
    street: '',
    postCode: '',
    city: '',
    region: '',
    description: '',
    chatId: 0,
  });
  const [user, setUser] = useState<String>('');
  const handleSendingMessage = () => {
    setMessage({
      id: message.id,
      message: message.message,
      date: message.date,
      chatId: building.id,
      userId: userId,
    });
    if (message.message && message.chatId !== 0 && message.userId !== 0) {
      handleUploadingMessage(message);
    } else {
    }
  };

  const handleDownloadingMessages = async (chatId: number) => {
    if (chatId !== 0) {
      await ChatService.getFindChatMessage(chatId).then((response) => {
        setChatMessages(response.data.content);
      });
    }
  };

  const handleUploadingMessage = async (message: MessageType) => {
    await ChatService.getReceiveChatMessage(message).then(() => {
      setMessage({ ...message, message: '' });
    });
  };

  const handleGettingBuildingDetails = async (buildingId: number) => {
    await BuildingService.getBuilding(buildingId).then((response) => {
      setBuilding(response.data);
    });
  };

  const handleGettingUserDetails = async (userId: number) => {
    await UserService.getUserBody(userId).then((response) => {
      setUser(response.data.firstName + ' ' + response.data.lastName);
    });
  };

  const listChatMessages = chatMessages
    .sort((a, b) => a.id - b.id)
    .map((chatMessageDto, index) => {
      //handleGettingUserDetails(chatMessageDto.userId);
      const date: Date = new Date(chatMessageDto.date);
      return (
        <ListItem key={index}>
          <ListItemText
            primary={`${chatMessageDto.userId}: ${
              chatMessageDto.message
            } wysłano: ${String(date.getDay()).padStart(2, '0')}.${String(
              date.getMonth() + 1,
            ).padStart(2, '0')}.${date.getFullYear()} ${String(
              date.getHours(),
            ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} `}
          />
        </ListItem>
      );
    });

  useEffect(() => {
    handleGettingBuildingDetails(buildingId);
  }, [buildingId]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleDownloadingMessages(building.chatId);
    }, 5 * 1000);
    return () => clearInterval(interval);
  }, [building]);

  return (
    <>
      <Fragment>
        <Container>
          <Paper elevation={5}>
            <Box p={3}>
              <Typography variant="h4" gutterBottom>
                Chat {`${building.name}`}
              </Typography>
              <Divider />
              <Grid container spacing={4} alignItems="center">
                <Grid id="chat-window" xs={12} item>
                  <List id="chat-window-messages">{listChatMessages}</List>
                  <ListItem ref={scrollBottomRef}></ListItem>
                </Grid>
                <Grid xs={11} item>
                  <FormControl fullWidth>
                    <TextField
                      value={message.message}
                      label="Napisz wiadomość"
                      variant="outlined"
                      onChange={(e) =>
                        setMessage({
                          ...message,
                          message: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="send"
                    color="primary"
                    onClick={handleSendingMessage}
                  >
                    <SendIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Fragment>
    </>
  );
}

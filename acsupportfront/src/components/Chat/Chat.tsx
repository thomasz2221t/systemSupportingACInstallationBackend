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
import './Chat.scss';
import ChatService from 'services/ChatService';
import MessageType from 'types/MessageType';

export type ChatPropType = {
  chatIdentifiaction: number;
};

export default function Chat({ chatIdentifiaction }: ChatPropType) {
  const scrollBottomRef = useRef(null);
  const [chatMessages, setChatMessages] = useState<MessageType[]>([]);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');

  const listChatMessages = chatMessages.map((chatMessageDto, index) => (
    <ListItem key={index}>
      <ListItemText
        primary={`${chatMessageDto.userId}: ${chatMessageDto.message}`}
      />
    </ListItem>
  ));

  const handleSendingMessage = () => {
    if (message) {
      console.log('send');
    }
  };

  const handleDownloadingMessages = async (chatId: number) => {
    await ChatService.getFindChatMessage(chatId).then((response) => {
      console.log(response.data.content);
      setChatMessages(response.data.content);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleDownloadingMessages(chatIdentifiaction);
    }, 5 * 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Fragment>
        <Container>
          <Paper elevation={5}>
            <Box p={3}>
              <Typography variant="h4" gutterBottom>
                Chat dotyczący budynku
              </Typography>
              <Divider />
              <Grid container spacing={4} alignItems="center">
                <Grid id="chat-window" xs={12} item>
                  <List id="chat-window-messages">{listChatMessages}</List>
                  <ListItem ref={scrollBottomRef}></ListItem>
                </Grid>
                {/* <Grid xs={2} item>
                  <FormControl fullWidth>
                    <TextField
                      value={user}
                      label="Nickname"
                      variant="outlined"
                    />
                  </FormControl>
                </Grid> */}
                <Grid xs={11} item>
                  <FormControl fullWidth>
                    <TextField
                      value={message}
                      label="Napisz wiadomość"
                      variant="outlined"
                      //onChange={handleMes}
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

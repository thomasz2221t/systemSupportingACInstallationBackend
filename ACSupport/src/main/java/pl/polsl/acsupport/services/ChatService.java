package pl.polsl.acsupport.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.acsupport.dtos.MessageDto;
import pl.polsl.acsupport.entities.Chat;
import pl.polsl.acsupport.entities.Message;
import pl.polsl.acsupport.entities.User;
import pl.polsl.acsupport.repositories.ChatRepository;
import pl.polsl.acsupport.repositories.MessageRepository;
import pl.polsl.acsupport.repositories.UserRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ChatService {

    private final UserService userService;

    private final ChatRepository chatRepository;

    private final MessageRepository messageRepository;

    private final UserRepository userRepository;

    public Page<MessageDto> getAllMessageByChatId(Long chatId){
        final Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new EntityNotFoundException("Chat with given id not found"));
        Set<Message> messages = chat.getMessages();
        List<MessageDto> messageList = messages.stream().map(MessageDto::new).toList();
        return new PageImpl<>(messageList);
    };

    @Transactional
    public Message writeNewMessage(MessageDto messageDto){
        final Message message = new Message();
        final User user = userService.findById(messageDto.getUserId());
        final Chat chat = chatRepository.findById(messageDto.getChatId())
                .orElseThrow(() -> new EntityNotFoundException("Chat with given id not found"));
        message.setMessage(messageDto.getMessage());
        message.setUser(user);
        message.setChat(chat);
        Set<Message> messages = user.getMessage();
        messages.add(message);
        user.setMessage(messages);
        userRepository.save(user);
        return messageRepository.save(message);
    }
}

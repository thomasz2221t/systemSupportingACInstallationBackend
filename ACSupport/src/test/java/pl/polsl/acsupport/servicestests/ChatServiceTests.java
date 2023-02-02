package pl.polsl.acsupport.servicestests;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.domain.Page;
import pl.polsl.acsupport.dtos.MessageDto;
import pl.polsl.acsupport.entities.Building;
import pl.polsl.acsupport.entities.Chat;
import pl.polsl.acsupport.entities.Message;
import pl.polsl.acsupport.entities.User;
import pl.polsl.acsupport.repositories.ChatRepository;
import pl.polsl.acsupport.repositories.MessageRepository;
import pl.polsl.acsupport.repositories.UserRepository;
import pl.polsl.acsupport.services.ChatService;
import pl.polsl.acsupport.services.UserService;

import java.util.Optional;
import java.util.Set;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class ChatServiceTests {

    @InjectMocks
    private ChatService chatService;

    @Mock
    private ChatRepository chatRepository;

    @Mock
    private MessageRepository messageRepository;

    @Mock
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    private Building building1 = new Building();

    private User user = new User();

    @Before
    public void setUp(){
        building1.setName("Piekarnia");
        building1.setStreet("ul. Piotrowicka 200");
        building1.setPostCode("40-000");
        building1.setCity("Katowice");
        building1.setRegion("Śląskie");
        building1.setDescription("Przedsiębiorstwo piekarnicze składające się z częsci usługowej oraz produkcyjnej.");
        building1.setChat(new Chat());

        user.setFirstName("XYZ");
        user.setLastName("ZZZ");
    }

    @Test
    public void getAllMessageByChatId_WhenGivenChatId_ThenShouldReturnAssignedMessages(){
        //given
        Message message = new Message();
        message.setMessage("Test message");
        message.setChat(building1.getChat());
        message.setUser(user);
        Message message1 = new Message();
        message1.setMessage("Another Test message");
        message1.setChat(building1.getChat());
        message1.setUser(user);
        Set<Message> messageSet = building1.getChat().getMessages();
        messageSet.add(message);
        messageSet.add(message1);
        building1.getChat().setMessages(messageSet);
        when(chatRepository.findById(building1.getChat().getId()))
                .thenReturn(Optional.of(building1.getChat()));

        //when
        Page<MessageDto> receivedPage = chatService.getAllMessageByChatId(building1.getChat().getId());

        //then
        assertEquals("Number of elements in received page is incorrect",receivedPage.getTotalElements(),messageSet.size());
    }

    @Test
    public void writeNewMessage_WhenGivenCorrectMessageDto_ThenShouldExecuteRepositoryMethodSaveTwice(){
        //given
        MessageDto messageDto = new MessageDto(1l,"Test message","2023-01-19T12:00",building1.getChat().getId(),user.getId());
        when(userService.findById(user.getId())).thenReturn(user);
        when(chatRepository.findById(building1.getChat().getId()))
                .thenReturn(Optional.of(building1.getChat()));

        //when
        chatService.writeNewMessage(messageDto);

        //then
        verify(userRepository, times(1)).save(any(User.class));
        verify(messageRepository, times(1)).save(any(Message.class));
    }
}

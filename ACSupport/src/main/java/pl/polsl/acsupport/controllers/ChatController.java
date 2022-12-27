package pl.polsl.acsupport.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.polsl.acsupport.dtos.MessageDto;
import pl.polsl.acsupport.entities.Message;
import pl.polsl.acsupport.services.ChatService;

@RequiredArgsConstructor
@RequestMapping("/chat")
@RestController
@Validated
public class ChatController {

    private final ChatService chatService;

    @PreAuthorize("hasAuthority('FIND_MESSAGES')")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Page<Message> findChatMessage(@PathVariable Long id){
        return chatService.getAllMessageByChatId(id);
    }

    @PreAuthorize("hasAuthority('CREATE_MESSAGE')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long receiveChatMessage(@RequestBody MessageDto messageDto){
        return chatService.writeNewMessage(messageDto).getId();
    }

}

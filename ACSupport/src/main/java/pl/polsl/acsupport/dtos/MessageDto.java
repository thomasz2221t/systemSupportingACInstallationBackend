package pl.polsl.acsupport.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.polsl.acsupport.entities.Message;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {

    private Long id;

    private String message;

    private String date;

    @NotNull
    private Long chatId;

    @NotNull
    private Long userId;

    public MessageDto(Message message){
        this.id = message.getId();
        this.message = message.getMessage();
        this.date = message.getCreatedAt().toString();
        this.chatId = message.getChat().getId();
        this.userId = message.getUser().getId();
    }
}

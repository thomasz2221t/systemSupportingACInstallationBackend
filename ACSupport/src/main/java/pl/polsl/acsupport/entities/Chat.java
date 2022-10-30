package pl.polsl.acsupport.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity(name = "chats")
public class Chat extends BaseEntity{

    @OneToOne(mappedBy = "chat")
    private Building building;

    @OneToMany(mappedBy = "chat")
    private Set<Message> messages = new LinkedHashSet<>();

}

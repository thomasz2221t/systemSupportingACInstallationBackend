package pl.polsl.acsupport.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity(name="message")
public class Message extends BaseEntity {

    @Column
    private String message;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private Chat chat;

    @ManyToMany(mappedBy = "messages")
    private Set<User> user = new LinkedHashSet<>();
}

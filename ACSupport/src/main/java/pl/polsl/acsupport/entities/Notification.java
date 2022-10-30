package pl.polsl.acsupport.entities;

import lombok.Getter;
import lombok.Setter;
import pl.polsl.acsupport.enums.EventType;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity(name="notifications")
public class Notification extends BaseEntity{

    @Enumerated(EnumType.STRING)
    @Column(name="event_type")
    private EventType eventType;

    @Column
    private String message;

    @ManyToMany(mappedBy = "notifications")
    private Set<Building> buildings = new LinkedHashSet<>();
}


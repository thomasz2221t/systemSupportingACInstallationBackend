package pl.polsl.acsupport.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity(name = "buildings")
public class Building extends BaseEntity{

    @Column
    private String name;

    @Column(name="image_path")
    private String imagePath;

    @NotNull
    @Column
    private String street;

    @NotNull
    @Column(name="post_code")
    private String postCode;

    @NotNull
    @Column
    private String city;

    @NotNull
    @Column
    private String region;

    @Column
    private String description;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @OneToMany(mappedBy="building")
    private Set<Room> rooms = new LinkedHashSet<>();

    @ManyToOne
    @JoinColumn(name="building_types_id")
    private BuildingType type;

    @OneToOne
    @JoinColumn(name="chat_id")
    private Chat chat;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "building_notifications",
                joinColumns = {@JoinColumn(name="building_id")},
                inverseJoinColumns = {@JoinColumn(name = "notifications_id")}
    )
    private Set<Notification> notifications = new LinkedHashSet<>();
}

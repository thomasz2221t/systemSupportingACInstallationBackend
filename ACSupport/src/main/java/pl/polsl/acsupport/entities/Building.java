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
}

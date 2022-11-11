package pl.polsl.acsupport.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity(name="rooms")
public class Room extends BaseEntity{

    private String name;

    @Column(name = "area_width")
    private BigDecimal areaWidth;

    @Column(name = "area_height")
    private BigDecimal areaHeight;

    private BigDecimal height;

    private String description;

    @ManyToOne
    @JoinColumn(name="building_id")
    private Building building;

    @ManyToOne
    @JoinColumn(name="room_type_id")
    private RoomType type;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "room_services",
            joinColumns = { @JoinColumn(name = "room_id") },
            inverseJoinColumns = { @JoinColumn(name= "service_id") }
    )
    private Set<Service> services = new LinkedHashSet<>();
}

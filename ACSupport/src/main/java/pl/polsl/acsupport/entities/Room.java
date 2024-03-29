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

    @Column(name = "energy_given_out")
    private BigDecimal energyGivenOut;

    @Column(name = "people_number")
    private BigDecimal peopleNumber;

    private String description;

    @ManyToOne
    @JoinColumn(name="building_id")
    private Building building;

    @ManyToOne
    @JoinColumn(name="room_type_id")
    private RoomType type;

    @OneToMany(mappedBy = "room")
    private Set<Service> services = new LinkedHashSet<>();
}

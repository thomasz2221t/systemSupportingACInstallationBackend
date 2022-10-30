package pl.polsl.acsupport.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity(name = "services")
public class Service extends BaseEntity{

    @Column(name = "dates_begining")
    @ElementCollection
    private List<LocalDateTime> datesBegining;

    @Column(name = "dates_end")
    @ElementCollection
    private List<LocalDateTime> datesEnd;

    private String description;

    @ManyToMany(mappedBy="services")
    private Set<Room> rooms = new LinkedHashSet<>();

    @OneToOne
    @JoinColumn(name = "offer_id")
    private Offer offer;

    @ManyToOne
    @JoinColumn(name="service_type_id")
    private ServiceType type;
}

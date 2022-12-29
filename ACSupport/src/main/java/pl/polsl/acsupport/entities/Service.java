package pl.polsl.acsupport.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity(name = "services")
public class Service extends BaseEntity{

    @Column(name = "date")
    private LocalDateTime date;

    private String description;

    @ManyToOne
    @JoinColumn(name="service_id")
    private Room room;

    @OneToOne
    @JoinColumn(name = "offer_id")
    private Offer offer;

    @ManyToOne
    @JoinColumn(name="service_type_id")
    private ServiceType type;
}

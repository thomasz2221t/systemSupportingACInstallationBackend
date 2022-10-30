package pl.polsl.acsupport.entities;

import lombok.Getter;
import lombok.Setter;
import pl.polsl.acsupport.enums.OfferStatusType;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity(name="offers")
public class Offer extends BaseEntity{

    private BigDecimal cost;

    @Column(name = "dates_begining")
    private LocalDateTime datesBegining;

    @Column(name = "dates_end")
    private LocalDateTime datesEnd;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_type")
    private OfferStatusType statusType;

    @OneToOne(mappedBy = "offer")
    private Service service;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "offer_installer_equipment",
            joinColumns = { @JoinColumn(name = "offer_id") },
            inverseJoinColumns = { @JoinColumn(name="installer_equipment_id") }
    )
    private Set<InstallerEquipment> installerEquipments = new LinkedHashSet<>();
}

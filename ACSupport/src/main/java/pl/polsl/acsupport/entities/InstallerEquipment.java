package pl.polsl.acsupport.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity(name = "installer_equipment")
public class InstallerEquipment extends BaseEntity{

    private String name;

    private BigDecimal price;

    private String producer;

    private String description;

    @ManyToMany(mappedBy = "installerEquipments")
    private Set<Offer> offers = new LinkedHashSet<>();
}

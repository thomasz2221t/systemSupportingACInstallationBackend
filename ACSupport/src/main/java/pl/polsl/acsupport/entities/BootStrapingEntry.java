package pl.polsl.acsupport.entities;

import lombok.Getter;
import lombok.Setter;
import pl.polsl.acsupport.bootstraping.enums.BootStrapingLabel;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Setter
@Entity(name = "bootstraping_entry")
public class BootStrapingEntry extends BaseEntity {

    @Enumerated(EnumType.STRING)
    public BootStrapingLabel label;
}

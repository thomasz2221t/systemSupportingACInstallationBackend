package pl.polsl.acsupport.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity(name="building_types")
public class BuildingType extends BaseEntity{

    @Column
    private String name;

    @OneToMany(mappedBy = "type")
    private Set<Building> building = new LinkedHashSet<>();
}

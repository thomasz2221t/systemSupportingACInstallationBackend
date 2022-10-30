package pl.polsl.acsupport.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity(name = "service_types")
public class ServiceType extends BaseEntity{

    private String name;

    @OneToMany(mappedBy = "type")
    private Set<Service> service = new LinkedHashSet<>();
}

package pl.polsl.acsupport.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity(name = "permissions")
public class Permission extends BaseEntity{

    private String name;

    @ManyToMany(mappedBy = "permissions")
    private Set<Role> roles = new LinkedHashSet<>();
}

package pl.polsl.acsupport.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity(name = "roles")
public class Role extends BaseEntity{

    private String name;

    @ManyToMany(mappedBy="roles")
    private Set<User> users = new LinkedHashSet<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "role_permissions",
            joinColumns = { @JoinColumn(name="role_id") },
            inverseJoinColumns = { @JoinColumn(name="permission_id") }
    )
    private Set<Permission> permissions = new LinkedHashSet<>();
}

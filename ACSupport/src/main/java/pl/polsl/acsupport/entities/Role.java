package pl.polsl.acsupport.entities;

import lombok.Getter;
import lombok.Setter;
import pl.polsl.acsupport.enums.RoleName;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity(name = "roles")
public class Role extends BaseEntity{

    @NotNull
    @Enumerated(EnumType.STRING)
    private RoleName name;

    @ManyToMany(mappedBy="roles")
    private Set<User> users = new LinkedHashSet<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "role_permissions",
            joinColumns = { @JoinColumn(name="role_id") },
            inverseJoinColumns = { @JoinColumn(name="permission_id") }
    )
    private Set<Permission> permissions = new LinkedHashSet<>();
}

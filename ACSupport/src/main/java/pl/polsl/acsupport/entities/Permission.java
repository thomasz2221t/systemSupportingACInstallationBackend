package pl.polsl.acsupport.entities;

import lombok.Getter;
import lombok.Setter;
import pl.polsl.acsupport.enums.PermissionName;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotNull;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity(name = "permissions")
public class Permission extends BaseEntity{

    @NotNull
    @Enumerated(EnumType.STRING)
    private PermissionName name;

    @ManyToMany(mappedBy = "permissions")
    private Set<Role> roles = new LinkedHashSet<>();
}

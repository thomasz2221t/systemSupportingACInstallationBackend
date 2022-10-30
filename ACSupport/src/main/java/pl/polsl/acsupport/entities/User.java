package pl.polsl.acsupport.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity(name="users")
public class User extends BaseEntity{

    @Column(unique = true)
    @NotNull
    private String login;

    @Column
    @NotNull
    private String password;

    @Column(name="first_name")
    @NotNull
    private String firstName;

    @Column(name="last_name")
    @NotNull
    private String lastName;

    @Column(unique = true)
    @NotNull
    private String email;

    @Column
    @NotNull
    private String telephone;

    @OneToMany(mappedBy="user")
    private Set<Building> buildings = new LinkedHashSet<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_roles",
            joinColumns = { @JoinColumn(name="user_id") },
            inverseJoinColumns = { @JoinColumn(name="role_id") }
    )
    private Set<Role> roles = new LinkedHashSet<>();
}

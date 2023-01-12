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

    @NotNull
    private String telephone;

    @Column(name = "enabled")
    private boolean enabled;

    @OneToMany(mappedBy="user")
    private Set<Building> buildings = new LinkedHashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = { @JoinColumn(name="user_id") },
            inverseJoinColumns = { @JoinColumn(name="role_id") }
    )
    private Set<Role> roles = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Message> message = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Offer> offers = new LinkedHashSet<>();
}

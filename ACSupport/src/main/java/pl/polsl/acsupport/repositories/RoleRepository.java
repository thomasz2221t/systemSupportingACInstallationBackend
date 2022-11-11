package pl.polsl.acsupport.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.polsl.acsupport.entities.Role;
import pl.polsl.acsupport.enums.RoleName;

import java.util.Optional;

public interface RoleRepository extends CrudRepository<Role,Long> {
    Optional<Role> findByName(RoleName name);
}

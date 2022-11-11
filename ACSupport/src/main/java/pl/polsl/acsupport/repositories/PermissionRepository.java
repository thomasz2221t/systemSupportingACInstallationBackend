package pl.polsl.acsupport.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.polsl.acsupport.entities.Permission;

public interface PermissionRepository extends CrudRepository<Permission, Long> {
    Permission findByName(String name);
}

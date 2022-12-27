package pl.polsl.acsupport.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.acsupport.entities.Service;

@Repository
public interface ServiceRepository extends CrudRepository<Service,Long> {
}

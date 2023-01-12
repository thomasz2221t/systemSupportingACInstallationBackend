package pl.polsl.acsupport.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import pl.polsl.acsupport.entities.ServiceType;

public interface ServiceTypeRepository extends CrudRepository<ServiceType,Long>, PagingAndSortingRepository<ServiceType, Long> {
}
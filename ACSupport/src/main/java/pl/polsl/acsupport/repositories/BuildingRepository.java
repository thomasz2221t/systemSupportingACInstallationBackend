package pl.polsl.acsupport.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.acsupport.entities.Building;

@Repository
public interface BuildingRepository extends CrudRepository<Building,Long>, PagingAndSortingRepository<Building,Long> {
}

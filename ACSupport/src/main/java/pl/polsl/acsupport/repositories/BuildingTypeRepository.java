package pl.polsl.acsupport.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.acsupport.entities.BuildingType;

@Repository
public interface BuildingTypeRepository extends CrudRepository<BuildingType,Long>, PagingAndSortingRepository<BuildingType, Long> {
}
